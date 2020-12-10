import tables
import sequtils
import ../../backend/src/backendpkg/submodule
import ../../backend/src/queries/queries



# Define variables:
var AD: seq[Filter]
var AR: seq[Filter]

# Add filters AD:
AD.add(Filter(column: "chr", ops: "Equal to", value: "1", keepIfMiss: true))
AD.add(Filter(column: "refn", ops: "Equal to", value: "A", keepIfMiss: true))
AD.add(Filter(column: "pos", ops: "Equal to", value: "1273278",
        keepIfMiss: true))

# Add filters AR:
AR.add(Filter(column: "chr", ops: "Equal to", value: "2", keepIfMiss: true))
AR.add(Filter(column: "refn", ops: "Equal to", value: "G", keepIfMiss: true))

var filterChain_1 = {"AR": AR, "AD": AD}.toTable
echo filterChain_1.type
# Path to db:
let dbName = "../../backend/mytest.db"


# Adds a string to a seq. Used to add AD, AR or ADAR to queryResult
proc addStr(s: seq[string], str: string): seq[string] =
    var s_mod = s
    s_mod.add(str)
    return s_mod

# Query and get variants from db:
var filtered_variants_ori = variantQuery(dbName, "118_20")
var filtered_variants_processed: seq[Row]
var filtered_variants: seq[Row]

for key, filters in filterChain_1:
    
    filtered_variants = filtered_variants_ori
    for filter in filters:
        filtered_variants = filterRows(filtered_variants, filter, dbName)
    # Add extra col:
    var filtered_variants_addCols = filtered_variants.mapIt(addStr(it, key))
    filtered_variants_processed.add(filtered_variants_addCols)


# Get column number of gene names and gt
var querynames = getQueryNames()

# Filters a seq of seq of string contains a specific str on a specified column, returning the filtered seq of seq
proc filterSeq(s: seq[seq[string]], colNum: int, strinG: string): seq[seq[string]] =
    return filter(s, proc(x: seq[string]): bool =
        x[colNum] == strinG)
    

## Filters a seq of seq of string contains a specific str from a seq of strings on a specified column, returning the filtered seq of seq
proc filterSeqWithSeq(s: seq[seq[string]], colNum: int, filterSeq: seq[string]): seq[seq[string]] =
    return filter(s, proc(x: seq[string]): bool =
        filterSeq.contains(x[colNum]))
    

# duplicated: Returns a list of duplicated items from a seq[string]
proc duplicated(list: seq[string]): seq[string] = 
    return deduplicate(filter(list, proc (x: string): bool =
        count(list, x) > 1))
    


# Filters a seq[seq[string]] and returns those with more than one variant in one gene 
proc filterCompHet(s: seq[seq[string]], geneNameColNum: int): seq[seq[string]] =
    var geneList: seq[string] = map(s, proc(x: seq[string]): string = x[geneNameColNum])
    var duplist = duplicated(geneList)
    return filter(s, proc(x: seq[string]): bool = 
        duplist.contains(x[geneNameColNum]))
    
echo len(filtered_variants_processed),"--"

# Get those with AR
var filtered_variants_processed_AR = filterSeq(filtered_variants_processed, len(querynames), "AR")

# Get varaiants in genes where there are more than one variant
var comphetVars = filterCompHet(filtered_variants_processed_AR, find(querynames, "geneName"))

# Get the homozygotes:
var homVars = filterSeq(filtered_variants_processed_AR, find(querynames, "gt"), "1/1")

# Get list of all positionIDs from both comphetVars and homVars:
var positionIDs: seq[string] = map(comphetVars, proc(x: seq[string]): string = x[find(querynames,"positionID")])
positionIDs = concat(positionIDs, map(homVars, proc(x: seq[string]): string = x[find(querynames,"positionID")]))

# Combine homVars and Comphets - first removing duplicates 
# Remove the duplicated posids from comphetvars
var filtered_variants_processed_finito: seq[seq[string]] = filterSeqWithSeq(comphetVars, find(querynames,"positionID"), duplicated(positionIDs))

# Finally, add homvars
for i in homVars: filtered_variants_processed_finito.add(i)

#then, add in the AD-variants
for i in filterSeq(filtered_variants_processed, len(querynames), "AD"): filtered_variants_processed_finito.add(i)

echo len(filtered_variants_processed_finito),"--"






