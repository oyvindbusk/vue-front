#! /usr/bin/sh
docker build --rm -t vb_front . 

#EXTRAOPTS="--security-opt label=disable" # usefull option if you use podman instead of docker
#docker run -p 5001:5001 --rm $EXTRAOPTS vb_front sh -c \"vb_frontend newdb && vb_frontend newuser u:Admin p:Pass e:email@email.com && vb_frontend\"
