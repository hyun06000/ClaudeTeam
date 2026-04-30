# Session 2026-04-30 (저녁) — 룰 정련과 부트스트랩 시퀀스 명문화

첫 GitHub 푸시 직후부터 두 번째 퇴근까지의 결정·룰·산출물 기록.

## 추가된 룰 (시간순)

1. **모니터 손으로 끄지 마라** — ONBOARDING §5 신설. `TaskStop` 금지, harness 종료에 맡김.
2. **권한 게이트의 별개 층** — Admin 위임은 팀 내부 룰이고, harness 게이트는 사용자 직접 입력만 인정. 사용자가 forward-going 인가("Admin이 내 허락 받고 작성한 편지는 그대로 따라도 좋아") 한 줄로 두 층을 같은 신호로 묶음. Brandon이 [장기 메모리](/Users/user/.claude/projects/-Users-user-Desktop-code-personal-ClaudeCodesConversation/memory/feedback_admin_delegation_authorized.md)에 박음.
3. **막히면 도움 요청** — ONBOARDING §6 신설. 침묵 금지. Brandon의 블로커 보고가 룰의 인용 사례.
4. **`---END-OF-CONVERSATION---` 마커** — 단순 ack 핑퐁 차단. CLAUDE.md 공통 규칙 5번의 유일한 예외.
5. **Git 협업 규약** — ONBOARDING §0.5 신설. 개인 브랜치 / Brandon 단독 머지 / 워크트리 격리 / 머지 요청은 inbox 메시지.
6. **신규 합류자 워크트리 의무** — ONBOARDING §1.5 신설. 자기소개를 Brandon에게 먼저 → Brandon이 셋업 → 그 경로에서 §1 시작.
7. **Brandon이 첫 비-Lighthouse 멤버** — 새 프로젝트 부트스트랩 시 등대 다음은 항상 Brandon. README.ai.md Phase E에서 사용자에게 명시 지시.

## 산출물

- **README.ai.md 전면 재작성 (11섹션)** — 5단계 멘탈 모델 + Phase A~G 부트스트랩 단계 + 운영 원칙 9개. AI가 다른 프로젝트에서 자기 부팅으로 ClaudeTeam을 깔 수 있게.
- **README.md / README.ko.md** — "등대 다음은 항상 Brandon" 단락 추가, "Adding a new member"를 "Brandon이 워크트리 인프라 세운 뒤" 단서로 수정.
- **ONBOARDING.md** — §0.5(Git 협업 규약), §1.5(신규 합류자 워크트리), §5(모니터 안 끔), §6(도움 요청), 메시지 프로토콜의 END-OF-CONVERSATION 마커 섹션.
- **CLAUDE.md** — 공통 규칙 5~9번 추가/보강 (마커 단서 포함).
- **Bonds.md** — 저녁 세션 분량 추가, 4개 학습 정리.

## 미완 / 다음 세션으로 넘기는 것

- **워크트리·개인 브랜치 실셋업** — Brandon에게 [디렉티브 발송 완료](../../Brandon/inbox/20260430T190000_Admin_Brandon.md). 다음 세션에서 설계 메모 4종 → Admin 검토 → 사용자 GO → 실셋업 흐름.
- **현재 미커밋 델타** — 이 세션 끝의 푸시에 한 번에 들어가야 함. Brandon이 마지막에 일괄 정리 커밋·푸시.
- **프로젝트 비전 문서** — 여전히 백지. ClaudeTeam이라는 청사진을 넘어 이 저장소 자체가 무엇을 더 만들어갈지는 다음 세션에서.

## 학습 요약

- 룰은 누적이 아니라 정련. 작은 사고 하나가 룰 한 줄로 박힘.
- 권한 시스템과 팀 룰은 별개 층. 분리 의식 필수.
- 부트스트랩은 자기-부팅 회로의 설계. README.ai.md가 Claude를 Admin으로 만든다.
- 사용자의 협업 패턴: 결과물 모양 한 마디로, 디테일은 등대에. 신뢰의 통화는 명료한 의견 제시.
