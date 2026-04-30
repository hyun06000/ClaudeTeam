# .gitignore Draft (v0)

> **상태:** 초안. `git init` 시 루트 `.gitignore`로 배치.
> **현 산출물 기준:** `web/` (vanilla HTML/CSS/JS), `ClaudeTeam/<멤버>/` (문서·메모·메시지), 루트 문서.

---

## 핵심 (현재 필요)

```gitignore
# macOS
.DS_Store
._*

# Editor
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# 환경 변수 / 비밀
.env
.env.local
.env.*.local

# OS / 임시
Thumbs.db
*.tmp
```

## 인박스 정책 — 결정 필요

`ClaudeTeam/<멤버>/inbox/` 는 멀티 에이전트 메시지함. 두 가지 선택:

- **A. 추적함** — inbox 메시지가 협업 히스토리의 일부. 모두 커밋. (권장)
- **B. 무시함** — 작업 결과가 아니므로 ignore. inbox는 로컬 전용.

**Brandon 의견:** A 권장. inbox/archive가 곧 팀의 의사소통 로그다. 다만 메시지 양이 폭증하면 별도 정리 정책(예: 분기별 압축) 도입.

## 향후 확장 (스택 도입 시 추가)

### Python (David 합류 시 백엔드 후보)
```gitignore
__pycache__/
*.py[cod]
*.egg-info/
.venv/
venv/
.pytest_cache/
.mypy_cache/
.ruff_cache/
```

### Node.js (Matilda 프론트 도구화 시)
```gitignore
node_modules/
dist/
build/
.next/
.cache/
coverage/
```

### 빌드 결과물
```gitignore
*.pyc
*.o
*.class
```

---

## 결정 대기

- [ ] inbox 추적 정책 (A vs B)
- [ ] 백엔드/프론트 스택 결정 후 해당 섹션 활성화
