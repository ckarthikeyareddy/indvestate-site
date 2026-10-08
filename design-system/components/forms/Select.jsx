import React from 'react';
export function Select({label,options=[],id,style,...rest}){
  const sel=<select id={id} className="iv-input" style={style} {...rest}>{options.map(o=>typeof o==='string'?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>;
  if(!label) return sel;
  return <label className="iv-field"><span className="iv-field__label">{label}</span>{sel}</label>;
}
