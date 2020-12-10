import httpClient, json

let client = newHttpClient()
let response = client.request("http://localhost:5000/api/queries/", httpMethod = HttpGet)

echo response.body

