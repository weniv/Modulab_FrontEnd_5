describe(
    '텍스트 관리자 클래스 테스트입니다.', () => {
        const textManager = new TextManager();

        it('택스트 값을 반환합니다.', () => {
            const result = textManager.getValue();
            expect(textManager.getValue()).toBe(result);
        });

        it('텍스트 값을 업데이트합니다.', () => {
            textManager.setValue({ data: 'hello zebras' });
            expect(textManager.getValue()).toBe('hello zebras')
        });
    }
);