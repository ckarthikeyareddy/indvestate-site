import React from 'react';
export const OWNER_DISCLAIMER='Owner-listed resale property with occupancy certificate. INDVESTATE is engaged by the owner to market this property and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the registered owner after independent verification. Price and availability subject to owner confirmation.';
export function builderDisclaimer(rera='TG RERA No. —',project='this project'){return 'Builder-direct release. '+project+' is registered with Telangana RERA under '+rera+' (rera.telangana.gov.in). INDVESTATE is engaged by the developer to market this project and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the developer\u2019s designated project account after independent verification. Price and availability subject to developer confirmation.';}
export function Disclaimer({variant='owner',reraNumber,project,children,compact=false,style,...rest}){
  const text=children||(variant==='builder'?builderDisclaimer(reraNumber,project):OWNER_DISCLAIMER);
  return <aside style={{borderTop:'1px solid var(--hairline)',paddingTop:compact?14:20,display:'flex',flexDirection:'column',gap:8,...style}} {...rest}>
    <span style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--ink-muted)',fontWeight:500}}>Disclaimer</span>
    <p style={{margin:0,fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.6,color:'var(--ink-muted)',textWrap:'pretty'}}>{text}</p>
  </aside>;
}
