import json
import ../src/api_utils

var z = parseJson(apiCalls("columns"))


var querystring: seq[string]
echo len(z)
echo pretty(z)

for i in 0..len(z)-1:
    querystring.add(z[$i].getStr()) 

echo querystring