Mono uppercase status pill for documents and release state — every property surface opens with a strip of these.

```jsx
<div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
  <StatusPill kind="live-drop" />
  <StatusPill kind="oc" />
  <StatusPill kind="rera" value="P02400004521" />
  <StatusPill kind="bank-loan" />
  <StatusPill kind="nri-ready" />
</div>
```

- Tones: live (saffron + pulsing dot), verified (green tick), signal (data), neutral, risk.
- Only show a pill when the document is on file. "RERA-approved" is never a label — RERA registers, it does not approve.
