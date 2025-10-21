// hello.ts
function greet(name) {
    return "\uC548\uB155\uD558\uC138\uC694, ".concat(name, "\uB2D8!");
}
var message = greet("타입스크립트");
console.log(message);
// 타입 오류 예시 (주석 해제하면 오류 발생)
console.log(greet(123));
