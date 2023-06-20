//const express = require('express')           commonJs방식
import express from 'express'                 //모듈방식
import {checkPhone, sendSms, getToken} from './phone.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'
import cors from 'cors'
import {checkEmail, createTempale, sendEmail} from './email.js'
import mongoose from 'mongoose'
import { Board } from './models/board.model.js'


const swaggerSpec = swaggerJsdoc(options);
const app = express()
app.use(express.json())
app.use(cors()) //허용
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/board', async function (req, res) {
    //1. 데이터 조회
    const result = await Board.find()


    //2. 결과 브라우저에 전송
  res.send(result)
})

app.post('/board', async function (req, res) {
    //1. 리퀘스트 내용 확인
    console.log(req)
    console.log("---------------------------")
    console.log(req.body)


    //2. DB에 저장
    const board = new Board({
      writer:req.body.writer,
      title:req.body.title,
      contents:req.body.contents
    })

    await board.save()

    //3. 결과 알림
    res.send('게시물 등록에 성공하였습니다.')
  })

app.post('/tokens/phone', function (req, res) {
    const pNum = req.body.pNum
    if(!checkPhone(pNum)) return
    const token = getToken();
    sendSms(pNum, token);
    //3. 결과 알림
    res.send('인증완료.')
  })

app.post("/users", function (req, res) {
    // const name = req.body.name
    // const age = req.body.age
    // const school = req.body.school
    // const email = req.body.email
    const {name, age, school, email} = req.body


    //1. 이메일 체크
    // 존재여부
    // @ 포함여부
    if(!checkEmail(email)) return

    //2. 가입환영 템플릿 만들기
    const tampalte = createTempale({name, age, school, email })

    //3. 템플릿 이메일 전송
    sendEmail(tampalte, email)

    res.send("가입완료됐다구")
})

mongoose.set("debug", true)

mongoose.connect("mongodb://database:27017/mydocker")
  .then(() => console.log("DB 접속에 성공하였습니다.")) 
  .catch(() => console.log("DB 접속에 성공하였습니다.")) 

app.listen(3000)