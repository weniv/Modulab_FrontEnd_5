
// 테스트 유닛들의 묶음
describe('자스민 테스트입니다.', () => {

    const num = 10;

    // 함수의 테스트 메서드입니다.
    it('1을 더하는 함수입니다.', () => {
        expect(plusOne(num)).toBe(num + 1);
    });

});