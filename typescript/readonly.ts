type Todo = {
    readonly key: string;
    name: string;
};
 
const todo: Todo = {
    key: "1",
    name: "할 일 1"
};
 
// todo.key = "2"; // 에러! 읽기 전용 속성이므로 재할당 불가
todo.name = "할 일 2"; // OK
console.log(todo);