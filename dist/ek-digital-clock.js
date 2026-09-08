/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = globalThis, Wt = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pt = Symbol(), sn = /* @__PURE__ */ new WeakMap();
let Qn = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== Pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Wt && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = sn.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && sn.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _i = (t) => new Qn(typeof t == "string" ? t : t + "", void 0, Pt), Xn = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[r + 1], t[0]);
  return new Qn(n, t, Pt);
}, ki = (t, e) => {
  if (Wt) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Xe.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, rn = Wt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return _i(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bi, defineProperty: Si, getOwnPropertyDescriptor: Ti, getOwnPropertyNames: $i, getOwnPropertySymbols: Ei, getPrototypeOf: Oi } = Object, Y = globalThis, an = Y.trustedTypes, Mi = an ? an.emptyScript : "", Di = Y.reactiveElementPolyfillSupport, Ae = (t, e) => t, st = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Mi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Ut = (t, e) => !bi(t, e), on = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Y.litPropertyMetadata ?? (Y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = on) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && Si(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: r } = Ti(this.prototype, e) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      r?.call(this, a), this.requestUpdate(e, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? on;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ae("elementProperties"))) return;
    const e = Oi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ae("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ae("properties"))) {
      const n = this.properties, s = [...$i(n), ...Ei(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) n.unshift(rn(i));
    } else e !== void 0 && n.push(rn(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ki(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$ET(e, n) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : st).toAttribute(n, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : st;
      this._$Em = i;
      const o = a.fromAttribute(n, r.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? Ut)(r, n) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? n ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: a } = r, o = this[i];
        a !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, r, o);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[Ae("elementProperties")] = /* @__PURE__ */ new Map(), ce[Ae("finalized")] = /* @__PURE__ */ new Map(), Di?.({ ReactiveElement: ce }), (Y.reactiveElementVersions ?? (Y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = globalThis, ln = (t) => t, it = Ne.trustedTypes, un = it ? it.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, es = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, ts = "?" + j, xi = `<${ts}>`, se = document, Ve = () => se.createComment(""), ze = (t) => t === null || typeof t != "object" && typeof t != "function", Ht = Array.isArray, Ai = (t) => Ht(t) || typeof t?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, $e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, cn = /-->/g, dn = />/g, Q = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), hn = /'/g, fn = /"/g, ns = /^(?:script|style|textarea|title)$/i, Ni = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), B = Ni(1), U = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), mn = /* @__PURE__ */ new WeakMap(), te = se.createTreeWalker(se, 129);
function ss(t, e) {
  if (!Ht(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return un !== void 0 ? un.createHTML(e) : e;
}
const Ii = (t, e) => {
  const n = t.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = $e;
  for (let o = 0; o < n; o++) {
    const l = t[o];
    let u, d, c = -1, y = 0;
    for (; y < l.length && (a.lastIndex = y, d = a.exec(l), d !== null); ) y = a.lastIndex, a === $e ? d[1] === "!--" ? a = cn : d[1] !== void 0 ? a = dn : d[2] !== void 0 ? (ns.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = Q) : d[3] !== void 0 && (a = Q) : a === Q ? d[0] === ">" ? (a = i ?? $e, c = -1) : d[1] === void 0 ? c = -2 : (c = a.lastIndex - d[2].length, u = d[1], a = d[3] === void 0 ? Q : d[3] === '"' ? fn : hn) : a === fn || a === hn ? a = Q : a === cn || a === dn ? a = $e : (a = Q, i = void 0);
    const f = a === Q && t[o + 1].startsWith("/>") ? " " : "";
    r += a === $e ? l + xi : c >= 0 ? (s.push(u), l.slice(0, c) + es + l.slice(c) + j + f) : l + j + (c === -2 ? o : f);
  }
  return [ss(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Fe {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, l = this.parts, [u, d] = Ii(e, n);
    if (this.el = Fe.createElement(u, s), te.currentNode = this.el.content, n === 2 || n === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = te.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(es)) {
          const y = d[a++], f = i.getAttribute(c).split(j), w = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: r, name: w[2], strings: f, ctor: w[1] === "." ? Vi : w[1] === "?" ? zi : w[1] === "@" ? Fi : ut }), i.removeAttribute(c);
        } else c.startsWith(j) && (l.push({ type: 6, index: r }), i.removeAttribute(c));
        if (ns.test(i.tagName)) {
          const c = i.textContent.split(j), y = c.length - 1;
          if (y > 0) {
            i.textContent = it ? it.emptyScript : "";
            for (let f = 0; f < y; f++) i.append(c[f], Ve()), te.nextNode(), l.push({ type: 2, index: ++r });
            i.append(c[y], Ve());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ts) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(j, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += j.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const s = se.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ye(t, e, n = t, s) {
  if (e === U) return e;
  let i = s !== void 0 ? n._$Co?.[s] : n._$Cl;
  const r = ze(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ?? (n._$Co = []))[s] = i : n._$Cl = i), i !== void 0 && (e = ye(t, i._$AS(t, e.values), i, s)), e;
}
class Ci {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: s } = this._$AD, i = (e?.creationScope ?? se).importNode(n, !0);
    te.currentNode = i;
    let r = te.nextNode(), a = 0, o = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new We(r, r.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (u = new Li(r, this, e)), this._$AV.push(u), l = s[++o];
      }
      a !== l?.index && (r = te.nextNode(), a++);
    }
    return te.currentNode = se, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class We {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, s, i) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = ye(this, e, n), ze(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ai(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== k && ze(this._$AH) ? this._$AA.nextSibling.data = e : this.T(se.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Fe.createElement(ss(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const r = new Ci(i, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = mn.get(e.strings);
    return n === void 0 && mn.set(e.strings, n = new Fe(e)), n;
  }
  k(e) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const r of e) i === n.length ? n.push(s = new We(this.O(Ve()), this.O(Ve()), this, this.options)) : s = n[i], s._$AI(r), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const s = ln(e).nextSibling;
      ln(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, r) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = k;
  }
  _$AI(e, n = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = ye(this, e, n, 0), a = !ze(e) || e !== this._$AH && e !== U, a && (this._$AH = e);
    else {
      const o = e;
      let l, u;
      for (e = r[0], l = 0; l < r.length - 1; l++) u = ye(this, o[s + l], n, l), u === U && (u = this._$AH[l]), a || (a = !ze(u) || u !== this._$AH[l]), u === k ? e = k : e !== k && (e += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Vi extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === k ? void 0 : e;
  }
}
class zi extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== k);
  }
}
class Fi extends ut {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = ye(this, e, n, 0) ?? k) === U) return;
    const s = this._$AH, i = e === k && s !== k || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== k && (s === k || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Li = class {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
};
const Ri = Ne.litHtmlPolyfillSupport;
Ri?.(Fe, We), (Ne.litHtmlVersions ?? (Ne.litHtmlVersions = [])).push("3.3.3");
const Wi = (t, e, n) => {
  const s = n?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = n?.renderBefore ?? null;
    s._$litPart$ = i = new We(e.insertBefore(Ve(), r), r, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis;
let he = class extends ce {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Wi(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return U;
  }
};
he._$litElement$ = !0, he.finalized = !0, Ie.litElementHydrateSupport?.({ LitElement: he });
const Pi = Ie.litElementPolyfillSupport;
Pi?.({ LitElement: he });
(Ie.litElementVersions ?? (Ie.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const is = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: Ut }, Hi = (t = Ui, e, n) => {
  const { kind: s, metadata: i } = n;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), s === "accessor") {
    const { name: a } = n;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = n;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Zt(t) {
  return (e, n) => typeof n == "object" ? Hi(t, e, n) : ((s, i, r) => {
    const a = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ie(t) {
  return Zt({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = { ATTRIBUTE: 1, ELEMENT: 6 }, as = (t) => (...e) => ({ _$litDirective$: t, values: e });
let os = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, s) {
    this._$Ct = e, this._$AM = n, this._$Ci = s;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ls = "important", Zi = " !" + ls, yn = as(class extends os {
  constructor(t) {
    if (super(t), t.type !== rs.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, n) => {
      const s = t[n];
      return s == null ? e : e + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(t, [e]) {
    const { style: n } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? n.removeProperty(s) : n[s] = null);
    for (const s in e) {
      const i = e[s];
      if (i != null) {
        this.ft.add(s);
        const r = typeof i == "string" && i.endsWith(Zi);
        s.includes("-") || r ? n.setProperty(s, r ? i.slice(0, -11) : i, r ? ls : "") : n[s] = i;
      }
    }
    return U;
  }
});
var pn, gn;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})(pn || (pn = {})), (function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
})(gn || (gn = {}));
function Bi(t) {
  return t.substr(0, t.indexOf("."));
}
var qi = ["closed", "locked", "off"], Le = function(t, e, n, s) {
  s = s || {}, n = n ?? {};
  var i = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return i.detail = n, t.dispatchEvent(i), i;
}, qe = function(t) {
  Le(window, "haptic", t);
}, ji = function(t, e, n) {
  n === void 0 && (n = !1), n ? history.replaceState(null, "", e) : history.pushState(null, "", e), Le(window, "location-changed", { replace: n });
}, Ji = function(t, e, n) {
  n === void 0 && (n = !0);
  var s, i = Bi(e), r = i === "group" ? "homeassistant" : i;
  switch (i) {
    case "lock":
      s = n ? "unlock" : "lock";
      break;
    case "cover":
      s = n ? "open_cover" : "close_cover";
      break;
    default:
      s = n ? "turn_on" : "turn_off";
  }
  return t.callService(r, s, { entity_id: e });
}, Yi = function(t, e) {
  var n = qi.includes(t.states[e].state);
  return Ji(t, e, n);
}, Gi = function(t, e, n, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(r) {
    return r.user === e.user.id;
  }) || (qe("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (n.entity || n.camera_image) && Le(t, "hass-more-info", { entityId: n.entity ? n.entity : n.camera_image });
      break;
    case "navigate":
      s.navigation_path && ji(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      n.entity && (Yi(e, n.entity), qe("success"));
      break;
    case "call-service":
      if (!s.service) return void qe("failure");
      var i = s.service.split(".", 2);
      e.callService(i[0], i[1], s.service_data, s.target), qe("success");
      break;
    case "fire-dom-event":
      Le(t, "ll-custom", s);
  }
}, Ki = function(t, e, n, s) {
  var i;
  s === "double_tap" && n.double_tap_action ? i = n.double_tap_action : s === "hold" && n.hold_action ? i = n.hold_action : s === "tap" && n.tap_action && (i = n.tap_action), Gi(t, e, n, i);
};
function Ee(t) {
  return t !== void 0 && t.action !== "none";
}
class Qi extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = 500, this.held = !1, this.isCancelled = !1;
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "absolute",
      width: "0",
      height: "0",
      pointerEvents: "none"
    });
  }
  bind(e, n) {
    if (e.actionHandler)
      return;
    e.actionHandler = { options: n }, e.addEventListener("contextmenu", (o) => {
      const l = o || window.event;
      return l.preventDefault && l.preventDefault(), l.stopPropagation && l.stopPropagation(), l.cancelBubble = !0, l.returnValue = !1, !1;
    });
    const s = (o) => {
      this.isCancelled = !1, this.held = !1, this.timer = window.setTimeout(() => {
        this.startAnimation(o), this.held = !0;
      }, this.holdTime);
    }, i = (o) => {
      o.preventDefault(), !this.isCancelled && (["touchend", "touchcancel"].includes(o.type) && this.timer === void 0 || (this.stopAnimation(), clearTimeout(this.timer), this.timer = void 0, this.held ? je(e, "hold") : n.hasDoubleClick ? o.type === "click" && o.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, je(e, "tap");
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, je(e, "double_tap")) : je(e, "tap")));
    }, r = (o) => {
      o.key === "Enter" && i(o);
    }, a = () => {
      this.isCancelled = !0, clearTimeout(this.timer), this.stopAnimation(), this.timer = void 0;
    };
    e.addEventListener("touchstart", s, { passive: !0 }), e.addEventListener("touchend", i), e.addEventListener("touchcancel", i), e.addEventListener("mousedown", s, { passive: !0 }), e.addEventListener("click", i), e.addEventListener("keyup", r), e.addEventListener("mouseout", a), e.addEventListener("touchmove", a, { passive: !0 }), e.actionHandler.start = s, e.actionHandler.end = i, e.actionHandler.handleEnter = r;
  }
  startAnimation(e) {
  }
  stopAnimation() {
  }
}
customElements.define("ek-digital-clock-action-handler", Qi);
const Xi = () => {
  const t = document.body;
  if (t.querySelector("ek-digital-clock-action-handler"))
    return t.querySelector("ek-digital-clock-action-handler");
  const e = document.createElement("ek-digital-clock-action-handler");
  return t.appendChild(e), e;
}, je = (t, e) => {
  t.dispatchEvent(
    new CustomEvent("action", {
      detail: { action: e },
      bubbles: !0,
      composed: !0
    })
  );
};
class er extends os {
  constructor(e) {
    if (super(e), e.type !== rs.ELEMENT)
      throw new Error("actionHandler can only be used as element directive");
  }
  update(e, [n]) {
    const s = e.element;
    return Xi().bind(s, n ?? {}), U;
  }
  render(e) {
    return U;
  }
}
const tr = as(er), nr = /^(#|rgb|rgba|hsl|hsla|var\()/i;
function Et(t) {
  const e = t?.trim();
  if (!(!e || e === "none" || e === "state"))
    return nr.test(e) ? e : `var(--${e}-color)`;
}
const pt = "__ekDigitalClockThemeVars";
function sr(t, e, n) {
  const s = t;
  for (const y of s[pt] ?? [])
    t.style.removeProperty(y);
  s[pt] = [];
  const i = n?.trim();
  if (!e || !i || i === "default")
    return;
  const r = e.themes, a = r?.themes?.[i];
  if (!a)
    return;
  const { modes: o, ...l } = a, u = r?.darkMode ? o?.dark : o?.light, d = { ...l, ...u ?? {} }, c = [];
  for (const [y, f] of Object.entries(d)) {
    if (typeof f != "string")
      continue;
    const w = `--${y}`;
    t.style.setProperty(w, f), c.push(w);
    const M = ir(f);
    if (M) {
      const D = `--rgb-${y}`;
      t.style.setProperty(D, M), c.push(D);
    }
  }
  s[pt] = c;
}
function ir(t) {
  const e = t.trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e))
    return null;
  const n = e.length === 4 ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : e, s = parseInt(n.slice(1, 3), 16), i = parseInt(n.slice(3, 5), 16), r = parseInt(n.slice(5, 7), 16);
  return `${s}, ${i}, ${r}`;
}
const rr = "1.0.3", Pe = "ek-digital-clock", us = "Ek Digital Clock", ar = "Digitální hodiny s jmeninami, státními svátky a teplotami", cs = "HH:mm", or = "cccc dd. L.", Ot = "Svátek:";
class re extends Error {
}
class lr extends re {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class ur extends re {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class cr extends re {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class de extends re {
}
class ds extends re {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class $ extends re {
}
class Z extends re {
  constructor() {
    super("Zone is an abstract class");
  }
}
const h = "numeric", L = "short", A = "long", rt = {
  year: h,
  month: h,
  day: h
}, hs = {
  year: h,
  month: L,
  day: h
}, dr = {
  year: h,
  month: L,
  day: h,
  weekday: L
}, fs = {
  year: h,
  month: A,
  day: h
}, ms = {
  year: h,
  month: A,
  day: h,
  weekday: A
}, ys = {
  hour: h,
  minute: h
}, ps = {
  hour: h,
  minute: h,
  second: h
}, gs = {
  hour: h,
  minute: h,
  second: h,
  timeZoneName: L
}, vs = {
  hour: h,
  minute: h,
  second: h,
  timeZoneName: A
}, ws = {
  hour: h,
  minute: h,
  hourCycle: "h23"
}, _s = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23"
}, ks = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23",
  timeZoneName: L
}, bs = {
  hour: h,
  minute: h,
  second: h,
  hourCycle: "h23",
  timeZoneName: A
}, Ss = {
  year: h,
  month: h,
  day: h,
  hour: h,
  minute: h
}, Ts = {
  year: h,
  month: h,
  day: h,
  hour: h,
  minute: h,
  second: h
}, $s = {
  year: h,
  month: L,
  day: h,
  hour: h,
  minute: h
}, Es = {
  year: h,
  month: L,
  day: h,
  hour: h,
  minute: h,
  second: h
}, hr = {
  year: h,
  month: L,
  day: h,
  weekday: L,
  hour: h,
  minute: h
}, Os = {
  year: h,
  month: A,
  day: h,
  hour: h,
  minute: h,
  timeZoneName: L
}, Ms = {
  year: h,
  month: A,
  day: h,
  hour: h,
  minute: h,
  second: h,
  timeZoneName: L
}, Ds = {
  year: h,
  month: A,
  day: h,
  weekday: A,
  hour: h,
  minute: h,
  timeZoneName: A
}, xs = {
  year: h,
  month: A,
  day: h,
  weekday: A,
  hour: h,
  minute: h,
  second: h,
  timeZoneName: A
};
class Ue {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new Z();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new Z();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new Z();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, n) {
    throw new Z();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    throw new Z();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new Z();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new Z();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new Z();
  }
}
let gt = null;
class ct extends Ue {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return gt === null && (gt = new ct()), gt;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, { format: n, locale: s }) {
    return Ps(e, n, s);
  }
  /** @override **/
  formatOffset(e, n) {
    return Ce(this.offset(e), n);
  }
  /** @override **/
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  /** @override **/
  equals(e) {
    return e.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
const Mt = /* @__PURE__ */ new Map();
function fr(t) {
  let e = Mt.get(t);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: t,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), Mt.set(t, e)), e;
}
const mr = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function yr(t, e) {
  const n = t.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, i, r, a, o, l, u, d] = s;
  return [a, i, r, o, l, u, d];
}
function pr(t, e) {
  const n = t.formatToParts(e), s = [];
  for (let i = 0; i < n.length; i++) {
    const { type: r, value: a } = n[i], o = mr[r];
    r === "era" ? s[o] = a : p(o) || (s[o] = parseInt(a, 10));
  }
  return s;
}
const vt = /* @__PURE__ */ new Map();
class H extends Ue {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let n = vt.get(e);
    return n === void 0 && vt.set(e, n = new H(e)), n;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    vt.clear(), Mt.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = H.isValidZone(e);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !1;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, { format: n, locale: s }) {
    return Ps(e, n, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    return Ce(this.offset(e), n);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const n = new Date(e);
    if (isNaN(n)) return NaN;
    const s = fr(this.name);
    let [i, r, a, o, l, u, d] = s.formatToParts ? pr(s, n) : yr(s, n);
    o === "BC" && (i = -Math.abs(i) + 1);
    const y = ht({
      year: i,
      month: r,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: d,
      millisecond: 0
    });
    let f = +n;
    const w = f % 1e3;
    return f -= w >= 0 ? w : 1e3 + w, (y - f) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let vn = {};
function gr(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let s = vn[n];
  return s || (s = new Intl.ListFormat(t, e), vn[n] = s), s;
}
const Dt = /* @__PURE__ */ new Map();
function xt(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let s = Dt.get(n);
  return s === void 0 && (s = new Intl.DateTimeFormat(t, e), Dt.set(n, s)), s;
}
const At = /* @__PURE__ */ new Map();
function vr(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let s = At.get(n);
  return s === void 0 && (s = new Intl.NumberFormat(t, e), At.set(n, s)), s;
}
const Nt = /* @__PURE__ */ new Map();
function wr(t, e = {}) {
  const { base: n, ...s } = e, i = JSON.stringify([t, s]);
  let r = Nt.get(i);
  return r === void 0 && (r = new Intl.RelativeTimeFormat(t, e), Nt.set(i, r)), r;
}
let Me = null;
function _r() {
  return Me || (Me = new Intl.DateTimeFormat().resolvedOptions().locale, Me);
}
const It = /* @__PURE__ */ new Map();
function As(t) {
  let e = It.get(t);
  return e === void 0 && (e = new Intl.DateTimeFormat(t).resolvedOptions(), It.set(t, e)), e;
}
const Ct = /* @__PURE__ */ new Map();
function kr(t) {
  let e = Ct.get(t);
  if (!e) {
    const n = new Intl.Locale(t);
    e = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo, "minimalDays" in e || (e = { ...Ns, ...e }), Ct.set(t, e);
  }
  return e;
}
function br(t) {
  const e = t.indexOf("-x-");
  e !== -1 && (t = t.substring(0, e));
  const n = t.indexOf("-u-");
  if (n === -1)
    return [t];
  {
    let s, i;
    try {
      s = xt(t).resolvedOptions(), i = t;
    } catch {
      const l = t.substring(0, n);
      s = xt(l).resolvedOptions(), i = l;
    }
    const { numberingSystem: r, calendar: a } = s;
    return [i, r, a];
  }
}
function Sr(t, e, n) {
  return (n || e) && (t.includes("-u-") || (t += "-u"), n && (t += `-ca-${n}`), e && (t += `-nu-${e}`)), t;
}
function Tr(t) {
  const e = [];
  for (let n = 1; n <= 12; n++) {
    const s = m.utc(2009, n, 1);
    e.push(t(s));
  }
  return e;
}
function $r(t) {
  const e = [];
  for (let n = 1; n <= 7; n++) {
    const s = m.utc(2016, 11, 13 + n);
    e.push(t(s));
  }
  return e;
}
function Je(t, e, n, s) {
  const i = t.listingMode();
  return i === "error" ? null : i === "en" ? n(e) : s(e);
}
function Er(t) {
  return t.numberingSystem && t.numberingSystem !== "latn" ? !1 : t.numberingSystem === "latn" || !t.locale || t.locale.startsWith("en") || As(t.locale).numberingSystem === "latn";
}
class Or {
  constructor(e, n, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: i, floor: r, ...a } = s;
    if (!n || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...s };
      s.padTo > 0 && (o.minimumIntegerDigits = s.padTo), this.inf = vr(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const n = this.floor ? Math.floor(e) : e;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(e) : Yt(e, 3);
      return T(n, this.padTo);
    }
  }
}
class Mr {
  constructor(e, n, s) {
    this.opts = s, this.originalZone = void 0;
    let i;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60), o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && H.create(o).valid ? (i = o, this.dt = e) : (i = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, i = e.zone.name) : (i = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const r = { ...this.opts };
    r.timeZone = r.timeZone || i, this.dtf = xt(n, r);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((n) => {
      if (n.type === "timeZoneName") {
        const s = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...n,
          value: s
        };
      } else
        return n;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Dr {
  constructor(e, n, s) {
    this.opts = { style: "long", ...s }, !n && Rs() && (this.rtf = wr(e, s));
  }
  format(e, n) {
    return this.rtf ? this.rtf.format(e, n) : Kr(n, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, n) {
    return this.rtf ? this.rtf.formatToParts(e, n) : [];
  }
}
const Ns = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class _ {
  static fromOpts(e) {
    return _.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, n, s, i, r = !1) {
    const a = e || S.defaultLocale, o = a || (r ? "en-US" : _r()), l = n || S.defaultNumberingSystem, u = s || S.defaultOutputCalendar, d = zt(i) || S.defaultWeekSettings;
    return new _(o, l, u, d, a);
  }
  static resetCache() {
    Me = null, Dt.clear(), At.clear(), Nt.clear(), It.clear(), Ct.clear();
  }
  static fromObject({ locale: e, numberingSystem: n, outputCalendar: s, weekSettings: i } = {}) {
    return _.create(e, n, s, i);
  }
  constructor(e, n, s, i, r) {
    const [a, o, l] = br(e);
    this.locale = a, this.numberingSystem = n || o || null, this.outputCalendar = s || l || null, this.weekSettings = i, this.intl = Sr(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = r, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Er(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), n = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && n ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : _.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      zt(e.weekSettings) || this.weekSettings,
      e.defaultToEN || !1
    );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, n = !1) {
    return Je(this, e, Zs, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      n &= !s;
      const i = n ? { month: e, day: "numeric" } : { month: e }, r = n ? "format" : "standalone";
      if (!this.monthsCache[r][e]) {
        const a = s ? (o) => this.dtFormatter(o, i).format() : (o) => this.extract(o, i, "month");
        this.monthsCache[r][e] = Tr(a);
      }
      return this.monthsCache[r][e];
    });
  }
  weekdays(e, n = !1) {
    return Je(this, e, js, () => {
      const s = n ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, i = n ? "format" : "standalone";
      return this.weekdaysCache[i][e] || (this.weekdaysCache[i][e] = $r(
        (r) => this.extract(r, s, "weekday")
      )), this.weekdaysCache[i][e];
    });
  }
  meridiems() {
    return Je(
      this,
      void 0,
      () => Js,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [m.utc(2016, 11, 13, 9), m.utc(2016, 11, 13, 19)].map(
            (n) => this.extract(n, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Je(this, e, Ys, () => {
      const n = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [m.utc(-40, 1, 1), m.utc(2017, 1, 1)].map(
        (s) => this.extract(s, n, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, n, s) {
    const i = this.dtFormatter(e, n), r = i.formatToParts(), a = r.find((o) => o.type.toLowerCase() === s);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new Or(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, n = {}) {
    return new Mr(e, this.intl, n);
  }
  relFormatter(e = {}) {
    return new Dr(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return gr(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || As(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Ws() ? kr(this.locale) : Ns;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let wt = null;
class O extends Ue {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return wt === null && (wt = new O(0)), wt;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? O.utcInstance : new O(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const n = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n)
        return new O(ft(n[1], n[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Ce(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ce(-this.fixed, "narrow")}`;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    return Ce(this.fixed, n);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !0;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return !0;
  }
}
class xr extends Ue {
  constructor(e) {
    super(), this.zoneName = e;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function J(t, e) {
  if (p(t) || t === null)
    return e;
  if (t instanceof Ue)
    return t;
  if (zr(t)) {
    const n = t.toLowerCase();
    return n === "default" ? e : n === "local" || n === "system" ? ct.instance : n === "utc" || n === "gmt" ? O.utcInstance : O.parseSpecifier(n) || H.create(t);
  } else return G(t) ? O.instance(t) : typeof t == "object" && "offset" in t && typeof t.offset == "function" ? t : new xr(t);
}
const Bt = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, wn = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, Ar = Bt.hanidec.replace(/[\[|\]]/g, "").split("");
function Nr(t) {
  let e = parseInt(t, 10);
  if (isNaN(e)) {
    e = "";
    for (let n = 0; n < t.length; n++) {
      const s = t.charCodeAt(n);
      if (t[n].search(Bt.hanidec) !== -1)
        e += Ar.indexOf(t[n]);
      else
        for (const i in wn) {
          const [r, a] = wn[i];
          s >= r && s <= a && (e += s - r);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const Vt = /* @__PURE__ */ new Map();
function Ir() {
  Vt.clear();
}
function V({ numberingSystem: t }, e = "") {
  const n = t || "latn";
  let s = Vt.get(n);
  s === void 0 && (s = /* @__PURE__ */ new Map(), Vt.set(n, s));
  let i = s.get(e);
  return i === void 0 && (i = new RegExp(`${Bt[n]}${e}`), s.set(e, i)), i;
}
let _n = () => Date.now(), kn = "system", bn = null, Sn = null, Tn = null, $n = 60, En, On = null;
class S {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return _n;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    _n = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    kn = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return J(kn, ct.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return bn;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    bn = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return Sn;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    Sn = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return Tn;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    Tn = e;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return On;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    On = zt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return $n;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(e) {
    $n = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return En;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    En = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    _.resetCache(), H.resetCache(), m.resetCache(), Ir();
  }
}
class F {
  constructor(e, n) {
    this.reason = e, this.explanation = n;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const Is = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Cs = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function I(t, e) {
  return new F(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`
  );
}
function qt(t, e, n) {
  const s = new Date(Date.UTC(t, e - 1, n));
  t < 100 && t >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const i = s.getUTCDay();
  return i === 0 ? 7 : i;
}
function Vs(t, e, n) {
  return n + (He(t) ? Cs : Is)[e - 1];
}
function zs(t, e) {
  const n = He(t) ? Cs : Is, s = n.findIndex((r) => r < e), i = e - n[s];
  return { month: s + 1, day: i };
}
function jt(t, e) {
  return (t - e + 7) % 7 + 1;
}
function at(t, e = 4, n = 1) {
  const { year: s, month: i, day: r } = t, a = Vs(s, i, r), o = jt(qt(s, i, r), n);
  let l = Math.floor((a - o + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = Re(u, e, n)) : l > Re(s, e, n) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: o, ...mt(t) };
}
function Mn(t, e = 4, n = 1) {
  const { weekYear: s, weekNumber: i, weekday: r } = t, a = jt(qt(s, 1, e), n), o = fe(s);
  let l = i * 7 + r - a - 7 + e, u;
  l < 1 ? (u = s - 1, l += fe(u)) : l > o ? (u = s + 1, l -= fe(s)) : u = s;
  const { month: d, day: c } = zs(u, l);
  return { year: u, month: d, day: c, ...mt(t) };
}
function _t(t) {
  const { year: e, month: n, day: s } = t, i = Vs(e, n, s);
  return { year: e, ordinal: i, ...mt(t) };
}
function Dn(t) {
  const { year: e, ordinal: n } = t, { month: s, day: i } = zs(e, n);
  return { year: e, month: s, day: i, ...mt(t) };
}
function xn(t, e) {
  if (!p(t.localWeekday) || !p(t.localWeekNumber) || !p(t.localWeekYear)) {
    if (!p(t.weekday) || !p(t.weekNumber) || !p(t.weekYear))
      throw new de(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return p(t.localWeekday) || (t.weekday = t.localWeekday), p(t.localWeekNumber) || (t.weekNumber = t.localWeekNumber), p(t.localWeekYear) || (t.weekYear = t.localWeekYear), delete t.localWeekday, delete t.localWeekNumber, delete t.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function Cr(t, e = 4, n = 1) {
  const s = dt(t.weekYear), i = C(
    t.weekNumber,
    1,
    Re(t.weekYear, e, n)
  ), r = C(t.weekday, 1, 7);
  return s ? i ? r ? !1 : I("weekday", t.weekday) : I("week", t.weekNumber) : I("weekYear", t.weekYear);
}
function Vr(t) {
  const e = dt(t.year), n = C(t.ordinal, 1, fe(t.year));
  return e ? n ? !1 : I("ordinal", t.ordinal) : I("year", t.year);
}
function Fs(t) {
  const e = dt(t.year), n = C(t.month, 1, 12), s = C(t.day, 1, ot(t.year, t.month));
  return e ? n ? s ? !1 : I("day", t.day) : I("month", t.month) : I("year", t.year);
}
function Ls(t) {
  const { hour: e, minute: n, second: s, millisecond: i } = t, r = C(e, 0, 23) || e === 24 && n === 0 && s === 0 && i === 0, a = C(n, 0, 59), o = C(s, 0, 59), l = C(i, 0, 999);
  return r ? a ? o ? l ? !1 : I("millisecond", i) : I("second", s) : I("minute", n) : I("hour", e);
}
function p(t) {
  return typeof t > "u";
}
function G(t) {
  return typeof t == "number";
}
function dt(t) {
  return typeof t == "number" && t % 1 === 0;
}
function zr(t) {
  return typeof t == "string";
}
function Fr(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function Rs() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Ws() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function Lr(t) {
  return Array.isArray(t) ? t : [t];
}
function An(t, e, n) {
  if (t.length !== 0)
    return t.reduce((s, i) => {
      const r = [e(i), i];
      return s && n(s[0], r[0]) === s[0] ? s : r;
    }, null)[1];
}
function Rr(t, e) {
  return e.reduce((n, s) => (n[s] = t[s], n), {});
}
function pe(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function zt(t) {
  if (t == null)
    return null;
  if (typeof t != "object")
    throw new $("Week settings must be an object");
  if (!C(t.firstDay, 1, 7) || !C(t.minimalDays, 1, 7) || !Array.isArray(t.weekend) || t.weekend.some((e) => !C(e, 1, 7)))
    throw new $("Invalid week settings");
  return {
    firstDay: t.firstDay,
    minimalDays: t.minimalDays,
    weekend: Array.from(t.weekend)
  };
}
function C(t, e, n) {
  return dt(t) && t >= e && t <= n;
}
function Wr(t, e) {
  return t - e * Math.floor(t / e);
}
function T(t, e = 2) {
  const n = t < 0;
  let s;
  return n ? s = "-" + ("" + -t).padStart(e, "0") : s = ("" + t).padStart(e, "0"), s;
}
function q(t) {
  if (!(p(t) || t === null || t === ""))
    return parseInt(t, 10);
}
function X(t) {
  if (!(p(t) || t === null || t === ""))
    return parseFloat(t);
}
function Jt(t) {
  if (!(p(t) || t === null || t === "")) {
    const e = parseFloat("0." + t) * 1e3;
    return Math.floor(e);
  }
}
function Yt(t, e, n = "round") {
  const s = 10 ** e;
  switch (n) {
    case "expand":
      return t > 0 ? Math.ceil(t * s) / s : Math.floor(t * s) / s;
    case "trunc":
      return Math.trunc(t * s) / s;
    case "round":
      return Math.round(t * s) / s;
    case "floor":
      return Math.floor(t * s) / s;
    case "ceil":
      return Math.ceil(t * s) / s;
    default:
      throw new RangeError(`Value rounding ${n} is out of range`);
  }
}
function He(t) {
  return t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0);
}
function fe(t) {
  return He(t) ? 366 : 365;
}
function ot(t, e) {
  const n = Wr(e - 1, 12) + 1, s = t + (e - n) / 12;
  return n === 2 ? He(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function ht(t) {
  let e = Date.UTC(
    t.year,
    t.month - 1,
    t.day,
    t.hour,
    t.minute,
    t.second,
    t.millisecond
  );
  return t.year < 100 && t.year >= 0 && (e = new Date(e), e.setUTCFullYear(t.year, t.month - 1, t.day)), +e;
}
function Nn(t, e, n) {
  return -jt(qt(t, 1, e), n) + e - 1;
}
function Re(t, e = 4, n = 1) {
  const s = Nn(t, e, n), i = Nn(t + 1, e, n);
  return (fe(t) - s + i) / 7;
}
function Ft(t) {
  return t > 99 ? t : t > S.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}
function Ps(t, e, n, s = null) {
  const i = new Date(t), r = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (r.timeZone = s);
  const a = { timeZoneName: e, ...r }, o = new Intl.DateTimeFormat(n, a).formatToParts(i).find((l) => l.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function ft(t, e) {
  let n = parseInt(t, 10);
  Number.isNaN(n) && (n = 0);
  const s = parseInt(e, 10) || 0, i = n < 0 || Object.is(n, -0) ? -s : s;
  return n * 60 + i;
}
function Us(t) {
  const e = Number(t);
  if (typeof t == "boolean" || t === "" || !Number.isFinite(e))
    throw new $(`Invalid unit value ${t}`);
  return e;
}
function lt(t, e) {
  const n = {};
  for (const s in t)
    if (pe(t, s)) {
      const i = t[s];
      if (i == null) continue;
      n[e(s)] = Us(i);
    }
  return n;
}
function Ce(t, e) {
  const n = Math.trunc(Math.abs(t / 60)), s = Math.trunc(Math.abs(t % 60)), i = t >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${i}${T(n, 2)}:${T(s, 2)}`;
    case "narrow":
      return `${i}${n}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${i}${T(n, 2)}${T(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function mt(t) {
  return Rr(t, ["hour", "minute", "second", "millisecond"]);
}
const Pr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], Hs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], Ur = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Zs(t) {
  switch (t) {
    case "narrow":
      return [...Ur];
    case "short":
      return [...Hs];
    case "long":
      return [...Pr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const Bs = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], qs = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], Hr = ["M", "T", "W", "T", "F", "S", "S"];
function js(t) {
  switch (t) {
    case "narrow":
      return [...Hr];
    case "short":
      return [...qs];
    case "long":
      return [...Bs];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Js = ["AM", "PM"], Zr = ["Before Christ", "Anno Domini"], Br = ["BC", "AD"], qr = ["B", "A"];
function Ys(t) {
  switch (t) {
    case "narrow":
      return [...qr];
    case "short":
      return [...Br];
    case "long":
      return [...Zr];
    default:
      return null;
  }
}
function jr(t) {
  return Js[t.hour < 12 ? 0 : 1];
}
function Jr(t, e) {
  return js(e)[t.weekday - 1];
}
function Yr(t, e) {
  return Zs(e)[t.month - 1];
}
function Gr(t, e) {
  return Ys(e)[t.year < 0 ? 0 : 1];
}
function Kr(t, e, n = "always", s = !1) {
  const i = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, r = ["hours", "minutes", "seconds"].indexOf(t) === -1;
  if (n === "auto" && r) {
    const c = t === "days";
    switch (e) {
      case 1:
        return c ? "tomorrow" : `next ${i[t][0]}`;
      case -1:
        return c ? "yesterday" : `last ${i[t][0]}`;
      case 0:
        return c ? "today" : `this ${i[t][0]}`;
    }
  }
  const a = Object.is(e, -0) || e < 0, o = Math.abs(e), l = o === 1, u = i[t], d = s ? l ? u[1] : u[2] || u[1] : l ? i[t][0] : t;
  return a ? `${o} ${d} ago` : `in ${o} ${d}`;
}
function In(t, e) {
  let n = "";
  for (const s of t)
    s.literal ? n += s.val : n += e(s.val);
  return n;
}
const Qr = {
  D: rt,
  DD: hs,
  DDD: fs,
  DDDD: ms,
  t: ys,
  tt: ps,
  ttt: gs,
  tttt: vs,
  T: ws,
  TT: _s,
  TTT: ks,
  TTTT: bs,
  f: Ss,
  ff: $s,
  fff: Os,
  ffff: Ds,
  F: Ts,
  FF: Es,
  FFF: Ms,
  FFFF: xs
};
class E {
  static create(e, n = {}) {
    return new E(e, n);
  }
  static parseFormat(e) {
    let n = null, s = "", i = !1;
    const r = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'" ? ((s.length > 0 || i) && r.push({
        literal: i || /^\s+$/.test(s),
        val: s === "" ? "'" : s
      }), n = null, s = "", i = !i) : i || o === n ? s += o : (s.length > 0 && r.push({ literal: /^\s+$/.test(s), val: s }), s = o, n = o);
    }
    return s.length > 0 && r.push({ literal: i || /^\s+$/.test(s), val: s }), r;
  }
  static macroTokenToFormatOpts(e) {
    return Qr[e];
  }
  constructor(e, n) {
    this.opts = n, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, n) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, { ...this.opts, ...n }).format();
  }
  dtFormatter(e, n = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...n });
  }
  formatDateTime(e, n) {
    return this.dtFormatter(e, n).format();
  }
  formatDateTimeParts(e, n) {
    return this.dtFormatter(e, n).formatToParts();
  }
  formatInterval(e, n) {
    return this.dtFormatter(e.start, n).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, n) {
    return this.dtFormatter(e, n).resolvedOptions();
  }
  num(e, n = 0, s = void 0) {
    if (this.opts.forceSimple)
      return T(e, n);
    const i = { ...this.opts };
    return n > 0 && (i.padTo = n), s && (i.signDisplay = s), this.loc.numberFormatter(i).format(e);
  }
  formatDateTimeFromString(e, n) {
    const s = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", r = (f, w) => this.loc.extract(e, f, w), a = (f) => e.isOffsetFixed && e.offset === 0 && f.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, f.format) : "", o = () => s ? jr(e) : r({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (f, w) => s ? Yr(e, f) : r(w ? { month: f } : { month: f, day: "numeric" }, "month"), u = (f, w) => s ? Jr(e, f) : r(
      w ? { weekday: f } : { weekday: f, month: "long", day: "numeric" },
      "weekday"
    ), d = (f) => {
      const w = E.macroTokenToFormatOpts(f);
      return w ? this.formatWithSystemDefault(e, w) : f;
    }, c = (f) => s ? Gr(e, f) : r({ era: f }, "era"), y = (f) => {
      switch (f) {
        // ms
        case "S":
          return this.num(e.millisecond);
        case "u":
        // falls through
        case "SSS":
          return this.num(e.millisecond, 3);
        // seconds
        case "s":
          return this.num(e.second);
        case "ss":
          return this.num(e.second, 2);
        // fractional seconds
        case "uu":
          return this.num(Math.floor(e.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(e.millisecond / 100));
        // minutes
        case "m":
          return this.num(e.minute);
        case "mm":
          return this.num(e.minute, 2);
        // hours
        case "h":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
        case "hh":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
        case "H":
          return this.num(e.hour);
        case "HH":
          return this.num(e.hour, 2);
        // offset
        case "Z":
          return a({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return a({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return a({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, { format: "long", locale: this.loc.locale });
        // zone
        case "z":
          return e.zoneName;
        // meridiems
        case "a":
          return o();
        // dates
        case "d":
          return i ? r({ day: "numeric" }, "day") : this.num(e.day);
        case "dd":
          return i ? r({ day: "2-digit" }, "day") : this.num(e.day, 2);
        // weekdays - standalone
        case "c":
          return this.num(e.weekday);
        case "ccc":
          return u("short", !0);
        case "cccc":
          return u("long", !0);
        case "ccccc":
          return u("narrow", !0);
        // weekdays - format
        case "E":
          return this.num(e.weekday);
        case "EEE":
          return u("short", !1);
        case "EEEE":
          return u("long", !1);
        case "EEEEE":
          return u("narrow", !1);
        // months - standalone
        case "L":
          return i ? r({ month: "numeric", day: "numeric" }, "month") : this.num(e.month);
        case "LL":
          return i ? r({ month: "2-digit", day: "numeric" }, "month") : this.num(e.month, 2);
        case "LLL":
          return l("short", !0);
        case "LLLL":
          return l("long", !0);
        case "LLLLL":
          return l("narrow", !0);
        // months - format
        case "M":
          return i ? r({ month: "numeric" }, "month") : this.num(e.month);
        case "MM":
          return i ? r({ month: "2-digit" }, "month") : this.num(e.month, 2);
        case "MMM":
          return l("short", !1);
        case "MMMM":
          return l("long", !1);
        case "MMMMM":
          return l("narrow", !1);
        // years
        case "y":
          return i ? r({ year: "numeric" }, "year") : this.num(e.year);
        case "yy":
          return i ? r({ year: "2-digit" }, "year") : this.num(e.year.toString().slice(-2), 2);
        case "yyyy":
          return i ? r({ year: "numeric" }, "year") : this.num(e.year, 4);
        case "yyyyyy":
          return i ? r({ year: "numeric" }, "year") : this.num(e.year, 6);
        // eras
        case "G":
          return c("short");
        case "GG":
          return c("long");
        case "GGGGG":
          return c("narrow");
        case "kk":
          return this.num(e.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(e.weekYear, 4);
        case "W":
          return this.num(e.weekNumber);
        case "WW":
          return this.num(e.weekNumber, 2);
        case "n":
          return this.num(e.localWeekNumber);
        case "nn":
          return this.num(e.localWeekNumber, 2);
        case "ii":
          return this.num(e.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(e.localWeekYear, 4);
        case "o":
          return this.num(e.ordinal);
        case "ooo":
          return this.num(e.ordinal, 3);
        case "q":
          return this.num(e.quarter);
        case "qq":
          return this.num(e.quarter, 2);
        case "X":
          return this.num(Math.floor(e.ts / 1e3));
        case "x":
          return this.num(e.ts);
        default:
          return d(f);
      }
    };
    return In(E.parseFormat(n), y);
  }
  formatDurationFromString(e, n) {
    const s = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, i = (d) => {
      switch (d[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, r = (d, c) => (y) => {
      const f = i(y);
      if (f) {
        const w = c.isNegativeDuration && f !== c.largestUnit ? s : 1;
        let M;
        return this.opts.signMode === "negativeLargestOnly" && f !== c.largestUnit ? M = "never" : this.opts.signMode === "all" ? M = "always" : M = "auto", this.num(d.get(f) * w, y.length, M);
      } else
        return y;
    }, a = E.parseFormat(n), o = a.reduce(
      (d, { literal: c, val: y }) => c ? d : d.concat(y),
      []
    ), l = e.shiftTo(...o.map(i).filter((d) => d)), u = {
      isNegativeDuration: l < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(l.values)[0]
    };
    return In(a, r(l, u));
  }
}
const Gs = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function ve(...t) {
  const e = t.reduce((n, s) => n + s.source, "");
  return RegExp(`^${e}$`);
}
function we(...t) {
  return (e) => t.reduce(
    ([n, s, i], r) => {
      const [a, o, l] = r(e, i);
      return [{ ...n, ...a }, o || s, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function _e(t, ...e) {
  if (t == null)
    return [null, null];
  for (const [n, s] of e) {
    const i = n.exec(t);
    if (i)
      return s(i);
  }
  return [null, null];
}
function Ks(...t) {
  return (e, n) => {
    const s = {};
    let i;
    for (i = 0; i < t.length; i++)
      s[t[i]] = q(e[n + i]);
    return [s, null, n + i];
  };
}
const Qs = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, Xr = `(?:${Qs.source}?(?:\\[(${Gs.source})\\])?)?`, Gt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Xs = RegExp(`${Gt.source}${Xr}`), Kt = RegExp(`(?:[Tt]${Xs.source})?`), ea = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, ta = /(\d{4})-?W(\d\d)(?:-?(\d))?/, na = /(\d{4})-?(\d{3})/, sa = Ks("weekYear", "weekNumber", "weekDay"), ia = Ks("year", "ordinal"), ra = /(\d{4})-(\d\d)-(\d\d)/, ei = RegExp(
  `${Gt.source} ?(?:${Qs.source}|(${Gs.source}))?`
), aa = RegExp(`(?: ${ei.source})?`);
function me(t, e, n) {
  const s = t[e];
  return p(s) ? n : q(s);
}
function oa(t, e) {
  return [{
    year: me(t, e),
    month: me(t, e + 1, 1),
    day: me(t, e + 2, 1)
  }, null, e + 3];
}
function ke(t, e) {
  return [{
    hours: me(t, e, 0),
    minutes: me(t, e + 1, 0),
    seconds: me(t, e + 2, 0),
    milliseconds: Jt(t[e + 3])
  }, null, e + 4];
}
function Ze(t, e) {
  const n = !t[e] && !t[e + 1], s = ft(t[e + 1], t[e + 2]), i = n ? null : O.instance(s);
  return [{}, i, e + 3];
}
function Be(t, e) {
  const n = t[e] ? H.create(t[e]) : null;
  return [{}, n, e + 1];
}
const la = RegExp(`^T?${Gt.source}$`), ua = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function ca(t) {
  const [e, n, s, i, r, a, o, l, u] = t, d = e[0] === "-", c = l && l[0] === "-", y = (f, w = !1) => f !== void 0 && (w || f && d) ? -f : f;
  return [
    {
      years: y(X(n)),
      months: y(X(s)),
      weeks: y(X(i)),
      days: y(X(r)),
      hours: y(X(a)),
      minutes: y(X(o)),
      seconds: y(X(l), l === "-0"),
      milliseconds: y(Jt(u), c)
    }
  ];
}
const da = {
  GMT: 0,
  EDT: -240,
  EST: -300,
  CDT: -300,
  CST: -360,
  MDT: -360,
  MST: -420,
  PDT: -420,
  PST: -480
};
function Qt(t, e, n, s, i, r, a) {
  const o = {
    year: e.length === 2 ? Ft(q(e)) : q(e),
    month: Hs.indexOf(n) + 1,
    day: q(s),
    hour: q(i),
    minute: q(r)
  };
  return a && (o.second = q(a)), t && (o.weekday = t.length > 3 ? Bs.indexOf(t) + 1 : qs.indexOf(t) + 1), o;
}
const ha = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function fa(t) {
  const [
    ,
    e,
    n,
    s,
    i,
    r,
    a,
    o,
    l,
    u,
    d,
    c
  ] = t, y = Qt(e, i, s, n, r, a, o);
  let f;
  return l ? f = da[l] : u ? f = 0 : f = ft(d, c), [y, new O(f)];
}
function ma(t) {
  return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const ya = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, pa = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ga = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Cn(t) {
  const [, e, n, s, i, r, a, o] = t;
  return [Qt(e, i, s, n, r, a, o), O.utcInstance];
}
function va(t) {
  const [, e, n, s, i, r, a, o] = t;
  return [Qt(e, o, n, s, i, r, a), O.utcInstance];
}
const wa = ve(ea, Kt), _a = ve(ta, Kt), ka = ve(na, Kt), ba = ve(Xs), ti = we(
  oa,
  ke,
  Ze,
  Be
), Sa = we(
  sa,
  ke,
  Ze,
  Be
), Ta = we(
  ia,
  ke,
  Ze,
  Be
), $a = we(
  ke,
  Ze,
  Be
);
function Ea(t) {
  return _e(
    t,
    [wa, ti],
    [_a, Sa],
    [ka, Ta],
    [ba, $a]
  );
}
function Oa(t) {
  return _e(ma(t), [ha, fa]);
}
function Ma(t) {
  return _e(
    t,
    [ya, Cn],
    [pa, Cn],
    [ga, va]
  );
}
function Da(t) {
  return _e(t, [ua, ca]);
}
const xa = we(ke);
function Aa(t) {
  return _e(t, [la, xa]);
}
const Na = ve(ra, aa), Ia = ve(ei), Ca = we(
  ke,
  Ze,
  Be
);
function Va(t) {
  return _e(
    t,
    [Na, ti],
    [Ia, Ca]
  );
}
const Vn = "Invalid Duration", ni = {
  weeks: {
    days: 7,
    hours: 168,
    minutes: 10080,
    seconds: 10080 * 60,
    milliseconds: 10080 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 1440,
    seconds: 1440 * 60,
    milliseconds: 1440 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 3600, milliseconds: 3600 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, za = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 2184,
    minutes: 2184 * 60,
    seconds: 2184 * 60 * 60,
    milliseconds: 2184 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 720,
    minutes: 720 * 60,
    seconds: 720 * 60 * 60,
    milliseconds: 720 * 60 * 60 * 1e3
  },
  ...ni
}, N = 146097 / 400, oe = 146097 / 4800, Fa = {
  years: {
    quarters: 4,
    months: 12,
    weeks: N / 7,
    days: N,
    hours: N * 24,
    minutes: N * 24 * 60,
    seconds: N * 24 * 60 * 60,
    milliseconds: N * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: N / 28,
    days: N / 4,
    hours: N * 24 / 4,
    minutes: N * 24 * 60 / 4,
    seconds: N * 24 * 60 * 60 / 4,
    milliseconds: N * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: oe / 7,
    days: oe,
    hours: oe * 24,
    minutes: oe * 24 * 60,
    seconds: oe * 24 * 60 * 60,
    milliseconds: oe * 24 * 60 * 60 * 1e3
  },
  ...ni
}, ne = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], La = ne.slice(0).reverse();
function W(t, e, n = !1) {
  const s = {
    values: n ? e.values : { ...t.values, ...e.values || {} },
    loc: t.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
    matrix: e.matrix || t.matrix
  };
  return new g(s);
}
function si(t, e) {
  let n = e.milliseconds ?? 0;
  for (const s of La.slice(1))
    e[s] && (n += e[s] * t[s].milliseconds);
  return n;
}
function zn(t, e) {
  const n = si(t, e) < 0 ? -1 : 1;
  ne.reduceRight((s, i) => {
    if (p(e[i]))
      return s;
    if (s) {
      const r = e[s] * n, a = t[i][s], o = Math.floor(r / a);
      e[i] += o * n, e[s] -= o * a * n;
    }
    return i;
  }, null), ne.reduce((s, i) => {
    if (p(e[i]))
      return s;
    if (s) {
      const r = e[s] % 1;
      e[s] -= r, e[i] += r * t[s][i];
    }
    return i;
  }, null);
}
function Fn(t) {
  const e = {};
  for (const [n, s] of Object.entries(t))
    s !== 0 && (e[n] = s);
  return e;
}
class g {
  /**
   * @private
   */
  constructor(e) {
    const n = e.conversionAccuracy === "longterm" || !1;
    let s = n ? Fa : za;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || _.create(), this.conversionAccuracy = n ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(e, n) {
    return g.fromObject({ milliseconds: e }, n);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(e, n = {}) {
    if (e == null || typeof e != "object")
      throw new $(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new g({
      values: lt(e, g.normalizeUnit),
      loc: _.fromObject(n),
      conversionAccuracy: n.conversionAccuracy,
      matrix: n.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(e) {
    if (G(e))
      return g.fromMillis(e);
    if (g.isDuration(e))
      return e;
    if (typeof e == "object")
      return g.fromObject(e);
    throw new $(
      `Unknown duration argument ${e} of type ${typeof e}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(e, n) {
    const [s] = Da(e);
    return s ? g.fromObject(s, n) : g.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(e, n) {
    const [s] = Aa(e);
    return s ? g.fromObject(s, n) : g.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, n = null) {
    if (!e)
      throw new $("need to specify a reason the Duration is invalid");
    const s = e instanceof F ? e : new F(e, n);
    if (S.throwOnInvalid)
      throw new cr(s);
    return new g({ invalid: s });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const n = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[e && e.toLowerCase()];
    if (!n) throw new ds(e);
    return n;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(e) {
    return e && e.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
   * @return {string}
   */
  toFormat(e, n = {}) {
    const s = {
      ...n,
      floor: n.round !== !1 && n.floor !== !1
    };
    return this.isValid ? E.create(this.loc, s).formatDurationFromString(this, e) : Vn;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
   * @example
   * ```js
   * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
   * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid) return Vn;
    const n = e.showZeros !== !1, s = ne.map((i) => {
      const r = this.values[i];
      return p(r) || r === 0 && !n ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: i.slice(0, -1) }).format(r);
    }).filter((i) => i);
    return this.loc.listFormatter({ type: "conjunction", style: e.listStyle || "narrow", ...e }).format(s);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += Yt(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(e = {}) {
    if (!this.isValid) return null;
    const n = this.toMillis();
    return n < 0 || n >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, m.fromMillis(n, { zone: "UTC" }).toISOTime(e));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? si(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(e) {
    if (!this.isValid) return this;
    const n = g.fromDurationLike(e), s = {};
    for (const i of ne)
      (pe(n.values, i) || pe(this.values, i)) && (s[i] = n.get(i) + this.get(i));
    return W(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const n = g.fromDurationLike(e);
    return this.plus(n.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(e) {
    if (!this.isValid) return this;
    const n = {};
    for (const s of Object.keys(this.values))
      n[s] = Us(e(this.values[s], s));
    return W(this, { values: n }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(e) {
    return this[g.normalizeUnit(e)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(e) {
    if (!this.isValid) return this;
    const n = { ...this.values, ...lt(e, g.normalizeUnit) };
    return W(this, { values: n });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: n, conversionAccuracy: s, matrix: i } = {}) {
    const a = { loc: this.loc.clone({ locale: e, numberingSystem: n }), matrix: i, conversionAccuracy: s };
    return W(this, a);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const e = this.toObject();
    return zn(this.matrix, e), W(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = Fn(this.normalize().shiftToAll().toObject());
    return W(this, { values: e }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (e.length === 0)
      return this;
    e = e.map((a) => g.normalizeUnit(a));
    const n = {}, s = {}, i = this.toObject();
    let r;
    for (const a of ne)
      if (e.indexOf(a) >= 0) {
        r = a;
        let o = 0;
        for (const u in s)
          o += this.matrix[u][a] * s[u], s[u] = 0;
        G(i[a]) && (o += i[a]);
        const l = Math.trunc(o);
        n[a] = l, s[a] = (o * 1e3 - l * 1e3) / 1e3;
      } else G(i[a]) && (s[a] = i[a]);
    for (const a in s)
      s[a] !== 0 && (n[r] += a === r ? s[a] : s[a] / this.matrix[r][a]);
    return zn(this.matrix, n), W(this, { values: n }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const e = {};
    for (const n of Object.keys(this.values))
      e[n] = this.values[n] === 0 ? 0 : -this.values[n];
    return W(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = Fn(this.values);
    return W(this, { values: e }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc))
      return !1;
    function n(s, i) {
      return s === void 0 || s === 0 ? i === void 0 || i === 0 : s === i;
    }
    for (const s of ne)
      if (!n(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const le = "Invalid Interval";
function Ra(t, e) {
  return !t || !t.isValid ? b.invalid("missing or invalid start") : !e || !e.isValid ? b.invalid("missing or invalid end") : e < t ? b.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`
  ) : null;
}
class b {
  /**
   * @private
   */
  constructor(e) {
    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(e, n = null) {
    if (!e)
      throw new $("need to specify a reason the Interval is invalid");
    const s = e instanceof F ? e : new F(e, n);
    if (S.throwOnInvalid)
      throw new ur(s);
    return new b({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, n) {
    const s = Oe(e), i = Oe(n), r = Ra(s, i);
    return r ?? new b({
      start: s,
      end: i
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(e, n) {
    const s = g.fromDurationLike(n), i = Oe(e);
    return b.fromDateTimes(i, i.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, n) {
    const s = g.fromDurationLike(n), i = Oe(e);
    return b.fromDateTimes(i.minus(s), i);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, n) {
    const [s, i] = (e || "").split("/", 2);
    if (s && i) {
      let r, a;
      try {
        r = m.fromISO(s, n), a = r.isValid;
      } catch {
        a = !1;
      }
      let o, l;
      try {
        o = m.fromISO(i, n), l = o.isValid;
      } catch {
        l = !1;
      }
      if (a && l)
        return b.fromDateTimes(r, o);
      if (a) {
        const u = g.fromISO(i, n);
        if (u.isValid)
          return b.after(r, u);
      } else if (l) {
        const u = g.fromISO(s, n);
        if (u.isValid)
          return b.before(o, u);
      }
    }
    return b.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(e) {
    return e && e.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval. This is the first instant which is not part of the interval
   * (Interval is half-open).
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid && this.e ? this.e.minus(1) : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(e = "milliseconds", n) {
    if (!this.isValid) return NaN;
    const s = this.start.startOf(e, n);
    let i;
    return n?.useLocaleWeeks ? i = this.end.reconfigure({ locale: s.locale }) : i = this.end, i = i.startOf(e, n), Math.floor(i.diff(s, e).get(e)) + (i.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(e) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: e, end: n } = {}) {
    return this.isValid ? b.fromDateTimes(e || this.s, n || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const n = e.map(Oe).filter((a) => this.contains(a)).sort((a, o) => a.toMillis() - o.toMillis()), s = [];
    let { s: i } = this, r = 0;
    for (; i < this.e; ) {
      const a = n[r] || this.e, o = +a > +this.e ? this.e : a;
      s.push(b.fromDateTimes(i, o)), i = o, r += 1;
    }
    return s;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(e) {
    const n = g.fromDurationLike(e);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0)
      return [];
    let { s } = this, i = 1, r;
    const a = [];
    for (; s < this.e; ) {
      const o = this.start.plus(n.mapUnits((l) => l * i));
      r = +o > +this.e ? this.e : o, a.push(b.fromDateTimes(s, r)), s = r, i += 1;
    }
    return a;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(e) {
    return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(e) {
    if (!this.isValid) return this;
    const n = this.s > e.s ? this.s : e.s, s = this.e < e.e ? this.e : e.e;
    return n >= s ? null : b.fromDateTimes(n, s);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid) return this;
    const n = this.s < e.s ? this.s : e.s, s = this.e > e.e ? this.e : e.e;
    return b.fromDateTimes(n, s);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(e) {
    const [n, s] = e.sort((i, r) => i.s - r.s).reduce(
      ([i, r], a) => r ? r.overlaps(a) || r.abutsStart(a) ? [i, r.union(a)] : [i.concat([r]), a] : [i, a],
      [[], null]
    );
    return s && n.push(s), n;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let n = null, s = 0;
    const i = [], r = e.map((l) => [
      { time: l.s, type: "s" },
      { time: l.e, type: "e" }
    ]), a = Array.prototype.concat(...r), o = a.sort((l, u) => l.time - u.time);
    for (const l of o)
      s += l.type === "s" ? 1 : -1, s === 1 ? n = l.time : (n && +n != +l.time && i.push(b.fromDateTimes(n, l.time)), n = null);
    return b.merge(i);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return b.xor([this].concat(e)).map((n) => this.intersection(n)).filter((n) => n && !n.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : le;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(e = rt, n = {}) {
    return this.isValid ? E.create(this.s.loc.clone(n), e).formatInterval(this) : le;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : le;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : le;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : le;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(e, { separator: n = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${n}${this.e.toFormat(e)}` : le;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(e, n) {
    return this.isValid ? this.e.diff(this.s, e, n) : g.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return b.fromDateTimes(e(this.s), e(this.e));
  }
}
class Ye {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = S.defaultZone) {
    const n = m.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && n.offset !== n.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return H.isValidZone(e);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(e) {
    return J(e, S.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: n = null } = {}) {
    return (n || _.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: e = null, locObj: n = null } = {}) {
    return (n || _.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: n = null } = {}) {
    return (n || _.create(e)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(e = "long", { locale: n = null, numberingSystem: s = null, locObj: i = null, outputCalendar: r = "gregory" } = {}) {
    return (i || _.create(n, s, r)).months(e);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(e = "long", { locale: n = null, numberingSystem: s = null, locObj: i = null, outputCalendar: r = "gregory" } = {}) {
    return (i || _.create(n, s, r)).months(e, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(e = "long", { locale: n = null, numberingSystem: s = null, locObj: i = null } = {}) {
    return (i || _.create(n, s, null)).weekdays(e);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(e = "long", { locale: n = null, numberingSystem: s = null, locObj: i = null } = {}) {
    return (i || _.create(n, s, null)).weekdays(e, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: e = null } = {}) {
    return _.create(e).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(e = "short", { locale: n = null } = {}) {
    return _.create(n, null, "gregory").eras(e);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: Rs(), localeWeek: Ws() };
  }
}
function Ln(t, e) {
  const n = (i) => i.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = n(e) - n(t);
  return Math.floor(g.fromMillis(s).as("days"));
}
function Wa(t, e, n) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const d = Ln(l, u);
        return (d - d % 7) / 7;
      }
    ],
    ["days", Ln]
  ], i = {}, r = t;
  let a, o;
  for (const [l, u] of s)
    n.indexOf(l) >= 0 && (a = l, i[l] = u(t, e), o = r.plus(i), o > e ? (i[l]--, t = r.plus(i), t > e && (o = t, i[l]--, t = r.plus(i))) : t = o);
  return [t, i, o, a];
}
function Pa(t, e, n, s) {
  let [i, r, a, o] = Wa(t, e, n);
  const l = e - i, u = n.filter(
    (c) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(c) >= 0
  );
  u.length === 0 && (a < e && (a = i.plus({ [o]: 1 })), a !== i && (r[o] = (r[o] || 0) + l / (a - i)));
  const d = g.fromObject(r, s);
  return u.length > 0 ? g.fromMillis(l, s).shiftTo(...u).plus(d) : d;
}
const Ua = "missing Intl.DateTimeFormat.formatToParts support";
function v(t, e = (n) => n) {
  return { regex: t, deser: ([n]) => e(Nr(n)) };
}
const Ha = " ", ii = `[ ${Ha}]`, ri = new RegExp(ii, "g");
function Za(t) {
  return t.replace(/\./g, "\\.?").replace(ri, ii);
}
function Rn(t) {
  return t.replace(/\./g, "").replace(ri, " ").toLowerCase();
}
function z(t, e) {
  return t === null ? null : {
    regex: RegExp(t.map(Za).join("|")),
    deser: ([n]) => t.findIndex((s) => Rn(n) === Rn(s)) + e
  };
}
function Wn(t, e) {
  return { regex: t, deser: ([, n, s]) => ft(n, s), groups: e };
}
function Ge(t) {
  return { regex: t, deser: ([e]) => e };
}
function Ba(t) {
  return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function qa(t, e) {
  const n = V(e), s = V(e, "{2}"), i = V(e, "{3}"), r = V(e, "{4}"), a = V(e, "{6}"), o = V(e, "{1,2}"), l = V(e, "{1,3}"), u = V(e, "{1,6}"), d = V(e, "{1,9}"), c = V(e, "{2,4}"), y = V(e, "{4,6}"), f = (D) => ({ regex: RegExp(Ba(D.val)), deser: ([ae]) => ae, literal: !0 }), M = ((D) => {
    if (t.literal)
      return f(D);
    switch (D.val) {
      // era
      case "G":
        return z(e.eras("short"), 0);
      case "GG":
        return z(e.eras("long"), 0);
      // years
      case "y":
        return v(u);
      case "yy":
        return v(c, Ft);
      case "yyyy":
        return v(r);
      case "yyyyy":
        return v(y);
      case "yyyyyy":
        return v(a);
      // months
      case "M":
        return v(o);
      case "MM":
        return v(s);
      case "MMM":
        return z(e.months("short", !0), 1);
      case "MMMM":
        return z(e.months("long", !0), 1);
      case "L":
        return v(o);
      case "LL":
        return v(s);
      case "LLL":
        return z(e.months("short", !1), 1);
      case "LLLL":
        return z(e.months("long", !1), 1);
      // dates
      case "d":
        return v(o);
      case "dd":
        return v(s);
      // ordinals
      case "o":
        return v(l);
      case "ooo":
        return v(i);
      // time
      case "HH":
        return v(s);
      case "H":
        return v(o);
      case "hh":
        return v(s);
      case "h":
        return v(o);
      case "mm":
        return v(s);
      case "m":
        return v(o);
      case "q":
        return v(o);
      case "qq":
        return v(s);
      case "s":
        return v(o);
      case "ss":
        return v(s);
      case "S":
        return v(l);
      case "SSS":
        return v(i);
      case "u":
        return Ge(d);
      case "uu":
        return Ge(o);
      case "uuu":
        return v(n);
      // meridiem
      case "a":
        return z(e.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return v(r);
      case "kk":
        return v(c, Ft);
      // weekNumber (W)
      case "W":
        return v(o);
      case "WW":
        return v(s);
      // weekdays
      case "E":
      case "c":
        return v(n);
      case "EEE":
        return z(e.weekdays("short", !1), 1);
      case "EEEE":
        return z(e.weekdays("long", !1), 1);
      case "ccc":
        return z(e.weekdays("short", !0), 1);
      case "cccc":
        return z(e.weekdays("long", !0), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return Wn(new RegExp(`([+-]${o.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return Wn(new RegExp(`([+-]${o.source})(${s.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return Ge(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return Ge(/[^\S\n\r]/);
      default:
        return f(D);
    }
  })(t) || {
    invalidReason: Ua
  };
  return M.token = t, M;
}
const ja = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function Ja(t, e, n) {
  const { type: s, value: i } = t;
  if (s === "literal") {
    const l = /^\s+$/.test(i);
    return {
      literal: !l,
      val: l ? " " : i
    };
  }
  const r = e[s];
  let a = s;
  s === "hour" && (e.hour12 != null ? a = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? a = "hour12" : a = "hour24" : a = n.hour12 ? "hour12" : "hour24");
  let o = ja[a];
  if (typeof o == "object" && (o = o[r]), o)
    return {
      literal: !1,
      val: o
    };
}
function Ya(t) {
  return [`^${t.map((n) => n.regex).reduce((n, s) => `${n}(${s.source})`, "")}$`, t];
}
function Ga(t, e, n) {
  const s = t.match(e);
  if (s) {
    const i = {};
    let r = 1;
    for (const a in n)
      if (pe(n, a)) {
        const o = n[a], l = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (i[o.token.val[0]] = o.deser(s.slice(r, r + l))), r += l;
      }
    return [s, i];
  } else
    return [s, {}];
}
function Ka(t) {
  const e = (r) => {
    switch (r) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let n = null, s;
  return p(t.z) || (n = H.create(t.z)), p(t.Z) || (n || (n = new O(t.Z)), s = t.Z), p(t.q) || (t.M = (t.q - 1) * 3 + 1), p(t.h) || (t.h < 12 && t.a === 1 ? t.h += 12 : t.h === 12 && t.a === 0 && (t.h = 0)), t.G === 0 && t.y && (t.y = -t.y), p(t.u) || (t.S = Jt(t.u)), [Object.keys(t).reduce((r, a) => {
    const o = e(a);
    return o && (r[o] = t[a]), r;
  }, {}), n, s];
}
let kt = null;
function Qa() {
  return kt || (kt = m.fromMillis(1555555555555)), kt;
}
function Xa(t, e) {
  if (t.literal)
    return t;
  const n = E.macroTokenToFormatOpts(t.val), s = ui(n, e);
  return s == null || s.includes(void 0) ? t : s;
}
function ai(t, e) {
  return Array.prototype.concat(...t.map((n) => Xa(n, e)));
}
class oi {
  constructor(e, n) {
    if (this.locale = e, this.format = n, this.tokens = ai(E.parseFormat(n), e), this.units = this.tokens.map((s) => qa(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, i] = Ya(this.units);
      this.regex = RegExp(s, "i"), this.handlers = i;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [n, s] = Ga(e, this.regex, this.handlers), [i, r, a] = s ? Ka(s) : [null, null, void 0];
      if (pe(s, "a") && pe(s, "H"))
        throw new de(
          "Can't include meridiem when specifying 24-hour format"
        );
      return {
        input: e,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: n,
        matches: s,
        result: i,
        zone: r,
        specificOffset: a
      };
    } else
      return { input: e, tokens: this.tokens, invalidReason: this.invalidReason };
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function li(t, e, n) {
  return new oi(t, n).explainFromTokens(e);
}
function eo(t, e, n) {
  const { result: s, zone: i, specificOffset: r, invalidReason: a } = li(t, e, n);
  return [s, i, r, a];
}
function ui(t, e) {
  if (!t)
    return null;
  const s = E.create(e, t).dtFormatter(Qa()), i = s.formatToParts(), r = s.resolvedOptions();
  return i.map((a) => Ja(a, t, r));
}
const bt = "Invalid DateTime", Pn = 864e13;
function De(t) {
  return new F("unsupported zone", `the zone "${t.name}" is not supported`);
}
function St(t) {
  return t.weekData === null && (t.weekData = at(t.c)), t.weekData;
}
function Tt(t) {
  return t.localWeekData === null && (t.localWeekData = at(
    t.c,
    t.loc.getMinDaysInFirstWeek(),
    t.loc.getStartOfWeek()
  )), t.localWeekData;
}
function ee(t, e) {
  const n = {
    ts: t.ts,
    zone: t.zone,
    c: t.c,
    o: t.o,
    loc: t.loc,
    invalid: t.invalid
  };
  return new m({ ...n, ...e, old: n });
}
function ci(t, e, n) {
  let s = t - e * 60 * 1e3;
  const i = n.offset(s);
  if (e === i)
    return [s, e];
  s -= (i - e) * 60 * 1e3;
  const r = n.offset(s);
  return i === r ? [s, i] : [t - Math.min(i, r) * 60 * 1e3, Math.max(i, r)];
}
function Ke(t, e) {
  t += e * 60 * 1e3;
  const n = new Date(t);
  return {
    year: n.getUTCFullYear(),
    month: n.getUTCMonth() + 1,
    day: n.getUTCDate(),
    hour: n.getUTCHours(),
    minute: n.getUTCMinutes(),
    second: n.getUTCSeconds(),
    millisecond: n.getUTCMilliseconds()
  };
}
function et(t, e, n) {
  return ci(ht(t), e, n);
}
function Un(t, e) {
  const n = t.o, s = t.c.year + Math.trunc(e.years), i = t.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, r = {
    ...t.c,
    year: s,
    month: i,
    day: Math.min(t.c.day, ot(s, i)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, a = g.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), o = ht(r);
  let [l, u] = ci(o, n, t.zone);
  return a !== 0 && (l += a, u = t.zone.offset(l)), { ts: l, o: u };
}
function ue(t, e, n, s, i, r) {
  const { setZone: a, zone: o } = n;
  if (t && Object.keys(t).length !== 0 || e) {
    const l = e || o, u = m.fromObject(t, {
      ...n,
      zone: l,
      specificOffset: r
    });
    return a ? u : u.setZone(o);
  } else
    return m.invalid(
      new F("unparsable", `the input "${i}" can't be parsed as ${s}`)
    );
}
function Qe(t, e, n = !0) {
  return t.isValid ? E.create(_.create("en-US"), {
    allowZ: n,
    forceSimple: !0
  }).formatDateTimeFromString(t, e) : null;
}
function $t(t, e, n) {
  const s = t.c.year > 9999 || t.c.year < 0;
  let i = "";
  if (s && t.c.year >= 0 && (i += "+"), i += T(t.c.year, s ? 6 : 4), n === "year") return i;
  if (e) {
    if (i += "-", i += T(t.c.month), n === "month") return i;
    i += "-";
  } else if (i += T(t.c.month), n === "month") return i;
  return i += T(t.c.day), i;
}
function Hn(t, e, n, s, i, r, a) {
  let o = !n || t.c.millisecond !== 0 || t.c.second !== 0, l = "";
  switch (a) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += T(t.c.hour), a === "hour") break;
      if (e) {
        if (l += ":", l += T(t.c.minute), a === "minute") break;
        o && (l += ":", l += T(t.c.second));
      } else {
        if (l += T(t.c.minute), a === "minute") break;
        o && (l += T(t.c.second));
      }
      if (a === "second") break;
      o && (!s || t.c.millisecond !== 0) && (l += ".", l += T(t.c.millisecond, 3));
  }
  return i && (t.isOffsetFixed && t.offset === 0 && !r ? l += "Z" : t.o < 0 ? (l += "-", l += T(Math.trunc(-t.o / 60)), l += ":", l += T(Math.trunc(-t.o % 60))) : (l += "+", l += T(Math.trunc(t.o / 60)), l += ":", l += T(Math.trunc(t.o % 60)))), r && (l += "[" + t.zone.ianaName + "]"), l;
}
const di = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, to = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, no = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, tt = ["year", "month", "day", "hour", "minute", "second", "millisecond"], so = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], io = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function nt(t) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[t.toLowerCase()];
  if (!e) throw new ds(t);
  return e;
}
function Zn(t) {
  switch (t.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return nt(t);
  }
}
function ro(t) {
  if (xe === void 0 && (xe = S.now()), t.type !== "iana")
    return t.offset(xe);
  const e = t.name;
  let n = Lt.get(e);
  return n === void 0 && (n = t.offset(xe), Lt.set(e, n)), n;
}
function Bn(t, e) {
  const n = J(e.zone, S.defaultZone);
  if (!n.isValid)
    return m.invalid(De(n));
  const s = _.fromObject(e);
  let i, r;
  if (p(t.year))
    i = S.now();
  else {
    for (const l of tt)
      p(t[l]) && (t[l] = di[l]);
    const a = Fs(t) || Ls(t);
    if (a)
      return m.invalid(a);
    const o = ro(n);
    [i, r] = et(t, o, n);
  }
  return new m({ ts: i, zone: n, loc: s, o: r });
}
function qn(t, e, n) {
  const s = p(n.round) ? !0 : n.round, i = p(n.rounding) ? "trunc" : n.rounding, r = (o, l) => (o = Yt(o, s || n.calendary ? 0 : 2, n.calendary ? "round" : i), e.loc.clone(n).relFormatter(n).format(o, l)), a = (o) => n.calendary ? e.hasSame(t, o) ? 0 : e.startOf(o).diff(t.startOf(o), o).get(o) : e.diff(t, o).get(o);
  if (n.unit)
    return r(a(n.unit), n.unit);
  for (const o of n.units) {
    const l = a(o);
    if (Math.abs(l) >= 1)
      return r(l, o);
  }
  return r(t > e ? -0 : 0, n.units[n.units.length - 1]);
}
function jn(t) {
  let e = {}, n;
  return t.length > 0 && typeof t[t.length - 1] == "object" ? (e = t[t.length - 1], n = Array.from(t).slice(0, t.length - 1)) : n = Array.from(t), [e, n];
}
let xe;
const Lt = /* @__PURE__ */ new Map();
class m {
  /**
   * @access private
   */
  constructor(e) {
    const n = e.zone || S.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new F("invalid input") : null) || (n.isValid ? null : De(n));
    this.ts = p(e.ts) ? S.now() : e.ts;
    let i = null, r = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(n))
        [i, r] = [e.old.c, e.old.o];
      else {
        const o = G(e.o) && !e.old ? e.o : n.offset(this.ts);
        i = Ke(this.ts, o), s = Number.isNaN(i.year) ? new F("invalid input") : null, i = s ? null : i, r = s ? null : o;
      }
    this._zone = n, this.loc = e.loc || _.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = i, this.o = r, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new m({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [e, n] = jn(arguments), [s, i, r, a, o, l, u] = n;
    return Bn({ year: s, month: i, day: r, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [e, n] = jn(arguments), [s, i, r, a, o, l, u] = n;
    return e.zone = O.utcInstance, Bn({ year: s, month: i, day: r, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, n = {}) {
    const s = Fr(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return m.invalid("invalid input");
    const i = J(n.zone, S.defaultZone);
    return i.isValid ? new m({
      ts: s,
      zone: i,
      loc: _.fromObject(n)
    }) : m.invalid(De(i));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(e, n = {}) {
    if (G(e))
      return e < -Pn || e > Pn ? m.invalid("Timestamp out of range") : new m({
        ts: e,
        zone: J(n.zone, S.defaultZone),
        loc: _.fromObject(n)
      });
    throw new $(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(e, n = {}) {
    if (G(e))
      return new m({
        ts: e * 1e3,
        zone: J(n.zone, S.defaultZone),
        loc: _.fromObject(n)
      });
    throw new $("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(e, n = {}) {
    e = e || {};
    const s = J(n.zone, S.defaultZone);
    if (!s.isValid)
      return m.invalid(De(s));
    const i = _.fromObject(n), r = lt(e, Zn), { minDaysInFirstWeek: a, startOfWeek: o } = xn(r, i), l = S.now(), u = p(n.specificOffset) ? s.offset(l) : n.specificOffset, d = !p(r.ordinal), c = !p(r.year), y = !p(r.month) || !p(r.day), f = c || y, w = r.weekYear || r.weekNumber;
    if ((f || d) && w)
      throw new de(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (y && d)
      throw new de("Can't mix ordinal dates with month/day");
    const M = w || r.weekday && !f;
    let D, ae, be = Ke(l, u);
    M ? (D = so, ae = to, be = at(be, a, o)) : d ? (D = io, ae = no, be = _t(be)) : (D = tt, ae = di);
    let tn = !1;
    for (const Te of D) {
      const wi = r[Te];
      p(wi) ? tn ? r[Te] = ae[Te] : r[Te] = be[Te] : tn = !0;
    }
    const yi = M ? Cr(r, a, o) : d ? Vr(r) : Fs(r), nn = yi || Ls(r);
    if (nn)
      return m.invalid(nn);
    const pi = M ? Mn(r, a, o) : d ? Dn(r) : r, [gi, vi] = et(pi, u, s), Se = new m({
      ts: gi,
      zone: s,
      o: vi,
      loc: i
    });
    return r.weekday && f && e.weekday !== Se.weekday ? m.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${r.weekday} and a date of ${Se.toISO()}`
    ) : Se.isValid ? Se : m.invalid(Se.invalid);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(e, n = {}) {
    const [s, i] = Ea(e);
    return ue(s, i, n, "ISO 8601", e);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(e, n = {}) {
    const [s, i] = Oa(e);
    return ue(s, i, n, "RFC 2822", e);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(e, n = {}) {
    const [s, i] = Ma(e);
    return ue(s, i, n, "HTTP", n);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(e, n, s = {}) {
    if (p(e) || p(n))
      throw new $("fromFormat requires an input string and a format");
    const { locale: i = null, numberingSystem: r = null } = s, a = _.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    }), [o, l, u, d] = eo(a, e, n);
    return d ? m.invalid(d) : ue(o, l, s, `format ${n}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, n, s = {}) {
    return m.fromFormat(e, n, s);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(e, n = {}) {
    const [s, i] = Va(e);
    return ue(s, i, n, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, n = null) {
    if (!e)
      throw new $("need to specify a reason the DateTime is invalid");
    const s = e instanceof F ? e : new F(e, n);
    if (S.throwOnInvalid)
      throw new lr(s);
    return new m({ invalid: s });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(e) {
    return e && e.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(e, n = {}) {
    const s = ui(e, _.fromObject(n));
    return s ? s.map((i) => i ? i.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, n = {}) {
    return ai(E.parseFormat(e), _.fromObject(n)).map((i) => i.val).join("");
  }
  static resetCache() {
    xe = void 0, Lt.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(e) {
    return this[e];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? St(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? St(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? St(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? Tt(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? Tt(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? Tt(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? _t(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Ye.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Ye.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Ye.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Ye.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const e = 864e5, n = 6e4, s = ht(this.c), i = this.zone.offset(s - e), r = this.zone.offset(s + e), a = this.zone.offset(s - i * n), o = this.zone.offset(s - r * n);
    if (a === o)
      return [this];
    const l = s - a * n, u = s - o * n, d = Ke(l, a), c = Ke(u, o);
    return d.hour === c.hour && d.minute === c.minute && d.second === c.second && d.millisecond === c.millisecond ? [ee(this, { ts: l }), ee(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return He(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return ot(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? fe(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Re(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Re(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(e = {}) {
    const { locale: n, numberingSystem: s, calendar: i } = E.create(
      this.loc.clone(e),
      e
    ).resolvedOptions(this);
    return { locale: n, numberingSystem: s, outputCalendar: i };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(e = 0, n = {}) {
    return this.setZone(O.instance(e), n);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(S.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(e, { keepLocalTime: n = !1, keepCalendarTime: s = !1 } = {}) {
    if (e = J(e, S.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let i = this.ts;
      if (n || s) {
        const r = e.offset(this.ts), a = this.toObject();
        [i] = et(a, r, e);
      }
      return ee(this, { ts: i, zone: e });
    } else
      return m.invalid(De(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: n, outputCalendar: s } = {}) {
    const i = this.loc.clone({ locale: e, numberingSystem: n, outputCalendar: s });
    return ee(this, { loc: i });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(e) {
    if (!this.isValid) return this;
    const n = lt(e, Zn), { minDaysInFirstWeek: s, startOfWeek: i } = xn(n, this.loc), r = !p(n.weekYear) || !p(n.weekNumber) || !p(n.weekday), a = !p(n.ordinal), o = !p(n.year), l = !p(n.month) || !p(n.day), u = o || l, d = n.weekYear || n.weekNumber;
    if ((u || a) && d)
      throw new de(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && a)
      throw new de("Can't mix ordinal dates with month/day");
    let c;
    r ? c = Mn(
      { ...at(this.c, s, i), ...n },
      s,
      i
    ) : p(n.ordinal) ? (c = { ...this.toObject(), ...n }, p(n.day) && (c.day = Math.min(ot(c.year, c.month), c.day))) : c = Dn({ ..._t(this.c), ...n });
    const [y, f] = et(c, this.o, this.zone);
    return ee(this, { ts: y, o: f });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(e) {
    if (!this.isValid) return this;
    const n = g.fromDurationLike(e);
    return ee(this, Un(this, n));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const n = g.fromDurationLike(e).negate();
    return ee(this, Un(this, n));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(e, { useLocaleWeeks: n = !1 } = {}) {
    if (!this.isValid) return this;
    const s = {}, i = g.normalizeUnit(e);
    switch (i) {
      case "years":
        s.month = 1;
      // falls through
      case "quarters":
      case "months":
        s.day = 1;
      // falls through
      case "weeks":
      case "days":
        s.hour = 0;
      // falls through
      case "hours":
        s.minute = 0;
      // falls through
      case "minutes":
        s.second = 0;
      // falls through
      case "seconds":
        s.millisecond = 0;
        break;
    }
    if (i === "weeks")
      if (n) {
        const r = this.loc.getStartOfWeek(), { weekday: a } = this;
        a < r && (s.weekNumber = this.weekNumber - 1), s.weekday = r;
      } else
        s.weekday = 1;
    if (i === "quarters") {
      const r = Math.ceil(this.month / 3);
      s.month = (r - 1) * 3 + 1;
    }
    return this.set(s);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(e, n) {
    return this.isValid ? this.plus({ [e]: 1 }).startOf(e, n).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(e, n = {}) {
    return this.isValid ? E.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, e) : bt;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(e = rt, n = {}) {
    return this.isValid ? E.create(this.loc.clone(n), e).formatDateTime(this) : bt;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(e = {}) {
    return this.isValid ? E.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
   * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
   * @return {string|null}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: n = !1,
    suppressMilliseconds: s = !1,
    includeOffset: i = !0,
    extendedZone: r = !1,
    precision: a = "milliseconds"
  } = {}) {
    if (!this.isValid)
      return null;
    a = nt(a);
    const o = e === "extended";
    let l = $t(this, o, a);
    return tt.indexOf(a) >= 3 && (l += "T"), l += Hn(
      this,
      o,
      n,
      s,
      i,
      r,
      a
    ), l;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
   * @return {string|null}
   */
  toISODate({ format: e = "extended", precision: n = "day" } = {}) {
    return this.isValid ? $t(this, e === "extended", nt(n)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Qe(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: n = !1,
    includeOffset: s = !0,
    includePrefix: i = !1,
    extendedZone: r = !1,
    format: a = "extended",
    precision: o = "milliseconds"
  } = {}) {
    return this.isValid ? (o = nt(o), (i && tt.indexOf(o) >= 3 ? "T" : "") + Hn(
      this,
      a === "extended",
      n,
      e,
      s,
      r,
      o
    )) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Qe(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return Qe(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? $t(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: e = !0, includeZone: n = !1, includeOffsetSpace: s = !0 } = {}) {
    let i = "HH:mm:ss.SSS";
    return (n || e) && (s && (i += " "), n ? i += "z" : e && (i += "ZZ")), Qe(this, i, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : bt;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(e = {}) {
    if (!this.isValid) return {};
    const n = { ...this.c };
    return e.includeConfig && (n.outputCalendar = this.outputCalendar, n.numberingSystem = this.loc.numberingSystem, n.locale = this.loc.locale), n;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(e, n = "milliseconds", s = {}) {
    if (!this.isValid || !e.isValid)
      return g.invalid("created by diffing an invalid DateTime");
    const i = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, r = Lr(n).map(g.normalizeUnit), a = e.valueOf() > this.valueOf(), o = a ? this : e, l = a ? e : this, u = Pa(o, l, r, i);
    return a ? u.negate() : u;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(e = "milliseconds", n = {}) {
    return this.diff(m.now(), e, n);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? b.fromDateTimes(this, e) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(e, n, s) {
    if (!this.isValid) return !1;
    const i = e.valueOf(), r = this.setZone(e.zone, { keepLocalTime: !0 });
    return r.startOf(n, s) <= i && i <= r.endOf(n, s);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(e) {
    return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(e = {}) {
    if (!this.isValid) return null;
    const n = e.base || m.fromObject({}, { zone: this.zone }), s = e.padding ? this < n ? -e.padding : e.padding : 0;
    let i = ["years", "months", "days", "hours", "minutes", "seconds"], r = e.unit;
    return Array.isArray(e.unit) && (i = e.unit, r = void 0), qn(n, this.plus(s), {
      ...e,
      numeric: "always",
      units: i,
      unit: r
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(e = {}) {
    return this.isValid ? qn(e.base || m.fromObject({}, { zone: this.zone }), this, {
      ...e,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...e) {
    if (!e.every(m.isDateTime))
      throw new $("min requires all arguments be DateTimes");
    return An(e, (n) => n.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(m.isDateTime))
      throw new $("max requires all arguments be DateTimes");
    return An(e, (n) => n.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, n, s = {}) {
    const { locale: i = null, numberingSystem: r = null } = s, a = _.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    });
    return li(a, e, n);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, n, s = {}) {
    return m.fromFormatExplain(e, n, s);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(e, n = {}) {
    const { locale: s = null, numberingSystem: i = null } = n, r = _.fromOpts({
      locale: s,
      numberingSystem: i,
      defaultToEN: !0
    });
    return new oi(r, e);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(e, n, s = {}) {
    if (p(e) || p(n))
      throw new $(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: i = null, numberingSystem: r = null } = s, a = _.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    });
    if (!a.equals(n.locale))
      throw new $(
        `fromFormatParser called with a locale of ${a}, but the format parser was created for ${n.locale}`
      );
    const { result: o, zone: l, specificOffset: u, invalidReason: d } = n.explainFromTokens(e);
    return d ? m.invalid(d) : ue(
      o,
      l,
      s,
      `format ${n.format}`,
      e,
      u
    );
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return rt;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return hs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return dr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return fs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return ms;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return ys;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return ps;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return gs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return vs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return ws;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return _s;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return ks;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return bs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Ss;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Ts;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return $s;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Es;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return hr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Os;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return Ms;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return Ds;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return xs;
  }
}
function Oe(t) {
  if (m.isDateTime(t))
    return t;
  if (t && t.valueOf && G(t.valueOf()))
    return m.fromJSDate(t);
  if (t && typeof t == "object")
    return m.fromObject(t);
  throw new $(
    `Unknown datetime argument: ${t}, of type ${typeof t}`
  );
}
const ao = [
  { value: "HH:mm", label: "18:38" },
  { value: "HH:mm:ss", label: "18:38:05" },
  { value: "h:mm a", label: "6:38 PM" },
  { value: "H:mm", label: "8:38" }
], oo = [
  { value: "cccc dd. L.", label: "úterý 08. 9." },
  { value: "cccc dd. LL. yyyy", label: "úterý 08. 09. 2026" },
  { value: "ccc dd. LL.", label: "út 08. 09." },
  { value: "dd. MM. yyyy", label: "08. 09. 2026" },
  { value: "cccc d. MMMM", label: "úterý 8. září" },
  { value: "EEE, MMM d", label: "Tue, Sep 8" }
];
function lo(t, e) {
  let n = m.local();
  return e && (n = n.setZone(e)), t && (n = n.setLocale(t)), n;
}
function uo(t, e) {
  return t.toFormat(e || cs);
}
function co(t, e) {
  return t.toFormat(e || or);
}
function ho(t) {
  const e = t || cs;
  return e.includes("s") || e.includes("S");
}
function Xt(t) {
  const e = t % 19, n = Math.floor(t / 100), s = t % 100, i = Math.floor(n / 4), r = n % 4, a = Math.floor((n + 8) / 25), o = Math.floor((n - a + 1) / 3), l = (19 * e + n - i - o + 15) % 30, u = Math.floor(s / 4), d = s % 4, c = (32 + 2 * r + 2 * u - l - d) % 7, y = Math.floor((e + 11 * l + 22 * c) / 451), f = Math.floor((l + c - 7 * y + 114) / 31), w = (l + c - 7 * y + 114) % 31 + 1;
  return new Date(Date.UTC(t, f - 1, w));
}
function fo(t) {
  const e = Xt(t);
  return e.setDate(e.getDate() + 1), e;
}
function mo(t) {
  const e = fo(t.getFullYear());
  return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate();
}
function yo(t) {
  const e = Xt(t);
  return e.setDate(e.getDate() - 2), e;
}
function po(t) {
  const e = yo(t.getFullYear());
  return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate();
}
function go(t) {
  return mo(t instanceof Date ? t : t.toJSDate());
}
function hi(t) {
  return m.fromJSDate(Xt(t)).setZone("Europe/Prague").startOf("day");
}
function vo(t) {
  return po(t instanceof Date ? t : t.toJSDate());
}
function wo(t) {
  const e = hi(t);
  return b.fromDateTimes(
    e.minus({ days: 7 }),
    // Palm Sunday
    e.plus({ days: 1 })
  );
}
function _o(t) {
  t = (t instanceof Date ? m.fromJSDate(t) : t).setZone("Europe/Prague").startOf("day");
  const e = wo(t.year);
  return e.isValid && e.start && e.end ? e.start <= t && t <= e.end : !1;
}
const ko = {
  "-7": "Květná neděle",
  "-6": "Modré pondělí",
  "-5": "Šedivé úterý",
  "-4": "Škaredá středa",
  "-3": "Zelený čtvrtek",
  "-2": "Velký pátek",
  "-1": "Bílá sobota",
  0: "Velikonoční neděle",
  1: "Velikonoční pondělí"
};
function Jn(t) {
  if (t = (t instanceof Date ? m.fromJSDate(t) : t).setZone("Europe/Prague").startOf("day"), _o(t)) {
    const e = hi(t.year).setZone("Europe/Prague").startOf("day"), n = t.diff(e, "days").as("days");
    return ko[n] ?? void 0;
  }
}
const bo = {
  "0101": "Den obnovy samostatného českého státu",
  "0105": "Svátek práce",
  "0805": "Den vítězství (1945)",
  "0507": "Den slovanských věrozvěstů Cyrila a Metoděje",
  "0607": "Den upálení mistra Jana Husa (1415)",
  2809: "Den české státnosti",
  2810: "Den vzniku samostatného československého státu (1918)",
  1711: "Den boje za svobodu a demokracii (1939 a 1989)",
  2412: "Štědrý den",
  2512: "První svátek vánoční",
  2612: "Druhý svátek vánoční"
};
function So(t) {
  return t = t instanceof Date ? m.fromJSDate(t) : t, go(t) || vo(t) ? Jn(t) : bo[t.toFormat("ddMM")];
}
const To = {
  1006: { name: "Den památky obětí vyhlazení obce Lidice", description: "Dne 10. června 1942 byla Lidice vyhlazena nacisty", year: 1942 },
  1111: { name: "Den válečných veteránů", description: "Konec první světové války", year: 1918 },
  1203: { name: "Den přístupu České republiky k Severoatlantické smlouvě", description: "Členství v NATO od 12. března 1999", year: 1999 },
  1505: { name: "Den rodin", description: "Mezinárodní den rodiny slavený od roku 1994", year: 1994 },
  1601: { name: "Den památky Jana Palacha", description: "Výročí upálení Jana Palacha", year: 1969 },
  1806: { name: "Den hrdinů druhého odboje", description: "Boj v kostele svatých Cyrila a Metoděje", year: 1942 },
  2108: { name: "Den památky obětí invaze a následné okupace vojsky Varšavské smlouvy", description: "Okupace Československa vojsky Varšavské smlouvy", year: 1968 },
  2506: { name: "Den odchodu okupačních vojsk", description: "Odchod posledního sovětského vojáka z ČSFR", year: 1991 },
  2701: { name: "Den památky obětí holocaustu a předcházení zločinům proti lidskosti", description: "Osvobození nacistického koncentračního a vyhlazovacího tábora Auschwitz-Birkenau", year: 1945 },
  2705: { name: "Den národního vzdoru", description: "Ozbrojený útok čs. parašutistů na zastupujícího říšského protektora Reinharda Heydricha", year: 1942 },
  2706: { name: "Den památky obětí komunistického režimu", description: "Poprava Milady Horákové", year: 1950 },
  2803: { name: "Den narození Jana Ámose Komenského", description: "Narození Jana Ámose Komenského 28. března 1592 v Uherském Brodě", year: 1592 },
  "0803": { name: "Mezinárodní den žen", description: "Mezinárodní den žen slavený od roku 1911", year: 1911 },
  "0903": { name: "Den památky obětí vyhlazení terezínského rodinného tábora v Osvětimi-Březince", description: "Vyhlazení terezínského rodinného tábora v Osvětimi-Březince", year: 1944 },
  "0704": { name: "Den vzdělanosti", description: "Založení Univerzity Karlovy", year: 1348 },
  "0505": { name: "Květnové povstání českého lidu", description: "Povstání proti nacistické okupaci", year: 1945 },
  "0810": { name: "Památný den sokolstva", description: "Rozpuštění Československé obce sokolské výnosem zastupujícího říšského protektora Reinharda Heydricha", year: 1941 }
}, $o = To;
function Eo(t) {
  return t = t instanceof Date ? m.fromJSDate(t) : t, $o[t.toFormat("ddMM")];
}
function Oo(t) {
  const e = So(t);
  return typeof e == "string" && e.length > 0 ? e : null;
}
function Mo(t) {
  const e = Eo(t);
  if (!e || typeof e != "object")
    return null;
  const n = e.name;
  return n && n.length > 0 ? n : null;
}
const Do = {
  "01-02": "Karina",
  "01-03": ["Radmila", "Radomil"],
  "01-04": "Diana",
  "01-05": "Dalimil",
  "01-06": ["Kašpar", "Melichar", "Baltazar"],
  "01-07": "Vilma",
  "01-08": "Čestmír",
  "01-09": ["Vladan", "Valtr"],
  "01-10": "Břetislav",
  "01-11": "Bohdana",
  "01-12": "Pravoslav",
  "01-13": "Edita",
  "01-14": "Radovan",
  "01-15": "Alice",
  "01-16": "Ctirad",
  "01-17": "Drahoslav",
  "01-18": ["Vladislav", "Vladislava"],
  "01-19": "Doubravka",
  "01-20": ["Ilona", "Sebastián"],
  "01-21": "Běla",
  "01-22": ["Slavomír", "Slavomíra"],
  "01-23": "Zdeněk",
  "01-24": "Milena",
  "01-25": "Miloš",
  "01-26": "Zora",
  "01-27": "Ingrid",
  "01-28": "Otýlie",
  "01-29": "Zdislava",
  "01-30": ["Robin", "Erna"],
  "01-31": ["Marika", "Spytihněv"],
  "02-01": "Hynek",
  "02-02": ["Nela", "Hromnice"],
  "02-03": "Blažej",
  "02-04": "Jarmila",
  "02-05": "Dobromila",
  "02-06": "Vanda",
  "02-07": "Veronika",
  "02-08": "Milada",
  "02-09": "Apolena",
  "02-10": "Mojmír",
  "02-11": "Božena",
  "02-12": ["Slavěna", "Slávka"],
  "02-13": ["Věnceslav", "Věnceslava"],
  "02-14": ["Valentýn", "Valentýna"],
  "02-15": "Jiřina",
  "02-16": "Ljuba",
  "02-17": "Miloslava",
  "02-18": "Gizela",
  "02-19": "Patrik",
  "02-20": "Oldřich",
  "02-21": ["Lenka", "Eleonora"],
  "02-22": "Petr",
  "02-23": "Svatopluk",
  "02-24": ["Matěj", "Matyáš"],
  "02-25": "Liliana",
  "02-26": "Dorota",
  "02-27": "Alexandr",
  "02-28": "Lumír",
  "02-29": "Horymír",
  "03-01": ["Bedřich", "Bedřiška"],
  "03-02": "Anežka",
  "03-03": ["Kamil", "Kunhuta"],
  "03-04": "Stela",
  "03-05": "Kazimír",
  "03-06": "Miroslav",
  "03-07": "Tomáš",
  "03-08": ["Gabriela", "Zoltán"],
  "03-09": "Františka",
  "03-10": "Viktorie",
  "03-11": "Anděla",
  "03-12": "Řehoř",
  "03-13": "Růžena",
  "03-14": ["Rút", "Matylda"],
  "03-15": "Ida",
  "03-16": ["Elena", "Herbert"],
  "03-17": ["Vlastimil", "Vlastimila"],
  "03-18": "Eduard",
  "03-19": ["Josef", "Josefa"],
  "03-20": "Světlana",
  "03-21": "Radek",
  "03-22": ["Leona", "Leontina", "Lea"],
  "03-23": "Ivona",
  "03-24": "Gabriel",
  "03-25": "Marián",
  "03-26": "Emanuel",
  "03-27": "Dita",
  "03-28": "Soňa",
  "03-29": "Taťána",
  "03-30": ["Arnošt", "Ernest"],
  "03-31": "Kvido",
  "04-01": "Hugo",
  "04-02": "Erika",
  "04-03": "Richard",
  "04-04": "Ivana",
  "04-05": ["Miroslava", "Mirka"],
  "04-06": ["Vendula", "Venuše"],
  "04-07": ["Heřman", "Hermína"],
  "04-08": "Ema",
  "04-09": "Dušan",
  "04-10": "Darja",
  "04-11": "Izabela",
  "04-12": "Julius",
  "04-13": "Aleš",
  "04-14": "Vincenc",
  "04-15": "Anastázie",
  "04-16": ["Irena", "Bernadeta"],
  "04-17": "Rudolf",
  "04-18": "Valérie",
  "04-19": "Rostislav",
  "04-20": "Marcela",
  "04-21": "Alexandra",
  "04-22": "Evženie",
  "04-23": "Vojtěch",
  "04-24": "Jiří",
  "04-25": "Marek",
  "04-26": "Oto",
  "04-27": "Jaroslav",
  "04-28": "Vlastislav",
  "04-29": "Robert",
  "04-30": "Blahoslav",
  "05-02": "Zikmund",
  "05-03": ["Alexej", "Alex"],
  "05-04": "Květoslav",
  "05-05": "Klaudie",
  "05-06": "Radoslav",
  "05-07": "Stanislav",
  "05-09": "Ctibor",
  "05-10": "Blažena",
  "05-11": "Svatava",
  "05-12": "Pankrác",
  "05-13": "Servác",
  "05-14": "Bonifác",
  "05-15": ["Žofie", "Sofie"],
  "05-16": "Přemysl",
  "05-17": "Aneta",
  "05-18": "Nataša",
  "05-19": "Ivo",
  "05-20": "Zbyšek",
  "05-21": "Monika",
  "05-22": "Emil",
  "05-23": ["Vladimír", "Vladimíra"],
  "05-24": ["Jana", "Vanesa"],
  "05-25": "Viola",
  "05-26": "Filip",
  "05-27": "Valdemar",
  "05-28": "Vilém",
  "05-29": ["Maxmilián", "Maxim"],
  "05-30": "Ferdinand",
  "05-31": "Kamila",
  "06-01": "Laura",
  "06-02": "Jarmil",
  "06-03": ["Tamara", "Kevin"],
  "06-04": "Dalibor",
  "06-05": ["Dobroslav", "Dobroslava"],
  "06-06": "Norbert",
  "06-07": ["Iveta", "Slavoj"],
  "06-08": "Medard",
  "06-09": "Stanislava",
  "06-10": ["Gita", "Margita"],
  "06-11": "Bruno",
  "06-12": "Antonie",
  "06-13": "Antonín",
  "06-14": ["Roland", "Herta"],
  "06-15": "Vít",
  "06-16": "Zbyněk",
  "06-17": "Adolf",
  "06-18": ["Milan", "Milana"],
  "06-19": ["Leoš", "Leo"],
  "06-20": ["Květa", "Květuše"],
  "06-21": ["Alois", "Aloisie"],
  "06-22": "Pavla",
  "06-23": "Zdeňka",
  "06-24": "Jan",
  "06-25": "Ivan",
  "06-26": ["Adriana", "Adrian"],
  "06-27": ["Ladislav", "Ladislava"],
  "06-28": "Lubomír",
  "06-29": ["Petr", "Pavel"],
  "06-30": "Šárka",
  "07-01": "Jaroslava",
  "07-02": "Patricie",
  "07-03": ["Radomír", "Radomíra"],
  "07-04": "Prokop",
  "07-05": ["Cyril", "Metoděj"],
  "07-07": "Bohuslava",
  "07-08": "Nora",
  "07-09": ["Drahoslava", "Drahuše"],
  "07-10": ["Libuše", "Amálie"],
  "07-11": ["Olga", "Helga"],
  "07-12": "Bořek",
  "07-13": "Markéta",
  "07-14": "Karolína",
  "07-15": "Jindřich",
  "07-16": "Luboš",
  "07-17": "Martina",
  "07-18": ["Drahomíra", "Drahomír"],
  "07-19": "Čeněk",
  "07-20": "Ilja",
  "07-21": ["Vítězslav", "Vítězslava"],
  "07-22": ["Magdaléna", "Magda"],
  "07-23": "Libor",
  "07-24": "Kristýna",
  "07-25": "Jakub",
  "07-26": ["Anna", "Anita"],
  "07-27": "Věroslav",
  "07-28": ["Viktor", "Alina"],
  "07-29": "Marta",
  "07-30": "Bořivoj",
  "07-31": "Ignác",
  "08-01": "Oskar",
  "08-02": "Gustav",
  "08-03": "Miluše",
  "08-04": ["Dominik", "Dominika"],
  "08-05": "Kristián",
  "08-06": "Oldřiška",
  "08-07": "Lada",
  "08-08": "Soběslav",
  "08-09": "Roman",
  "08-10": "Vavřinec",
  "08-11": "Zuzana",
  "08-12": "Klára",
  "08-13": "Alena",
  "08-14": "Alan",
  "08-15": "Hana",
  "08-16": "Jáchym",
  "08-17": "Petra",
  "08-18": ["Helena", "Jelena"],
  "08-19": "Ludvík",
  "08-20": "Bernard",
  "08-21": "Johana",
  "08-22": "Bohuslav",
  "08-23": "Sandra",
  "08-24": "Bartoloměj",
  "08-25": "Radim",
  "08-26": "Luděk",
  "08-27": "Otakar",
  "08-28": "Augustýn",
  "08-29": "Evelína",
  "08-30": "Vladěna",
  "08-31": "Pavlína",
  "09-01": ["Linda", "Samuel"],
  "09-02": "Adéla",
  "09-03": ["Bronislav", "Bronislava"],
  "09-04": ["Jindřiška", "Rozálie"],
  "09-05": "Boris",
  "09-06": "Boleslav",
  "09-07": "Regína",
  "09-08": "Mariana",
  "09-09": "Daniela",
  "09-10": "Irma",
  "09-11": ["Denisa", "Denis"],
  "09-12": "Marie",
  "09-13": "Lubor",
  "09-14": "Radka",
  "09-15": "Jolana",
  "09-16": ["Ludmila", "Lidmila"],
  "09-17": ["Naděžda", "Naďa"],
  "09-18": "Kryštof",
  "09-19": "Zita",
  "09-20": "Oleg",
  "09-21": "Matouš",
  "09-22": "Darina",
  "09-23": "Berta",
  "09-24": ["Jaromír", "Jaromíra"],
  "09-25": ["Zlata", "Zlatuše"],
  "09-26": "Andrea",
  "09-27": "Jonáš",
  "09-28": ["Václav", "Václava"],
  "09-29": ["Michal", "Michael"],
  "09-30": ["Jeroným", "Ráchel"],
  "10-01": "Igor",
  "10-02": ["Olívie", "Oliver"],
  "10-03": "Bohumil",
  "10-04": "František",
  "10-05": "Eliška",
  "10-06": "Hanuš",
  "10-07": "Justýna",
  "10-08": "Věra",
  "10-09": ["Štefan", "Sára"],
  "10-10": "Marina",
  "10-11": "Andrej",
  "10-12": "Marcel",
  "10-13": "Renáta",
  "10-14": "Agáta",
  "10-15": ["Tereza", "Terezie"],
  "10-16": ["Havel", "Galina"],
  "10-17": "Hedvika",
  "10-18": "Lukáš",
  "10-19": ["Michaela", "Michala"],
  "10-20": "Vendelín",
  "10-21": "Brigita",
  "10-22": "Sabina",
  "10-23": "Teodor",
  "10-24": "Nina",
  "10-25": "Beáta",
  "10-26": "Erik",
  "10-27": ["Šarlota", "Zoe"],
  "10-28": ["Jidáš", "Alfréd"],
  "10-29": ["Silvie", "Sylva"],
  "10-30": "Tadeáš",
  "10-31": "Štěpánka",
  "11-01": "Felix",
  "11-02": "Tobiáš",
  "11-03": "Hubert",
  "11-04": ["Karel", "Karla"],
  "11-05": "Miriam",
  "11-06": ["Liběna", "Leonard"],
  "11-07": "Saskie",
  "11-08": ["Bohumír", "Bohumíra"],
  "11-09": "Bohdan",
  "11-10": "Evžen",
  "11-11": "Martin",
  "11-12": "Benedikt",
  "11-13": "Tibor",
  "11-14": "Sáva",
  "11-15": "Leopold",
  "11-16": "Otmar",
  "11-17": ["Mahulena", "Gertruda"],
  "11-18": "Romana",
  "11-19": "Alžběta",
  "11-20": "Nikola",
  "11-21": "Albert",
  "11-22": "Cecílie",
  "11-23": "Klement",
  "11-24": "Emílie",
  "11-25": "Kateřina",
  "11-26": "Artur",
  "11-27": "Xenie",
  "11-28": "René",
  "11-29": "Zina",
  "11-30": "Ondřej",
  "12-01": "Iva",
  "12-02": "Blanka",
  "12-03": "Svatoslav",
  "12-04": "Barbora",
  "12-05": "Jitka",
  "12-06": "Mikuláš",
  "12-07": ["Ambrož", "Benjamín"],
  "12-08": "Květoslava",
  "12-09": "Vratislav",
  "12-10": "Julie",
  "12-11": ["Dana", "Danuše"],
  "12-12": "Simona",
  "12-13": "Lucie",
  "12-14": "Lýdie",
  "12-15": ["Radana", "Radan"],
  "12-16": "Albína",
  "12-17": "Daniel",
  "12-18": "Miloslav",
  "12-19": "Ester",
  "12-20": "Dagmar",
  "12-21": "Natálie",
  "12-22": "Šimon",
  "12-23": "Vlasta",
  "12-24": ["Adam", "Eva"],
  "12-26": "Štěpán",
  "12-27": "Žaneta",
  "12-28": "Bohumila",
  "12-29": "Judita",
  "12-30": "David",
  "12-31": "Silvestr"
}, fi = Do, Yn = (t) => String(t).padStart(2, "0");
function mi(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
const Gn = /* @__PURE__ */ new Map();
for (const [t, e] of Object.entries(fi))
  for (const n of mi(e)) {
    const s = n.toLowerCase(), i = Gn.get(s);
    i ? i.push(t) : Gn.set(s, [t]);
  }
function xo(t) {
  const e = `${Yn(t.getMonth() + 1)}-${Yn(t.getDate())}`;
  return mi(fi[e]);
}
function Ao(t, e) {
  const n = xo(t.toJSDate());
  if (!n.length)
    return null;
  const s = n.join(" a "), i = e?.trim();
  return i ? `${i} ${s}` : s;
}
const No = Xn`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: default;
  }

  ha-card.has-action {
    cursor: pointer;
  }

  ha-card.has-action:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .row.no-temps {
    grid-template-columns: minmax(0, 1fr);
  }

  .center {
    text-align: center;
    min-width: 0;
    color: var(--primary-text-color);
  }

  .time {
    display: block;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .date {
    display: block;
    font-weight: 600;
    line-height: 1.2;
    margin-top: 2px;
    opacity: 0.95;
  }

  .nameday,
  .holiday,
  .significant {
    display: block;
    font-weight: 500;
    line-height: 1.3;
    margin-top: 3px;
    opacity: 0.85;
  }

  .holiday {
    font-weight: 700;
    color: var(--accent-color, var(--primary-color));
    opacity: 1;
  }

  .significant {
    font-style: italic;
    opacity: 0.8;
  }

  .temp {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .temp.left {
    align-items: flex-start;
    text-align: left;
  }

  .temp.right {
    align-items: flex-end;
    text-align: right;
  }

  .temp-label {
    font-size: 0.85em;
    font-weight: 700;
    line-height: 1.2;
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .temp-reading {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .temp.right .temp-reading {
    flex-direction: row-reverse;
  }

  .temp-value {
    display: flex;
    align-items: baseline;
    gap: 2px;
    min-width: 0;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .temp-number {
    font-size: 1em;
  }

  .temp-unit {
    font-size: 0.72em;
    font-weight: 700;
    /* jednotka dědí accent barvu z .temp */
  }

  .temp ha-icon {
    --mdc-icon-size: 1em;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    color: inherit;
  }

  /* Velikostní varianty */
  :host([data-size='compact']) ha-card {
    padding: 8px 12px;
  }
  :host([data-size='compact']) .time {
    font-size: 2em;
  }
  :host([data-size='compact']) .date {
    font-size: 1em;
  }
  :host([data-size='compact']) .nameday,
  :host([data-size='compact']) .holiday,
  :host([data-size='compact']) .significant {
    font-size: 0.8em;
  }
  :host([data-size='compact']) .temp-label {
    font-size: 0.75em;
  }
  :host([data-size='compact']) .temp-reading {
    font-size: 1.15em;
  }

  :host([data-size='normal']) .time {
    font-size: 2.7em;
  }
  :host([data-size='normal']) .date {
    font-size: 1.3em;
  }
  :host([data-size='normal']) .nameday,
  :host([data-size='normal']) .holiday,
  :host([data-size='normal']) .significant {
    font-size: 0.9em;
  }
  :host([data-size='normal']) .temp-reading {
    font-size: 1.4em;
  }

  :host([data-size='large']) ha-card {
    padding: 16px 20px;
  }
  :host([data-size='large']) .time {
    font-size: 3.4em;
  }
  :host([data-size='large']) .date {
    font-size: 1.55em;
  }
  :host([data-size='large']) .nameday,
  :host([data-size='large']) .holiday,
  :host([data-size='large']) .significant {
    font-size: 1.05em;
  }
  :host([data-size='large']) .temp-label {
    font-size: 0.95em;
  }
  :host([data-size='large']) .temp-reading {
    font-size: 1.65em;
  }
`, Io = "mdi:thermometer", Co = ["unavailable", "unknown", "none", ""];
function Vo(t, e) {
  return !!(t?.entity || e?.entity);
}
function Kn(t, e, n, s) {
  if (!e?.entity)
    return null;
  const i = t?.states?.[e.entity], r = i?.state, a = e.precision ?? 1;
  let o = "—", l = !1;
  if (r !== void 0 && !Co.includes(r)) {
    const y = Number(r);
    l = !0, o = Number.isNaN(y) ? String(r) : y.toFixed(a).replace(".", ",");
  }
  const u = i?.attributes?.unit_of_measurement, d = e.unit?.trim(), c = e.show_unit === !1 || !l ? "" : d || u || "";
  return {
    label: e.name || i?.attributes?.friendly_name || n,
    value: o,
    unit: c,
    icon: e.icon || i?.attributes?.icon || s || Io,
    iconColor: Et(e.icon_color),
    entity: e.entity
  };
}
var zo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, K = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Fo(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (i = (s ? a(e, n, i) : a(i)) || i);
  return s && i && zo(e, n, i), i;
};
console.info(
  `%c ${us.toUpperCase()} %c ${rr} `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
const Rt = window;
Rt.customCards = Rt.customCards || [];
Rt.customCards.push({
  type: Pe,
  name: us,
  description: ar,
  preview: !0
});
let R = class extends he {
  constructor() {
    super(...arguments), this._time = "", this._date = "", this._nameday = null, this._holiday = null, this._significant = null;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Wo), document.createElement(`${Pe}-editor`);
  }
  static getStubConfig() {
    return {
      time_format: "HH:mm",
      date_format: "cccc dd. L.",
      show_nameday: !0,
      show_public_holiday: !0,
      show_significant_day: !1,
      size: "normal"
    };
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this._config = { ...t }, this._updateDateTime(), this._scheduleTick();
  }
  getCardSize() {
    return this._config?.size === "large" ? 3 : 2;
  }
  getGridOptions() {
    return {
      columns: 12,
      rows: this._config?.size === "compact" ? 2 : 3,
      min_columns: 6,
      min_rows: 2
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._scheduleTick();
  }
  disconnectedCallback() {
    this._stopTick(), super.disconnectedCallback();
  }
  updated(t) {
    (t.has("_config") || t.has("hass")) && this._updateDateTime(), this.setAttribute("data-size", this._config?.size || "normal"), (t.has("_config") || t.has("hass")) && sr(this, this.hass, this._config?.theme);
  }
  render() {
    if (!this._config)
      return k;
    const t = Kn(
      this.hass,
      this._config.left_temperature,
      "Venkovní",
      "mdi:home-thermometer"
    ), e = Kn(
      this.hass,
      this._config.right_temperature,
      "Vnitřní",
      "mdi:thermometer"
    ), n = Vo(
      this._config.left_temperature,
      this._config.right_temperature
    ), s = Ee(this._config.tap_action) || Ee(this._config.hold_action) || Ee(this._config.double_tap_action), i = yn({
      background: Et(this._config.background_color),
      color: Et(this._config.text_color)
    });
    return B`
      <ha-card
        class=${s ? "has-action" : ""}
        style=${i}
        tabindex=${s ? "0" : "-1"}
        @action=${this._handleAction}
        ${tr({
      hasHold: Ee(this._config.hold_action),
      hasDoubleClick: Ee(this._config.double_tap_action)
    })}
      >
        <div class="row ${n ? "" : "no-temps"}">
          ${n ? this._renderTemp(t, "left") : k}
          <div class="center">
            <span class="time">${this._time}</span>
            <span class="date">${this._date}</span>
            ${this._nameday ? B`<span class="nameday">${this._nameday}</span>` : k}
            ${this._holiday ? B`<span class="holiday">${this._holiday}</span>` : k}
            ${this._significant ? B`<span class="significant">${this._significant}</span>` : k}
          </div>
          ${n ? this._renderTemp(e, "right") : k}
        </div>
      </ha-card>
    `;
  }
  _renderTemp(t, e) {
    if (!t)
      return B`<div class="temp ${e}"></div>`;
    const n = yn({
      color: t.iconColor || void 0
    });
    return B`
      <div class="temp ${e}" style=${n}>
        <span class="temp-label" title=${t.label}>${t.label}</span>
        <div class="temp-reading">
          <ha-icon .icon=${t.icon}></ha-icon>
          <div class="temp-value">
            <span class="temp-number">${t.value}</span>
            ${t.unit ? B`<span class="temp-unit">${t.unit}</span>` : k}
          </div>
        </div>
      </div>
    `;
  }
  _handleAction(t) {
    !this._config || !this.hass || Ki(this, this.hass, this._config, t.detail.action);
  }
  _updateDateTime() {
    if (!this._config)
      return;
    const t = this._config.locale ?? this.hass?.locale?.language, e = this._config.time_zone ?? this.hass?.config?.time_zone, n = lo(t, e);
    this._time = uo(n, this._config.time_format), this._date = co(n, this._config.date_format), this._nameday = this._config.show_nameday ? Ao(n, this._config.nameday_prefix ?? Ot) : null, this._holiday = this._config.show_public_holiday ? Oo(n) : null, this._significant = this._config.show_significant_day ? Mo(n) : null;
  }
  /** Tick zarovnaný na hranici sekundy/minuty, ať se čas nepřepíná se zpožděním. */
  _scheduleTick() {
    if (this._stopTick(), !this._config)
      return;
    const t = ho(this._config.time_format) ? 1e3 : 6e4, e = t - Date.now() % t + 20;
    this._tickId = window.setTimeout(() => {
      this._updateDateTime(), this._scheduleTick();
    }, e);
  }
  _stopTick() {
    this._tickId !== void 0 && (window.clearTimeout(this._tickId), this._tickId = void 0);
  }
};
R.styles = No;
K([
  Zt({ attribute: !1 })
], R.prototype, "hass", 2);
K([
  ie()
], R.prototype, "_config", 2);
K([
  ie()
], R.prototype, "_time", 2);
K([
  ie()
], R.prototype, "_date", 2);
K([
  ie()
], R.prototype, "_nameday", 2);
K([
  ie()
], R.prototype, "_holiday", 2);
K([
  ie()
], R.prototype, "_significant", 2);
R = K([
  is(Pe)
], R);
var Lo = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, en = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ro(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (i = (s ? a(e, n, i) : a(i)) || i);
  return s && i && Lo(e, n, i), i;
};
function x(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function P(t, e, n) {
  const s = t;
  n.trim() ? s[e] = n : delete s[e];
}
let ge = class extends he {
  constructor() {
    super(...arguments), this._computeLabel = (t) => ({
      time_format: "Formát času (Luxon)",
      date_format: "Formát data (Luxon)",
      locale: "Locale (např. cs)",
      time_zone: "Časová zóna (např. Europe/Prague)",
      size: "Velikost",
      theme: "Motiv",
      background_color: "Barva pozadí (CSS)",
      text_color: "Barva textu (CSS)",
      show_nameday: "Zobrazit jmeniny",
      nameday_prefix: "Prefix jmenin",
      show_public_holiday: "Zobrazit státní svátek",
      show_significant_day: "Zobrazit významný den",
      left_entity: "Entita",
      left_name: "Popisek",
      left_icon: "Ikona",
      left_icon_color: "Barva ikony",
      left_precision: "Desetinná místa",
      left_unit: "Jednotka (prázdné = z entity)",
      left_show_unit: "Zobrazit jednotku",
      right_entity: "Entita",
      right_name: "Popisek",
      right_icon: "Ikona",
      right_icon_color: "Barva ikony",
      right_precision: "Desetinná místa",
      right_unit: "Jednotka (prázdné = z entity)",
      right_show_unit: "Zobrazit jednotku",
      tap_action: "Klepnutí",
      hold_action: "Podržení",
      double_tap_action: "Dvojité klepnutí"
    })[t.name ?? ""] ?? t.name ?? "";
  }
  setConfig(t) {
    this._config = { ...t };
  }
  render() {
    return !this.hass || !this._config ? k : B`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._formData()}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _formData() {
    const t = this._config;
    return {
      locale: t.locale ?? "",
      time_zone: t.time_zone ?? "",
      time_format: t.time_format ?? "HH:mm",
      date_format: t.date_format ?? "cccc dd. L.",
      size: t.size ?? "normal",
      theme: t.theme ?? "",
      background_color: t.background_color ?? "",
      text_color: t.text_color ?? "",
      show_nameday: t.show_nameday ?? !1,
      nameday_prefix: t.nameday_prefix ?? Ot,
      show_public_holiday: t.show_public_holiday ?? !1,
      show_significant_day: t.show_significant_day ?? !1,
      left_entity: t.left_temperature?.entity ?? "",
      left_name: t.left_temperature?.name ?? "",
      left_icon: t.left_temperature?.icon ?? "mdi:home-thermometer",
      left_icon_color: t.left_temperature?.icon_color ?? "",
      left_precision: t.left_temperature?.precision ?? 1,
      left_unit: t.left_temperature?.unit ?? "",
      left_show_unit: t.left_temperature?.show_unit ?? !0,
      right_entity: t.right_temperature?.entity ?? "",
      right_name: t.right_temperature?.name ?? "",
      right_icon: t.right_temperature?.icon ?? "mdi:thermometer",
      right_icon_color: t.right_temperature?.icon_color ?? "",
      right_precision: t.right_temperature?.precision ?? 1,
      right_unit: t.right_temperature?.unit ?? "",
      right_show_unit: t.right_temperature?.show_unit ?? !0,
      tap_action: t.tap_action ?? { action: "none" },
      hold_action: t.hold_action ?? { action: "none" },
      double_tap_action: t.double_tap_action ?? { action: "none" }
    };
  }
  _schema() {
    return [
      {
        name: "time_date",
        type: "expandable",
        flatten: !0,
        title: "Čas a datum",
        schema: [
          {
            name: "time_format",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: !0,
                options: ao.map((t) => ({
                  value: t.value,
                  label: `${t.label} (${t.value})`
                }))
              }
            }
          },
          {
            name: "date_format",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: !0,
                options: oo.map((t) => ({
                  value: t.value,
                  label: `${t.label} (${t.value})`
                }))
              }
            }
          },
          {
            type: "grid",
            name: "",
            schema: [
              { name: "locale", selector: { text: {} } },
              { name: "time_zone", selector: { text: {} } }
            ]
          }
        ]
      },
      {
        name: "appearance",
        type: "expandable",
        flatten: !0,
        title: "Vzhled",
        schema: [
          {
            name: "size",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "compact", label: "Kompaktní" },
                  { value: "normal", label: "Normální" },
                  { value: "large", label: "Velké" }
                ]
              }
            }
          },
          { name: "theme", selector: { theme: { include_default: !0 } } },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "background_color",
                selector: { ui_color: { include_none: !0 } }
              },
              {
                name: "text_color",
                selector: { ui_color: { include_none: !0 } }
              }
            ]
          }
        ]
      },
      {
        name: "calendar",
        type: "expandable",
        flatten: !0,
        title: "Kalendář (jmeniny / svátky)",
        schema: [
          { name: "show_nameday", selector: { boolean: {} } },
          { name: "nameday_prefix", selector: { text: {} } },
          { name: "show_public_holiday", selector: { boolean: {} } },
          { name: "show_significant_day", selector: { boolean: {} } }
        ]
      },
      {
        name: "left_temp",
        type: "expandable",
        flatten: !0,
        title: "Levá teplota",
        schema: [
          {
            name: "left_entity",
            selector: { entity: { domain: "sensor" } }
          },
          { name: "left_name", selector: { text: {} } },
          {
            type: "grid",
            name: "",
            schema: [
              { name: "left_icon", selector: { icon: {} } },
              {
                name: "left_icon_color",
                selector: { ui_color: { include_none: !0 } }
              }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "left_precision",
                selector: { number: { min: 0, max: 3, mode: "box" } }
              },
              { name: "left_unit", selector: { text: {} } }
            ]
          },
          { name: "left_show_unit", selector: { boolean: {} } }
        ]
      },
      {
        name: "right_temp",
        type: "expandable",
        flatten: !0,
        title: "Pravá teplota",
        schema: [
          {
            name: "right_entity",
            selector: { entity: { domain: "sensor" } }
          },
          { name: "right_name", selector: { text: {} } },
          {
            type: "grid",
            name: "",
            schema: [
              { name: "right_icon", selector: { icon: {} } },
              {
                name: "right_icon_color",
                selector: { ui_color: { include_none: !0 } }
              }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "right_precision",
                selector: { number: { min: 0, max: 3, mode: "box" } }
              },
              { name: "right_unit", selector: { text: {} } }
            ]
          },
          { name: "right_show_unit", selector: { boolean: {} } }
        ]
      },
      {
        name: "actions",
        type: "expandable",
        flatten: !0,
        title: "Akce",
        schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }
  _valueChanged(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = this._flattenFormValue(t.detail.value), n = {
      ...this._config,
      type: `custom:${Pe}`,
      time_format: x(e.time_format) || "HH:mm",
      date_format: x(e.date_format) || "cccc dd. L.",
      size: e.size || "normal",
      show_nameday: !!e.show_nameday,
      show_public_holiday: !!e.show_public_holiday,
      show_significant_day: !!e.show_significant_day,
      nameday_prefix: x(e.nameday_prefix) || Ot
    };
    P(n, "locale", x(e.locale)), P(n, "time_zone", x(e.time_zone)), P(n, "theme", x(e.theme)), P(n, "background_color", x(e.background_color)), P(n, "text_color", x(e.text_color)), n.left_temperature = this._slotFromForm(e, "left"), n.right_temperature = this._slotFromForm(e, "right"), n.left_temperature || delete n.left_temperature, n.right_temperature || delete n.right_temperature, this._assignAction(n, "tap_action", e.tap_action), this._assignAction(n, "hold_action", e.hold_action), this._assignAction(n, "double_tap_action", e.double_tap_action), this._config = n, Le(this, "config-changed", { config: n });
  }
  _flattenFormValue(t) {
    const e = [
      "time_date",
      "appearance",
      "calendar",
      "left_temp",
      "right_temp",
      "actions"
    ], n = { ...t };
    for (const s of e) {
      const i = t[s];
      i && typeof i == "object" && !Array.isArray(i) && (Object.assign(n, i), delete n[s]);
    }
    return n;
  }
  _assignAction(t, e, n) {
    const s = n;
    if (!s || !s.action || s.action === "none") {
      delete t[e];
      return;
    }
    t[e] = s;
  }
  _slotFromForm(t, e) {
    const n = x(t[`${e}_entity`]).trim();
    if (!n)
      return;
    const s = { entity: n };
    P(s, "name", x(t[`${e}_name`])), P(s, "icon", x(t[`${e}_icon`])), P(s, "icon_color", x(t[`${e}_icon_color`])), P(s, "unit", x(t[`${e}_unit`]));
    const i = Number(t[`${e}_precision`]);
    return Number.isNaN(i) || (s.precision = i), t[`${e}_show_unit`] === !1 ? s.show_unit = !1 : delete s.show_unit, s;
  }
};
ge.styles = Xn`
    .card-config {
      padding: 0 4px;
    }
  `;
en([
  Zt({ attribute: !1 })
], ge.prototype, "hass", 2);
en([
  ie()
], ge.prototype, "_config", 2);
ge = en([
  is(`${Pe}-editor`)
], ge);
const Wo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get EkDigitalClockEditor() {
    return ge;
  }
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=ek-digital-clock.js.map
