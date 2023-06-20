import {getToday} from './utils.js'

export function checkEmail(email) {
    if (email === undefined || email.includes("@") === false) {
        console.log(`${email}은 비정상적인 Email이다옹`)
        return false
    } else {
        console.log(`${email}은 정상적인 Email이다옹`)
        return true
    }
    
    
}

export function createTempale({name, age, school, email}) {
    const mytemplate = `
                            <html>
                                <body>
                                    <h1>${name}님 가입을 격하게 환영한다제 ㅇㅅ<)/!!!</h1>
                                    <hr />
                                    <div>name : ${name}</div>
                                    <div>age : ${age}</div>
                                    <div>school : ${school}</div>
                                    <div>email : ${email}</div>
                                    <div>join date : ${getToday()}</div>
                                </body>
                            </html>
                        
                        `

    console.log(mytemplate)
    return mytemplate
}


export function sendEmail(tampalte, email) {
    console.log(`${email}로 아래 내용을 보냄 
    
    - 아 래 -
    
    ${tampalte}`)
}