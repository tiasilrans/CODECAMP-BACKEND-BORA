# 0. 운영체제 및 프로그램 설치하기 (각각 설치)
# FROM ubuntu:22.04
# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치하기 (올인원팩)
FROM node:14
# 2. 폴더 만들기
RUN mkdir myfolder
# 3. 내 컴 파일을 도커 컴으로 복사
COPY ./index.js /myfolder/index.js
RUN cd myfolder
# 4. 도커에서 index.js 실행하기
# RUN node index.js
CMD node /myfolder/index.js