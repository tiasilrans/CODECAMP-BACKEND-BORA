import {getToday} from './utils.js'
import nodemailer from 'nodemailer'


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


export async function sendEmail(tampalte, email) {
    const EMAIL_USER = "tiasilrans@gmail.com"
	const EMAIL_PASS = "pffjrwyliampprlw"
	const EMAIL_SENDER = "tiasilrans@gmail.com"
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : EMAIL_USER,
            pass : EMAIL_PASS
        }
    })

    await transporter.sendMail({
        from : EMAIL_SENDER,
        to : email,
        subject : "[뀨잉이 월드] 가입을 환영한다 ㅇㅅㅇ)/",
        html : tampalte
    })

    // console.log(`${email}로 아래 내용을 보냄 
    
    // - 아 래 -
    
    // ${tampalte}`)
}