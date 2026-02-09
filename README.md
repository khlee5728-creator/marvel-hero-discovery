# Marvel Hero Discovery

Marvel Hero Discovery는 초등 영어 학습을 위한 마블 세계관 기반 MBTI 선택형 활동 앱입니다. 퀴즈를 통해 성향을 분석하고, 매칭된 히어로 카드와 미디어로 결과를 제공합니다.

## 핵심 기능
- MBTI 기반 선택형 퀴즈 흐름
- 히어로 매칭 결과 카드(영상/이미지 지원)
- 결과 카드 코믹북 스타일 UI
- 문항 선택 효과음 및 결과 영상 사운드 토글
- 새로고침 시 결과 유지(로컬 스토리지 복원)
- AI 기반 문항 생성(필요 시 로컬 문항으로 자동 대체)

## AI 기능 및 엔진 사용 방식
- AI 엔진은 퀴즈 문항을 동적으로 생성하는 데 사용됩니다.
- 요청 시 중복을 줄이기 위해 이전 문항 시그니처를 참고합니다.
- 응답 실패/지연 시 로컬 문항 세트로 자동 폴백하여 학습 흐름을 유지합니다.

## AI 엔진 사용 가이드 (OpenAI, Backend 프록시)
- OpenAI 엔진은 프론트에서 직접 호출하지 않고, 백엔드 서버를 통해 호출합니다.
- 백엔드 서버에서 OpenAI API 연동을 담당하며, 프론트는 자체 API만 호출합니다.
- Backend URL: `https://devplayground.polarislabs.ai.kr/api`
- OpenAI 관련 호출은 백엔드에서 `POST /api/chat`, `POST /api/chat/completions` 등으로 처리됩니다.
- 본 프로젝트는 `POST /mbti/questions`로 퀴즈 문항을 요청하며, 내부적으로 백엔드가 OpenAI를 사용합니다.
### 사용 API
- `POST /mbti/questions` (베이스 URL: `VITE_API_BASE_URL`)
- 요청 파라미터 예: `count`, `groups`, `level`, `theme`, `prompt`, `requestId`

### 모델/엔진
- 사용 모델은 백엔드에서 결정됩니다. 프론트에서는 API 호출만 수행합니다.

### 프롬프트 전략
- 초등학생 대상의 쉬운 영어 문장
- 마블 테마 고정, 16문항/2지선다
- MBTI 4개 축(EI/SN/TF/PJ) 각각 4문항 생성
- 동일 문항 반복 최소화를 위한 회피 리스트 포함

### 캐싱 및 폴백
- 로컬 스토리지에 `lastQuestionSignature`, `lastQuestions`, `quizAnswers` 저장
- 이전 문항 시그니처와 동일하면 재생성 시도
- API 미사용/실패 시 로컬 문항(`generateLocalQuestions`)으로 대체

## 기술 스택
- React
- React Router
- Vite
- Tailwind CSS
- Framer Motion

## 프로젝트 구조
- `src/pages`: 화면 구성(인트로/퀴즈/로딩/결과/갤러리)
- `src/context`: 퀴즈 상태 관리
- `src/hooks`: 퀴즈 전용 훅
- `src/data`: 히어로 매칭 데이터/문항 데이터
- `public/assets`: 영상/이미지/효과음 리소스
