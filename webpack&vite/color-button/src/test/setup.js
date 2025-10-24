import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// vitest에 jest-dom matchers 추가하기
expect.extend(matchers);

// 각각의 테스트 후 마운트된 react트리를 해제. 자동으로 메모리 관리.
afterEach(() => {
    cleanup();
});

