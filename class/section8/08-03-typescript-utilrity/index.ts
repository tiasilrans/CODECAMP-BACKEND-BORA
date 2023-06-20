interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

//1. Partial 타입
type aaa = Partial<IProfile>;

//2. Required 타입
type bbb = Required<IProfile>;

//3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">;

//4. Omit 타입
type ddd = Omit<IProfile, "school">;

//5. Record 타입
type eee = "철수" | "영희" | "훈이"; //union 타입
let child1: eee = "영희"; // 철수, 영희, 훈이만 돼
let child2: string = "사과"; // 문자열이면 돼

type fff = Record<eee, IProfile>; //레코드 타입

//6. 객체로 유니온 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myProfile: ggg = "age";

//7. 타입과 인터페이스의 차이
//   인터페이스틑 선업병합 가능
interface IProfile {
  candy: number; //선업병합으로 추가됨
}

let profile: Partial<IProfile> = {
  candy: 10,
};
