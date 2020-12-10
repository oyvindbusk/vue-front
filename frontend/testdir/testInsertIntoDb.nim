import json
import db_sqlite
import times


# Path to db:
let dbName* = "/Users/oyvindlovoldbusk/Documents/work/nim/backend/mytest.db" # Need to be global for use in the router gets

let body: JsonNode = %*{"sampleID": "118_20", "userName": "Admin",
    "sampleComment": "", "variantInterps": {"1-1278237-T-C": {
    "variantComment": "Kommentar her", "class": "4"}, "2-1278237-T-A": {
    "variantComment": "", "class": ""}}}

# Proc to get a list of variants already interpreted in session:




echo postToDb(dbName, body, true)





    #[
    table sessions:
    id                INTEGER PRIMARY KEY,
    sessionID         VARCHAR(255) NOT NULL,
    user              VARCHAR(255),
    openDate          VARCHAR(255),
    sample_ID         VARCHAR(255),
    signOffDate       VARCHAR(255),
    controlDate       VARCHAR(255),
    controlUser       VARCHAR(255),
    comment           TEXT


    Table interps:
    id              INTEGER PRIMARY KEY,
    sessionID       VARCHAR(255) NOT NULL,
    positionID      VARCHAR(255) NOT NULL,
    comment         TEXT,
    class           VARCHAR(25),
    insDate         VARCHAR(255)
    )""")

    ]#
