type Author = {
    name: string;
    age: number;
    password: string;
    birth: string;
    phone: string;
    email: string;
}

type Notice = {
    title: string;
    content: string;
    author: Pick<Author, 'name'>;
    // author: Omit<Author, 'name'>;
}
 
const notice: Notice = {
    title: '공지사항',
    content: '내용',
    author: {
        name: 'licat'
    }
}
 
console.log(notice);

// partial type
type PartialAuthor = Partial<Author>;

// pick type
type PickAuthor = Pick<Author, 'name' | 'age'>;

// omit type
type OmitAuthor = Omit<Author, 'age' | 'password' | 'birth' | 'phone' | 'email'>;
 
const author: PartialAuthor = {
    name: 'licat',
    age: 30
}
const authorEmpty: PartialAuthor = {};

const pickedAuthor: PickAuthor = {
    name: 'sunryeo',
    age: 99,
}

const omitAuthor: OmitAuthor = {
    name: 'sunny'
} 
 
console.log(author);
console.log(authorEmpty);