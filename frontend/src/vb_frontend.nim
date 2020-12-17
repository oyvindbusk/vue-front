# Inspired by (or perhaps stolen a bit by)- Thomas T. Jarløv
import db_sqlite # SQLite
import jester # Our webserver
import logging # Logging utils
import os # Used to get arguments
import parsecfg # Parse CFG (config) files
import strutils # Basic functions
import times # Time and date
import uri # We need to encode urls: encodeUrl()
import json
import database_utils # Utils used in the database
import password_utils # Our file with password utils
import api_utils
import filter_utils
import query_utils


# First we'll load config files
# If --local - load different config with localhost:
#let dict: Config = loadConfig("config/config.cfg")
let dict: Config = loadConfig("config/local_config.cfg")
  

# Now we get the values and assign them.
# We do not need to change them later, therefore
# we'll use `let`
let db_user = dict.getSectionValue("Database", "user")
let db_pass = dict.getSectionValue("Database", "pass")
let db_name = dict.getSectionValue("Database", "name")
let db_host = dict.getSectionValue("Database", "host")

let mainPort = parseInt dict.getSectionValue("Server", "port")

# Get values for minio-server:
let minio_host    = dict.getSectionValue("Minio", "host")
let minio_user    = dict.getSectionValue("Minio", "user")
let minio_pass    = dict.getSectionValue("Minio", "pass")
let minio_bucket  = dict.getSectionValue("Minio", "bucket")
let minio_region  = dict.getSectionValue("Minio", "region")

# Hostname for backend:
let backend_host  = dict.getSectionValue("Backend", "host")


# Database var
var db: DbConn

# Jester setting server settings
settings:
  port = Port(mainPort)

# Setup user data
type
  TData* = ref object of RootObj
    loggedIn*: bool
    userid, username*, userpass*, email*: string
    req*: Request


proc init(c: var TData) =
  ## Empty out user session data
  c.userpass = ""
  c.username = ""
  c.userid = ""
  c.loggedIn = false


func loggedIn(c: TData): bool =
  ## Check if user is logged in by verifying that c.username exists
  c.username.len > 0


proc checkLoggedIn(c: var TData) =
  ## Check if user is logged in
  ## 
  ## 
  ## 
  # Get the users cookie named `sid`. If it does not exist, return
  if not c.req.cookies.hasKey("sid"): return
  # Assign cookie to `let sid`
  let sid = c.req.cookies["sid"]

  # Update the value lastModified for the user in the
  # table session where the sid and IP match. If there's
  # any results (above 0) assign values

  if execAffectedRows(db, sql("UPDATE session SET lastModified = " & $toInt(
      epochTime()) & " " & "WHERE ip = ? AND key = ?"), c.req.ip, sid) > 0:

    # Get user data based on userID from session table
    # Assign values to user details - `c`
    c.userid = getValue(db, sql"SELECT userid FROM session WHERE ip = ? AND key = ?",
        c.req.ip, sid)
    echo c.req.ip
    echo "---##"
    echo c.userid
    # Get user data based on userID from person table
    let row = getRow(db, sql"SELECT name, email, status FROM person WHERE id = ?", c.userid)

    # Assign user data
    c.username = row[0]
    c.email = toLowerAscii(row[1])

    # Update our session table with info about activity
    discard tryExec(db, sql"UPDATE person SET lastOnline = ? WHERE id = ?",
        toInt(epochTime()), c.userid)

  else:
    # If the user is not found in the session table
    c.loggedIn = false


proc login(c: var TData, email, pass: string): tuple[b: bool, s: string] =
  ## User login

  # We have predefined query
  const query = sql"SELECT id, name, password, email, salt, status FROM person WHERE email = ?"

  # If the email or pass passed in the proc's parameters is empty, fail
  if email.len == 0 or pass.len == 0:
    return (false, "Missing password or username")

  # We'll use fastRows for a quick query.
  # Notice that the email is set to lower ascii
  # to avoid problems if the user has any
  # capitalized letters.
  for row in fastRows(db, query, toLowerAscii(email)):

    # Now our password library is going to work. It'll
    # check the password against the hashed password
    # and salt.
    if row[2] == makePassword(pass, row[4], row[2]):
      # Assign the values
      c.userid = row[0]
      c.username = row[1]
      c.userpass = row[2]
      c.email = toLowerAscii(row[3])

      # Generate session key and save it
      let key = makeSessionKey()
      exec(db, sql"INSERT INTO session (ip, key, userid) VALUES (?, ?, ?)",
          c.req.ip, key, row[0])

      info("Login successful")
      return (true, key)

  info("Login failed")
  return (false, "Login failed")


