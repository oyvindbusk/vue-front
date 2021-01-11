# vue-front
sandbox vue frontend with login, navbar and vuex

### When switching from MB @ home to Centos servere @ Work:
* Switch vb_tool_test.conf in backend - switch from localhost to http://172.16.0.3 on line 2 & 8
* ### DEPRECATED when using varbrowser   Switch from localhost to 172.16.0.3 in line 428 + 411 in vb_frontend.nim
* Line 5 in config.js localhost <=> 172.16.0.3
* Line 39 in config.nim
* Line 23 in vb_test_tool.conf
* Edit line 48 in src/backendpkg/config.nim cfg.minio_host   = "0.0.0.0:9000" => 172.16.0.3
* Remove old data:
```sh
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker volume rm $(docker volume ls -q)

```

* Spin up docker containers (from path = ./backend)
```sh
docker run \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_USER=user \
-e POSTGRES_DB=variants \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v $PWD/db/postgres/data/pgdata/:/var/lib/postgresql/data/pgdata \
-p 5432:5432 \
-d --name=postgresdb \
postgres

docker run -p 9000:9000 --name minio -d \
-e "MINIO_ACCESS_KEY=minioadmin" \
-e "MINIO_SECRET_KEY=minioadmin" \
-v $PWD/testfiles:/variants \
minio/minio server /variants
docker exec -ti minio mkdir /data/variants
```
* Build backend
```sh
nimble build
```
* spin up frontend (from path = frontend)
```sh
npm run serve
```
* Add users db and add admin
```sh
./vb_server --newdb
./vb_server --newuser u:Admin p:Pass e:email@email.com
```
* Init variant db and add test data
```sh
./vb_tool --initsamplesdb
./vb_tool --initannotdb
./vb_tool -v=testfiles/7_50.gnomAD.clinvar.snpEff.phenotype.vcf --samples --sample_id=7_50 --phenotypes --snpeff --clinvar --gnomad --bam=./testfiles/bams/7_50_recal_subset.bam --vcf=./testfiles/7_50.gnomAD.clinvar.snpEff.phenotype.vcf
./vb_tool -v=testfiles/8_50.gnomAD.clinvar.snpEff.phenotype.vcf --samples --sample_id=8_50 --phenotypes --snpeff --clinvar --gnomad --bam=./testfiles/bams/8_50_recal_subset.bam --vcf=./testfiles/8_50.gnomAD.clinvar.snpEff.phenotype.vcf
```
# Start server:
```sh
./vb_server
```


```sh
```

### OBS !! 
* Remember to add route to the login route to rereoute back to home


# TO install package igv or igv-vue:
# npm using https for git
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://

# npm using git for https
git config --global url."git@github.com:".insteadOf https://github.com/
git config --global url."git://".insteadOf https://

# Revert 
git config --global --unset-all url.https://github.com/.insteadof
git config --global --unset-all url.https://.insteadof