import axios from "axios"
import cheerio from "cheerio"

const createMessage = async () => {
    //1. 입력된 메시지에 url 주소가 있는지 찾기
    const url = "https://www.naver.com"
    //2. 해당 주소로 스크래핑
    const result = await axios.get(url)
    //3.cheerio 오픈그래프 코드 골라내서 변수에 담기
    const $ = cheerio.load(result.data)
    $("meta").each((index, el) => {
        if($(el).attr("property") && $(el).attr("property").includes("og:")) {
            const key = $(el).attr("property")
            const value = $(el).attr("content")
            console.log(key, value)
        }
    })
}

createMessage()