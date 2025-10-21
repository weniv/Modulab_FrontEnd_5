const numArr: number[] = [1, 2, 3];
const strArr: string[] = ['1', '2', '3'];

const arr1: (number | string)[] = ['1', 3]
const arr2: Array<number|string|boolean> = [1, '2', 3];

type User = {
    name: string;
    age: number;
}

const num: number = 10;
const numArr2 = [1, 2, 3];
const strArr2 = ['a', 'b', 'c'];
const boolArr = [true, false, true];
const objArr: User[] = [{ name: 'licat', age: 20 }, { name: 'cat', age: 30 }];
const arrArr = [[1, 2], [3, 4], [5, 6]];
const mixArr = [1, 2, 3, 'a', 'b', 'c'];