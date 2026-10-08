import React from 'react';
const CITY_STYLE={fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--signal-ink)',fontWeight:500};
export function Wordmark({size=32,lockup='wordmark',city='HYDERABAD',tagline='Invest In India.',status=null,inverse=false,plate=false,style,...rest}){
  const color=inverse?'var(--void)':'var(--ink)';
  const mark=<span style={{fontFamily:'var(--font-display)',fontSize:size,letterSpacing:'0.04em',lineHeight:1,textTransform:'uppercase',color,whiteSpace:'nowrap',display:'block'}}>INDVESTATE</span>;
  let body=mark;
  if(lockup==='tagline') body=<span style={{display:'inline-flex',flexDirection:'column',gap:Math.max(6,size*0.28)}}>{mark}<span style={{fontFamily:'var(--font-headline)',fontWeight:500,fontSize:Math.max(13,size*0.3),letterSpacing:'-0.01em',color:inverse?'var(--void)':'var(--ink-muted)'}}>{tagline}</span></span>;
  if(lockup==='city') body=<span style={{display:'inline-flex',alignItems:'center',gap:Math.max(10,size*0.4)}}>{mark}<span style={{width:1,height:size*0.9,background:'var(--hairline-strong)'}}></span><span style={CITY_STYLE}>{city}</span></span>;
  if(lockup==='status') body=<span style={{display:'inline-flex',alignItems:'center',gap:Math.max(12,size*0.5)}}>{mark}{status}</span>;
  const wrap={display:'inline-flex',...(plate?{background:'var(--scrim)',padding:size*0.6}:{}),...style};
  return <span role="img" aria-label="INDVESTATE" style={wrap} {...rest}>{body}</span>;
}
