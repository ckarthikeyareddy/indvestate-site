
function DropScreen({go}){
  const {Button,StatusPill,DataRow,Disclaimer,MapMarker,FounderNote}=DS;
  const [tab,setTab]=React.useState('memo');
  return <>
    <section style={{padding:'48px 0 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',flexDirection:'column',gap:24}}>
        <span className="iv-data" style={{color:'var(--ink-muted)'}}><a href="#" onClick={e=>{e.preventDefault();go('home')}} style={{color:'var(--ink-muted)'}}>Drops</a> / 01 / Southline</span>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{DROP01.statuses.map(s=><StatusPill key={s} kind={s} />)}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:24,flexWrap:'wrap'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <span style={{fontFamily:'var(--font-display-boxed)',fontSize:32,letterSpacing:'0.04em'}}>DROP 01</span>
            <h1 className="iv-h1" style={{margin:0,fontSize:48}}>3 BHK, east-facing, 11th floor. Kokapet.</h1>
          </div>
          <span className="iv-data" style={{color:'var(--ink-muted)'}}>17.3850° N, 78.4867° E · 2,400 sq ft · EC 1983–2026</span>
        </div>
      </div>
    </section>
    <section style={{padding:'32px 0 64px'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'minmax(0,1fr) 380px',gap:32,alignItems:'start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:32}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:8}}>
            <MediaFrame ratio="4 / 3" label="Living room · owner photo" />
            <div style={{display:'grid',gap:8}}><MediaFrame ratio="auto" style={{height:'100%'}} label="Balcony" /><MediaFrame ratio="auto" style={{height:'100%'}} label="Site walk · reel" /></div>
          </div>
          <div style={{display:'flex',gap:0,borderBottom:'1px solid var(--hairline)'}}>
            {[['memo','Risk memo'],['docs','Documents'],['location','Location logic']].map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{all:'unset',cursor:'pointer',padding:'12px 16px',fontSize:15,color:tab===k?'var(--ink)':'var(--ink-muted)',borderBottom:'1px solid '+(tab===k?'var(--ink)':'transparent'),marginBottom:-1}}>{l}</button>)}
          </div>
          {tab==='memo'&&<Checklist items={[{t:'Title chain traced to 1983 with no break',d:'EC 1983–2026'},{t:'Occupancy certificate issued',d:'GHMC · 2019'},{t:'Unit pre-approved by two lenders',d:'SBI · HDFC'},{t:'Resale comps within 4% of ask',d:'6 units · 18 mo'},{t:'Society maintenance dues outstanding',d:'₹ 38,400',risk:true}]} />}
          {tab==='docs'&&<div>{[['Sale deed','Doc 4417/2019 · SRO Gandipet'],['Occupancy certificate','GHMC/OC/2019/0981'],['Encumbrance','1983–2026 · nil'],['Survey No.','214/A, 214/B · Kokapet (V)'],['Property tax','Paid to Mar 2026']].map(([l,v],i,a)=><DataRow key={l} label={l} value={v} tone={i===2?'verified':undefined} last={i===a.length-1} />)}</div>}
          {tab==='location'&&<MediaFrame ratio="16 / 9" label="Location logic · 3D map preview">
            <MapMarker live style={{position:'absolute',left:'46%',top:'48%'}} label="Drop 01" />
            <MapMarker style={{position:'absolute',left:'20%',top:'26%'}} label="ORR 900 m" pulse={false} />
            <MapMarker style={{position:'absolute',left:'72%',top:'30%'}} label="FD 2.1 km" pulse={false} />
          </MediaFrame>}
          <FounderNote label="Why it passed" quote="The comps hold, the title is clean, and two banks will lend on it. That is the bar." name="Founder" date="06 OCT 2026" />
        </div>
        <aside style={{position:'sticky',top:88,background:'var(--carbon)',border:'1px solid var(--hairline)',padding:24,display:'flex',flexDirection:'column',gap:20}}>
          <div style={{display:'flex',flexDirection:'column',gap:4}}><span className="iv-label" style={{color:'var(--ink-muted)'}}>Owner asking</span><span className="iv-price">₹ 1.42 Cr</span><span className="iv-data" style={{color:'var(--ink-muted)'}}>₹ 5,917 / sq ft · ≈ US$ 170,000</span></div>
          <div>{[['Carpet','1,860 sq ft'],['Floor','11 of 18'],['Facing','East'],['Parking','2 covered']].map(([l,v],i,a)=><DataRow key={l} label={l} value={v} last={i===a.length-1} />)}</div>
          <Button block size="lg" icon={<Icon name="calendar-check" size={16}/>}>Book a site visit</Button>
          <Button block variant="secondary" iconRight={<Icon name="arrow-up-right" size={16}/>}>WhatsApp the desk</Button>
          <Disclaimer compact />
        </aside>
      </div>
    </section>
  </>;
}
window.DropScreen=DropScreen;
