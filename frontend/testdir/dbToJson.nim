import ../../backend/src/queries/queries
import ../../backend/src/backendpkg/submodule
import json
import strformat, sequtils, strutils



# query db into rows:
let dbName* = "/Users/oyvindlovoldbusk/Documents/work/nim/backend/mytest.db" # Need to be global for use in the router gets

let queryNames = getQueryNames()
echo queryNames
var r = variantQuery(dbName, "118_20")
# Proc to take seq of rows and turn into Json, s is rows from query, entities are column headers from the sql-query


proc dbToJson2*(queryResult: seq[Row], keys: seq[string]): JsonNode =
    var
        variant: string
        variants: seq[string]
    for result in queryResult:
        variant = ""
        for count, key in keys:
            echo key, " ", result[count]
            variant = fmt"""{variant}, "{key}": "{result[count]}""""
        variant.removePrefix({','})
        variant = fmt"{{{variant}}}"
        variants.add(variant)
    let jsonObject = parseJson(fmt"""{{"data": [{variants.join(", ")}]}}""")
    return jsonObject

#[


]#





var x = dbToJson2(r, queryNames)
echo pretty(x)
    #[
    mål:
{"data":[{"id":"A","positionID":"G","chr":"G","pos":"1-1273278-A-G","refn":"0","altn":"0","qual":"3729.19995117187","ac":"15","af":"15","ad":"","dp":"1","hz":"1/1","gt":"1","mq":"1","qd":"118_20","ca":"0","an":"1","sampleInfo_ID":"1","interptetation_ID":"1273278","altNum":"downstream_gene_variant","altTotalCount":"MODIFIER","allele":"TAS1R3","annotation":"TAS1R3","annotationImpact":"transcript","geneName":"NM_152228.1","geneID":"protein_coding","featureType":"","featureID":"c.*3434A>G","transcriptBioType":"","rank":"","hGVSc":"","hGVSp":"","cDNAposInfo":"3434","cDSposInfo":""},{"id":"A","positionID":"G","chr":"G","pos":"1-1274242-A-G","refn":"0","altn":"0","qual":"594.400024414062","ac":"2","af":"2","ad":"","dp":"1","hz":"1/1","gt":"1","mq":"1","qd":"118_20","ca":"0","an":"2","sampleInfo_ID":"1","interptetation_ID":"1274242","altNum":"downstream_gene_variant","altTotalCount":"MODIFIER","allele":"TAS1R3","annotation":"TAS1R3","annotationImpact":"transcript","geneName":"NM_152228.1","geneID":"protein_coding","featureType":"","featureID":"c.*4398A>G","transcriptBioType":"","rank":"","hGVSc":"","hGVSp":"","cDNAposInfo":"4398","cDSposInfo":""},{"id":"G","positionID":"A","chr":"A","pos":"1-1275291-G-A","refn":"0","altn":"0","qual":"1099.40002441406","ac":"7","af":"8","ad":"","dp":"1","hz":"1/1","gt":"1","mq":"1","qd":"118_20","ca":"0","an":"3","sampleInfo_ID":"1","interptetation_ID":"1275291","altNum":"intron_variant","altTotalCount":"MODIFIER","allele":"DVL1","annotation":"DVL1","annotationImpact":"transcript","geneName":"XM_005244731.1","geneID":"protein_coding","featureType":"8/14","featureID":"c.910-99C>T","transcriptBioType":"","rank":"","hGVSc":"","hGVSp":"","cDNAposInfo":"","cDSposInfo":""},{"id":"G","positionID":"A","chr":"A","pos":"1-1276077-G-A","refn":"0","altn":"0","qual":"293.700012207031","ac":"2","af":"2","ad":"","dp":"1","hz":"1/1","gt":"1","mq":"1","qd":"118_20","ca":"0","an":"4","sampleInfo_ID":"1","interptetation_ID":"1276077","altNum":"intron_variant","altTotalCount":"MODIFIER","allele":"DVL1","annotation":"DVL1","annotationImpact":"transcript","geneName":"XM_005244731.1","geneID":"protein_coding","featureType":"5/14","featureID":"c.606-194C>T","transcriptBioType":"","rank":"","hGVSc":"","hGVSp":"","cDNAposInfo":"","cDSposInfo":""},{"id":"G","positionID":"GACAC","chr":"GACAC","pos":"1-1276973-G-GACAC","refn":"0","altn":"0","qual":"8878.2998046875","ac":"27","af":"27","ad":"","dp":"1","hz":"1/1","gt":"1","mq":"1","qd":"118_20","ca":"0","an":"5","sampleInfo_ID":"1","interptetation_ID":"1276973","altNum":"intron_variant","altTotalCount":"MODIFIER","allele":"DVL1","annotation":"DVL1","annotationImpact":"transcript","geneName":"XM_005244731.1","geneID":"protein_coding","featureType":"5/14","featureID":"c.605+70_605+73dupGTGT","transcriptBioType":"","rank":"","hGVSc":"","hGVSp":"","cDNAposInfo":"","cDSposInfo":""}]}

    ]#
