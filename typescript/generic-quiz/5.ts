// 구현하세요
class Box<T> {
  // 여기에 코드 작성
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

// 테스트
const numberBox = new Box<number>();
numberBox.add(1);
numberBox.add(2);
console.log(numberBox.getAll()); // [1, 2]