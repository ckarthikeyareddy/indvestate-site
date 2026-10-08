A single property drop, with the compliance structure baked in: opens with StatusPills, closes with the Disclaimer.

```jsx
<PropertyCard
  statuses={['live-drop','oc','bank-loan','owner-listed']}
  kicker="DROP 01 — SOUTHLINE"
  title="3 BHK, east-facing, 11th floor"
  location="Kokapet · Hyderabad"
  data={[{label:'Area',value:'2,400 sq ft'},{label:'EC',value:'1983–2026',tone:'verified'},{label:'Facing',value:'East'}]}
  price="₹ 1.42 Cr"
  priceNote="₹ 5,917 / sq ft · owner-confirmed"
/>
```

Builder-direct: `variant="builder" reraNumber="TG RERA No. P0240…"` and add `{kind:'rera',value:'P0240…'}` to statuses.
