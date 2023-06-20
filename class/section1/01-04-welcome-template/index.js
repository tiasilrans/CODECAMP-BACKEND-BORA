function getWelcomeTempalte({name, age, school, date}){
    const mytemplate = `
                            <html>
                                <body>
                                    <h1>${name}님 가입을 격하게 환영한다제 ㅇㅅ<)/!!!</h1>
                                    <hr />
                                    <div>name : ${name}</div>
                                    <div>age : ${age}</div>
                                    <div>school : ${school}</div>
                                    <div>join date : ${date}</div>
                                </body>
                            </html>
                        
                        `

    console.log(mytemplate)

}
const name = "뀨잉"
const age = "12"
const school = "흑염룡초등학교"
const date = "2023-05-20"
getWelcomeTempalte({name, age, school, date});