#!/bin/bash
repo="https://gitee.com/feiyyx/blog.git"
local="/home/service"
blogpath="/home/service/blog"

# get latest blog files.
cd $local
rm -rf "blog"
git clone $repo

# update auto.sh
cd "./blog/shell"
cp -f "./auto_build.sh" "/home/service/auto.sh"

# docker build and run
cd "../"
docker build -t node/blog .
docker stop blog
docker rm blog
docker run -d --name blog -p 80:7001 node/blog