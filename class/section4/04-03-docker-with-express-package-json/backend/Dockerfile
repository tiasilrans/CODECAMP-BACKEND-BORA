# 0. 운영체제 및 프로그램 설치하기 (각각 설치)
# FROM ubuntu:22.04
# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치하기 (올인원팩)
FROM node:14
# 2. 폴더 만들기
RUN mkdir myfolder
# 3. 내 컴 파일을 도커 컴으로 복사
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
# RUN cd ./myfolder/
# 커서 위치 조정
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/


# 4. 도커에서 실행하기
# RUN node index.js
CMD yarn start

# 5. 실행하기
# docker build .
# docker images
# docker run -p 2500:3000 28486002d1f0

# 6. 도커 끄기
# docker ps
# docker stop c2883d00c3bc

# 7. 도커 삭제
# docker ps -a
# docker rm 컨테이너 ID - 하나씩 삭제
# docker ps -a -q 모든 컨테이너 ID 불러오기
# docker rm `docker ps -a -q` 한번에 삭제

# 8. 도커 이미지 삭제
# docker rmi 이미지 ID
# docker rmi `docker images -q`

# 9. 도커와 이미지 한번에 삭제(실행중인 건 삭제 안됨)
# docker system prune -a 
