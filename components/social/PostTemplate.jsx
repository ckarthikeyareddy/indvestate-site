import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { StatusPill } from '../status-pill/StatusPill.jsx';
export function PostTemplate({kicker='DROP 01 — SOUTHLINE',headline='Land moves before the market notices.',body,secondary,statuses=[],city='HYDERABAD',handle='@indvestate',media,scale=0.5,theme='dark'}){
  const W=1080,H=1350;
  return <div style={{width:W*scale,height:H*scale,overflow:'hidden',flex:'none'}}>
    <div data-theme={theme} className="iv-plus-grid" style={{width:W,height:H,transform:'scale('+scale+')',transformOrigin:'0 0',background:'var(--void)',color:'var(--ink)',position:'relative',display:'flex',flexDirection:'column',padding:80,boxSizing:'border-box',border:'1px solid var(--hairline)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Wordmark lockup="city" city={city} size={34} />
        <span style={{fontFamily:'var(--font-mono)',fontSize:22,letterSpacing:'0.18em',color:'var(--ink-muted)'}}>{handle.toUpperCase()}</span>
      </div>
      {media&&<div style={{marginTop:64,height:520,background:'var(--graphite)',border:'1px solid var(--hairline)',overflow:'hidden'}}>{typeof media==='string'?<img src={media} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />:media}</div>}
      <div style={{marginTop:'auto',display:'flex',flexDirection:'column',gap:32}}>
        {statuses.length>0&&<div style={{display:'flex',gap:12,flexWrap:'wrap',zoom:1.8}}>{statuses.map((s,i)=><StatusPill key={i} {...(typeof s==='string'?{kind:s}:s)} />)}</div>}
        <span style={{fontFamily:'var(--font-mono)',fontSize:24,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--signal-ink)'}}>{kicker}</span>
        <h2 style={{margin:0,fontFamily:'var(--font-headline)',fontWeight:600,fontSize:media?76:104,lineHeight:1.02,letterSpacing:'-0.02em',textWrap:'balance'}}>{headline}</h2>
        {body&&<p style={{margin:0,fontFamily:'var(--font-body)',fontSize:32,lineHeight:1.45,color:'var(--ink-muted)',maxWidth:860}}>{body}</p>}
        {secondary&&<p style={{margin:0,fontFamily:'var(--font-headline)',fontWeight:500,fontSize:34,lineHeight:1.4,color:'var(--ink)'}}>{secondary}</p>}
        <div style={{height:1,background:'var(--hairline)'}}></div>
        <span style={{fontFamily:'var(--font-mono)',fontSize:20,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--ink-muted)'}}>Verified before it is visible.</span>
      </div>
    </div>
  </div>;
}
