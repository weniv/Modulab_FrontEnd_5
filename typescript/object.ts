// 방법 1: 인터페이스 사용
interface Person {
    name: string;
    age: number;
}
 
const person: Person = {
    name: "licat",
    age: 20
};
 
// 방법 2: 타입 별칭 사용
type User = {
    name: string;
    age: number;
};
 
const user: User = {
    name: "licat",
    age: 20
};
 
// 방법 3: 인라인 타입 정의
const employee: {
    name: string;
    age: number;
} = {
    name: "licat",
    age: 20,
};