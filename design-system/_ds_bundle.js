/* @ds-bundle: {"format":4,"namespace":"INDVESTATEDesignSystem_26aecf","components":[{"name":"Monogram","sourcePath":"components/brand/Monogram.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"DataRow","sourcePath":"components/data-row/DataRow.jsx"},{"name":"OWNER_DISCLAIMER","sourcePath":"components/disclaimer/Disclaimer.jsx"},{"name":"Disclaimer","sourcePath":"components/disclaimer/Disclaimer.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"InsideListForm","sourcePath":"components/forms/InsideListForm.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"FounderNote","sourcePath":"components/founder-note/FounderNote.jsx"},{"name":"MapMarker","sourcePath":"components/map-marker/MapMarker.jsx"},{"name":"Navbar","sourcePath":"components/navbar/Navbar.jsx"},{"name":"PropertyCard","sourcePath":"components/property-card/PropertyCard.jsx"},{"name":"PostTemplate","sourcePath":"components/social/PostTemplate.jsx"},{"name":"ReelEndCard","sourcePath":"components/social/ReelEndCard.jsx"},{"name":"StatusPill","sourcePath":"components/status-pill/StatusPill.jsx"}],"sourceHashes":{"components/brand/Monogram.jsx":"0294eb0d893c","components/brand/Wordmark.jsx":"48e442661446","components/button/Button.jsx":"d018ce0b4a64","components/data-row/DataRow.jsx":"1ffeff82ce07","components/disclaimer/Disclaimer.jsx":"492d254883d7","components/forms/Checkbox.jsx":"6d6793d8e449","components/forms/InsideListForm.jsx":"8a39d0e1d1b5","components/forms/Select.jsx":"9472e81dc56d","components/forms/TextField.jsx":"a97e66ac80c7","components/founder-note/FounderNote.jsx":"3efaf7242458","components/map-marker/MapMarker.jsx":"484a84194f94","components/navbar/Navbar.jsx":"1adc826a5f85","components/property-card/PropertyCard.jsx":"af0d83088083","components/social/PostTemplate.jsx":"63dc30d2fe23","components/social/ReelEndCard.jsx":"89f5492eb51c","components/status-pill/StatusPill.jsx":"d80f02f01767","ui_kits/website/kit-shared.jsx":"b8da76ff5c42","ui_kits/website/screen-drop.jsx":"4057715324a7","ui_kits/website/screen-home.jsx":"ca17e4784f8c","ui_kits/website/screen-inspection.jsx":"85a8cecdce62","ui_kits/website/screen-nri.jsx":"3dbae591239e"},"inlinedExternals":[],"unexposedExports":[{"name":"builderDisclaimer","sourcePath":"components/disclaimer/Disclaimer.jsx"}]} */

