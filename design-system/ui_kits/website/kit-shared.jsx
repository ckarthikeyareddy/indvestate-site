
const DS=window.INDVESTATEDesignSystem_26aecf;
function Icon({name,size=20,stroke=1.5,color='currentColor',style}){
  const key=name.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join('');
  const node=window.lucide&&window.lucide.icons[key];
  if(!node) return <span style={{width:size,height:size,display:'inline-block'}}></span>;
  const kids=Array.isArray(node[0])?node:(node[2]||[]);
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{flex:'none',...style}}>{kids.map(([t,a],i)=>React.createElement(t,{key:i,...a}))}</svg>;
}
function Section({label,title,intro,children,grid=false,style,id}){
  return <section id={id} className={grid?'iv-grid-bg':''} style={{padding:'64px 0',borderTop:'1px solid var(--hairline)',...style}}>
    <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',flexDirection:'column',gap:40}}>
      {(label||title)&&<header style={{display:'flex',flexDirection:'column',gap:12,maxWidth:720}}>
        {label&&<span className="iv-label" style={{color:'var(--signal-ink)'}}>{label}</span>}
        {title&&<h2 className="iv-h2" style={{margin:0}}>{title}</h2>}
        {intro&&<p className="iv-body-lg" style={{margin:0,color:'var(--ink-muted)'}}>{intro}</p>}
      </header>}
      {children}
    </div>
  </section>;
}
function Reveal({i=0,children,style}){return <div className="iv-reveal" style={{'--i':i,...style}}>{children}</div>;}
function MediaFrame({label,ratio='16 / 10',style,children}){
  return <div className="iv-plus-grid" style={{aspectRatio:ratio,background:'var(--carbon)',border:'1px solid var(--hairline)',position:'relative',overflow:'hidden',...style}}>
    {children}{label&&<span className="iv-label" style={{position:'absolute',left:16,bottom:14,color:'var(--ink-muted)'}}>{label}</span>}
  </div>;
}
function CountUp({to,dur=1400,format=n=>n.toLocaleString('en-IN')}){
  const [v,setV]=React.useState(0);
  React.useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setV(to);return;}let s=performance.now(),r;const f=t=>{const p=Math.min(1,(t-s)/dur);setV(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)r=requestAnimationFrame(f)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[to]);
  return <>{format(v)}</>;
}
function Checklist({items}){
  return <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column'}}>
    {items.map((it,i)=><li key={i} className="iv-check-in" style={{'--i':i,display:'grid',gridTemplateColumns:'20px 1fr auto',gap:12,alignItems:'baseline',padding:'12px 0',borderBottom:'1px solid var(--hairline)'}}>
      <Icon name={it.risk?'triangle-alert':'check'} size={16} color={it.risk?'var(--risk)':'var(--verified)'} style={{transform:'translateY(3px)'}} />
      <span style={{fontSize:15,color:'var(--ink)'}}>{it.t}</span>
      <span className="iv-data" style={{color:'var(--ink-muted)'}}>{it.d}</span>
    </li>)}
  </ul>;
}
function Footer({go}){
  const {Wordmark}=DS;
  const col=(h,ls)=><div style={{display:'flex',flexDirection:'column',gap:10}}><span className="iv-label" style={{color:'var(--ink-muted)'}}>{h}</span>{ls.map(([l,r])=><a key={l} href="#" onClick={e=>{e.preventDefault();r&&go(r)}} style={{textDecoration:'none',color:'var(--ink)',fontSize:15}}>{l}</a>)}</div>;
  return <footer style={{borderTop:'1px solid var(--hairline)',padding:'64px 0 32px'}}>
    <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',flexDirection:'column',gap:48}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:32}}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}><Wordmark lockup="tagline" size={28} /><span className="iv-label" style={{color:'var(--signal-ink)'}}>Verified before it is visible.</span></div>
        {col('Access',[['Drops','Drops'],['Inside list','home'],['NRI desk','NRI desk']])}
        {col('Services',[['Home inspection','Inspection'],['Buyer concierge','NRI desk'],['Reel + distribution',null]])}
        {col('Follow',[['Instagram · @indvestate',null],['Hyderabad · @indvestate.hyd',null],['WhatsApp desk',null]])}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',gap:24,flexWrap:'wrap',borderTop:'1px solid var(--hairline)',paddingTop:24}}>
        <span className="iv-caption">INDVESTATE does not collect booking amounts. All payments go directly to the registered owner or developer.</span>
        <span className="iv-data" style={{color:'var(--ink-muted)'}}>HYDERABAD · 17.3850° N, 78.4867° E</span>
      </div>
    </div>
  </footer>;
}
const DROP01={statuses:['live-drop','oc','bank-loan','owner-listed','nri-ready'],kicker:'DROP 01 — SOUTHLINE',title:'3 BHK, east-facing, 11th floor',location:'Kokapet · Gandipet (M) · Hyderabad',data:[{label:'Carpet',value:'1,860 sq ft'},{label:'Super built',value:'2,400 sq ft'},{label:'EC',value:'1983–2026',tone:'verified'}],price:'₹ 1.42 Cr',priceNote:'₹ 5,917 / sq ft · owner-confirmed 06 Oct'};
Object.assign(window,{Icon,Section,Reveal,MediaFrame,CountUp,Checklist,Footer,DROP01});
