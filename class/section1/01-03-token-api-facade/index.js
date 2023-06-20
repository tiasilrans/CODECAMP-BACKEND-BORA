//퍼사드 패턴
function checkPhone(pNum) {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10자리~11자리)
    if(pNum.length < 10 || pNum.length > 11){
        console.log("님 폰 번호 몰 ? 루 ㅇ ? ㅅ ㅇ");
        return false;
    } else {
        return true;
    }
}

function getToken() {
    // 2. 인증번호 6자리 만들기
    const result = String(Math.floor(Math.random()* 1000000)).padStart(6, "0");
    console.log("결과다 뇨속아 = ㅅ =)~   " + result);
    return result;
}

function sendSms(pNum, result) {
    // 3. 문자전송
    console.log( pNum + "로 인증번호 " + result + "를 전송합니다.");
}


// ^ㅅ^)/ !!! \(^ㅂ^
function createTokenOfPhone (pNum) { 
    if(!checkPhone(pNum)) return
    const res = getToken();
    sendSms(pNum, res);
}

createTokenOfPhone("01011112222"); 