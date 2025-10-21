// hello.ts
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}
 
const message = greet("타입스크립트");
console.log(message);
 
// 타입 오류 예시 (주석 해제하면 오류 발생)
console.log(greet(123));