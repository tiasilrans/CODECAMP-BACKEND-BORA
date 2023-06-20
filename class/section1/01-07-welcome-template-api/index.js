function checkEmail(email) {
    if (email === undefined || email.includes("@") === false) {
        console.log(`${email}은 비정상적인 Email이다옹`)
        return false
    } else {
        console.log(`${email}은 정상적인 Email이다옹`)
        return true
    }
    
    
}

function createTempale({name, age, school, email, date}) {
    const mytemplate = `
                            <html>
                                <body>
                                    <h1>${name}님 가입을 격하게 환영한다제 ㅇㅅ<)/!!!</h1>
                                    <hr />
                                    <div>name : ${name}</div>
                                    <div>age : ${age}</div>
                                    <div>school : ${school}</div>
                                    <div>email : ${email}</div>
                                    <div>join date : ${date}</div>
                                </body>
                            </html>
                        
                        `

    console.log(mytemplate)
    return mytemplate
}


function sendEmail(tampalte, email) {
    console.log(`${email}로 아래 내용을 보냄 
    
    - 아 래 -
    
    ${tampalte}`)
}

function createUser({name, age, school, email, date}) {
    //1. 이메일 체크
    // 존재여부
    // @ 포함여부
    if(!checkEmail(email)) return

    //2. 가입환영 템플릿 만들기
    const tampalte = createTempale({name, age, school, email, date})

    //3. 템플릿 이메일 전송
    sendEmail(tampalte, email)
}

const name = "뀨잉"
const age = 12
const school = "흑염룡초등학교"
const email = "test@test.com"
const date = new Date().toLocaleString()


createUser({name, age, school, email, date})
