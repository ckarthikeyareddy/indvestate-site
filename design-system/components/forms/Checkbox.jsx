import React from 'react';
export function Checkbox({children,...rest}){
  return <label className="iv-check"><input type="checkbox" {...rest} /><span>{children}</span></label>;
}
