// 구현하세요
interface Pair<K, V> {
  // 여기에 코드 작성
  key: K,
  value: V
}

// 테스트
const pair1: Pair<string, number> = { key: 'age', value: 25 };
const pair2: Pair<number, string> = { key: 1, value: 'first' };