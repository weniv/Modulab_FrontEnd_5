```
# 깃허브 충돌 실습
# readmd.md 파일을 자동생성해서 repo를 만듭니다.

# test 폴더를 만듭니다.
# test2 폴더를 만듭니다.

# test 폴더에서 클론을 합니다
git clone https://github.com/paullabkorea/conflict.git .

# readme.md 파일을 아래와 같이 작성합니다.
# a
# commit, push를 합니다.

# test2 폴더에서도 클론을 합니다.
git clone https://github.com/paullabkorea/conflict.git .

# readme.md 파일을 아래와 같이 작성합니다.
# b
# commit, push를 합니다.

# 아래와 같은 error가 발생합니다.
# PS C:\Users\paull\OneDrive\Desktop\test2> git push
# To https://github.com/paullabkorea/conflict.git
#  ! [rejected]        main -> main (fetch first)
# error: failed to push some refs to 'https://github.com/paullabkorea/conflict.git'
# hint: Updates were rejected because the remote contains work that you do not
# hint: have locally. This is usually caused by another repository pushing to
# hint: the same ref. If you want to integrate the remote changes, use
# hint: 'git pull' before pushing again.
# hint: See the 'Note about fast-forwards' in 'git push --help' for details.

git pull


# <<<<<<< HEAD
# # b
# =======
# # a
# >>>>>>> eb3bc8540ef0d6e590c85dff55486227c6ca324b

# Accept Current Change는 현재 브랜치의 내용을 유지합니다.
# Accept Incoming Change는 병합하려는 브랜치의 내용을 유지합니다.
# Accept Both Changes는 두 브랜치의 내용을 모두 유지합니다.
# Compare Changes는 두 브랜치의 내용을 비교합니다.
# 위 4가지 중 하나를 선택하여 충돌을 해결합니다.

# 충돌이 해결 되었으면 add, commit, push를 하거나
# VSCode에서 파란색 버튼 눌러가며 진행하셔도 됩니다.
```