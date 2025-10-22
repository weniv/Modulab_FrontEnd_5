// 구현하세요
interface State<T> {
  // 여기에 코드 작성
  value: T;
  setValue: (newValue: T) => void;
}

// 테스트
const countState: State<number> = {
  value: 0,
  setValue: (newValue) => console.log(newValue)
};

const nameState: State<string> = {
  value: 'Alice',
  setValue: (newValue) => console.log(newValue)
};