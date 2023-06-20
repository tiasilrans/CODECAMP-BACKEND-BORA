import {checkEmail, createTempale, sendEmail} from './email.js'

function createUser({name, age, school, email }) {
    //1. 이메일 체크
    // 존재여부
    // @ 포함여부
    if(!checkEmail(email)) return

    //2. 가입환영 템플릿 만들기
    const tampalte = createTempale({name, age, school, email })

    //3. 템플릿 이메일 전송
    sendEmail(tampalte, email)
}

const name = "뀨잉"
const age = 12
const school = "흑염룡초등학교"
const email = "test@test.com"


createUser({name, age, school, email })
