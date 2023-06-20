//const express = require('express')           commonJs방식
import express from 'express'                 //모듈방식

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)