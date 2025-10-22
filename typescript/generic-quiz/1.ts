// 구현하세요
function getFirst<T>(arr: T[]): T | undefined {
  // 여기에 코드 작성
    // return arr[0];
    return arr.length > 0 ? arr[0] : undefined;
}

// 테스트
const firstNum = getFirst([1, 2, 3]); // 타입: number | undefined
const firstStr = getFirst(['a', 'b']); // 타입: string | undefined