describe('뷰매니저 클래스 테스트입니다.', () => {
    it('viewManager 를 만들 때 textManager 가 잘 전달되는지 확인합니다.', () => {

        const textManager = null;
        const viewrEl = document.createElement('strong');
        const inpTxt = document.createElement('input');
        const btnEl = document.createElement('button');

        const actual = () => new ViewManager(textManager, { btnEl, inpTxt, viewrEl });

        expect(actual).toThrowError();
    });

    it('viewManager 를 만들 때 필요한 요소들이 잘 전달되는지 확인합니다.', () => {

        const textManager = new TextManager();
        const viewrEl = null;
        const inpTxt = null;
        const btnEl = null;

        const actual = () => new ViewManager(textManager, { btnEl, inpTxt, viewrEl });

        expect(actual).toThrowError();
    });



    const textManager = new TextManager();;
    const viewerEl = document.createElement('strong');
    const inpTxt = document.createElement('input');
    const btnEl = document.createElement('button');
    const viewManager = new ViewManager(textManager, { btnEl, viewerEl, inpTxt });

    it('클릭이벤트가 발생했을 때 changeValue가 호출이 되는가', () => {

        spyOn(viewManager, 'changeValue');

        btnEl.click();

        expect(viewManager.changeValue).toHaveBeenCalled();
    });

    it('changeValue가 호출되었을 때 updateView가 호출이 되는가', () => {

        spyOn(viewManager, 'updateView');

        viewManager.changeValue();

        expect(viewManager.updateView).toHaveBeenCalled();
    });
});