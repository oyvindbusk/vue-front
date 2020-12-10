import httpclient
import json
import uri
import strformat
import strutils


let client = newHttpClient()
let response = client.request("http://localhost:5000/api/tables", httpMethod = HttpGet)
echo parseJson(response.body).type

# Proc to check if column name is numeric or string-based:
proc checkcol*(col: string, fieldTable: JsonNode): string =
  try:
    case fieldTable[col].getStr():
      of "VARCHAR(255)":
        return "string"
      of "FLOAT", "INTEGER":
        return "numeric"
      else:
        return "Unknown type"
  except KeyError:
    echo "The field is not in any of the tables!"
echo checkcol("chr", parseJson(response.body))