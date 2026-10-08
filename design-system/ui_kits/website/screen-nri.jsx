
function Clock({city,tz}){
  const [t,setT]=React.useState(new Date());
  React.useEffect(()=>{const i=setInterval(()=>setT(new Date()),30000);return()=>clearInterval(i)},[]);
  return <div style={{display:'flex',flexDirection:'column',gap:6,padding:'20px 24px',borderLeft:'1px solid var(--hairline)'}}><span className="iv-label" style={{color:'var(--ink-muted)'}}>{city}</span><span className="iv-price" style={{fontSize:32}}>{t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:tz})}</span></div>;
}
function NriScreen(){
  const {InsideListForm,DataRow,Button}=DS;
  return <>
    <Section grid label="NRI desk · US / Gulf" title="Buying in Hyderabad from Dallas or Dubai." intro="Forty per cent of our buyers are abroad. The desk runs video site visits, PoA, NRE/NRO payments and registration — in your time zone.">
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',border:'1px solid var(--hairline)',background:'var(--void)'}}>
        <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:6}}><span className="iv-label" style={{color:'var(--signal-ink)'}}>Desk hours</span><span style={{fontSize:15,color:'var(--ink-muted)'}}>07:00–23:00 IST, seven days</span></div>
        <Clock city="Hyderabad" tz="Asia/Kolkata" /><Clock city="Dallas" tz="America/Chicago" /><Clock city="Dubai" tz="Asia/Dubai" />
      </div>
    </Section>
    <Section label="What the desk handles" title="Every step you cannot do from abroad.">
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:48,alignItems:'start'}}>
        <div>{[['Video site visit','Live, unedited, on your schedule'],['Power of attorney','Drafted, notarised, consulate-ready'],['Payments','NRE / NRO routing · FEMA-compliant'],['Home loan','NRI lenders pre-checked per unit'],['Registration','Attended by PoA holder at SRO'],['After purchase','Rental, maintenance, resale']].map(([l,v],i,a)=><DataRow key={l} label={l} value={v} last={i===a.length-1} />)}</div>
        <div style={{background:'var(--carbon)',border:'1px solid var(--hairline)',padding:32,display:'flex',flexDirection:'column',gap:16}}>
          <span className="iv-label" style={{color:'var(--signal-ink)'}}>English · తెలుగు</span>
          <p style={{margin:0,fontFamily:'var(--font-headline)',fontWeight:500,fontSize:24,lineHeight:1.3,letterSpacing:'-0.02em'}}>We say what was checked, not what is promised.</p>
          <p style={{margin:0,fontFamily:'var(--font-headline)',fontWeight:500,fontSize:22,lineHeight:1.5,color:'var(--ink-muted)'}}>మేము ఏమి తనిఖీ చేశామో చెబుతాము, ఏమి హామీ ఇస్తామో కాదు.</p>
          <Button variant="secondary" iconRight={<Icon name="arrow-up-right" size={16}/>} style={{alignSelf:'flex-start'}}>Schedule a desk call</Button>
        </div>
      </div>
    </Section>
    <Section label="Inside list" title="Get the risk memo before the release.">
      <InsideListForm title="Join the NRI inside list" intro="Pick US or Gulf and the desk replies in your morning." />
    </Section>
  </>;
}
window.NriScreen=NriScreen;
