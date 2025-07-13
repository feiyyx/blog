FROM node:18

# 创建app目录
RUN mkdir -p /data/demo
# 设置工作目录
WORKDIR /data/demo

# 拷贝所有源代码到工作目录
COPY . /data/demo

# 切换到static目录，下载并打包前端文件
WORKDIR /data/demo/static
# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org
RUN npm run build

# 切换到server目录，编译ts文件
WORKDIR /data/demo/server
# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org
RUN npm run build

# 暴露容器端口(根据需求依此添加)
EXPOSE 20208
# 启动node应用
CMD npm start
