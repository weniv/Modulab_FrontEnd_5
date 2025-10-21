//interface 병합
interface Car {
    model: string;
    engine: string;
}

interface Car {
    color: string;
}

const newCar: Car = {
    model: 'avante',
    engine: '',
    color: 'red'
};

//type 병합1
type Car_ = {
    model: string;
    engine: string;
}

type Car2 = {
    color: 'string';
}

type NewType = Car_ & Car2

// type 병합2
type Animal = {
  name: string;
}
type Bear = Animal & {honey: boolean;}