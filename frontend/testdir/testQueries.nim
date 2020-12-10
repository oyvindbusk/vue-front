import db_sqlite
import ../../backend/src/backendpkg/submodule
import json



#[
    File for testing the sqlite-queries


]#

# open the DB
let db = open("../../backend/db/mytest.db", "", "", "")


# Proc to select all variants with information regarding in which samples they are present, zygosity and class:
proc getVariantsWithInfo*(db: DbConn): seq[Row] =
  var rows: seq[Row] =  db.getAllRows(sql"""
  SELECT DISTINCT
    samples.*,
    snpeff.*,
    group_concat(samples.sampleInfo_ID || "(zyg:" || samples.gt || ", class: " || IFNULL(group_interp.class, "no") ||")") AS groupedSamples,
    group_concat(group_interp.class) AS classes,
    group_concat(group_interp.comment) AS comments,
    IFNULL(het.c, 0) as hets,
    IFNULL(hom.c, 0) as homs
    FROM
        samples
    LEFT JOIN
        snpeff
    ON
        snpeff.positionID = samples.positionID
    LEFT JOIN
        (SELECT DISTINCT *
        FROM
            interps
        INNER JOIN
            sessions
        ON
            sessions.sessionID = interps.sessionID
        GROUP BY
            interps.id)
        group_interp
    ON
        samples.positionID = group_interp.positionID
    LEFT JOIN (SELECT samples.positionID, samples.hz, COUNT(samples.hz) AS c FROM samples WHERE samples.hz = 1 GROUP BY samples.positionID) hom ON samples.positionID = hom.positionID
    LEFT JOIN (SELECT samples.positionID, samples.hz, COUNT(samples.hz) AS c FROM samples WHERE samples.hz = 0 GROUP BY samples.positionID) het ON samples.positionID = het.positionID
    GROUP BY
        samples.positionID""")
  return rows

let x = getVariantsWithInfo(db)
var queryNames = getQueryNames( "variants" )


echo dbToJson(x, queryNames)


