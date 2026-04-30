# 메시지 프로토콜 (요약)

전체 사양은 [ONBOARDING.md](../../../ONBOARDING.md) "메시지 프로토콜" 섹션 참조. 여기는 빠른 참조용.

## 파일명
`<YYYYMMDDTHHMMSS>_<from>_<to>.md`

## 최소 frontmatter
```yaml
---
from:
to:
sent_at:        # 2026-04-30T14:32:05+09:00
subject:
priority: normal
reply_to:
---
```

## 운영 규칙
- 메시지 1통 = 파일 1통 (append 금지)
- 다수 수신은 파일을 복제해 각 inbox에 배포
- 처리 후 `<수신자>/inbox/archive/`로 이동
- inbox에 남은 파일 = 미처리

## 모니터 매핑
- `inbox/` 디렉토리 watcher의 새 파일 알림 1건 = 메시지 1통
- frontmatter의 `priority: high`만 즉시 반응, 나머지는 짬 날 때
