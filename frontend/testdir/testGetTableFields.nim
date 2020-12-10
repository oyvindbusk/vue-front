import ../../backend/src/samples/samples_model
import ../../backend/src/snpeff/snpeff_model
import ../../backend/src/interpretation/variant_interp_model

import strformat
import strutils


# Gets the name of all fields in the tables included in the query
proc getQueryNames*(): seq[string] =
    # A type that includes the tables included in the query
    type
        Tabs = tuple[samples: Samples, snpeff: SnpEff, interps: Interps]

    var tables: Tabs
    var queryNames: seq[string]
    for tab, typ in fieldPairs(tables):
        queryNames.add("id") # This is not part of the table init, therefore must add manually
        for field, j in fieldPairs(typ):
            queryNames.add(field)

    return queryNames


var queryNames = getQueryNames()

# Walk trough each item in list, and if duplicate, add _count to one of them

var finished_list: seq[string] 

# proc to check for duplicates in a list, and change name it duplicate present:
# if positionID in already list, add positionID_1, then _2 etc.
proc removeDuplQueryNames(qName: string, y: seq[string], i: int = 0): string =
    if qName in y:
        var returnName = rsplit(qName, '_', maxsplit=1)[0]
        return removeDuplQueryNames(fmt"{returnName}_{i + 1}", y, i + 1)
    else:
        return qName

for i in queryNames:
    finished_list.add(removeDuplQueryNames(i, finished_list))


echo finished_list

# Sjekk om string er i liste

echo queryNames
var oriqueryNames: seq[string] = @["id", "positionID", "chr", "pos", "refn",
    "altn", "qual", "ac", "af", "ad", "dp", "hz", "gt", "mq", "qd",
    "ca", "an", "sampleInfo_ID", "interptetation_ID", "id", "chr", "pos",
    "refn", "altn", "positionID", "altNum", "altTotalCount", "allele",
    "annotation", "annotationImpact", "geneName", "geneID", "featureType",
    "featureID", "transcriptBioType", "rank", "hGVSc", "hGVSp",
    "cDNAposInfo", "cDSposInfo", "aAposInfo", "distance", "errorLevel"]


#doAssert queryNames == oriqueryNames

