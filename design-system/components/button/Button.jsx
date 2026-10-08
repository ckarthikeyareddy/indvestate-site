import React from 'react';
export function Button({variant='primary',size='md',mono=false,block=false,icon=null,iconRight=null,href,disabled=false,children,className='',...rest}){
  const cls=['iv-btn','iv-btn--'+variant,size!=='md'?'iv-btn--'+size:'',mono?'iv-btn--mono':'',block?'iv-btn--block':'',className].filter(Boolean).join(' ');
  const inner=<>{icon&&<span className="iv-btn__icon">{icon}</span>}{children}{iconRight&&<span className="iv-btn__icon">{iconRight}</span>}</>;
  if(href) return <a className={cls} href={disabled?undefined:href} aria-disabled={disabled||undefined} {...rest}>{inner}</a>;
  return <button className={cls} disabled={disabled} {...rest}>{inner}</button>;
}
