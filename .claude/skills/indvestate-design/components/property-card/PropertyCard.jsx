import React from 'react';
import { StatusPill } from '../status-pill/StatusPill.jsx';
import { DataRow } from '../data-row/DataRow.jsx';
import { Button } from '../button/Button.jsx';
import { Disclaimer } from '../disclaimer/Disclaimer.jsx';
export function PropertyCard({statuses=[],kicker,title,location,media,mediaLabel='Media — owner-supplied photo',data=[],price,priceNote,cta='WhatsApp the desk',ctaHref='#',onCta,variant='owner',reraNumber,project,compactDisclaimer=true,style}){
  return <article style={{background:'var(--carbon)',border:'1px solid var(--hairline)',display:'flex',flexDirection:'column',minWidth:0,...style}}>
    <div style={{display:'flex',flexWrap:'wrap',gap:8,padding:'16px 20px',borderBottom:'1px solid var(--hairline)'}}>
      {statuses.map((s,i)=><StatusPill key={i} {...(typeof s==='string'?{kind:s}:s)} />)}
    </div>
    <div style={{padding:'20px 20px 16px',display:'flex',flexDirection:'column',gap:8}}>
      {kicker&&<span className="iv-label" style={{color:'var(--signal-ink)'}}>{kicker}</span>}
      <h3 className="iv-h3" style={{margin:0,color:'var(--ink)'}}>{title}</h3>
      {location&&<span className="iv-data" style={{color:'var(--ink-muted)'}}>{location}</span>}
    </div>
    <div className="iv-plus-grid" style={{aspectRatio:'16 / 10',background:'var(--graphite)',borderTop:'1px solid var(--hairline)',borderBottom:'1px solid var(--hairline)',position:'relative',overflow:'hidden'}}>
      {media?(typeof media==='string'?<img src={media} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />:media)
        :<span className="iv-label" style={{position:'absolute',left:16,bottom:14,color:'var(--ink-muted)'}}>{mediaLabel}</span>}
    </div>
    {data.length>0&&<div style={{display:'grid',gridTemplateColumns:'repeat('+Math.min(data.length,3)+', minmax(0,1fr))',columnGap:16,padding:'4px 20px 0'}}>
      {data.map((d,i)=><DataRow key={i} stack label={d.label} value={d.value} tone={d.tone} />)}
    </div>}
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,flexWrap:'wrap',padding:'20px'}}>
      <div style={{display:'flex',flexDirection:'column',gap:4}}>
        <span className="iv-price" style={{color:'var(--ink)'}}>{price}</span>
        {priceNote&&<span className="iv-data" style={{color:'var(--ink-muted)'}}>{priceNote}</span>}
      </div>
      <Button variant="secondary" href={ctaHref} onClick={onCta} iconRight={<span aria-hidden="true">↗</span>}>{cta}</Button>
    </div>
    <div style={{padding:'0 20px 20px'}}><Disclaimer variant={variant} reraNumber={reraNumber} project={project} compact={compactDisclaimer} /></div>
  </article>;
}
