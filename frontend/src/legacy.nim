## STORAGE FOR DEPRECATED CODE


proc genQueryString*(j: JsonNode): string =
    # Take the filter json and return a encoded string for the query string in the http get request
    var qstr = {"columns": fmt"""{j["columns"]}""", "ops": fmt"""{j["ops"]}""",
            "text": fmt"""{j["text"]}""", "check": fmt"""{j["check"]}"""}
    var encodedString = encodeQuery(qstr)
    return encodedString