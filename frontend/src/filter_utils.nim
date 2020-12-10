import tables
import sequtils
import db_sqlite
import strutils
import strformat
import json
import httpclient

# DBNAME should be taken away at some point.. But not exactly now;
let dbName* = "../backend/mytest.db"


# Object type of filter
type
  Filter* = object
    column*: string
    ops*: string
    keepIfMiss*: bool
    value*: string


# Proc to get all table (dict) pragmas for all tables:
proc getFieldTypes*(backendhost: string): JsonNode =
  let client = newHttpClient()
  let response = client.request(backendhost & "/api/tables", httpMethod = HttpGet)
  return parseJson( $response.body)


# Proc to check if column name is numeric or string-based:
proc checkcol*(col: string, fieldTable: JsonNode): string =
  try:
    case fieldTable[toLower(col)].getStr():
      of "VARCHAR(255)", "character varying", "text":
        return "string"
      of "FLOAT", "INTEGER", "double precision", "integer", "decimal", "numeric":
        return "numeric"
      else:
        return "Unknown type"
  except KeyError:
    echo "The field is not in any of the tables: " & fieldTable[toLower(col)].getStr()
  

# Adds a string to a seq. Used to add AD, AR or ADAR to queryResult
proc addStr(s: seq[string], str: string): seq[string] =
    var s_mod = s
    s_mod.add(str)
    return s_mod



# Regular filtering (no chains:)
# Filter rows from db, return seq[Rows containing filtered results.]
proc filterRows*(variants: seq[Row], filter: Filter, querynamesJson: JsonNode, backendhost: string): seq[
    Row] = 
  if filter.column == "":
    return variants
  let col: string = filter.column
  let val: string = filter.value # OBS - should check if contains whitespace + OR | AND and act accordingly
  var fieldTable = getFieldTypes(backendhost)
  var vars: seq[Row]  
  var colType = checkcol(col, fieldTable) # check if column numeric or string
  var op: string = filter.ops
  
  var querynames: seq[string]
  # Convert querynamesJson to seq[string]
  for i in 0..len(querynamesJson)-1:
    querynames.add(querynamesJson[$i].getStr()) 
  
  case op:
    of "Equal to":
      vars = filter(variants, proc(item: seq[string]): bool =
        item[queryNames.find(col)] == val) # Querynames.find gets the index of the column from the querynames
    of "Less than":
      echo colType & "-" & col
      if colType == "numeric":
        vars = filter(variants, proc(item: seq[string]): bool =
          return len(item[queryNames.find(col)]) != 0 and parseFloat(item[queryNames.find(col)]) < parseFloat(val))
      else:
        echo "error, not numeric column" # Should be raised
    of "Greater than":
      if colType == "numeric":
        vars = filter(variants, proc(item: seq[string]): bool =
          parseInt(item[queryNames.find(col)]) > parseInt(val))
      else:
        echo "error, not numeric column" # Should be raised
    of "Not equal to":
      vars = filter(variants, proc(item: seq[string]): bool =
        item[queryNames.find(col)] != val)
    of "Does not contain":
      vars = filter(variants, proc(item: seq[string]): bool =
        not item[queryNames.find(col)].contains(val))
    of "Contains":
      vars = filter(variants, proc(item: seq[string]): bool =
        item[queryNames.find(col)].contains(val))
    else:
      echo "None of the predefined filters are present!"
      echo op
      # Need to return something here, so it does not crash, if filters return none
  if filter.keepIfMiss == true: # If keepIfMiss true, concat with all empty values for that column
    vars.insert(filter(variants, proc(item: seq[string]): bool =
      item[queryNames.find(col)] == ""
      ))
  return vars
  
proc addClassIfPresent(queryres: JsonNode, postFix: string = ""): JsonNode =
  # Adds class and span to status field if class is already present for this variant in this patient
  var queryresult = queryres
  var count: int = 0
  for i in queryresult["data"]:
    var tempClass = i["class"].getStr()
    if tempClass != "":
      var temp: string
      if postFix == "":
        temp = fmt"'<span class=\'btn btn-xs btn-success\'>Class: {tempClass}</span>'"
      else:
        temp = fmt"'<span class=\'btn btn-xs btn-success\'> {postFix} </span> <span class=\'btn btn-xs btn-success\'>Class: {tempClass}</span>'"
      temp = temp.replace("'", "\"")
      queryresult["data"][count]["Status"] = parseJson(temp) 
    count += 1
  return queryresult