proc logout(c: var TData) =
  ## Logout

  c.username = ""
  c.userpass = ""
  const query = sql"DELETE FROM session WHERE ip = ? AND key = ?"
  exec(db, query, c.req.ip, c.req.cookies["sid"])


# Do the check inside our routes
template createTFD() =
  ## Check if logged in and assign data to user

  # Assign the c to TDATA
  var c {.inject.}: TData
  # New instance of c
  new(c)
  # Set standard values
  init(c)
  # Get users request
  c.req = request
  echo "--"
  echo c.req
  # Check for cookies (we need the cookie named sid)
  if request.cookies.len > 0:
    echo "cookie length"
    # Check if user is logged in
    checkLoggedIn(c)
  # Use the func()
  c.loggedIn = loggedIn(c)


# isMainModule
when isMainModule:
  echo "Nim Web is now running: " & $now()

  # Generate DB if newdb is in the arguments
  # or if the database does not exists
  if "newdb" in commandLineParams() or not fileExists(db_host):
    echo "her"
    echo commandLineParams()
    if fileExists(db_host):
      echo db_host
    generateDB()
    quit()

  # Connect to DB
  try:
    # We are using the values which we assigned earlier
    db = open(connection = db_host, user = db_user, password = db_pass,
        database = db_name)
    info("Connection to DB is established.")
  except:
    fatal("Connection to DB could not be established.")
    sleep(5_000)
    quit()

  # Add an admin user if newuser is in the args
  if "newuser" in commandLineParams():
    createAdminUser(db, commandLineParams())
    quit()


# Include template files
include "tmpl/reportModal.tmpl"
include "tmpl/main.tmpl"
include "tmpl/user.tmpl"
include "tmpl/interp.tmpl"
include "tmpl/variants.tmpl"
include "tmpl/stats.tmpl"





