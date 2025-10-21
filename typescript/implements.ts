interface Vehicle {
  start(): void;
  stop(): void;
}
 
// Car 클래스는 Vehicle 인터페이스를 구현해야 함
class Car implements Vehicle {
  start() {
    console.log("차가 출발합니다");
  }
  
  // stop 메서드를 구현하지 않으면 에러 발생!
  // 에러: 'Car' 클래스가 'Vehicle' 인터페이스를 
  // 올바르게 구현하지 않았습니다.
  // 'stop' 속성이 'Car' 형식에 없습니다.

  stop() {
    console.log("차가 멈춥니다")
  }
}