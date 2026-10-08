import React from 'react';
import { TextField } from './TextField.jsx';
import { Select } from './Select.jsx';
import { Checkbox } from './Checkbox.jsx';
import { Button } from '../button/Button.jsx';
const BASES=['India','US','Gulf','Other'];
const CODES={India:'+91',US:'+1',Gulf:'+971',Other:'+'};
export function InsideListForm({onSubmit,title='Join the inside list',intro='One message per verified release. Documents first, price second.',style}){
  const [base,setBase]=React.useState('India');
  const [consent,setConsent]=React.useState(false);
  const [done,setDone]=React.useState(false);
  const submit=e=>{e.preventDefault();if(!consent)return;setDone(true);onSubmit&&onSubmit({base});};
  const wrap={background:'var(--carbon)',border:'1px solid var(--hairline)',padding:32,display:'flex',flexDirection:'column',gap:24,maxWidth:520,...style};
  if(done) return <div style={wrap}>
    <span className="iv-label" style={{color:'var(--verified)'}}>Received</span>
    <h3 className="iv-h3" style={{margin:0}}>You are on the inside list.</h3>
    <p className="iv-body" style={{margin:0,color:'var(--ink-muted)'}}>Expect one WhatsApp per release, with the risk memo attached. {base!=='India'&&'The NRI desk will message you in your time zone.'}</p>
  </div>;
  return <form onSubmit={submit} style={wrap}>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <span className="iv-label" style={{color:'var(--signal-ink)'}}>Inside list</span>
      <h3 className="iv-h3" style={{margin:0}}>{title}</h3>
      <p className="iv-body" style={{margin:0,color:'var(--ink-muted)'}}>{intro}</p>
    </div>
    <TextField label="Full name" placeholder="As on your PAN or passport" required />
    <div className="iv-field"><span className="iv-field__label">Based in</span>
      <div className="iv-seg" role="group">{BASES.map(b=><button type="button" key={b} aria-pressed={base===b} onClick={()=>setBase(b)}>{b}</button>)}</div>
    </div>
    <TextField label="WhatsApp number" type="tel" placeholder="98765 43210" required prefix={<input className="iv-input" readOnly value={CODES[base]} style={{width:72,textAlign:'center',fontFamily:'var(--font-mono)',fontSize:13}} aria-label="Country code" />} />
    <Select label="Budget band" options={['₹ 50 L – 1 Cr','₹ 1 – 2 Cr','₹ 2 – 5 Cr','₹ 5 Cr +']} />
    <Checkbox checked={consent} onChange={e=>setConsent(e.target.checked)}>I agree to be contacted by INDVESTATE on WhatsApp about verified releases. INDVESTATE never collects a booking amount.</Checkbox>
    <Button type="submit" block size="lg" disabled={!consent}>Join the inside list</Button>
  </form>;
}
