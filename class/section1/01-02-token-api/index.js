// ㅇㅅㅇ~~~
// function createTokenOfPhone (pNum) { //매개변수 파라미터
//     // 1. 휴대폰번호 자릿수 맞는지 확인하기(10자리~11자리)
//     if(pNum.length >= 10){
//         if(pNum.length <= 11){

//             // 2. 인증번호 6자리 만들기
//             const result = String(Math.floor(Math.random()* 1000000)).padStart(6, "0");
//             console.log("결과다 뇨속아 = ㅅ =)~   " + result);
//             // 3. 전송하기
//         } else {
//             console.log("ㅇㅅㅇ");

//         }

//     } else {
//         console.log("ㅇㅅㅇ");

//     }

// }



// ^ㅅ^)/ !!!
function createTokenOfPhone (pNum) { 
    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10자리~11자리)
    if(pNum.length < 10 || pNum.length > 11){
        console.log("님 폰 번호 몰 ? 루 ㅇ ? ㅅ ㅇ");
        return
    }
        // 2. 인증번호 6자리 만들기
        const result = String(Math.floor(Math.random()* 1000000)).padStart(6, "0");
        console.log("결과다 뇨속아 = ㅅ =)~   " + result);


}

createTokenOfPhone("010111"); 