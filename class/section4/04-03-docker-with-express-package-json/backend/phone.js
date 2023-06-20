//yarn add coolsms-node-sdk
//yarn add dotenv

import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'


const mySms = coolsms.default

export function checkPhone(pNum) {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10자리~11자리)
    if(pNum.length < 10 || pNum.length > 11){
        console.log("님 폰 번호 몰 ? 루 ㅇ ? ㅅ ㅇ");
        return false;
    } else {
        return true;
    }
}

export function getToken() {
    // 2. 인증번호 6자리 만들기
    const result = String(Math.floor(Math.random()* 1000000)).padStart(6, "0");
    console.log("결과다 뇨속아 = ㅅ =)~   " + result);
    return result;
}

export async function sendSms(pNum, result) {
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const messageService = new mySms(SMS_KEY, SMS_SECRET)
    const res = await messageService.sendOne({
        to : pNum,
        from : SMS_SENDER,
        text : `[뀨잉이 월드] 하잉하잉 ㅇㅅㅇ 
                요청한 인증번호는 ${result} 야.
                칠칠치 못하게 잊지마~ ㅇㅅㅇ~
                `

    })
    // 3. 문자전송
    //console.log( pNum + "로 인증번호 " + result + "를 전송합니다.");
    console.log(res)
}
