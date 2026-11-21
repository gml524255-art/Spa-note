# SPA 노트

영어 말하기 교정 내용을 복습하는 개인용 웹앱(PWA)입니다.
학습 자료(`data.enc.json`)는 비밀번호로 암호화되어 있습니다 (AES-GCM, PBKDF2-SHA256).

## 자료 갱신
```bash
SPA_PW='비밀번호' node tools/encrypt.js 원본.json data.enc.json
```
그다음 `sw.js`의 `VERSION`을 올리고 커밋하세요.