(() => {

const __ds_ns = (window.INDVESTATEDesignSystem_26aecf = window.INDVESTATEDesignSystem_26aecf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Monogram.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Monogram({
  size = 48,
  filled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": "INDVESTATE",
    style: {
      width: size,
      height: size,
      display: 'inline-grid',
      placeItems: 'center',
      border: '1px solid ' + (filled ? 'var(--ink)' : 'var(--hairline-strong)'),
      background: filled ? 'var(--ink)' : 'transparent',
      color: filled ? 'var(--void)' : 'var(--ink)',
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.36,
      letterSpacing: '0.04em',
      lineHeight: 1,
      paddingLeft: '0.04em',
      flex: 'none',
      ...style
    }
  }, rest), "IV");
}
Object.assign(__ds_scope, { Monogram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Monogram.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CITY_STYLE = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--signal-ink)',
  fontWeight: 500
};
function Wordmark({
  size = 32,
  lockup = 'wordmark',
  city = 'HYDERABAD',
  tagline = 'Invest In India.',
  status = null,
  inverse = false,
  plate = false,
  style,
  ...rest
}) {
  const color = inverse ? 'var(--void)' : 'var(--ink)';
  const mark = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size,
      letterSpacing: '0.04em',
      lineHeight: 1,
      textTransform: 'uppercase',
      color,
      whiteSpace: 'nowrap',
      display: 'block'
    }
  }, "INDVESTATE");
  let body = mark;
  if (lockup === 'tagline') body = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: Math.max(6, size * 0.28)
    }
  }, mark, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: Math.max(13, size * 0.3),
      letterSpacing: '-0.01em',
      color: inverse ? 'var(--void)' : 'var(--ink-muted)'
    }
  }, tagline));
  if (lockup === 'city') body = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.max(10, size * 0.4)
    }
  }, mark, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: size * 0.9,
      background: 'var(--hairline-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: CITY_STYLE
  }, city));
  if (lockup === 'status') body = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.max(12, size * 0.5)
    }
  }, mark, status);
  const wrap = {
    display: 'inline-flex',
    ...(plate ? {
      background: 'var(--scrim)',
      padding: size * 0.6
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": "INDVESTATE",
    style: wrap
  }, rest), body);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  mono = false,
  block = false,
  icon = null,
  iconRight = null,
  href,
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  const cls = ['iv-btn', 'iv-btn--' + variant, size !== 'md' ? 'iv-btn--' + size : '', mono ? 'iv-btn--mono' : '', block ? 'iv-btn--block' : '', className].filter(Boolean).join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    className: "iv-btn__icon"
  }, icon), children, iconRight && /*#__PURE__*/React.createElement("span", {
    className: "iv-btn__icon"
  }, iconRight));
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: disabled ? undefined : href,
    "aria-disabled": disabled || undefined
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/data-row/DataRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  signal: 'var(--signal-ink)',
  verified: 'var(--verified)',
  risk: 'var(--risk)',
  saffron: 'var(--saffron-ink)'
};
function DataRow({
  label,
  value,
  tone,
  stack = false,
  last = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'iv-datarow' + (stack ? ' iv-datarow--stack' : ''),
    style: {
      ...(last ? {
        borderBottom: 0
      } : {}),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "iv-datarow__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "iv-datarow__value",
    style: tone ? {
      color: TONES[tone]
    } : undefined
  }, value));
}
Object.assign(__ds_scope, { DataRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-row/DataRow.jsx", error: String((e && e.message) || e) }); }

// components/disclaimer/Disclaimer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const OWNER_DISCLAIMER = 'Owner-listed resale property with occupancy certificate. INDVESTATE is engaged by the owner to market this property and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the registered owner after independent verification. Price and availability subject to owner confirmation.';
function builderDisclaimer(rera = 'TG RERA No. —', project = 'this project') {
  return 'Builder-direct release. ' + project + ' is registered with Telangana RERA under ' + rera + ' (rera.telangana.gov.in). INDVESTATE is engaged by the developer to market this project and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the developer\u2019s designated project account after independent verification. Price and availability subject to developer confirmation.';
}
function Disclaimer({
  variant = 'owner',
  reraNumber,
  project,
  children,
  compact = false,
  style,
  ...rest
}) {
  const text = children || (variant === 'builder' ? builderDisclaimer(reraNumber, project) : OWNER_DISCLAIMER);
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      borderTop: '1px solid var(--hairline)',
      paddingTop: compact ? 14 : 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-muted)',
      fontWeight: 500
    }
  }, "Disclaimer"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-muted)',
      textWrap: 'pretty'
    }
  }, text));
}
Object.assign(__ds_scope, { OWNER_DISCLAIMER, builderDisclaimer, Disclaimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclaimer/Disclaimer.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "iv-check"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  id,
  style,
  ...rest
}) {
  const sel = /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    className: "iv-input",
    style: style
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)));
  if (!label) return sel;
  return /*#__PURE__*/React.createElement("label", {
    className: "iv-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-field__label"
  }, label), sel);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  hint,
  error,
  id,
  prefix,
  ...rest
}) {
  const fid = id || 'f-' + (label || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return /*#__PURE__*/React.createElement("label", {
    className: "iv-field",
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "iv-field__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, prefix, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "iv-input",
    "aria-invalid": error ? true : undefined
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "iv-field__error"
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "iv-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/InsideListForm.jsx
try { (() => {
const BASES = ['India', 'US', 'Gulf', 'Other'];
const CODES = {
  India: '+91',
  US: '+1',
  Gulf: '+971',
  Other: '+'
};
function InsideListForm({
  onSubmit,
  title = 'Join the inside list',
  intro = 'One message per verified release. Documents first, price second.',
  style
}) {
  const [base, setBase] = React.useState('India');
  const [consent, setConsent] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (!consent) return;
    setDone(true);
    onSubmit && onSubmit({
      base
    });
  };
  const wrap = {
    background: 'var(--carbon)',
    border: '1px solid var(--hairline)',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 520,
    ...style
  };
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--verified)'
    }
  }, "Received"), /*#__PURE__*/React.createElement("h3", {
    className: "iv-h3",
    style: {
      margin: 0
    }
  }, "You are on the inside list."), /*#__PURE__*/React.createElement("p", {
    className: "iv-body",
    style: {
      margin: 0,
      color: 'var(--ink-muted)'
    }
  }, "Expect one WhatsApp per release, with the risk memo attached. ", base !== 'India' && 'The NRI desk will message you in your time zone.'));
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, "Inside list"), /*#__PURE__*/React.createElement("h3", {
    className: "iv-h3",
    style: {
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "iv-body",
    style: {
      margin: 0,
      color: 'var(--ink-muted)'
    }
  }, intro)), /*#__PURE__*/React.createElement(__ds_scope.TextField, {
    label: "Full name",
    placeholder: "As on your PAN or passport",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "iv-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-field__label"
  }, "Based in"), /*#__PURE__*/React.createElement("div", {
    className: "iv-seg",
    role: "group"
  }, BASES.map(b => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: b,
    "aria-pressed": base === b,
    onClick: () => setBase(b)
  }, b)))), /*#__PURE__*/React.createElement(__ds_scope.TextField, {
    label: "WhatsApp number",
    type: "tel",
    placeholder: "98765 43210",
    required: true,
    prefix: /*#__PURE__*/React.createElement("input", {
      className: "iv-input",
      readOnly: true,
      value: CODES[base],
      style: {
        width: 72,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 13
      },
      "aria-label": "Country code"
    })
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "Budget band",
    options: ['₹ 50 L – 1 Cr', '₹ 1 – 2 Cr', '₹ 2 – 5 Cr', '₹ 5 Cr +']
  }), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: consent,
    onChange: e => setConsent(e.target.checked)
  }, "I agree to be contacted by INDVESTATE on WhatsApp about verified releases. INDVESTATE never collects a booking amount."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    block: true,
    size: "lg",
    disabled: !consent
  }, "Join the inside list"));
}
Object.assign(__ds_scope, { InsideListForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InsideListForm.jsx", error: String((e && e.message) || e) }); }

// components/founder-note/FounderNote.jsx
try { (() => {
function FounderNote({
  label = 'Founder note',
  quote,
  children,
  name,
  role = 'Founder, INDVESTATE',
  date,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, label), date && /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, date)), quote && /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 28,
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      color: 'var(--ink)',
      textWrap: 'balance'
    }
  }, quote), children && /*#__PURE__*/React.createElement("div", {
    className: "iv-body",
    style: {
      color: 'var(--ink-muted)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, children), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      borderTop: '1px solid var(--hairline)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Monogram, {
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 16,
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, role))));
}
Object.assign(__ds_scope, { FounderNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/founder-note/FounderNote.jsx", error: String((e && e.message) || e) }); }

// components/map-marker/MapMarker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MapMarker({
  live = false,
  label,
  pulse = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'iv-marker' + (live ? ' iv-marker--live' : ''),
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "iv-marker__dot"
  }, pulse && /*#__PURE__*/React.createElement("span", {
    className: "iv-marker__ring iv-pulse-ring",
    "aria-hidden": "true"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "iv-marker__label"
  }, label));
}
Object.assign(__ds_scope, { MapMarker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/map-marker/MapMarker.jsx", error: String((e && e.message) || e) }); }

// components/navbar/Navbar.jsx
try { (() => {
function Navbar({
  links = ['Drops', 'Inspection', 'NRI desk', 'Insights'],
  current,
  onNavigate,
  status = null,
  cta = 'Join the inside list',
  onCta,
  wordmarkSize = 20,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "iv-nav",
    style: style
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: wordmarkSize
  }), status), /*#__PURE__*/React.createElement("div", {
    className: "iv-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: "iv-nav__link",
    "aria-current": current === l ? 'page' : undefined,
    onClick: () => onNavigate && onNavigate(l)
  }, l))), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onCta
  }, cta));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navbar/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/social/ReelEndCard.jsx
