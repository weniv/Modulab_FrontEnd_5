import { useActionState } from 'react';

function ContactForm() {
    // useActionState 사용
    // state - 현재 상태, formAction - 폼 액션 함수, isPending - 로딩 상태 (boolean)
    const [state, formAction, isPending] = useActionState(

        // previousState: 이전 상태값 
        // formData: 폼에서 제출된 데이터 (FormData 객체)
        async (previousState, formData) => {


            // 1. formData에서 값 추출
            // formAction 함수를 사용하면 자동으로 formData객체를 통해 form에서 입력받은 데이터에 접근이 가능합니다.
            // preventDefault 불필요
            const email = formData.get('email');
            const message = formData.get('message');

            try {
                // 2. API 호출
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify({ email, message }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) throw new Error('전송 실패');

                // 3. 성공 시 새로운 상태(state) 반환
                return { success: true, message: '메시지가 전송되었습니다!' };
            } catch (error) {
                // 4. 실패 시 에러 상태(state) 반환
                return { success: false, message: error.message };
            }
        },
        { success: false, message: '' } // 초기 상태
    );

    return (
        // formAction 함수 연결
        // isPending 값은 비동기 상태에 따라 true 혹은 false로 자동 관리됩니다.
        <form action={formAction} className="contact-form">
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="form-group">
                <label htmlFor="message">메시지</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    disabled={isPending}
                />
            </div>

            <button type="submit" disabled={isPending}>
                {isPending ? '전송 중...' : '전송하기'}
            </button>

            {/* 상태 메시지 표시 */}
            {state.message && (
                <div className={`message ${state.success ? 'success' : 'error'}`}>
                    {state.message}
                </div>
            )}
        </form>
    );
}

export default ContactForm;