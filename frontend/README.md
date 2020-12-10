# Frontend of filtering app for ngs-data from vcf-files

Stealing heavily from:
    https://ttj.dk/blog/2019/01/20/setup-a-website-with-nim

Using the following as inspiration:
    https://github.com/moigagoo/norm-sample-webapp/blob/develop/README.md
    https://ttj.dk/blog/2019/01/20/setup-a-website-with-nim
    https://www.eoleary.me/blog/create-a-webapp/
    https://github.com/h3rald/litestore
    https://github.com/nim-lang/Nim/wiki/Tutorial:-Creating-a-(micro)-service

```sh
  # Compile
  nimble install
  nimble build
  # OR:
  nim c main.nim
  nim c --run main.nim

  # Generate user database (not variant database, that is created in the backend)
  ./main newdb

  # Add admin user
  ./main newuser u:Admin p:Pass e:email@email.com

  # When running from docker:
  docker exec vb_frontend -c "./main newuser u:Admin p:Pass e:email@email.com" (!test!)
  # Run
  ./main
```

# TODO:
## Before demo:

## Today:
- [ ] Fix query for comments in the interps. select distinct needed.
- [ ] Fix Previous comments:
- [ ] Fix Previous classes:
- [ ] Add the filters that are used to the report
- [ ] Add variant data to the report
## Not high priority:
- [ ] Add a plot on the frontpage as an example
- [ ] The user sent by vue on the variants-view are gotten from a hidden div, this is suboptimal. Find way of getting directly
- [ ] Make options for setting regionfilters from bedfile


Run the app using Docker Compose (add --build to rebuild existing):
```sh
  docker-compose up
```

-   Up at:

        $ http localhost:5001/api/variants/

### OBS HTML template -> must escape $, or crash will happen

### How to add variants into backend db:
```sh
cd backend
echo "Cleanup\n--------------------"
rm mytest.db
rm ./vb_tool

echo "\nCompile\n--------------------"
nimble build

echo "\nInit sample db\n--------------------"
./vb_tool --initsamplesdb

echo "\n Init Annotation db\n--------------------"
./vb_tool --initannotdb

echo "\n Input the two skjelett testfiles\n--------------------"
./vb_tool -v=testfiles/cftr.vcf.gz -s
./vb_tool -v=testfiles/1000_gtest.vcf.gz -s
./vb_tool -v=testfiles/cftr-snpEff-vep-clinvar-gnomad.vcf.gz --snpeff

```
### Add to library htslib:
```sh
LD_LIBRARY_PATH=/usr/local/bin/lib/
export LD_LIBRARY_PATH
```
### remove and rebuild:

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -f dangling=true -q)
docker rmi vb_frontend vb_backend minio/minio postgres
rm -rf ./backend/db/*
docker-compose up --build

### Restart manually for testing:
docker run \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_USER=user \
-e POSTGRES_DB=variants \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v $PWD/backend/db/postgres/data/pgdata/:/var/lib/postgresql/data/pgdata \
-p 5432:5432 \
-d --name=postgresdb \
postgres

docker run -p 9000:9000 --name minio -d \
-e "MINIO_ACCESS_KEY=minioadmin" \
-e "MINIO_SECRET_KEY=minioadmin" \
-v $PWD/backend/testfiles:/variants \
minio/minio server /variants
docker exec -ti minio mkdir /data/variants

cd backend;nimble build
./vb_tool --conf=vb_tool_test.conf --initsamplesdb
./vb_tool --conf=vb_tool_test.conf --initannotdb
./vb_tool --conf=vb_tool_test.conf --vcf=testfiles/6_50.gnomAD.clinvar.snpEff.phenotype.vcf --samples --sample_id=6_50 --phenotypes --snpeff --clinvar --gnomad --bam=testfiles/bams/6_50_recal_subset.bam
./vb_tool --conf=vb_tool_test.conf --vcf=testfiles/7_50.gnomAD.clinvar.snpEff.phenotype.vcf --samples --sample_id=7_50 --phenotypes --snpeff --clinvar --gnomad --bam=testfiles/bams/7_50_recal_subset.bam
./vb_server --conf=vb_tool_test.conf

vb_frontend newdb && vb_frontend newuser u:Admin p:Pass e:email@email.com && vb_frontend


### Example queries to use to check postgres db:
Get all unique sample names:
SELECT distinct(sampleInfo_ID) FROM samples

