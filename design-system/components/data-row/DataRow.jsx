import React from 'react';
const TONES={signal:'var(--signal-ink)',verified:'var(--verified)',risk:'var(--risk)',saffron:'var(--saffron-ink)'};
export function DataRow({label,value,tone,stack=false,last=false,style,...rest}){
  return <div className={'iv-datarow'+(stack?' iv-datarow--stack':'')} style={{...(last?{borderBottom:0}:{}),...style}} {...rest}>
    <span className="iv-datarow__label">{label}</span>
    <span className="iv-datarow__value" style={tone?{color:TONES[tone]}:undefined}>{value}</span>
  </div>;
}
