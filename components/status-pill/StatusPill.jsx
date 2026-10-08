import React from 'react';
const KINDS={
  'live-drop':{label:'Live drop',tone:'live',dot:true},
  'coming-soon':{label:'Coming soon',tone:'neutral'},
  'oc':{label:'OC received',tone:'verified',tick:true},
  'rera':{label:'TG RERA No.',tone:'signal'},
  'approved':{label:'HMDA approved',tone:'verified',tick:true},
  'dtcp':{label:'DTCP approved',tone:'verified',tick:true},
  'bank-loan':{label:'Bank loan approved',tone:'verified',tick:true},
  'owner-listed':{label:'Owner-listed',tone:'neutral'},
  'nri-ready':{label:'NRI ready',tone:'signal'},
  'risk':{label:'Risk flagged',tone:'risk'}
};
export function StatusPill({kind='owner-listed',label,value,tone,dot,tick,style,...rest}){
  const k=KINDS[kind]||{label:kind,tone:'neutral'};
  const tn=tone||k.tone;const showDot=dot??k.dot;const showTick=tick??k.tick;
  return <span className={'iv-pill'+(tn!=='neutral'?' iv-pill--'+tn:'')} style={style} {...rest}>
    {showDot&&<span className="iv-pill__dot" aria-hidden="true"></span>}
    {showTick&&<span className="iv-pill__tick" aria-hidden="true"></span>}
    <span>{label||k.label}</span>
    {value&&<span className="iv-pill__value">{value}</span>}
  </span>;
}
