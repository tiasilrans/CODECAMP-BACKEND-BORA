//const express = require('express')           commonJs방식
import express from 'express'                 //모듈방식
import {checkPhone, sendSms, getToken} from './phone.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'

const swaggerSpec = swaggerJsdoc(options);
const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/board', function (req, res) {
    //1. 데이터 조회
    const result = [
         {num:1, writer:"뀨잉", title:"이 몸 강 림", contents:"뀨하하하하하하!!"}
        ,{num:2, writer:"뀨잉", title:"이 몸 강 림 ☆", contents:"뀨하하하하하하!!"}
        ,{num:3, writer:"뀨잉", title:"★ 이 몸 강 림 ☆", contents:"뀨하하하하하하!!"}

    ]
    //2. 결과 브라우저에 전송
  res.send(result)
})

app.post('/board', function (req, res) {
    //1. 리퀘스트 내용 확인
    console.log(req)
    console.log("------------------------------------")
    console.log(req.body)
    //2. DB에 저장
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




app.listen(3000)