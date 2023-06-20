//구조분해할당 이해 예제
const profile = {
    name : "뀨잉",
    age : 200,
    school : "666초등학교"

}

const {name, age, school} = profile
console.log(name)
console.log(age)
console.log(school)

//1. 일반 변수 전달하기
// function send (mate) {
//     console.log(mate)

// }

// send("사과")

// 2. 객체 전달하기
// function send (mate) {
//     console.log(mate)
//     console.log(mate.apple)
//     console.log(mate.banana)
// }

// send({
//     apple : 3,
//     banana : 10

// })

//3. 구조분해할당 방식으로 객체 전달하기 
function send ({apple, banana}) { //구조분해할당
    console.log(apple)
    console.log(banana)
}

send({
    apple : 3,
    banana : 10

}) //숏핸드 프로퍼티

