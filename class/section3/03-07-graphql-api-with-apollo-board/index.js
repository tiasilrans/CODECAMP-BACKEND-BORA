import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'

const typeDefs = `#graphql
    type myResultType {
        number : Int
        writer : String
        title : String
        contents : String
    }

    input createBoardInput {
        writer : String
        title : String
        contents : String
    }

    type Query {
        fetchBoard : [myResultType] #배열 안에 객체 1개 이상을 의미
    }

    type Mutation {
        # createBoard(writer : String, title : String,  contents : String) : String
        createBoard(createBoardInput : createBoardInput!) : String
    }

`
const resolvers = {
    Query : {
        fetchBoard : (parent, args, context, info) =>{
            //1. 데이터 조회
            const result = [
             {num:1, writer:"뀨잉", title:"이 몸 강 림", contents:"뀨하하하하하하!!"}
            ,{num:2, writer:"뀨잉", title:"이 몸 강 림 ☆", contents:"뀨하하하하하하!!"}
            ,{num:3, writer:"뀨잉", title:"★ 이 몸 강 림 ☆", contents:"뀨하하하하하하!!"}

            ]
            //2. 결과 브라우저에 전송
            return result
        }
    },

    Mutation : {
        createBoard : (_, args) => {
            //1. 리퀘스트 내용 확인
            console.log(args.createBoardInput.writer)
            console.log(args.createBoardInput.title)
            console.log(args.createBoardInput.contents)
            //2. DB에 저장
            //3. 결과 알림
            return "게시물 등록에 성공하였습니다."
        }
    }
}

const server = new ApolloServer({
    typeDefs : typeDefs, 
    resolvers : resolvers,
    cors : true // 모든 사이트 허용
    //cors : {origin : {"https://www.naver.com" , "https://www.daum.net"}} //특정사이트 지정
})

startStandaloneServer(server)