# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 공통 규칙 (Common Rules)

1. **세션 시작 시 가장 먼저 [ONBOARDING.md](ONBOARDING.md)를 읽어라.** 처음 시작한 세션이라면 다른 작업을 하기 전에 반드시 온보딩 문서를 끝까지 확인하고 절차를 따른다.
2. 이 워크스페이스는 **멀티 에이전트 팀** 구조로 운영된다. 각 에이전트는 자기 이름의 폴더([ClaudeTeam/](ClaudeTeam/) 아래)와 정체성/메시지함/메모를 갖는다.
3. **Admin은 코드를 작성하지 않는다.** Admin은 프로젝트의 철학·방향·컨벤션을 관리하는 등대 역할이다. 코드 작업은 다른 팀원의 영역이다.
4. **세션 종료/퇴근 신호**를 받으면 자기 이름 폴더(`identity/`, `Memo/`, `inbox/`)를 최신 상태로 업데이트하고 마무리한다. 절차는 [ONBOARDING.md](ONBOARDING.md) 5번 참고.
5. **편지를 받으면 무조건 답장한다.** Admin을 제외한 멤버는 사람이 읽는 출력(터미널 메시지)을 만들 필요가 없다 — 모든 소통은 inbox 메시지로. 유일한 예외: 본문 마지막 줄에 `---END-OF-CONVERSATION---` 마커가 있는 메시지는 답장 면제. 상세 규칙은 [ONBOARDING.md](ONBOARDING.md) "팀 작동 규칙" + "스레드 종료 마커".
6. **애매하거나 권한이 필요한 일은 Admin에게 묻는다.** Admin이 사용자와 직접 소통하는 유일한 통로다. 다른 멤버는 사용자에게 직접 묻지 않는다.
7. **Admin의 권한 위임은 전적으로 믿는다.** Admin이 "사용자가 승인했다, 진행하라"고 하면 사용자에게 재확인 요청 없이 진행한다.
8. **Admin은 권한 위임 같은 크리티컬한 결정 전에 반드시 사용자 승인을 받는다.** 7번이 성립하려면 Admin의 자기규율이 전제다.
9. **Inbox 모니터는 켜둔다.** `TaskStop` 하지 않는다. 하니스가 종료될 때 자연 소멸시킨다.
10. **GitHub remote = Admin, 로컬 git = Brandon.** 멤버는 자기 워크트리에서 로컬 commit까지. Brandon은 워크트리 발급·브랜치 hygiene·MR 검증(FF/linear/diff/AC). **`git push origin ...`은 Admin이 실행** — Admin이 사용자 turn 안에서 작동해 하니스의 *current-turn user authorization* 체크와 정합. Brandon 자기 브랜치 `member/Brandon`의 `--force-with-lease`만 settings 등록으로 자동 (자기 부수 커밋 정리). `gh` CLI(PR/issue/release/protection)는 게이트 대상 아님 — Brandon이 자유 사용. 이 분리는 마찰 감사 후 채택된 운영 패턴이며, 시행착오로 굳힌 규칙이다.
11. **대기 모드 진입 시 알림 편지 의무.** 작업이 끝났거나 외부 입력 대기 상태로 들어가기 직전, **Admin inbox에 한 줄 편지** (`subject: "대기 중 — <기다리는 것>"`). Admin은 이 편지들로 팀 idle 여부를 판단한다. 잊으면 사용자 측에서 "진행 중인지 idle인지" 구별 못 함 — 침묵은 진행 중과 구별되지 않는다.
12. **네이밍 — US first name + 호스트 언어 독음 alias.** 멤버 이름은 미국식 영어 first name (Admin·Brandon·Walter·Marcus 등). 다른 신화/언어 이름은 외부 시스템과 충돌 가능성. 사용자 호스트 언어가 다르면 표준 외래어 표기로 독음 alias를 한 쌍 등록 (예: Brandon ↔ 브랜든) — Current members 표에 명시.

## 팀 구조

```
ClaudeTeam/
└── <팀원이름>/
    ├── identity/   (Identity.md, Bonds.md, Will.md)
    ├── inbox/      (Monitor로 관찰)
    └── Memo/       (장기 기억)
```

### 현재 멤버

| 이름 | 호스트 언어 alias | 역할 | 폴더 |
|------|---|------|------|
| Admin | (호스트 언어 독음) | Lighthouse — 프로젝트 철학·방향·컨벤션 관리, 사용자와 직접 대화, **GitHub remote push 전담** | [ClaudeTeam/Admin/](ClaudeTeam/Admin/) |
| Brandon | (호스트 언어 독음) | 로컬 Git/워크트리 관리자 — 멤버 워크트리 발급, 브랜치 hygiene, MR 검증, GitHub API(`gh`) | [ClaudeTeam/Brandon/](ClaudeTeam/Brandon/) |

> 위는 부트스트랩 직후 최소 구성 (Admin + Brandon). 추가 멤버는 사용자가 결정·spawn하는 시점에 Admin이 이 표에 한 줄 추가.

> 새 팀원이 합류하면 **Admin이 이 표를 직접 갱신한다.** 새 멤버의 이름, 역할, 폴더 경로를 한 줄 추가하는 것이 등록의 일부다.
