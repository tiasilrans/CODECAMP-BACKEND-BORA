//yarn init
//yarn add axios
//yarn install
import axios from "axios"

//1. 비동기 방식
function fetchAsync(){
const result = axios.get("https://koreanjson.com/posts/1")
console.log("비동기방식 :  ", result) //Promise{<pending>}
}

fetchAsync()

//2. 동기 방식
// async function fetchSync(){   -> 함수 중복선언 피하기위해서 화살표 함수로 변경
//     const result = await axios.get("https://koreanjson.com/posts/1")
    
//     console.log("동기방식 :  ", result) //제대로된 결과
//     console.log("동기방식 :  ", result.data.title)
// }


const fetchSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1")
    
    console.log("동기방식 :  ", result) //제대로된 결과
    console.log("동기방식 :  ", result.data.title)
}

fetchSync()