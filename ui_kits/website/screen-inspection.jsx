
function InspectionScreen(){
  const {Button,TextField,Select,Checkbox,StatusPill,DataRow}=DS;
  const [step,setStep]=React.useState(1);
  const [slot,setSlot]=React.useState(null);
  const [paying,setPaying]=React.useState(false);
  const days=['Thu 09','Fri 10','Sat 11','Sun 12','Mon 13'];const times=['09:00','11:30','14:00','16:30'];
  const pay=()=>{setPaying(true);setTimeout(()=>{setPaying(false);setStep(3)},1400)};
  const steps=['Property','Slot','Pay'];
  return <Section label="Home inspection" title="Inspect before you sign." intro="A licensed engineer checks structure, seepage, electricals, plumbing and documents against the unit. You get a written report in 48 hours.">
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.3fr) minmax(0,1fr)',gap:48,alignItems:'start'}}>
      <div style={{background:'var(--carbon)',border:'1px solid var(--hairline)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderBottom:'1px solid var(--hairline)'}}>
          {steps.map((s,i)=><div key={s} style={{padding:'14px 20px',borderLeft:i?'1px solid var(--hairline)':0,display:'flex',gap:10,alignItems:'center',background:step===i+1?'var(--void)':'transparent'}}><span className="iv-data" style={{color:step>i+1?'var(--verified)':step===i+1?'var(--ink)':'var(--ink-faint)'}}>0{i+1}</span><span className="iv-label" style={{color:step>=i+1?'var(--ink)':'var(--ink-muted)'}}>{s}</span></div>)}
        </div>
        <div style={{padding:32,display:'flex',flexDirection:'column',gap:24}}>
          {step===1&&<>
            <TextField label="Property address" placeholder="Flat, tower, project, locality" />
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}><Select label="Type" options={['Apartment','Villa','Independent house','Plot']} /><TextField label="Super built-up" placeholder="2,400 sq ft" /></div>
            <Checkbox>I am a buyer or NRI buying remotely — send the report to my email too.</Checkbox>
            <Button size="lg" onClick={()=>setStep(2)} iconRight={<Icon name="arrow-right" size={16}/>}>Choose a slot</Button>
          </>}
          {step===2&&<>
            <span className="iv-label" style={{color:'var(--ink-muted)'}}>Available slots · IST</span>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
              {days.map(d=><div key={d} style={{display:'flex',flexDirection:'column',gap:8}}><span className="iv-data" style={{color:'var(--ink-muted)',textAlign:'center'}}>{d}</span>
                {times.map(t=>{const id=d+' '+t;const on=slot===id;const off=(d+t).length%3===0&&t==='09:00';return <button key={t} disabled={off} onClick={()=>setSlot(id)} style={{height:40,border:'1px solid '+(on?'var(--signal)':'var(--hairline)'),background:on?'var(--signal-faint)':'var(--graphite)',color:off?'var(--ink-faint)':'var(--ink)',fontFamily:'var(--font-mono)',fontSize:13,cursor:off?'not-allowed':'pointer',borderRadius:2,textDecoration:off?'line-through':'none'}}>{t}</button>})}
              </div>)}
            </div>
            <div style={{display:'flex',gap:12}}><Button variant="secondary" onClick={()=>setStep(1)}>Back</Button><Button size="lg" disabled={!slot} onClick={pay}>{paying?'Opening Razorpay…':'Pay ₹ 4,500 with Razorpay'}</Button></div>
          </>}
          {step===3&&<div style={{display:'flex',flexDirection:'column',gap:20,alignItems:'flex-start'}}>
            <span className="iv-stamp-in"><StatusPill kind="oc" label="Booked" /></span>
            <h3 className="iv-h3" style={{margin:0}}>Inspection booked for {slot}.</h3>
            <div style={{alignSelf:'stretch'}}><DataRow label="Payment" value="pay_Oq81KX2LmA · ₹ 4,500" tone="verified" /><DataRow label="Engineer" value="Assigned 24 h before visit" /><DataRow label="Report" value="Within 48 h · PDF + walkthrough call" last /></div>
            <p className="iv-body" style={{margin:0,color:'var(--ink-muted)'}}>The fee is for the inspection only. INDVESTATE never collects a booking amount for any property.</p>
          </div>}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <span className="iv-label" style={{color:'var(--ink-muted)'}}>What we check · 140 points</span>
        <Checklist items={[{t:'Structure and cracks',d:'24 pts'},{t:'Seepage and damp',d:'18 pts'},{t:'Electrical load and earthing',d:'31 pts'},{t:'Plumbing pressure and leaks',d:'22 pts'},{t:'Doors, windows, finishes',d:'29 pts'},{t:'Documents vs. built unit',d:'16 pts'}]} />
      </div>
    </div>
  </Section>;
}
window.InspectionScreen=InspectionScreen;
