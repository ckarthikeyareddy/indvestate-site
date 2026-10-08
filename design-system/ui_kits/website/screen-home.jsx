
function HeroWord(){
  const words=['market','crowd','headlines','brokers'];
  const [i,setI]=React.useState(0);
  React.useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const t=setInterval(()=>setI(x=>(x+1)%words.length),2600);return()=>clearInterval(t)},[]);
  return <span style={{display:'inline-block',position:'relative'}}><span key={i} style={{display:'inline-block',animation:'iv-reveal 600ms var(--ease-out) both',color:'var(--ink)',borderBottom:'2px solid var(--signal)'}}>{words[i]}</span></span>;
}
function HomeScreen({go}){
  const {Button,PropertyCard,MapMarker,InsideListForm,FounderNote,DataRow}=DS;
  const services=[['Drops','Owner-direct and builder-direct releases. Every one with OC, RERA and bank-loan approval on file.','layers','Drops'],['Buyer concierge','Shortlists, site visits and negotiation, handled by one desk. NRI desk for US and Gulf buyers.','compass','NRI desk'],['Home inspection','A 140-point inspection report before you sign. Bookable online.','scan-search','Inspection'],['Reel + distribution','Owners and builders: we film, verify and distribute to an audience that already trusts the checks.','route',null],['Data products','3D Hyderabad map, parcel histories and corridor reads. In development.','map',null]];
  return <>
    <section className="iv-grid-bg" style={{padding:'96px 0 64px'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'minmax(0,1.1fr) minmax(0,1fr)',gap:48,alignItems:'center'}}>
        <div style={{display:'flex',flexDirection:'column',gap:28}}>
          <Reveal i={0}><span className="iv-label" style={{color:'var(--signal-ink)'}}>Land intelligence · Hyderabad</span></Reveal>
          <Reveal i={1}><h1 className="iv-h1" style={{margin:0}}>Land moves before the <HeroWord /> notices.</h1></Reveal>
          <Reveal i={2}><p className="iv-body-lg" style={{margin:0,color:'var(--ink-muted)',maxWidth:520}}>We study the ground, reject most of what we see, and open access only when the paperwork, location logic and exit all hold.</p></Reveal>
          <Reveal i={3}><div style={{display:'flex',gap:12}}><Button variant="secondary" onClick={()=>go('Drops')}>See Drop 01</Button><Button variant="ghost" onClick={()=>go('Drops')} iconRight={<Icon name="arrow-right" size={16}/>}>How we filter</Button></div></Reveal>
        </div>
        <Reveal i={2}><MediaFrame ratio="5 / 4" label="Corridor read · West Hyderabad">
          <div className="iv-drift" style={{position:'absolute',inset:0}}>
            <MapMarker style={{position:'absolute',left:'22%',top:'30%'}} label="ORR exit 18" />
            <MapMarker style={{position:'absolute',left:'64%',top:'22%'}} pulse={false} />
            <MapMarker style={{position:'absolute',left:'70%',top:'62%'}} label="Metro Ph-II" pulse={false} />
            <MapMarker live style={{position:'absolute',left:'40%',top:'52%'}} label="Drop 01 · Kokapet" />
          </div>
          <span className="iv-data" style={{position:'absolute',right:16,top:14,color:'var(--ink-muted)'}}>17.4065° N, 78.3410° E</span>
        </MediaFrame></Reveal>
      </div>
      <div style={{maxWidth:1200,margin:'64px auto 0',padding:'0 24px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid var(--hairline)'}}>
        {[['Parcels studied this quarter',44],['Passed every check',3],['Booking amounts collected',0]].map(([l,n],i)=><div key={l} style={{padding:'24px 24px 0 '+(i?24:0)+'px',borderLeft:i?'1px solid var(--hairline)':0,display:'flex',flexDirection:'column',gap:8}}>
          <span className="iv-price" style={{fontSize:36}}><CountUp to={n} /></span><span className="iv-label" style={{color:'var(--ink-muted)'}}>{l}</span></div>)}
      </div>
    </section>
    <Section label="Live drop" title="Drop 01 passed. Here is what we checked." intro="Most opportunities do not pass. This one cleared title, approvals, location logic and exit.">
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:48,alignItems:'start'}}>
        <PropertyCard {...DROP01} />
        <div style={{display:'flex',flexDirection:'column',gap:24}}>
          <span className="iv-label" style={{color:'var(--ink-muted)'}}>Risk memo · summary</span>
          <Checklist items={[{t:'Title chain clean since 1983',d:'EC 1983–2026'},{t:'Occupancy certificate on file',d:'GHMC · 2019'},{t:'Two banks pre-approved the unit',d:'SBI · HDFC'},{t:'Resale comps within 4%',d:'6 units, 18 mo'},{t:'Society dues pending',d:'₹ 38,400 · owner to clear',risk:true}]} />
          <Button variant="ghost" onClick={()=>go('Drops')} iconRight={<Icon name="arrow-right" size={16}/>}>Read the full risk memo</Button>
        </div>
      </div>
    </Section>
    <Section label="Services" title="One desk. Five ways in.">
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,minmax(0,1fr))',border:'1px solid var(--hairline)'}}>
        {services.map(([t,d,ic,r],i)=><button key={t} onClick={()=>r&&go(r)} style={{all:'unset',cursor:r?'pointer':'default',padding:24,borderLeft:i?'1px solid var(--hairline)':0,display:'flex',flexDirection:'column',gap:16,minHeight:220,background:'var(--void)'}} onMouseEnter={e=>e.currentTarget.style.background='var(--carbon)'} onMouseLeave={e=>e.currentTarget.style.background='var(--void)'}>
          <Icon name={ic} color="var(--signal)" /><span style={{fontFamily:'var(--font-headline)',fontWeight:500,fontSize:20,letterSpacing:'-0.02em'}}>{t}</span><span style={{fontSize:15,lineHeight:1.6,color:'var(--ink-muted)'}}>{d}</span>
          {!r&&<span className="iv-label" style={{marginTop:'auto',color:'var(--ink-faint)'}}>Coming</span>}
        </button>)}
      </div>
    </Section>
    <Section label="Inside list" title="Documents first. Price second." intro="One WhatsApp per verified release, with the risk memo attached. Nothing else.">
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:48,alignItems:'start'}}>
        <InsideListForm style={{maxWidth:'none'}} />
        <FounderNote quote="Scarcity is a byproduct, not a tool. We release when the paperwork is done, not when a campaign needs a deadline." name="Founder" date="08 OCT 2026"><p style={{margin:0}}>Seventy per cent of what we publish is education. If you only ever read our rejections, you will still buy better.</p></FounderNote>
      </div>
    </Section>
  </>;
}
window.HomeScreen=HomeScreen;
