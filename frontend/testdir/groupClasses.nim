import ../../backend/src/queries/queries
import ../../backend/src/backendpkg/submodule

#[
    Hva med å kjøre en egen query for interps etterpå, siden det er den eneste som kan inneholde duplikater, og så koble det på positionID senere
    Men sjekk evernote for å se om jeg har noen oppskrift på hvordan man bruker concat i sqlite.

SELECT DISTINCT *, group_concat(interps.class) FROM samples
JOIN snpeff ON snpeff.positionID = samples.positionID
LEFT JOIN interps ON samples.positionID = interps.positionID
WHERE sampleInfo_ID = "118_20" AND samples.positionID = "1-1274242-A-G"
GROUP BY samples.positionID
LIMIT 50







]#



# do a query, and for the rows that are duplicated, group on positionID, and concat e.g. class. This is instead of grouping in sqlite, for some reason.
# query db into rows:

let dbName* = "/Users/oyvindlovoldbusk/Documents/work/nim/backend/mytest.db" # Need to be global for use in the router gets

var q = variantQuery(dbName, "118_20")
echo q.type
for i in q:
    echo i
