// 구현하세요
interface ApiResponse<T> {
  // 여기에 코드 작성
  success: boolean;
  data: T;
  error?: string;
}

// 테스트
const userResponse: ApiResponse<{ id: number; name: string }> = {
  success: true,
  data: { id: 1, name: 'John' }
};