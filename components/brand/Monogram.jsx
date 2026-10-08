import React from 'react';
export function Monogram({size=48,filled=false,style,...rest}){
  return <span role="img" aria-label="INDVESTATE" style={{width:size,height:size,display:'inline-grid',placeItems:'center',border:'1px solid '+(filled?'var(--ink)':'var(--hairline-strong)'),background:filled?'var(--ink)':'transparent',color:filled?'var(--void)':'var(--ink)',fontFamily:'var(--font-display)',fontSize:size*0.36,letterSpacing:'0.04em',lineHeight:1,paddingLeft:'0.04em',flex:'none',...style}} {...rest}>IV</span>;
}
