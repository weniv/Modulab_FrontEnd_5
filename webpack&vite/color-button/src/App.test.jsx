import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('jest 테스트입니다!', () => {
    test('버튼이 잘 동작하는지 확인하겠습니다.', async () => {
        const user = userEvent.setup();
        render(<App />);

        // 화면상의 텍스트를 검색합니다.
        // const textElement = screen.getByText(/Vite and React/i);

        const button = screen.getByRole('button', { name: 'change to blue!' });
        expect(button).toHaveStyle({ backgroundColor: 'rgba(255, 0,0,1)' });

        await user.click(button);

        expect(button).toHaveStyle({ backgroundColor: 'rgba(0, 0, 255, 1)' });
        expect(button.textContent).toBe('change to red!');

        // fireEvent.click(button);

        // 도큐먼트에 존재할것을 기대합니다.
        // expect(textElement).toBeInTheDocument();
    });
});