# Proc to take seq of rows and turn into Json, s is rows from query, entities are column headers from the sql-query (This might already be in there?)
# postfix is either AR or AD for chain filtering
proc dbToJson*(queryResult: seq[Row], keys: JsonNode, postFix: string = ""): JsonNode =
  var
      variant: string
      variants: seq[string]
  if len(queryResult) > 0:
    for result in queryResult:
      variant = ""
      for count, value in keys:
        variant = fmt"{variant}, {value}: '{result[parseInt(count)]}'"
      # Add status column add AR/AD if chain filtering:
      if postFix == "" or postFix == "allvariants":
        variant = fmt"{variant}, 'Status': '<span class=\'btn btn-xs btn-info\'> Not set </span>'"
      else:
        variant = fmt"{variant}, 'Status': '<span class=\'btn btn-xs btn-success\'> {postFix} </span> <span class=\'btn btn-xs btn-info\'> Not set </span>'"
      variant.removePrefix({','})
      variant = fmt"{{{variant}}}"
      variant = variant.replace("'", "\"")
      variants.add(variant)
  else:
    variant = ""
    for count, value in keys:
      variant = fmt"{variant}, {value}: 'no variants'"
    variant.removePrefix({','})
    variant = fmt"{{{variant}}}"
    variant = variant.replace("'", "\"")
    variants.add(variant)
  var queryresult = parseJson(fmt"""{{"data": [{variants.join(", ")}]}}""")
  if postFix != "allvariants":
    queryresult = addClassIfPresent(queryresult, postFix)
  return queryresult
  

# Code to perform chainfiltering:


# Define variables:
var AD: seq[Filter]
var AR: seq[Filter]

# Add filters AD:
AD.add(Filter(column: "annotation", ops: "Not equal to", value: "intron_variant", keepIfMiss: true))
AD.add(Filter(column: "annotation", ops: "Not equal to", value: "synonymous_variant", keepIfMiss: true))
AD.add(Filter(column: "annotation", ops: "Not equal to", value: "downstream_gene_variant", keepIfMiss: true))
AD.add(Filter(column: "annotation", ops: "Not equal to", value: "3_prime_UTR_variant", keepIfMiss: true))
AD.add(Filter(column: "annotation", ops: "Not equal to", value: "upstream_gene_variant", keepIfMiss: true))
AD.add(Filter(column: "gn_afnfe", ops: "Less than", value: "0.2", keepIfMiss: true))

# Add filters AR:
AR.add(Filter(column: "annotation", ops: "Not equal to", value: "intron_variant", keepIfMiss: true))
AR.add(Filter(column: "annotation", ops: "Not equal to", value: "synonymous_variant", keepIfMiss: true))
AR.add(Filter(column: "annotation", ops: "Not equal to", value: "downstream_gene_variant", keepIfMiss: true))
AR.add(Filter(column: "annotation", ops: "Not equal to", value: "3_prime_UTR_variant", keepIfMiss: true))
AR.add(Filter(column: "annotation", ops: "Not equal to", value: "upstream_gene_variant", keepIfMiss: true))
AR.add(Filter(column: "gn_afnfe", ops: "Less than", value: "0.2", keepIfMiss: true))

var filterChain_1* = {"AR": AR, "AD": AD}.toTable

# Proc to convert querystring containing filters from the frontend into seq of tuples used by the query-proc:
proc genQueryString*(jsonInput: JsonNode): seq[Filter] =
    var filterbuilder: seq[Filter]
    var cols = jsonInput["columns"]
    var ops = jsonInput["ops"]
    var vals = jsonInput["text"]
    var check = jsonInput["check"]
    # Check if empty:
    var empty = if cols[0]["cols"].getStr() == "": true else: false
    
    if empty:
      filterbuilder.add(Filter(column: "", ops: "", value: "", keepIfMiss: false))
    else:
      for i in 0..len(cols)-1:
        filterbuilder.add(Filter(column: cols[i]["cols"].getStr(), ops: ops[i]["op"].getStr(), value: vals[i]["text"].getStr(), keepIfMiss: check[i]["check"].getBool()))
    return filterbuilder
