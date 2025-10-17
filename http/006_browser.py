import tkinter as tk
from tkinter import scrolledtext
import urllib.request
import urllib.error


class SimpleBrowser:
    def __init__(self, root):
        self.root = root
        self.root.title("간단한 웹 브라우저")
        self.root.geometry("800x600")

        # URL 입력 프레임
        url_frame = tk.Frame(root)
        url_frame.pack(fill=tk.X, padx=5, pady=5)

        # URL 입력 라벨
        tk.Label(url_frame, text="URL:").pack(side=tk.LEFT, padx=5)

        # URL 입력 필드
        self.url_entry = tk.Entry(url_frame, width=50)
        self.url_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
        self.url_entry.insert(0, "http://example.com")  # 기본 URL

        # 이동 버튼
        self.go_button = tk.Button(url_frame, text="이동", command=self.load_page)
        self.go_button.pack(side=tk.LEFT, padx=5)

        # HTML 표시 영역 (스크롤 가능)
        self.text_area = scrolledtext.ScrolledText(
            root, wrap=tk.WORD, width=80, height=30
        )
        self.text_area.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        # 상태 표시줄
        self.status_label = tk.Label(
            root, text="준비됨", bd=1, relief=tk.SUNKEN, anchor=tk.W
        )
        self.status_label.pack(side=tk.BOTTOM, fill=tk.X)

        # Enter 키로도 페이지 로드 가능
        self.url_entry.bind("<Return>", lambda event: self.load_page())

    def load_page(self):
        """URL에서 HTML 콘텐츠를 가져와서 표시"""
        url = self.url_entry.get()

        # URL에 http://나 https://가 없으면 추가
        if not url.startswith(("http://", "https://")):
            url = "http://" + url
            self.url_entry.delete(0, tk.END)
            self.url_entry.insert(0, url)

        # 상태 업데이트
        self.status_label.config(text=f"로딩 중: {url}")
        self.root.update()

        try:
            # URL에서 HTML 가져오기
            with urllib.request.urlopen(url, timeout=10) as response:
                html_content = response.read().decode("utf-8", errors="ignore")

            # 텍스트 영역 초기화 후 HTML 표시
            self.text_area.delete(1.0, tk.END)
            self.text_area.insert(1.0, html_content)

            # 상태 업데이트
            self.status_label.config(text=f"완료: {url}")

        except urllib.error.URLError as e:
            # URL 에러 처리
            self.text_area.delete(1.0, tk.END)
            self.text_area.insert(1.0, f"오류: URL을 로드할 수 없습니다\n\n{str(e)}")
            self.status_label.config(text="오류 발생")

        except Exception as e:
            # 기타 에러 처리
            self.text_area.delete(1.0, tk.END)
            self.text_area.insert(1.0, f"오류 발생:\n\n{str(e)}")
            self.status_label.config(text="오류 발생")


def main():
    root = tk.Tk()
    browser = SimpleBrowser(root)
    root.mainloop()


if __name__ == "__main__":
    main()
