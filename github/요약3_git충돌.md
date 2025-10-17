```
# 폴더 생성 및 이동
# VSCode로 해당 폴더 열기
# 터미널 열어 아래 명령어 실행

# git 저장소 초기화
git init

# 브랜치 확인(아무것도 없음)
git branch

# index.html 파일을 생성하고 내용을 작성합니다.
# echo . > index.html도 가능합니다. 
echo . > index.html

# 파일을 스테이징(관리하겠다!)하고 커밋합니다.
git add .
git commit -m "1"

# 브랜치 확인(main 하나 있음)
git branch

# 브랜치 생성
git branch a
git branch b

# 브랜치가 잘 만들어졌는지 확인합니다.
git branch

# 브랜치 이동
git checkout a

# 브랜치 이동 확인
git branch

# a 브랜치에서 작업을 합니다.
# 충돌나게 하는 실습입니다.
echo 'a' > index.html
git add .
git commit -m "a"

# b 브랜치로 이동합니다.
git checkout b
echo 'b' > index.html
git add .
git commit -m "b"

# 합칠 때에는 꼭 main에 들어와 있는지 확인해야 합니다.
# 합칠 때 뜨는 에디터가 있을 텐데 메시지를 다 지워주시고 test-1, test-2, test-3 등으로 작성해주세요.
# 기본 VSCode 사용하도록 글로벌 설정 명령어
# git config --global core.editor "code --wait"
git checkout main
git merge a
# 아래 명령어를 하게 되면 아래와 같은 애러가 발생됩니다.
# warning: Cannot merge binary files: index.html (HEAD vs. b)
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit the result.
git merge b

# 충돌이 났습니다!
# 이 상태에서 index.html 파일을 열어보면 `!` 가 있을 것입니다. 오른쪽 아래에는 Resolve Conflict(충돌 해결) 버튼이 있습니다.
# Result에 원하는 값을 넣고 complete merge를 클릭합니다.
# 충돌이 해결되었습니다.

# 합쳐졌는지 VSCode에서 확인해보세요.

# 다른 브렌치 삭제
git branch -d a
git branch -d b
```