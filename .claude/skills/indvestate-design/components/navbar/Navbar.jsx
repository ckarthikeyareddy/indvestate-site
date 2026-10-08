import React from 'react';
import { Wordmark } from '../brand/Wordmark.jsx';
import { Button } from '../button/Button.jsx';
export function Navbar({links=['Drops','Inspection','NRI desk','Insights'],current,onNavigate,status=null,cta='Join the inside list',onCta,wordmarkSize=20,style}){
  return <nav className="iv-nav" style={style}>
    <a href="#" onClick={e=>{e.preventDefault();onNavigate&&onNavigate('home');}} style={{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:16}}>
      <Wordmark size={wordmarkSize} />{status}
    </a>
    <div className="iv-nav__links">
      {links.map(l=><button key={l} className="iv-nav__link" aria-current={current===l?'page':undefined} onClick={()=>onNavigate&&onNavigate(l)}>{l}</button>)}
    </div>
    {cta&&<Button size="sm" onClick={onCta}>{cta}</Button>}
  </nav>;
}
