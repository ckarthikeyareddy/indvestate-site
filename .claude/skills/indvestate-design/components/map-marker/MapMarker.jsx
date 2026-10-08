import React from 'react';
export function MapMarker({live=false,label,pulse=true,style,...rest}){
  return <span className={'iv-marker'+(live?' iv-marker--live':'')} style={style} {...rest}>
    <span className="iv-marker__dot">{pulse&&<span className="iv-marker__ring iv-pulse-ring" aria-hidden="true"></span>}</span>
    {label&&<span className="iv-marker__label">{label}</span>}
  </span>;
}