try { (() => {
function ReelEndCard({
  cta = 'DM "MEMO" for the risk memo',
  line = 'Verified before it is visible.',
  city,
  handle = '@indvestate',
  scale = 0.3,
  overFootage = false,
  media
}) {
  const W = 1080,
    H = 1920;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W * scale,
      height: H * scale,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: overFootage ? '' : 'iv-plus-grid',
    style: {
      width: W,
      height: H,
      transform: 'scale(' + scale + ')',
      transformOrigin: '0 0',
      background: overFootage ? 'var(--graphite)' : 'var(--void)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 56,
      boxSizing: 'border-box',
      border: '1px solid var(--hairline)'
    }
  }, overFootage && media && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 40,
      background: overFootage ? 'var(--scrim)' : 'transparent',
      padding: overFootage ? 72 : 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: 92,
    lockup: city ? 'city' : 'wordmark',
    city: city
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 44,
      letterSpacing: '-0.01em',
      color: 'var(--ink-muted)'
    }
  }, "Invest In India.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 220,
      left: 120,
      right: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 28,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: '100%',
      height: 1,
      background: 'var(--hairline-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 600,
      fontSize: 56,
      letterSpacing: '-0.02em',
      color: 'var(--ink)'
    }
  }, cta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--signal-ink)'
    }
  }, line, " \xB7 ", handle.toUpperCase()))));
}
Object.assign(__ds_scope, { ReelEndCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/ReelEndCard.jsx", error: String((e && e.message) || e) }); }

// components/status-pill/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const KINDS = {
  'live-drop': {
    label: 'Live drop',
    tone: 'live',
    dot: true
  },
  'coming-soon': {
    label: 'Coming soon',
    tone: 'neutral'
  },
  'oc': {
    label: 'OC received',
    tone: 'verified',
    tick: true
  },
  'rera': {
    label: 'TG RERA No.',
    tone: 'signal'
  },
  'approved': {
    label: 'HMDA approved',
    tone: 'verified',
    tick: true
  },
  'dtcp': {
    label: 'DTCP approved',
    tone: 'verified',
    tick: true
  },
  'bank-loan': {
    label: 'Bank loan approved',
    tone: 'verified',
    tick: true
  },
  'owner-listed': {
    label: 'Owner-listed',
    tone: 'neutral'
  },
  'nri-ready': {
    label: 'NRI ready',
    tone: 'signal'
  },
  'risk': {
    label: 'Risk flagged',
    tone: 'risk'
  }
};
function StatusPill({
  kind = 'owner-listed',
  label,
  value,
  tone,
  dot,
  tick,
  style,
  ...rest
}) {
  const k = KINDS[kind] || {
    label: kind,
    tone: 'neutral'
  };
  const tn = tone || k.tone;
  const showDot = dot ?? k.dot;
  const showTick = tick ?? k.tick;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'iv-pill' + (tn !== 'neutral' ? ' iv-pill--' + tn : ''),
    style: style
  }, rest), showDot && /*#__PURE__*/React.createElement("span", {
    className: "iv-pill__dot",
    "aria-hidden": "true"
  }), showTick && /*#__PURE__*/React.createElement("span", {
    className: "iv-pill__tick",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, label || k.label), value && /*#__PURE__*/React.createElement("span", {
    className: "iv-pill__value"
  }, value));
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status-pill/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/property-card/PropertyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PropertyCard({
  statuses = [],
  kicker,
  title,
  location,
  media,
  mediaLabel = 'Media — owner-supplied photo',
  data = [],
  price,
  priceNote,
  cta = 'WhatsApp the desk',
  ctaHref = '#',
  onCta,
  variant = 'owner',
  reraNumber,
  project,
  compactDisclaimer = true,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      padding: '16px 20px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, statuses.map((s, i) => /*#__PURE__*/React.createElement(__ds_scope.StatusPill, _extends({
    key: i
  }, typeof s === 'string' ? {
    kind: s
  } : s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h3", {
    className: "iv-h3",
    style: {
      margin: 0,
      color: 'var(--ink)'
    }
  }, title), location && /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, location)), /*#__PURE__*/React.createElement("div", {
    className: "iv-plus-grid",
    style: {
      aspectRatio: '16 / 10',
      background: 'var(--graphite)',
      borderTop: '1px solid var(--hairline)',
      borderBottom: '1px solid var(--hairline)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, media ? typeof media === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: media,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : media : /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      color: 'var(--ink-muted)'
    }
  }, mediaLabel)), data.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + Math.min(data.length, 3) + ', minmax(0,1fr))',
      columnGap: 16,
      padding: '4px 20px 0'
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement(__ds_scope.DataRow, {
    key: i,
    stack: true,
    label: d.label,
    value: d.value,
    tone: d.tone
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-price",
    style: {
      color: 'var(--ink)'
    }
  }, price), priceNote && /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, priceNote)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    href: ctaHref,
    onClick: onCta,
    iconRight: /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2197")
  }, cta)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px 20px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Disclaimer, {
    variant: variant,
    reraNumber: reraNumber,
    project: project,
    compact: compactDisclaimer
  })));
}
Object.assign(__ds_scope, { PropertyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/property-card/PropertyCard.jsx", error: String((e && e.message) || e) }); }

// components/social/PostTemplate.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PostTemplate({
  kicker = 'DROP 01 — SOUTHLINE',
  headline = 'Land moves before the market notices.',
  body,
  secondary,
  statuses = [],
  city = 'HYDERABAD',
  handle = '@indvestate',
  media,
  scale = 0.5,
  theme = 'dark'
}) {
  const W = 1080,
    H = 1350;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W * scale,
      height: H * scale,
      overflow: 'hidden',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-theme": theme,
    className: "iv-plus-grid",
    style: {
      width: W,
      height: H,
      transform: 'scale(' + scale + ')',
      transformOrigin: '0 0',
      background: 'var(--void)',
      color: 'var(--ink)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      padding: 80,
      boxSizing: 'border-box',
      border: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    lockup: "city",
    city: city,
    size: 34
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      letterSpacing: '0.18em',
      color: 'var(--ink-muted)'
    }
  }, handle.toUpperCase())), media && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      height: 520,
      background: 'var(--graphite)',
      border: '1px solid var(--hairline)',
      overflow: 'hidden'
    }
  }, typeof media === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: media,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : media), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, statuses.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      zoom: 1.8
    }
  }, statuses.map((s, i) => /*#__PURE__*/React.createElement(__ds_scope.StatusPill, _extends({
    key: i
  }, typeof s === 'string' ? {
    kind: s
  } : s)))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 24,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--signal-ink)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontWeight: 600,
      fontSize: media ? 76 : 104,
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      textWrap: 'balance'
    }
  }, headline), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 32,
      lineHeight: 1.45,
      color: 'var(--ink-muted)',
      maxWidth: 860
    }
  }, body), secondary && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 34,
      lineHeight: 1.4,
      color: 'var(--ink)'
    }
  }, secondary), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--hairline)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-muted)'
    }
  }, "Verified before it is visible."))));
}
Object.assign(__ds_scope, { PostTemplate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/PostTemplate.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/kit-shared.jsx
try { (() => {
const DS = window.INDVESTATEDesignSystem_26aecf;
function Icon({
  name,
  size = 20,
  stroke = 1.5,
  color = 'currentColor',
  style
}) {
  const key = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  const node = window.lucide && window.lucide.icons[key];
  if (!node) return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      display: 'inline-block'
    }
  });
  const kids = Array.isArray(node[0]) ? node : node[2] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none',
      ...style
    }
  }, kids.map(([t, a], i) => React.createElement(t, {
    key: i,
    ...a
  })));
}
function Section({
  label,
  title,
  intro,
  children,
  grid = false,
  style,
  id
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: grid ? 'iv-grid-bg' : '',
    style: {
      padding: '64px 0',
      borderTop: '1px solid var(--hairline)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, (label || title) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 720
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, label), title && /*#__PURE__*/React.createElement("h2", {
    className: "iv-h2",
    style: {
      margin: 0
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    className: "iv-body-lg",
    style: {
      margin: 0,
      color: 'var(--ink-muted)'
    }
  }, intro)), children));
}
function Reveal({
  i = 0,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "iv-reveal",
    style: {
      '--i': i,
      ...style
    }
  }, children);
}
function MediaFrame({
  label,
  ratio = '16 / 10',
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "iv-plus-grid",
    style: {
      aspectRatio: ratio,
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, children, label && /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      color: 'var(--ink-muted)'
    }
  }, label));
}
function CountUp({
  to,
  dur = 1400,
  format = n => n.toLocaleString('en-IN')
}) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to);
      return;
    }
    let s = performance.now(),
      r;
    const f = t => {
      const p = Math.min(1, (t - s) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) r = requestAnimationFrame(f);
    };
    r = requestAnimationFrame(f);
    return () => cancelAnimationFrame(r);
  }, [to]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, format(v));
}
function Checklist({
  items
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "iv-check-in",
    style: {
      '--i': i,
      display: 'grid',
      gridTemplateColumns: '20px 1fr auto',
      gap: 12,
      alignItems: 'baseline',
      padding: '12px 0',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.risk ? 'triangle-alert' : 'check',
    size: 16,
    color: it.risk ? 'var(--risk)' : 'var(--verified)',
    style: {
      transform: 'translateY(3px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, it.t), /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, it.d))));
}
function Footer({
  go
}) {
  const {
    Wordmark
  } = DS;
  const col = (h, ls) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, h), ls.map(([l, r]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      r && go(r);
    },
    style: {
      textDecoration: 'none',
      color: 'var(--ink)',
      fontSize: 15
    }
  }, l)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--hairline)',
      padding: '64px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    lockup: "tagline",
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, "Verified before it is visible.")), col('Access', [['Drops', 'Drops'], ['Inside list', 'home'], ['NRI desk', 'NRI desk']]), col('Services', [['Home inspection', 'Inspection'], ['Buyer concierge', 'NRI desk'], ['Reel + distribution', null]]), col('Follow', [['Instagram · @indvestate', null], ['Hyderabad · @indvestate.hyd', null], ['WhatsApp desk', null]])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap',
      borderTop: '1px solid var(--hairline)',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-caption"
  }, "INDVESTATE does not collect booking amounts. All payments go directly to the registered owner or developer."), /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "HYDERABAD \xB7 17.3850\xB0 N, 78.4867\xB0 E"))));
}
const DROP01 = {
  statuses: ['live-drop', 'oc', 'bank-loan', 'owner-listed', 'nri-ready'],
  kicker: 'DROP 01 — SOUTHLINE',
  title: '3 BHK, east-facing, 11th floor',
  location: 'Kokapet · Gandipet (M) · Hyderabad',
  data: [{
    label: 'Carpet',
    value: '1,860 sq ft'
  }, {
    label: 'Super built',
    value: '2,400 sq ft'
  }, {
    label: 'EC',
    value: '1983–2026',
    tone: 'verified'
  }],
  price: '₹ 1.42 Cr',
  priceNote: '₹ 5,917 / sq ft · owner-confirmed 06 Oct'
};
Object.assign(window, {
  Icon,
  Section,
  Reveal,
  MediaFrame,
  CountUp,
  Checklist,
  Footer,
  DROP01
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/kit-shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screen-drop.jsx
try { (() => {
function DropScreen({
  go
}) {
  const {
    Button,
    StatusPill,
    DataRow,
    Disclaimer,
    MapMarker,
    FounderNote
  } = DS;
  const [tab, setTab] = React.useState('memo');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '48px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      color: 'var(--ink-muted)'
    }
  }, "Drops"), " / 01 / Southline"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, DROP01.statuses.map(s => /*#__PURE__*/React.createElement(StatusPill, {
    key: s,
    kind: s
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display-boxed)',
      fontSize: 32,
      letterSpacing: '0.04em'
    }
  }, "DROP 01"), /*#__PURE__*/React.createElement("h1", {
    className: "iv-h1",
    style: {
      margin: 0,
      fontSize: 48
    }
  }, "3 BHK, east-facing, 11th floor. Kokapet.")), /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "17.3850\xB0 N, 78.4867\xB0 E \xB7 2,400 sq ft \xB7 EC 1983\u20132026")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '32px 0 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 380px',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "4 / 3",
    label: "Living room \xB7 owner photo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "auto",
    style: {
      height: '100%'
    },
    label: "Balcony"
  }), /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "auto",
    style: {
      height: '100%'
    },
    label: "Site walk \xB7 reel"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--hairline)'
    }
  }, [['memo', 'Risk memo'], ['docs', 'Documents'], ['location', 'Location logic']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      all: 'unset',
      cursor: 'pointer',
      padding: '12px 16px',
      fontSize: 15,
      color: tab === k ? 'var(--ink)' : 'var(--ink-muted)',
      borderBottom: '1px solid ' + (tab === k ? 'var(--ink)' : 'transparent'),
      marginBottom: -1
    }
  }, l))), tab === 'memo' && /*#__PURE__*/React.createElement(Checklist, {
    items: [{
      t: 'Title chain traced to 1983 with no break',
      d: 'EC 1983–2026'
    }, {
      t: 'Occupancy certificate issued',
      d: 'GHMC · 2019'
    }, {
      t: 'Unit pre-approved by two lenders',
      d: 'SBI · HDFC'
    }, {
      t: 'Resale comps within 4% of ask',
      d: '6 units · 18 mo'
    }, {
      t: 'Society maintenance dues outstanding',
      d: '₹ 38,400',
      risk: true
    }]
  }), tab === 'docs' && /*#__PURE__*/React.createElement("div", null, [['Sale deed', 'Doc 4417/2019 · SRO Gandipet'], ['Occupancy certificate', 'GHMC/OC/2019/0981'], ['Encumbrance', '1983–2026 · nil'], ['Survey No.', '214/A, 214/B · Kokapet (V)'], ['Property tax', 'Paid to Mar 2026']].map(([l, v], i, a) => /*#__PURE__*/React.createElement(DataRow, {
    key: l,
    label: l,
    value: v,
    tone: i === 2 ? 'verified' : undefined,
    last: i === a.length - 1
  }))), tab === 'location' && /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "16 / 9",
    label: "Location logic \xB7 3D map preview"
  }, /*#__PURE__*/React.createElement(MapMarker, {
    live: true,
    style: {
      position: 'absolute',
      left: '46%',
      top: '48%'
    },
    label: "Drop 01"
  }), /*#__PURE__*/React.createElement(MapMarker, {
    style: {
      position: 'absolute',
      left: '20%',
      top: '26%'
    },
    label: "ORR 900 m",
    pulse: false
  }), /*#__PURE__*/React.createElement(MapMarker, {
    style: {
      position: 'absolute',
      left: '72%',
      top: '30%'
    },
    label: "FD 2.1 km",
    pulse: false
  })), /*#__PURE__*/React.createElement(FounderNote, {
    label: "Why it passed",
    quote: "The comps hold, the title is clean, and two banks will lend on it. That is the bar.",
    name: "Founder",
    date: "06 OCT 2026"
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 88,
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "Owner asking"), /*#__PURE__*/React.createElement("span", {
    className: "iv-price"
  }, "\u20B9 1.42 Cr"), /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "\u20B9 5,917 / sq ft \xB7 \u2248 US$ 170,000")), /*#__PURE__*/React.createElement("div", null, [['Carpet', '1,860 sq ft'], ['Floor', '11 of 18'], ['Facing', 'East'], ['Parking', '2 covered']].map(([l, v], i, a) => /*#__PURE__*/React.createElement(DataRow, {
    key: l,
    label: l,
    value: v,
    last: i === a.length - 1
  }))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-check",
      size: 16
    })
  }, "Book a site visit"), /*#__PURE__*/React.createElement(Button, {
    block: true,
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "WhatsApp the desk"), /*#__PURE__*/React.createElement(Disclaimer, {
    compact: true
  })))));
}
window.DropScreen = DropScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screen-drop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screen-home.jsx
try { (() => {
function HeroWord() {
  const words = ['market', 'crowd', 'headlines', 'brokers'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI(x => (x + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-block',
      animation: 'iv-reveal 600ms var(--ease-out) both',
      color: 'var(--ink)',
      borderBottom: '2px solid var(--signal)'
    }
  }, words[i]));
}
function HomeScreen({
  go
}) {
  const {
    Button,
    PropertyCard,
    MapMarker,
    InsideListForm,
    FounderNote,
    DataRow
  } = DS;
  const services = [['Drops', 'Owner-direct and builder-direct releases. Every one with OC, RERA and bank-loan approval on file.', 'layers', 'Drops'], ['Buyer concierge', 'Shortlists, site visits and negotiation, handled by one desk. NRI desk for US and Gulf buyers.', 'compass', 'NRI desk'], ['Home inspection', 'A 140-point inspection report before you sign. Bookable online.', 'scan-search', 'Inspection'], ['Reel + distribution', 'Owners and builders: we film, verify and distribute to an audience that already trusts the checks.', 'route', null], ['Data products', '3D Hyderabad map, parcel histories and corridor reads. In development.', 'map', null]];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "iv-grid-bg",
    style: {
      padding: '96px 0 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    i: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, "Land intelligence \xB7 Hyderabad")), /*#__PURE__*/React.createElement(Reveal, {
    i: 1
  }, /*#__PURE__*/React.createElement("h1", {
    className: "iv-h1",
    style: {
      margin: 0
    }
  }, "Land moves before the ", /*#__PURE__*/React.createElement(HeroWord, null), " notices.")), /*#__PURE__*/React.createElement(Reveal, {
    i: 2
  }, /*#__PURE__*/React.createElement("p", {
    className: "iv-body-lg",
    style: {
      margin: 0,
      color: 'var(--ink-muted)',
      maxWidth: 520
    }
  }, "We study the ground, reject most of what we see, and open access only when the paperwork, location logic and exit all hold.")), /*#__PURE__*/React.createElement(Reveal, {
    i: 3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('Drops')
  }, "See Drop 01"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('Drops'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "How we filter")))), /*#__PURE__*/React.createElement(Reveal, {
    i: 2
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "5 / 4",
    label: "Corridor read \xB7 West Hyderabad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "iv-drift",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(MapMarker, {
    style: {
      position: 'absolute',
      left: '22%',
      top: '30%'
    },
    label: "ORR exit 18"
  }), /*#__PURE__*/React.createElement(MapMarker, {
    style: {
      position: 'absolute',
      left: '64%',
      top: '22%'
    },
    pulse: false
  }), /*#__PURE__*/React.createElement(MapMarker, {
    style: {
      position: 'absolute',
      left: '70%',
      top: '62%'
    },
    label: "Metro Ph-II",
    pulse: false
  }), /*#__PURE__*/React.createElement(MapMarker, {
    live: true,
    style: {
      position: 'absolute',
      left: '40%',
      top: '52%'
    },
    label: "Drop 01 \xB7 Kokapet"
  })), /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      position: 'absolute',
      right: 16,
      top: 14,
      color: 'var(--ink-muted)'
    }
  }, "17.4065\xB0 N, 78.3410\xB0 E")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '64px auto 0',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      borderTop: '1px solid var(--hairline)'
    }
  }, [['Parcels studied this quarter', 44], ['Passed every check', 3], ['Booking amounts collected', 0]].map(([l, n], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: '24px 24px 0 ' + (i ? 24 : 0) + 'px',
      borderLeft: i ? '1px solid var(--hairline)' : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-price",
    style: {
      fontSize: 36
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    to: n
  })), /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement(Section, {
    label: "Live drop",
    title: "Drop 01 passed. Here is what we checked.",
    intro: "Most opportunities do not pass. This one cleared title, approvals, location logic and exit."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(PropertyCard, DROP01), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "Risk memo \xB7 summary"), /*#__PURE__*/React.createElement(Checklist, {
    items: [{
      t: 'Title chain clean since 1983',
      d: 'EC 1983–2026'
    }, {
      t: 'Occupancy certificate on file',
      d: 'GHMC · 2019'
    }, {
      t: 'Two banks pre-approved the unit',
      d: 'SBI · HDFC'
    }, {
      t: 'Resale comps within 4%',
      d: '6 units, 18 mo'
    }, {
      t: 'Society dues pending',
      d: '₹ 38,400 · owner to clear',
      risk: true
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('Drops'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Read the full risk memo")))), /*#__PURE__*/React.createElement(Section, {
    label: "Services",
    title: "One desk. Five ways in."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
      border: '1px solid var(--hairline)'
    }
  }, services.map(([t, d, ic, r], i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => r && go(r),
    style: {
      all: 'unset',
      cursor: r ? 'pointer' : 'default',
      padding: 24,
      borderLeft: i ? '1px solid var(--hairline)' : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 220,
      background: 'var(--void)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--carbon)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--void)'
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    color: "var(--signal)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '-0.02em'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-muted)'
    }
  }, d), !r && /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      marginTop: 'auto',
      color: 'var(--ink-faint)'
    }
  }, "Coming"))))), /*#__PURE__*/React.createElement(Section, {
    label: "Inside list",
    title: "Documents first. Price second.",
    intro: "One WhatsApp per verified release, with the risk memo attached. Nothing else."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(InsideListForm, {
    style: {
      maxWidth: 'none'
    }
  }), /*#__PURE__*/React.createElement(FounderNote, {
    quote: "Scarcity is a byproduct, not a tool. We release when the paperwork is done, not when a campaign needs a deadline.",
    name: "Founder",
    date: "08 OCT 2026"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Seventy per cent of what we publish is education. If you only ever read our rejections, you will still buy better.")))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screen-home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screen-inspection.jsx
try { (() => {
function InspectionScreen() {
  const {
    Button,
    TextField,
    Select,
    Checkbox,
    StatusPill,
    DataRow
  } = DS;
  const [step, setStep] = React.useState(1);
  const [slot, setSlot] = React.useState(null);
  const [paying, setPaying] = React.useState(false);
  const days = ['Thu 09', 'Fri 10', 'Sat 11', 'Sun 12', 'Mon 13'];
  const times = ['09:00', '11:30', '14:00', '16:30'];
  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setStep(3);
    }, 1400);
  };
  const steps = ['Property', 'Slot', 'Pay'];
  return /*#__PURE__*/React.createElement(Section, {
    label: "Home inspection",
    title: "Inspect before you sign.",
    intro: "A licensed engineer checks structure, seepage, electricals, plumbing and documents against the unit. You get a written report in 48 hours."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      padding: '14px 20px',
      borderLeft: i ? '1px solid var(--hairline)' : 0,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      background: step === i + 1 ? 'var(--void)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: step > i + 1 ? 'var(--verified)' : step === i + 1 ? 'var(--ink)' : 'var(--ink-faint)'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: step >= i + 1 ? 'var(--ink)' : 'var(--ink-muted)'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, {
    label: "Property address",
    placeholder: "Flat, tower, project, locality"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Type",
    options: ['Apartment', 'Villa', 'Independent house', 'Plot']
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Super built-up",
    placeholder: "2,400 sq ft"
  })), /*#__PURE__*/React.createElement(Checkbox, null, "I am a buyer or NRI buying remotely \u2014 send the report to my email too."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => setStep(2),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Choose a slot")), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "Available slots \xB7 IST"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 8
    }
  }, days.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-data",
    style: {
      color: 'var(--ink-muted)',
      textAlign: 'center'
    }
  }, d), times.map(t => {
    const id = d + ' ' + t;
    const on = slot === id;
    const off = (d + t).length % 3 === 0 && t === '09:00';
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      disabled: off,
      onClick: () => setSlot(id),
      style: {
        height: 40,
        border: '1px solid ' + (on ? 'var(--signal)' : 'var(--hairline)'),
        background: on ? 'var(--signal-faint)' : 'var(--graphite)',
        color: off ? 'var(--ink-faint)' : 'var(--ink)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        cursor: off ? 'not-allowed' : 'pointer',
        borderRadius: 2,
        textDecoration: off ? 'line-through' : 'none'
      }
    }, t);
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setStep(1)
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    disabled: !slot,
    onClick: pay
  }, paying ? 'Opening Razorpay…' : 'Pay ₹ 4,500 with Razorpay'))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-stamp-in"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    kind: "oc",
    label: "Booked"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "iv-h3",
    style: {
      margin: 0
    }
  }, "Inspection booked for ", slot, "."), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(DataRow, {
    label: "Payment",
    value: "pay_Oq81KX2LmA \xB7 \u20B9 4,500",
    tone: "verified"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Engineer",
    value: "Assigned 24 h before visit"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Report",
    value: "Within 48 h \xB7 PDF + walkthrough call",
    last: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "iv-body",
    style: {
      margin: 0,
      color: 'var(--ink-muted)'
    }
  }, "The fee is for the inspection only. INDVESTATE never collects a booking amount for any property.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, "What we check \xB7 140 points"), /*#__PURE__*/React.createElement(Checklist, {
    items: [{
      t: 'Structure and cracks',
      d: '24 pts'
    }, {
      t: 'Seepage and damp',
      d: '18 pts'
    }, {
      t: 'Electrical load and earthing',
      d: '31 pts'
    }, {
      t: 'Plumbing pressure and leaks',
      d: '22 pts'
    }, {
      t: 'Doors, windows, finishes',
      d: '29 pts'
    }, {
      t: 'Documents vs. built unit',
      d: '16 pts'
    }]
  }))));
}
window.InspectionScreen = InspectionScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screen-inspection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screen-nri.jsx
try { (() => {
function Clock({
  city,
  tz
}) {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => {
    const i = setInterval(() => setT(new Date()), 30000);
    return () => clearInterval(i);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '20px 24px',
      borderLeft: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--ink-muted)'
    }
  }, city), /*#__PURE__*/React.createElement("span", {
    className: "iv-price",
    style: {
      fontSize: 32
    }
  }, t.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: tz
  })));
}
function NriScreen() {
  const {
    InsideListForm,
    DataRow,
    Button
  } = DS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    grid: true,
    label: "NRI desk \xB7 US / Gulf",
    title: "Buying in Hyderabad from Dallas or Dubai.",
    intro: "Forty per cent of our buyers are abroad. The desk runs video site visits, PoA, NRE/NRO payments and registration \u2014 in your time zone."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      border: '1px solid var(--hairline)',
      background: 'var(--void)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, "Desk hours"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--ink-muted)'
    }
  }, "07:00\u201323:00 IST, seven days")), /*#__PURE__*/React.createElement(Clock, {
    city: "Hyderabad",
    tz: "Asia/Kolkata"
  }), /*#__PURE__*/React.createElement(Clock, {
    city: "Dallas",
    tz: "America/Chicago"
  }), /*#__PURE__*/React.createElement(Clock, {
    city: "Dubai",
    tz: "Asia/Dubai"
  }))), /*#__PURE__*/React.createElement(Section, {
    label: "What the desk handles",
    title: "Every step you cannot do from abroad."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, [['Video site visit', 'Live, unedited, on your schedule'], ['Power of attorney', 'Drafted, notarised, consulate-ready'], ['Payments', 'NRE / NRO routing · FEMA-compliant'], ['Home loan', 'NRI lenders pre-checked per unit'], ['Registration', 'Attended by PoA holder at SRO'], ['After purchase', 'Rental, maintenance, resale']].map(([l, v], i, a) => /*#__PURE__*/React.createElement(DataRow, {
    key: l,
    label: l,
    value: v,
    last: i === a.length - 1
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--carbon)',
      border: '1px solid var(--hairline)',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "iv-label",
    style: {
      color: 'var(--signal-ink)'
    }
  }, "English \xB7 \u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1.3,
      letterSpacing: '-0.02em'
    }
  }, "We say what was checked, not what is promised."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontWeight: 500,
      fontSize: 22,
      lineHeight: 1.5,
      color: 'var(--ink-muted)'
    }
  }, "\u0C2E\u0C47\u0C2E\u0C41 \u0C0F\u0C2E\u0C3F \u0C24\u0C28\u0C3F\u0C16\u0C40 \u0C1A\u0C47\u0C36\u0C3E\u0C2E\u0C4B \u0C1A\u0C46\u0C2C\u0C41\u0C24\u0C3E\u0C2E\u0C41, \u0C0F\u0C2E\u0C3F \u0C39\u0C3E\u0C2E\u0C40 \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C4B \u0C15\u0C3E\u0C26\u0C41."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    }),
    style: {
      alignSelf: 'flex-start'
    }
  }, "Schedule a desk call")))), /*#__PURE__*/React.createElement(Section, {
    label: "Inside list",
    title: "Get the risk memo before the release."
  }, /*#__PURE__*/React.createElement(InsideListForm, {
    title: "Join the NRI inside list",
    intro: "Pick US or Gulf and the desk replies in your morning."
  })));
}
window.NriScreen = NriScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screen-nri.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Monogram = __ds_scope.Monogram;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DataRow = __ds_scope.DataRow;

__ds_ns.OWNER_DISCLAIMER = __ds_scope.OWNER_DISCLAIMER;

__ds_ns.Disclaimer = __ds_scope.Disclaimer;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.InsideListForm = __ds_scope.InsideListForm;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.FounderNote = __ds_scope.FounderNote;

__ds_ns.MapMarker = __ds_scope.MapMarker;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.PropertyCard = __ds_scope.PropertyCard;

__ds_ns.PostTemplate = __ds_scope.PostTemplate;

__ds_ns.ReelEndCard = __ds_scope.ReelEndCard;

__ds_ns.StatusPill = __ds_scope.StatusPill;

})();
