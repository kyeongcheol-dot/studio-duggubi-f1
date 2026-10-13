# Studio Duggubi · F1

에프원의전 홈페이지의 Studio Duggubi 작업용 미리보기입니다.

- 원본 사이트: https://ephemeral-tarsier-ad00e7.netlify.app/
- GitHub Pages: https://kyeongcheol-dot.github.io/studio-duggubi-f1/
- 기준: 2026-10-13에 확인한 현재 배포본

## 파일 구성

- `index.html`: 화면 구조와 문구
- `styles.css`: 디자인과 반응형 스타일
- `script.js`: 메뉴, 상품 선택과 화면 동작
- `assets/`: 이미지, 로고, 폰트

## 수정 및 배포

`main` 브랜치의 루트 폴더를 GitHub Pages로 배포합니다.
변경사항을 `main`에 커밋하면 GitHub Pages가 자동으로 갱신됩니다.
Actions 탭에서 배포 진행 상태를 확인할 수 있습니다.

로컬에서는 이 폴더에서 `python3 -m http.server 8000`을 실행하고
`http://localhost:8000`으로 접속합니다.

현재 Netlify 운영 사이트와 별도로 배포됩니다. 미리보기에는 검색엔진
색인 제외 메타태그를 적용했습니다. 실제 상담 전화와 외부 링크는 원본과 같습니다.

공개 홈페이지에 제공되는 파일만 포함합니다. 내부 인수인계 문서와
수정내역, 드라이브 백업은 포함하지 않습니다. 코드·이미지·폰트의 기존 권리는 유지됩니다.

## 2차 반영 · 2026-10-13

- 기업 전문 장례의전 소개. 파트너사 표기, 미확인 운영 수치 및 할인 비교 제거.
- 화장 290만 원 유지, 매장 350만 원·무빈소 130만 원. 후자의 두 플랜에 협의 가능 안내. 제공 항목 유지.
- 전문가 이름·소속·사진·소개는 유지하고 카드 및 인물 프레임 개선.
- [디자인 비포·애프터](https://kyeongcheol-dot.github.io/studio-duggubi-f1/compare.html): 수정 전 원본은 `before.html`, `before.css`, `before.js`에 고정. 이전 정보가 포함된 검토 전용 화면.
- [상담 선택 화면](https://kyeongcheol-dot.github.io/studio-duggubi-f1/#consultation): 분야 복수 선택 → 연락 정보 → 입력 확인.

### 사용자 담당: 저장·전달 연동

현재 폼은 브라우저 메모리에서만 동작하며 저장·전송하지 않습니다. `script.js`의 `consultationForm` submit 처리에서 확인 화면을 표시합니다. 공개 화면에 온라인 신청 준비 중임을 명시했습니다. 전송 성공 문구, 임의 수신처, API 키는 넣지 않았습니다.

필드: `services`(복수: legal-office, tax, memorial, flowers, insurance, lawyer, property, appraisal), `customerName`, `phone`, `preferredTime`, `message`.

저장·전달은 사이트 소유자가 연결합니다. 운영 시작 시 수신처·보유기간에 맞춘 개인정보 안내/동의, 서버 검증·중복 접수 방지, 실제 성공·실패 응답 처리를 함께 연결해야 합니다. API 비밀값은 공개 저장소에 두지 않습니다.

### 내용 확인 근거

가격·플랜과 전문가 유지: 제공된 고객 피드백. 인력·차량 보유량은 입증 자료 없이 확정하지 않고 노출 제거.

행정 기한 표현 점검(2026-10-13):
- 안심상속: https://www.korea.kr/multi/visualNewsView.do?newsId=148931775
- 상속 승인·포기: https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=4&cciNo=1&cnpClsNo=1&csmSeq=255
- 상속세: https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7722&mi=2328

전문가 자격·사업자 정보 및 모든 운영 사실을 독립적으로 인증했다는 의미는 아닙니다.
