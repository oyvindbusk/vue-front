import hmac, base64, uri, times, json


var
  sampleInfo_ID = "7_50"
  fileType = @["bam","bai"]
  expire = $toUnix(getTime() + 3.hours)
  key = "minioadmin"
  user = "minioadmin"
  host = "http://172.16.0.3:9000"
  signed_urls = %* {"bai": "", "bai": ""}

for f in fileType:
  var
    sts = "GET\n\n\n" & expire & "\n/variants/" & sampleInfo_ID & "/" & f
    path = "/variants/" & sampleInfo_ID & "/" & f & "?"
    sign = encodeUrl(encode(hmac_sha1(key, sts)))
    signed_path: string = host & path & "?response-expires=1970-01-01T00%3A00%3A00Z&AWSAccessKeyId=" & user & "&Expires=" & expire & "&Signature=" & sign
  
  signed_urls[f] = %* signed_path
  
  
echo signed_urls




#j2["details"] = %* {"age":35, "pi":3.1415}
