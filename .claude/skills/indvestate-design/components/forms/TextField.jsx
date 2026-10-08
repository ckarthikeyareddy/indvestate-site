import React from 'react';
export function TextField({label,hint,error,id,prefix,...rest}){
  const fid=id||('f-'+(label||'').toLowerCase().replace(/[^a-z0-9]+/g,'-'));
  return <label className="iv-field" htmlFor={fid}>
    {label&&<span className="iv-field__label">{label}</span>}
    <span style={{display:'flex',gap:8}}>{prefix}<input id={fid} className="iv-input" aria-invalid={error?true:undefined} {...rest} /></span>
    {error?<span className="iv-field__error">{error}</span>:hint&&<span className="iv-field__hint">{hint}</span>}
  </label>;
}