# Setup routes (URL's)
routes:
  get "/":
    createTFD()
    resp genMain(c)

  get "/interpret/@sID":
    createTFD()
    if c.loggedIn:
      resp genInterp(c, @"sID")


  get "/select":
    createTFD()
    if c.loggedIn:
      resp genSelSample(c)

  get "/login": 
    createTFD()
    resp genLogin(c, @"msg")

  get "/chklogin": 
    createTFD()
    echo c.loggedIn
    if c.loggedIn:
      resp(Http200, {"Access-Control-Allow-Origin" : "http://localhost:8080", "Access-Control-Allow-Credentials": "true" }, $(%*{"logstatus": true}))
    else:
      resp(Http200, {"Access-Control-Allow-Origin" : "http://localhost:8080", "Access-Control-Allow-Credentials": "true" }, $(%*{"logstatus": false}))




  post "/dologin":
    createTFD()
    let (loginB, loginS) = login(c, replace(toLowerAscii(@"email"), " ", ""),
        replace(@"password", " ", ""))
    if loginB:
      jester.setCookie("sid", loginS, daysForward(7))
      #redirect("/select")
      #resp Http200, {"Access-Control-Allow-Origin": "*"}, "Content"
      resp %*{"data": "success"}
      #resp(Http200, {"Access-Control-Allow-Origin" : "http://localhost:8080", "Access-Control-Allow-Credentials": "true" }, """{"data": "success"}""")
    else:
      echo "her da"
      resp(Http200, {"Access-Control-Allow-Origin":"*"} ,"ok")
      #redirect("/login?msg=" & encodeUrl(loginS))
      

  get "/logout":
    createTFD()
    logout(c)
    redirect("/")


  get "/variants":
    createTFD()
    if c.loggedIn:
      resp genVariants(c)


  get "/api":
    try:
      var tmp_variants = parseJson(apiCalls(@"sample_id", backendhost = backend_host))
      var variants: seq[seq[string]]
      var tmp: seq[string] = @[]
      var cols = parseJson(apiCalls("columns", backendhost = backend_host))
      var filterVariantResult: JsonNode
      # Convert to seq of strings
      for variant in tmp_variants["data"]:
        tmp = @[]
        for key, val in pairs(variant):
          tmp.add(val.getStr())
        variants.add(tmp)
      var filtered_variants: seq[Row] = variants
      if parseJson(@"filters")["columns"].getStr == "filterChain":
        var ar: JsonNode
        var ad: JsonNode
        for filter in filterChain_1["AR"]:
          filtered_variants = filterRows(filtered_variants, filter, cols, backendhost = backend_host)
        ar = dbToJson(filtered_variants, cols, "AR")
        filtered_variants = variants # Reset filtered variants 
        for filter in filterChain_1["AD"]:
          filtered_variants = filterRows(filtered_variants, filter, cols, backendhost = backend_host)
        ad = dbToJson(filtered_variants, cols, "AD")
        filterVariantResult = ar
        # Combine the two jsons
        for variant in ad["data"]:
          filterVariantResult["data"].add(variant)
      else:
        var filters = genQueryString(parseJson(@"filters"))
        for filter in filters:
          filtered_variants = filterRows(filtered_variants, filter, cols, backendhost = backend_host)
        filterVariantResult = dbToJson(filtered_variants, cols)

      # Check if is empty should be performed here:
      #echo pretty(filterVariantResult)
      resp filterVariantResult

    except:
      let
        e = getCurrentException()
        msg = getCurrentExceptionMsg()
      echo "Got exception ", repr(e), " with message ", msg
      resp %*{"data": [{"id": "empty", "chr": "empty", "pos": "empty",
          "refn": "empty", "altn": "empty"}]}

  get "/api/samples":
    # Query backend api for the samples:
    let sample_ids = apiCalls("samples", backendhost = backend_host)
    resp sample_ids

  get "/api/variants":
    # Query backend api for all variants with info regarding class etc:
    let tmp_variants = parseJson(apiCalls("variants", backendhost = backend_host))
    var
      filters = genQueryString(parseJson(@"filters"))
      cols = parseJson(apiCalls(op = "columns", query = "variants", backendhost = backend_host))
      variants: seq[seq[string]]
      tmp: seq[string] = @[]
      
    # Convert to seq of strings
    for variant in tmp_variants["data"]:
      tmp = @[]
      for key, val in pairs(variant):
        tmp.add(val.getStr())
      variants.add(tmp)
    # Filter
    for filter in filters:
      variants = filterRows(variants, filter, cols, backendhost = backend_host)
    #echo pretty(dbToJson(variants, cols, "allvariants"))
    resp dbToJson(variants, cols, "allvariants")


  get "/api/columns":
    # Query backend api for the columns gotten back in the query:
    let columns = apiCalls("columns", backendhost = backend_host)
    resp columns

  get "/api/filters":
    resp %*{"data": [{"id": "empty", "chr": "empty", "pos": "empty",
        "refn": "empty", "altn": "empty"}]}

  # Route to get url for bams and bai
  get "/api/bam/@sID":
    resp parseJson(apiCalls("bam_url", filters = @"sID", backendhost = backend_host))

  # Route to get the sessionInfo from the backend:
  get "/api/sessionInfo/@sID":
    resp parseJson(apiCalls("session_info", filters = @"sID", backendhost = backend_host))

  post "/api/saveVariant":
    # get POST request from js, send as post to backend
    echo @"variantInterps"
    var
      sc = @"sampleComment"
      usernm = @"username"
      sessID = @"sessionID"
      sampleID = @"sampleID"
      interps = @"variantInterps"
      signoff = @"signoff"
      postInterpData = %*{"sampleID": $sampleID, "userName": $usernm,
        "sampleComment": $sc, "variantInterps": parseJson(interps), "signoff": signoff}
    echo postInterpDataToBackend(postInterpData, backendhost = backend_host)
    resp %*{"responseData": "success"}
    
  post "/api/posttest2":
    echo "posttest2"
    var postInterpData = parseJson(request.body)
    echo pretty(parseJson(request.body))
    echo postInterpDataToBackend(postInterpData, backendhost = backend_host)
    resp %*{"responseData": "success"}
    
  get "/api/backendip":
    # Respond with ip of the backend from the config-file
    resp %*{"ip": backend_host}

  get "/stats":
    createTFD()
    if c.loggedIn:
      resp genStats(c)

  get "/newsamples":
    # Query backend api for the samples:
    let sample_ids = parseJson("""{"items": [{"sampleID": "763_20", "panel": "ALS"},
    {"sampleID": "591_20", "panel": "CMT"}]}""")
    resp(Http200, {"Access-Control-Allow-Origin" : "http://172.16.0.3:8080", "Access-Control-Allow-Credentials": "true" }, $(sample_ids))
  

  get "/newVariants":
    echo @"sampleID"
    let sample = @"sampleID"
    # Query backend api for the samples:
    let variants = parseJson("""{"variants": 
      [
        {"chr": "1", "pos": 100, "ref": "c", "alt": "a", "HGMD": "DM"},
        {"chr": "1", "pos": 300, "ref": "a", "alt": "tt", "HGMD": "DM"},
        {"chr": "2", "pos": 200, "ref": "g", "alt": "t", "HGMD": "DM"},
        {"chr": "X", "pos": 10, "ref": "c", "alt": "c", "HGMD": "DM"},
      ],
      "sample": "$#",
      "sampleComment": ""
      }""" % [sample])
    resp(Http200, {"Access-Control-Allow-Origin" : "http://172.16.0.3:8080", "Access-Control-Allow-Credentials": "true" }, $(variants))