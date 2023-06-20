// 1. 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

// 2. any타입(자바스크립트랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); //any는 아무거나 다 돼
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", 123, true);

// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 == "number") {
    console.log(arg1 + 100);
  }
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", 123, true);

// 4. generic 타입
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric<string, number, boolean>("철수", 123, true);

// 5. generic 타입 2
const getGeneric2 = <MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] => {
  return [arg3, arg2, arg1];
};

const result5 = getGeneric2<string, number, boolean>("철수", 123, true);
