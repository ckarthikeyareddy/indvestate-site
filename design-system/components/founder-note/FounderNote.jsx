import React from 'react';
import { Monogram } from '../brand/Monogram.jsx';
export function FounderNote({label='Founder note',quote,children,name,role='Founder, INDVESTATE',date,style}){
  return <figure style={{margin:0,background:'var(--carbon)',border:'1px solid var(--hairline)',padding:32,display:'flex',flexDirection:'column',gap:20,...style}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
      <span className="iv-label" style={{color:'var(--signal-ink)'}}>{label}</span>
      {date&&<span className="iv-data" style={{color:'var(--ink-muted)'}}>{date}</span>}
    </div>
    {quote&&<blockquote style={{margin:0,fontFamily:'var(--font-headline)',fontWeight:500,fontSize:28,lineHeight:1.25,letterSpacing:'-0.02em',color:'var(--ink)',textWrap:'balance'}}>{quote}</blockquote>}
    {children&&<div className="iv-body" style={{color:'var(--ink-muted)',display:'flex',flexDirection:'column',gap:12}}>{children}</div>}
    <figcaption style={{display:'flex',alignItems:'center',gap:14,borderTop:'1px solid var(--hairline)',paddingTop:20}}>
      <Monogram size={40} />
      <span style={{display:'flex',flexDirection:'column',gap:2}}>
        <span style={{fontFamily:'var(--font-headline)',fontWeight:500,fontSize:16,color:'var(--ink)'}}>{name}</span>
        <span className="iv-label" style={{color:'var(--ink-muted)'}}>{role}</span>
      </span>
    </figcaption>
  </figure>;
}
