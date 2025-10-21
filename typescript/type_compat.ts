type Person = {
    name: string;
    age: number;
};
 
type Developer = {
    name: string;
    age: number;
    skills: string[];
};
 
let person_: Person = { name: "김철수", age: 20 };
let developer: Developer = { name: "김영희", age: 25, skills: ["JavaScript", "TypeScript"] };
 
person_ = developer; // OK
// developer = person_; // 에러
console.log(person);