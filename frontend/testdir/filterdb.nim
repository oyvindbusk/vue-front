import db_sqlite
import json
import tables
import sequtils
import strutils



# Path to db:
let dbName* = "/Users/oyvindlovoldbusk/Documents/work/nim/backend/mytest.db" # Need to be global for use in the router gets
                                                                             # ids of the fields that are queried
let queryNames* = @["id", "positionID", "chr", "pos", "refn", "altn", "qual",
        "ac", "afc", "af", "ad", "dp", "hz", "gt", "mq", "qd", "ca", "an",
        "sampleInfo_ID", "interptetation_ID", "id", "chr", "pos", "refn",
        "altn", "positionID", "altNum", "altTotalCount", "allele", "annotation",
        "annotationImpact", "geneName", "geneID", "featureType", "featureID",
        "transcriptBioType", "rank", "hGVSc", "hGVSp", "cDNAposInfo",
        "cDSposInfo", "aAposInfo", "distance", "errorLevel"]



# Proc to get all table names from db:
proc getTableNames*(pathToDb: string): seq[Row] =
    let db = open(pathToDb, "", "", "")
    var rows: seq[Row] = db.getAllRows(sql"""SELECT name FROM sqlite_master WHERE type='table' ORDER BY name""")
    db.close()
    return rows

# Proc to get all table (dict) pragmas for all tables:
proc getFieldTypes*(pathToDb: string): Table[string, string] =
    let db = open(pathToDb, "", "", "")
    let tables: seq[Row] = getTableNames(pathToDb) # Get all table names:
    var fieldTypes = initTable[string, string]() # Init a table to store all key value pairs:
    for table in tables:
        for i in db.getAllRows(sql"""PRAGMA table_info(?)""", table[0]):
            fieldTypes[i[1]] = i[2] # Only get field name and data type, return as table
    db.close()
    return fieldTypes

var fieldTable = getFieldTypes(dbName)


# Proc to check if column name is numeric or string-based:
proc checkcol(col: string, fieldTable: Table[string, string]): string =
    try:
        case fieldTable[col]:
            of "VARCHAR(255)":
                return "string"
            of "FLOAT", "INTEGER":
                return "numeric"
            else:
                return "Unknown type"
    except KeyError:
        echo "The field is not in any of the tables!"



# Build a querystring to send to db to retrieve filtered variants
# op(string(lessThan, moreThan, equalTo, notEqualTo, contains, notContains)), value(string), keepIfMiss(bool)
let filter = %*[{"column": "annotation", "op": "eqto",
        "value": "intron_variant", "keepIfMiss": true},
    {"column": "chr", "op": "eqto", "value": "1", "keepIfMiss": true},
    {"column": "interptetation_ID", "op": "eqto", "value": "1",
            "keepIfMiss": false},
    {"column": "interptetation_ID", "op": "eqto", "value": "1",
            "keepIfMiss": true},
    {"column": "dp", "op": "lessThan", "value": "10", "keepIfMiss": false},
    {"column": "dp", "op": "moreThan", "value": "10", "keepIfMiss": false},
    {"column": "annotation", "op": "notEqualTo", "value": "intron_variant",
            "keepIfMiss": true},
    {"column": "annotation", "op": "contains", "value": "downstream",
            "keepIfMiss": false},
    {"column": "annotation", "op": "notContains", "value": "downstream",
            "keepIfMiss": false},
    {"column": "pos", "op": "notContains", "value": "1", "keepIfMiss": false}
    ]



proc variantQuery*(pathToDb: string, sample_id: string): seq[Row] =
    let db = open(pathToDb, "", "", "")
    var rows: seq[Row] = db.getAllRows(sql""" SELECT * FROM samples JOIN snpeff ON snpeff.positionID = samples.positionID WHERE sampleInfo_ID = ? LIMIT 5""", sample_id)
    db.close()
    return rows


# Needs the column indexes for this to work without numbers
var z = variantQuery(dbName, "118_20")

# Filter rows from db, return seq[Rows containing filtered results.]
proc filterRows(variants: seq[Row], filter: JsonNode, fieldTable: Table[string,
        string]): seq[Row] =
    var vars: seq[Row]
    let col: string = filter["column"].getStr()
    var colType = checkcol(col, fieldTable) # check if column numeric or string
    var op: string = filter["op"].getStr()
    let val: string = filter["value"].getStr()
    case op:
        of "eqto":
            vars = filter(variants, proc(item: seq[string]): bool =
                item[queryNames.find(col)] ==
                        val) # Querynames.find gets the index of the column from the querynames
        of "lessThan":
            if colType == "numeric":
                vars = filter(variants, proc(item: seq[string]): bool =
                    parseInt(item[queryNames.find(col)]) < parseInt(val))
            else:
                echo "error, not numeric column" # Should be raised
        of "moreThan":
            if colType == "numeric":
                vars = filter(variants, proc(item: seq[string]): bool =
                    parseInt(item[queryNames.find(col)]) > parseInt(val))
            else:
                echo "error, not numeric column" # Should be raised
        of "notEqualTo":
            vars = filter(variants, proc(item: seq[string]): bool =
                item[queryNames.find(col)] != val)
        of "notContains":
            vars = filter(variants, proc(item: seq[string]): bool =
                not item[queryNames.find(col)].contains(val))
        of "contains":
            vars = filter(variants, proc(item: seq[string]): bool =
                item[queryNames.find(col)].contains(val))

    if filter["keepIfMiss"].getBool() ==
            true: # If keepIfMiss true, concat with all empty values for that column
        vars.insert(filter(variants, proc(item: seq[string]): bool =
            item[queryNames.find(col)] == ""
            ))
    return vars


for i in filterRows(z, filter[9], fieldTable):
    echo i
