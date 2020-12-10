import httpclient
import json
import uri
import strformat
import strutils



proc apiCalls*(op: string, filters: string = "empty", query: string = "samples", backendhost: string): string =
    let client = newHttpClient()
    if op == "samples":
        let response = client.request(backendhost & "/api/availSamples",
                httpMethod = HttpGet)
        return response.body
    elif op == "columns":
        if query == "samples":
            let response = client.request(backendhost & "/api/columns/samples",
                    httpMethod = HttpGet)
            return response.body
        elif query == "variants":
            let response = client.request(backendhost & "/api/columns/variants",
                    httpMethod = HttpGet)
            return response.body
    elif op == "variants":
        let response = client.request(backendhost & "/api/variantswithinfo",
                httpMethod = HttpGet)
        return response.body
    elif op == "bam_url":
        let response = client.request(backendhost & "/api/bam/" & filters, httpMethod = HttpGet)
        return response.body
    elif op == "session_info":
        let response = client.request(backendhost & "/api/sessionInfo/" & filters, httpMethod = HttpGet)
        return response.body
    else:
        let response = client.request(backendhost & "/api/variants/" & op, httpMethod = HttpGet)
        return response.body

proc postInterpDataToBackend*(postData: JsonNode, backendhost: string): string =
    let body = postData
    let client = newHttpClient()
    client.headers = newHttpHeaders({"Content-Type": "application/json"})
    let response = client.request(backendhost & "/api/postintepret",
            httpMethod = HttpPost, body = $body)
    return response.status
