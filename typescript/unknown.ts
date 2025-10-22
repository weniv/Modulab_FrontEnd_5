let vAny: any = 10;          
let vUnknown: unknown = 10; 
 
let s1: string = vAny;     
let s2: string = vUnknown;

let value: unknown;

value = "hello";
 
// 타입 검사 없이 사용 불가
// console.log(value.length); // 에러!
 
// 타입 검사 후 사용 가능
if (typeof value === "string") {
    console.log(value.length); // 정상 동작
}

let v2: any;
v2 = "hello";

console.log(v2.length)