/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, zt = Ke.ShadowRoot && (Ke.ShadyCSS === void 0 || Ke.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ft = Symbol(), Xt = /* @__PURE__ */ new WeakMap();
let Jn = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (zt && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Xt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Xt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gi = (n) => new Jn(typeof n == "string" ? n : n + "", void 0, Ft), Yn = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Jn(t, n, Ft);
}, vi = (n, e) => {
  if (zt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = Ke.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, n.appendChild(s);
  }
}, en = zt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return gi(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wi, defineProperty: _i, getOwnPropertyDescriptor: ki, getOwnPropertyNames: Si, getOwnPropertySymbols: bi, getPrototypeOf: Ti } = Object, B = globalThis, tn = B.trustedTypes, $i = tn ? tn.emptyScript : "", Ei = B.reactiveElementPolyfillSupport, De = (n, e) => n, tt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? $i : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Lt = (n, e) => !wi(n, e), nn = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: Lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), B.litPropertyMetadata ?? (B.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let le = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = nn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && _i(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = ki(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      r?.call(this, a), this.requestUpdate(e, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? nn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(De("elementProperties"))) return;
    const e = Ti(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(De("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(De("properties"))) {
      const t = this.properties, s = [...Si(t), ...bi(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(en(i));
    } else e !== void 0 && t.push(en(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
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
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : tt).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : tt;
      this._$Em = i;
      const o = a.fromAttribute(t, r.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? Lt)(r, t) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
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
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[De("elementProperties")] = /* @__PURE__ */ new Map(), le[De("finalized")] = /* @__PURE__ */ new Map(), Ei?.({ ReactiveElement: le }), (B.reactiveElementVersions ?? (B.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, sn = (n) => n, nt = Ae.trustedTypes, rn = nt ? nt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Gn = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, Kn = "?" + Z, Oi = `<${Kn}>`, te = document, Ie = () => te.createComment(""), Ce = (n) => n === null || typeof n != "object" && typeof n != "function", Wt = Array.isArray, Mi = (n) => Wt(n) || typeof n?.[Symbol.iterator] == "function", ft = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, an = /-->/g, on = />/g, Y = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ln = /'/g, un = /"/g, Qn = /^(?:script|style|textarea|title)$/i, Di = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), Q = Di(1), R = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), cn = /* @__PURE__ */ new WeakMap(), X = te.createTreeWalker(te, 129);
function Xn(n, e) {
  if (!Wt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rn !== void 0 ? rn.createHTML(e) : e;
}
const Ai = (n, e) => {
  const t = n.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = be;
  for (let o = 0; o < t; o++) {
    const l = n[o];
    let u, d, h = -1, p = 0;
    for (; p < l.length && (a.lastIndex = p, d = a.exec(l), d !== null); ) p = a.lastIndex, a === be ? d[1] === "!--" ? a = an : d[1] !== void 0 ? a = on : d[2] !== void 0 ? (Qn.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = Y) : d[3] !== void 0 && (a = Y) : a === Y ? d[0] === ">" ? (a = i ?? be, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, u = d[1], a = d[3] === void 0 ? Y : d[3] === '"' ? un : ln) : a === un || a === ln ? a = Y : a === an || a === on ? a = be : (a = Y, i = void 0);
    const f = a === Y && n[o + 1].startsWith("/>") ? " " : "";
    r += a === be ? l + Oi : h >= 0 ? (s.push(u), l.slice(0, h) + Gn + l.slice(h) + Z + f) : l + Z + (h === -2 ? o : f);
  }
  return [Xn(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ve {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, l = this.parts, [u, d] = Ai(e, t);
    if (this.el = Ve.createElement(u, s), X.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = X.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Gn)) {
          const p = d[a++], f = i.getAttribute(h).split(Z), _ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: _[2], strings: f, ctor: _[1] === "." ? Ni : _[1] === "?" ? Ii : _[1] === "@" ? Ci : ot }), i.removeAttribute(h);
        } else h.startsWith(Z) && (l.push({ type: 6, index: r }), i.removeAttribute(h));
        if (Qn.test(i.tagName)) {
          const h = i.textContent.split(Z), p = h.length - 1;
          if (p > 0) {
            i.textContent = nt ? nt.emptyScript : "";
            for (let f = 0; f < p; f++) i.append(h[f], Ie()), X.nextNode(), l.push({ type: 2, index: ++r });
            i.append(h[p], Ie());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Kn) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(Z, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += Z.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = te.createElement("template");
    return s.innerHTML = e, s;
  }
}
function fe(n, e, t = n, s) {
  if (e === R) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const r = Ce(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = fe(n, i._$AS(n, e.values), i, s)), e;
}
class xi {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? te).importNode(t, !0);
    X.currentNode = i;
    let r = X.nextNode(), a = 0, o = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new Le(r, r.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (u = new Vi(r, this, e)), this._$AV.push(u), l = s[++o];
      }
      a !== l?.index && (r = X.nextNode(), a++);
    }
    return X.currentNode = te, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Le {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = fe(this, e, t), Ce(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Mi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== k && Ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(te.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ve.createElement(Xn(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const r = new xi(i, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = cn.get(e.strings);
    return t === void 0 && cn.set(e.strings, t = new Ve(e)), t;
  }
  k(e) {
    Wt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const r of e) i === t.length ? t.push(s = new Le(this.O(Ie()), this.O(Ie()), this, this.options)) : s = t[i], s._$AI(r), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = sn(e).nextSibling;
      sn(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, r) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = k;
  }
  _$AI(e, t = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = fe(this, e, t, 0), a = !Ce(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
    else {
      const o = e;
      let l, u;
      for (e = r[0], l = 0; l < r.length - 1; l++) u = fe(this, o[s + l], t, l), u === R && (u = this._$AH[l]), a || (a = !Ce(u) || u !== this._$AH[l]), u === k ? e = k : e !== k && (e += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ni extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === k ? void 0 : e;
  }
}
class Ii extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== k);
  }
}
class Ci extends ot {
  constructor(e, t, s, i, r) {
    super(e, t, s, i, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = fe(this, e, t, 0) ?? k) === R) return;
    const s = this._$AH, i = e === k && s !== k || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== k && (s === k || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Vi = class {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    fe(this, e);
  }
};
const zi = Ae.litHtmlPolyfillSupport;
zi?.(Ve, Le), (Ae.litHtmlVersions ?? (Ae.litHtmlVersions = [])).push("3.3.3");
const Fi = (n, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = t?.renderBefore ?? null;
    s._$litPart$ = i = new Le(e.insertBefore(Ie(), r), r, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = globalThis;
let ce = class extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fi(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return R;
  }
};
ce._$litElement$ = !0, ce.finalized = !0, xe.litElementHydrateSupport?.({ LitElement: ce });
const Li = xe.litElementPolyfillSupport;
Li?.({ LitElement: ce });
(xe.litElementVersions ?? (xe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const es = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wi = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: Lt }, Ri = (n = Wi, e, t) => {
  const { kind: s, metadata: i } = t;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(t.name, n), s === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, n, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = t;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Rt(n) {
  return (e, t) => typeof t == "object" ? Ri(n, e, t) : ((s, i, r) => {
    const a = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ne(n) {
  return Rt({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ts = { ATTRIBUTE: 1, ELEMENT: 6 }, ns = (n) => (...e) => ({ _$litDirective$: n, values: e });
let ss = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const is = "important", Pi = " !" + is, dn = ns(class extends ss {
  constructor(n) {
    if (super(n), n.type !== ts.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((e, t) => {
      const s = n[t];
      return s == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(n, [e]) {
    const { style: t } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? t.removeProperty(s) : t[s] = null);
    for (const s in e) {
      const i = e[s];
      if (i != null) {
        this.ft.add(s);
        const r = typeof i == "string" && i.endsWith(Pi);
        s.includes("-") || r ? t.setProperty(s, r ? i.slice(0, -11) : i, r ? is : "") : t[s] = i;
      }
    }
    return R;
  }
});
var hn, fn;
(function(n) {
  n.language = "language", n.system = "system", n.comma_decimal = "comma_decimal", n.decimal_comma = "decimal_comma", n.space_comma = "space_comma", n.none = "none";
})(hn || (hn = {})), (function(n) {
  n.language = "language", n.system = "system", n.am_pm = "12", n.twenty_four = "24";
})(fn || (fn = {}));
function rs() {
  return (rs = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s]);
    }
    return n;
  }).apply(this, arguments);
}
var Hi = function(n, e, t, s) {
  s === void 0 && (s = !1), n._themes || (n._themes = {});
  var i = e.default_theme;
  (t === "default" || e.themes[t]) && (i = t);
  var r = rs({}, n._themes);
  if (i !== "default") {
    var a = e.themes[i];
    Object.keys(a).forEach(function(u) {
      var d = "--" + u;
      n._themes[d] = "", r[d] = a[u];
    });
  }
  if (n.updateStyles ? n.updateStyles(r) : window.ShadyCSS && window.ShadyCSS.styleSubtree(n, r), s) {
    var o = document.querySelector("meta[name=theme-color]");
    if (o) {
      o.hasAttribute("default-content") || o.setAttribute("default-content", o.getAttribute("content"));
      var l = r["--primary-color"] || o.getAttribute("default-content");
      o.setAttribute("content", l);
    }
  }
};
function Ui(n) {
  return n.substr(0, n.indexOf("."));
}
var Zi = ["closed", "locked", "off"], ze = function(n, e, t, s) {
  s = s || {}, t = t ?? {};
  var i = new Event(e, { bubbles: s.bubbles === void 0 || s.bubbles, cancelable: !!s.cancelable, composed: s.composed === void 0 || s.composed });
  return i.detail = t, n.dispatchEvent(i), i;
}, Ze = function(n) {
  ze(window, "haptic", n);
}, qi = function(n, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), ze(window, "location-changed", { replace: t });
}, Bi = function(n, e, t) {
  t === void 0 && (t = !0);
  var s, i = Ui(e), r = i === "group" ? "homeassistant" : i;
  switch (i) {
    case "lock":
      s = t ? "unlock" : "lock";
      break;
    case "cover":
      s = t ? "open_cover" : "close_cover";
      break;
    default:
      s = t ? "turn_on" : "turn_off";
  }
  return n.callService(r, s, { entity_id: e });
}, ji = function(n, e) {
  var t = Zi.includes(n.states[e].state);
  return Bi(n, e, t);
}, Ji = function(n, e, t, s) {
  if (s || (s = { action: "more-info" }), !s.confirmation || s.confirmation.exemptions && s.confirmation.exemptions.some(function(r) {
    return r.user === e.user.id;
  }) || (Ze("warning"), confirm(s.confirmation.text || "Are you sure you want to " + s.action + "?"))) switch (s.action) {
    case "more-info":
      (t.entity || t.camera_image) && ze(n, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      s.navigation_path && qi(0, s.navigation_path);
      break;
    case "url":
      s.url_path && window.open(s.url_path);
      break;
    case "toggle":
      t.entity && (ji(e, t.entity), Ze("success"));
      break;
    case "call-service":
      if (!s.service) return void Ze("failure");
      var i = s.service.split(".", 2);
      e.callService(i[0], i[1], s.service_data, s.target), Ze("success");
      break;
    case "fire-dom-event":
      ze(n, "ll-custom", s);
  }
}, Yi = function(n, e, t, s) {
  var i;
  s === "double_tap" && t.double_tap_action ? i = t.double_tap_action : s === "hold" && t.hold_action ? i = t.hold_action : s === "tap" && t.tap_action && (i = t.tap_action), Ji(n, e, t, i);
};
function Te(n) {
  return n !== void 0 && n.action !== "none";
}
class Gi extends HTMLElement {
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
  bind(e, t) {
    if (e.actionHandler)
      return;
    e.actionHandler = { options: t }, e.addEventListener("contextmenu", (o) => {
      const l = o || window.event;
      return l.preventDefault && l.preventDefault(), l.stopPropagation && l.stopPropagation(), l.cancelBubble = !0, l.returnValue = !1, !1;
    });
    const s = (o) => {
      this.isCancelled = !1, this.held = !1, this.timer = window.setTimeout(() => {
        this.startAnimation(o), this.held = !0;
      }, this.holdTime);
    }, i = (o) => {
      o.preventDefault(), !this.isCancelled && (["touchend", "touchcancel"].includes(o.type) && this.timer === void 0 || (this.stopAnimation(), clearTimeout(this.timer), this.timer = void 0, this.held ? qe(e, "hold") : t.hasDoubleClick ? o.type === "click" && o.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, qe(e, "tap");
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, qe(e, "double_tap")) : qe(e, "tap")));
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
customElements.define("ek-digital-clock-action-handler", Gi);
const Ki = () => {
  const n = document.body;
  if (n.querySelector("ek-digital-clock-action-handler"))
    return n.querySelector("ek-digital-clock-action-handler");
  const e = document.createElement("ek-digital-clock-action-handler");
  return n.appendChild(e), e;
}, qe = (n, e) => {
  n.dispatchEvent(
    new CustomEvent("action", {
      detail: { action: e },
      bubbles: !0,
      composed: !0
    })
  );
};
class Qi extends ss {
  constructor(e) {
    if (super(e), e.type !== ts.ELEMENT)
      throw new Error("actionHandler can only be used as element directive");
  }
  update(e, [t]) {
    const s = e.element;
    return Ki().bind(s, t ?? {}), R;
  }
  render(e) {
    return R;
  }
}
const Xi = ns(Qi), er = "1.0.0", We = "ek-digital-clock", as = "Ek Digital Clock", tr = "Digitální hodiny s jmeninami, státními svátky a teplotami", os = "HH:mm", nr = "cccc dd. L.", bt = "Svátek:";
class se extends Error {
}
class sr extends se {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class ir extends se {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class rr extends se {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class ue extends se {
}
class ls extends se {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class $ extends se {
}
class H extends se {
  constructor() {
    super("Zone is an abstract class");
  }
}
const c = "numeric", z = "short", M = "long", st = {
  year: c,
  month: c,
  day: c
}, us = {
  year: c,
  month: z,
  day: c
}, ar = {
  year: c,
  month: z,
  day: c,
  weekday: z
}, cs = {
  year: c,
  month: M,
  day: c
}, ds = {
  year: c,
  month: M,
  day: c,
  weekday: M
}, hs = {
  hour: c,
  minute: c
}, fs = {
  hour: c,
  minute: c,
  second: c
}, ms = {
  hour: c,
  minute: c,
  second: c,
  timeZoneName: z
}, ys = {
  hour: c,
  minute: c,
  second: c,
  timeZoneName: M
}, ps = {
  hour: c,
  minute: c,
  hourCycle: "h23"
}, gs = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23"
}, vs = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23",
  timeZoneName: z
}, ws = {
  hour: c,
  minute: c,
  second: c,
  hourCycle: "h23",
  timeZoneName: M
}, _s = {
  year: c,
  month: c,
  day: c,
  hour: c,
  minute: c
}, ks = {
  year: c,
  month: c,
  day: c,
  hour: c,
  minute: c,
  second: c
}, Ss = {
  year: c,
  month: z,
  day: c,
  hour: c,
  minute: c
}, bs = {
  year: c,
  month: z,
  day: c,
  hour: c,
  minute: c,
  second: c
}, or = {
  year: c,
  month: z,
  day: c,
  weekday: z,
  hour: c,
  minute: c
}, Ts = {
  year: c,
  month: M,
  day: c,
  hour: c,
  minute: c,
  timeZoneName: z
}, $s = {
  year: c,
  month: M,
  day: c,
  hour: c,
  minute: c,
  second: c,
  timeZoneName: z
}, Es = {
  year: c,
  month: M,
  day: c,
  weekday: M,
  hour: c,
  minute: c,
  timeZoneName: M
}, Os = {
  year: c,
  month: M,
  day: c,
  weekday: M,
  hour: c,
  minute: c,
  second: c,
  timeZoneName: M
};
class Re {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new H();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new H();
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
    throw new H();
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
  offsetName(e, t) {
    throw new H();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    throw new H();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new H();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new H();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new H();
  }
}
let mt = null;
class lt extends Re {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return mt === null && (mt = new lt()), mt;
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
  offsetName(e, { format: t, locale: s }) {
    return Ls(e, t, s);
  }
  /** @override **/
  formatOffset(e, t) {
    return Ne(this.offset(e), t);
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
const Tt = /* @__PURE__ */ new Map();
function lr(n) {
  let e = Tt.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), Tt.set(n, e)), e;
}
const ur = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function cr(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, i, r, a, o, l, u, d] = s;
  return [a, i, r, o, l, u, d];
}
function dr(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let i = 0; i < t.length; i++) {
    const { type: r, value: a } = t[i], o = ur[r];
    r === "era" ? s[o] = a : y(o) || (s[o] = parseInt(a, 10));
  }
  return s;
}
const yt = /* @__PURE__ */ new Map();
class P extends Re {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = yt.get(e);
    return t === void 0 && yt.set(e, t = new P(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    yt.clear(), Tt.clear();
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
    super(), this.zoneName = e, this.valid = P.isValidZone(e);
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
  offsetName(e, { format: t, locale: s }) {
    return Ls(e, t, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Ne(this.offset(e), t);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const t = new Date(e);
    if (isNaN(t)) return NaN;
    const s = lr(this.name);
    let [i, r, a, o, l, u, d] = s.formatToParts ? dr(s, t) : cr(s, t);
    o === "BC" && (i = -Math.abs(i) + 1);
    const p = ct({
      year: i,
      month: r,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: d,
      millisecond: 0
    });
    let f = +t;
    const _ = f % 1e3;
    return f -= _ >= 0 ? _ : 1e3 + _, (p - f) / (60 * 1e3);
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
let mn = {};
function hr(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = mn[t];
  return s || (s = new Intl.ListFormat(n, e), mn[t] = s), s;
}
const $t = /* @__PURE__ */ new Map();
function Et(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = $t.get(t);
  return s === void 0 && (s = new Intl.DateTimeFormat(n, e), $t.set(t, s)), s;
}
const Ot = /* @__PURE__ */ new Map();
function fr(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Ot.get(t);
  return s === void 0 && (s = new Intl.NumberFormat(n, e), Ot.set(t, s)), s;
}
const Mt = /* @__PURE__ */ new Map();
function mr(n, e = {}) {
  const { base: t, ...s } = e, i = JSON.stringify([n, s]);
  let r = Mt.get(i);
  return r === void 0 && (r = new Intl.RelativeTimeFormat(n, e), Mt.set(i, r)), r;
}
let Ee = null;
function yr() {
  return Ee || (Ee = new Intl.DateTimeFormat().resolvedOptions().locale, Ee);
}
const Dt = /* @__PURE__ */ new Map();
function Ms(n) {
  let e = Dt.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat(n).resolvedOptions(), Dt.set(n, e)), e;
}
const At = /* @__PURE__ */ new Map();
function pr(n) {
  let e = At.get(n);
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...Ds, ...e }), At.set(n, e);
  }
  return e;
}
function gr(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, i;
    try {
      s = Et(n).resolvedOptions(), i = n;
    } catch {
      const l = n.substring(0, t);
      s = Et(l).resolvedOptions(), i = l;
    }
    const { numberingSystem: r, calendar: a } = s;
    return [i, r, a];
  }
}
function vr(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function wr(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = m.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function _r(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = m.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function Be(n, e, t, s) {
  const i = n.listingMode();
  return i === "error" ? null : i === "en" ? t(e) : s(e);
}
function kr(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || Ms(n.locale).numberingSystem === "latn";
}
class Sr {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: i, floor: r, ...a } = s;
    if (!t || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...s };
      s.padTo > 0 && (o.minimumIntegerDigits = s.padTo), this.inf = fr(e, o);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : qt(e, 3);
      return T(t, this.padTo);
    }
  }
}
class br {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let i;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60), o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && P.create(o).valid ? (i = o, this.dt = e) : (i = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, i = e.zone.name) : (i = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const r = { ...this.opts };
    r.timeZone = r.timeZone || i, this.dtf = Et(t, r);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((t) => {
      if (t.type === "timeZoneName") {
        const s = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...t,
          value: s
        };
      } else
        return t;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Tr {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && zs() && (this.rtf = mr(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : Br(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const Ds = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class w {
  static fromOpts(e) {
    return w.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, s, i, r = !1) {
    const a = e || b.defaultLocale, o = a || (r ? "en-US" : yr()), l = t || b.defaultNumberingSystem, u = s || b.defaultOutputCalendar, d = Nt(i) || b.defaultWeekSettings;
    return new w(o, l, u, d, a);
  }
  static resetCache() {
    Ee = null, $t.clear(), Ot.clear(), Mt.clear(), Dt.clear(), At.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: i } = {}) {
    return w.create(e, t, s, i);
  }
  constructor(e, t, s, i, r) {
    const [a, o, l] = gr(e);
    this.locale = a, this.numberingSystem = t || o || null, this.outputCalendar = s || l || null, this.weekSettings = i, this.intl = vr(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = r, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = kr(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : w.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      Nt(e.weekSettings) || this.weekSettings,
      e.defaultToEN || !1
    );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, t = !1) {
    return Be(this, e, Ps, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      t &= !s;
      const i = t ? { month: e, day: "numeric" } : { month: e }, r = t ? "format" : "standalone";
      if (!this.monthsCache[r][e]) {
        const a = s ? (o) => this.dtFormatter(o, i).format() : (o) => this.extract(o, i, "month");
        this.monthsCache[r][e] = wr(a);
      }
      return this.monthsCache[r][e];
    });
  }
  weekdays(e, t = !1) {
    return Be(this, e, Zs, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, i = t ? "format" : "standalone";
      return this.weekdaysCache[i][e] || (this.weekdaysCache[i][e] = _r(
        (r) => this.extract(r, s, "weekday")
      )), this.weekdaysCache[i][e];
    });
  }
  meridiems() {
    return Be(
      this,
      void 0,
      () => qs,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [m.utc(2016, 11, 13, 9), m.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Be(this, e, Bs, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [m.utc(-40, 1, 1), m.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const i = this.dtFormatter(e, t), r = i.formatToParts(), a = r.find((o) => o.type.toLowerCase() === s);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new Sr(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new br(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new Tr(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return hr(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || Ms(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : Fs() ? pr(this.locale) : Ds;
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
let pt = null;
class O extends Re {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return pt === null && (pt = new O(0)), pt;
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
      const t = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (t)
        return new O(dt(t[1], t[2]));
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
    return this.fixed === 0 ? "UTC" : `UTC${Ne(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ne(-this.fixed, "narrow")}`;
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
  formatOffset(e, t) {
    return Ne(this.fixed, t);
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
class $r extends Re {
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
function q(n, e) {
  if (y(n) || n === null)
    return e;
  if (n instanceof Re)
    return n;
  if (xr(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? lt.instance : t === "utc" || t === "gmt" ? O.utcInstance : O.parseSpecifier(t) || P.create(n);
  } else return j(n) ? O.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new $r(n);
}
const Pt = {
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
}, yn = {
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
}, Er = Pt.hanidec.replace(/[\[|\]]/g, "").split("");
function Or(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(Pt.hanidec) !== -1)
        e += Er.indexOf(n[t]);
      else
        for (const i in yn) {
          const [r, a] = yn[i];
          s >= r && s <= a && (e += s - r);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const xt = /* @__PURE__ */ new Map();
function Mr() {
  xt.clear();
}
function I({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  let s = xt.get(t);
  s === void 0 && (s = /* @__PURE__ */ new Map(), xt.set(t, s));
  let i = s.get(e);
  return i === void 0 && (i = new RegExp(`${Pt[t]}${e}`), s.set(e, i)), i;
}
let pn = () => Date.now(), gn = "system", vn = null, wn = null, _n = null, kn = 60, Sn, bn = null;
class b {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return pn;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    pn = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    gn = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return q(gn, lt.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return vn;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    vn = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return wn;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    wn = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return _n;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    _n = e;
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
    return bn;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    bn = Nt(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return kn;
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
    kn = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return Sn;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    Sn = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    w.resetCache(), P.resetCache(), m.resetCache(), Mr();
  }
}
class V {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const As = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], xs = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function A(n, e) {
  return new V(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function Ht(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const i = s.getUTCDay();
  return i === 0 ? 7 : i;
}
function Ns(n, e, t) {
  return t + (Pe(n) ? xs : As)[e - 1];
}
function Is(n, e) {
  const t = Pe(n) ? xs : As, s = t.findIndex((r) => r < e), i = e - t[s];
  return { month: s + 1, day: i };
}
function Ut(n, e) {
  return (n - e + 7) % 7 + 1;
}
function it(n, e = 4, t = 1) {
  const { year: s, month: i, day: r } = n, a = Ns(s, i, r), o = Ut(Ht(s, i, r), t);
  let l = Math.floor((a - o + 14 - e) / 7), u;
  return l < 1 ? (u = s - 1, l = Fe(u, e, t)) : l > Fe(s, e, t) ? (u = s + 1, l = 1) : u = s, { weekYear: u, weekNumber: l, weekday: o, ...ht(n) };
}
function Tn(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: i, weekday: r } = n, a = Ut(Ht(s, 1, e), t), o = de(s);
  let l = i * 7 + r - a - 7 + e, u;
  l < 1 ? (u = s - 1, l += de(u)) : l > o ? (u = s + 1, l -= de(s)) : u = s;
  const { month: d, day: h } = Is(u, l);
  return { year: u, month: d, day: h, ...ht(n) };
}
function gt(n) {
  const { year: e, month: t, day: s } = n, i = Ns(e, t, s);
  return { year: e, ordinal: i, ...ht(n) };
}
function $n(n) {
  const { year: e, ordinal: t } = n, { month: s, day: i } = Is(e, t);
  return { year: e, month: s, day: i, ...ht(n) };
}
function En(n, e) {
  if (!y(n.localWeekday) || !y(n.localWeekNumber) || !y(n.localWeekYear)) {
    if (!y(n.weekday) || !y(n.weekNumber) || !y(n.weekYear))
      throw new ue(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return y(n.localWeekday) || (n.weekday = n.localWeekday), y(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), y(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function Dr(n, e = 4, t = 1) {
  const s = ut(n.weekYear), i = x(
    n.weekNumber,
    1,
    Fe(n.weekYear, e, t)
  ), r = x(n.weekday, 1, 7);
  return s ? i ? r ? !1 : A("weekday", n.weekday) : A("week", n.weekNumber) : A("weekYear", n.weekYear);
}
function Ar(n) {
  const e = ut(n.year), t = x(n.ordinal, 1, de(n.year));
  return e ? t ? !1 : A("ordinal", n.ordinal) : A("year", n.year);
}
function Cs(n) {
  const e = ut(n.year), t = x(n.month, 1, 12), s = x(n.day, 1, rt(n.year, n.month));
  return e ? t ? s ? !1 : A("day", n.day) : A("month", n.month) : A("year", n.year);
}
function Vs(n) {
  const { hour: e, minute: t, second: s, millisecond: i } = n, r = x(e, 0, 23) || e === 24 && t === 0 && s === 0 && i === 0, a = x(t, 0, 59), o = x(s, 0, 59), l = x(i, 0, 999);
  return r ? a ? o ? l ? !1 : A("millisecond", i) : A("second", s) : A("minute", t) : A("hour", e);
}
function y(n) {
  return typeof n > "u";
}
function j(n) {
  return typeof n == "number";
}
function ut(n) {
  return typeof n == "number" && n % 1 === 0;
}
function xr(n) {
  return typeof n == "string";
}
function Nr(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function zs() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function Fs() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function Ir(n) {
  return Array.isArray(n) ? n : [n];
}
function On(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, i) => {
      const r = [e(i), i];
      return s && t(s[0], r[0]) === s[0] ? s : r;
    }, null)[1];
}
function Cr(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function me(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Nt(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new $("Week settings must be an object");
  if (!x(n.firstDay, 1, 7) || !x(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !x(e, 1, 7)))
    throw new $("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function x(n, e, t) {
  return ut(n) && n >= e && n <= t;
}
function Vr(n, e) {
  return n - e * Math.floor(n / e);
}
function T(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function U(n) {
  if (!(y(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function G(n) {
  if (!(y(n) || n === null || n === ""))
    return parseFloat(n);
}
function Zt(n) {
  if (!(y(n) || n === null || n === "")) {
    const e = parseFloat("0." + n) * 1e3;
    return Math.floor(e);
  }
}
function qt(n, e, t = "round") {
  const s = 10 ** e;
  switch (t) {
    case "expand":
      return n > 0 ? Math.ceil(n * s) / s : Math.floor(n * s) / s;
    case "trunc":
      return Math.trunc(n * s) / s;
    case "round":
      return Math.round(n * s) / s;
    case "floor":
      return Math.floor(n * s) / s;
    case "ceil":
      return Math.ceil(n * s) / s;
    default:
      throw new RangeError(`Value rounding ${t} is out of range`);
  }
}
function Pe(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function de(n) {
  return Pe(n) ? 366 : 365;
}
function rt(n, e) {
  const t = Vr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? Pe(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function ct(n) {
  let e = Date.UTC(
    n.year,
    n.month - 1,
    n.day,
    n.hour,
    n.minute,
    n.second,
    n.millisecond
  );
  return n.year < 100 && n.year >= 0 && (e = new Date(e), e.setUTCFullYear(n.year, n.month - 1, n.day)), +e;
}
function Mn(n, e, t) {
  return -Ut(Ht(n, 1, e), t) + e - 1;
}
function Fe(n, e = 4, t = 1) {
  const s = Mn(n, e, t), i = Mn(n + 1, e, t);
  return (de(n) - s + i) / 7;
}
function It(n) {
  return n > 99 ? n : n > b.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function Ls(n, e, t, s = null) {
  const i = new Date(n), r = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (r.timeZone = s);
  const a = { timeZoneName: e, ...r }, o = new Intl.DateTimeFormat(t, a).formatToParts(i).find((l) => l.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function dt(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, i = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + i;
}
function Ws(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || !Number.isFinite(e))
    throw new $(`Invalid unit value ${n}`);
  return e;
}
function at(n, e) {
  const t = {};
  for (const s in n)
    if (me(n, s)) {
      const i = n[s];
      if (i == null) continue;
      t[e(s)] = Ws(i);
    }
  return t;
}
function Ne(n, e) {
  const t = Math.trunc(Math.abs(n / 60)), s = Math.trunc(Math.abs(n % 60)), i = n >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${i}${T(t, 2)}:${T(s, 2)}`;
    case "narrow":
      return `${i}${t}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${i}${T(t, 2)}${T(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function ht(n) {
  return Cr(n, ["hour", "minute", "second", "millisecond"]);
}
const zr = [
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
], Rs = [
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
], Fr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Ps(n) {
  switch (n) {
    case "narrow":
      return [...Fr];
    case "short":
      return [...Rs];
    case "long":
      return [...zr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const Hs = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], Us = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], Lr = ["M", "T", "W", "T", "F", "S", "S"];
function Zs(n) {
  switch (n) {
    case "narrow":
      return [...Lr];
    case "short":
      return [...Us];
    case "long":
      return [...Hs];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const qs = ["AM", "PM"], Wr = ["Before Christ", "Anno Domini"], Rr = ["BC", "AD"], Pr = ["B", "A"];
function Bs(n) {
  switch (n) {
    case "narrow":
      return [...Pr];
    case "short":
      return [...Rr];
    case "long":
      return [...Wr];
    default:
      return null;
  }
}
function Hr(n) {
  return qs[n.hour < 12 ? 0 : 1];
}
function Ur(n, e) {
  return Zs(e)[n.weekday - 1];
}
function Zr(n, e) {
  return Ps(e)[n.month - 1];
}
function qr(n, e) {
  return Bs(e)[n.year < 0 ? 0 : 1];
}
function Br(n, e, t = "always", s = !1) {
  const i = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, r = ["hours", "minutes", "seconds"].indexOf(n) === -1;
  if (t === "auto" && r) {
    const h = n === "days";
    switch (e) {
      case 1:
        return h ? "tomorrow" : `next ${i[n][0]}`;
      case -1:
        return h ? "yesterday" : `last ${i[n][0]}`;
      case 0:
        return h ? "today" : `this ${i[n][0]}`;
    }
  }
  const a = Object.is(e, -0) || e < 0, o = Math.abs(e), l = o === 1, u = i[n], d = s ? l ? u[1] : u[2] || u[1] : l ? i[n][0] : n;
  return a ? `${o} ${d} ago` : `in ${o} ${d}`;
}
function Dn(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const jr = {
  D: st,
  DD: us,
  DDD: cs,
  DDDD: ds,
  t: hs,
  tt: fs,
  ttt: ms,
  tttt: ys,
  T: ps,
  TT: gs,
  TTT: vs,
  TTTT: ws,
  f: _s,
  ff: Ss,
  fff: Ts,
  ffff: Es,
  F: ks,
  FF: bs,
  FFF: $s,
  FFFF: Os
};
class E {
  static create(e, t = {}) {
    return new E(e, t);
  }
  static parseFormat(e) {
    let t = null, s = "", i = !1;
    const r = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'" ? ((s.length > 0 || i) && r.push({
        literal: i || /^\s+$/.test(s),
        val: s === "" ? "'" : s
      }), t = null, s = "", i = !i) : i || o === t ? s += o : (s.length > 0 && r.push({ literal: /^\s+$/.test(s), val: s }), s = o, t = o);
    }
    return s.length > 0 && r.push({ literal: i || /^\s+$/.test(s), val: s }), r;
  }
  static macroTokenToFormatOpts(e) {
    return jr[e];
  }
  constructor(e, t) {
    this.opts = t, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, t) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format();
  }
  dtFormatter(e, t = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...t });
  }
  formatDateTime(e, t) {
    return this.dtFormatter(e, t).format();
  }
  formatDateTimeParts(e, t) {
    return this.dtFormatter(e, t).formatToParts();
  }
  formatInterval(e, t) {
    return this.dtFormatter(e.start, t).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, t) {
    return this.dtFormatter(e, t).resolvedOptions();
  }
  num(e, t = 0, s = void 0) {
    if (this.opts.forceSimple)
      return T(e, t);
    const i = { ...this.opts };
    return t > 0 && (i.padTo = t), s && (i.signDisplay = s), this.loc.numberFormatter(i).format(e);
  }
  formatDateTimeFromString(e, t) {
    const s = this.loc.listingMode() === "en", i = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", r = (f, _) => this.loc.extract(e, f, _), a = (f) => e.isOffsetFixed && e.offset === 0 && f.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, f.format) : "", o = () => s ? Hr(e) : r({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), l = (f, _) => s ? Zr(e, f) : r(_ ? { month: f } : { month: f, day: "numeric" }, "month"), u = (f, _) => s ? Ur(e, f) : r(
      _ ? { weekday: f } : { weekday: f, month: "long", day: "numeric" },
      "weekday"
    ), d = (f) => {
      const _ = E.macroTokenToFormatOpts(f);
      return _ ? this.formatWithSystemDefault(e, _) : f;
    }, h = (f) => s ? qr(e, f) : r({ era: f }, "era"), p = (f) => {
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
          return h("short");
        case "GG":
          return h("long");
        case "GGGGG":
          return h("narrow");
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
    return Dn(E.parseFormat(t), p);
  }
  formatDurationFromString(e, t) {
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
    }, r = (d, h) => (p) => {
      const f = i(p);
      if (f) {
        const _ = h.isNegativeDuration && f !== h.largestUnit ? s : 1;
        let N;
        return this.opts.signMode === "negativeLargestOnly" && f !== h.largestUnit ? N = "never" : this.opts.signMode === "all" ? N = "always" : N = "auto", this.num(d.get(f) * _, p.length, N);
      } else
        return p;
    }, a = E.parseFormat(t), o = a.reduce(
      (d, { literal: h, val: p }) => h ? d : d.concat(p),
      []
    ), l = e.shiftTo(...o.map(i).filter((d) => d)), u = {
      isNegativeDuration: l < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(l.values)[0]
    };
    return Dn(a, r(l, u));
  }
}
const js = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function pe(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function ge(...n) {
  return (e) => n.reduce(
    ([t, s, i], r) => {
      const [a, o, l] = r(e, i);
      return [{ ...t, ...a }, o || s, l];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function ve(n, ...e) {
  if (n == null)
    return [null, null];
  for (const [t, s] of e) {
    const i = t.exec(n);
    if (i)
      return s(i);
  }
  return [null, null];
}
function Js(...n) {
  return (e, t) => {
    const s = {};
    let i;
    for (i = 0; i < n.length; i++)
      s[n[i]] = U(e[t + i]);
    return [s, null, t + i];
  };
}
const Ys = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, Jr = `(?:${Ys.source}?(?:\\[(${js.source})\\])?)?`, Bt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Gs = RegExp(`${Bt.source}${Jr}`), jt = RegExp(`(?:[Tt]${Gs.source})?`), Yr = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Gr = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Kr = /(\d{4})-?(\d{3})/, Qr = Js("weekYear", "weekNumber", "weekDay"), Xr = Js("year", "ordinal"), ea = /(\d{4})-(\d\d)-(\d\d)/, Ks = RegExp(
  `${Bt.source} ?(?:${Ys.source}|(${js.source}))?`
), ta = RegExp(`(?: ${Ks.source})?`);
function he(n, e, t) {
  const s = n[e];
  return y(s) ? t : U(s);
}
function na(n, e) {
  return [{
    year: he(n, e),
    month: he(n, e + 1, 1),
    day: he(n, e + 2, 1)
  }, null, e + 3];
}
function we(n, e) {
  return [{
    hours: he(n, e, 0),
    minutes: he(n, e + 1, 0),
    seconds: he(n, e + 2, 0),
    milliseconds: Zt(n[e + 3])
  }, null, e + 4];
}
function He(n, e) {
  const t = !n[e] && !n[e + 1], s = dt(n[e + 1], n[e + 2]), i = t ? null : O.instance(s);
  return [{}, i, e + 3];
}
function Ue(n, e) {
  const t = n[e] ? P.create(n[e]) : null;
  return [{}, t, e + 1];
}
const sa = RegExp(`^T?${Bt.source}$`), ia = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function ra(n) {
  const [e, t, s, i, r, a, o, l, u] = n, d = e[0] === "-", h = l && l[0] === "-", p = (f, _ = !1) => f !== void 0 && (_ || f && d) ? -f : f;
  return [
    {
      years: p(G(t)),
      months: p(G(s)),
      weeks: p(G(i)),
      days: p(G(r)),
      hours: p(G(a)),
      minutes: p(G(o)),
      seconds: p(G(l), l === "-0"),
      milliseconds: p(Zt(u), h)
    }
  ];
}
const aa = {
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
function Jt(n, e, t, s, i, r, a) {
  const o = {
    year: e.length === 2 ? It(U(e)) : U(e),
    month: Rs.indexOf(t) + 1,
    day: U(s),
    hour: U(i),
    minute: U(r)
  };
  return a && (o.second = U(a)), n && (o.weekday = n.length > 3 ? Hs.indexOf(n) + 1 : Us.indexOf(n) + 1), o;
}
const oa = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function la(n) {
  const [
    ,
    e,
    t,
    s,
    i,
    r,
    a,
    o,
    l,
    u,
    d,
    h
  ] = n, p = Jt(e, i, s, t, r, a, o);
  let f;
  return l ? f = aa[l] : u ? f = 0 : f = dt(d, h), [p, new O(f)];
}
function ua(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const ca = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, da = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ha = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function An(n) {
  const [, e, t, s, i, r, a, o] = n;
  return [Jt(e, i, s, t, r, a, o), O.utcInstance];
}
function fa(n) {
  const [, e, t, s, i, r, a, o] = n;
  return [Jt(e, o, t, s, i, r, a), O.utcInstance];
}
const ma = pe(Yr, jt), ya = pe(Gr, jt), pa = pe(Kr, jt), ga = pe(Gs), Qs = ge(
  na,
  we,
  He,
  Ue
), va = ge(
  Qr,
  we,
  He,
  Ue
), wa = ge(
  Xr,
  we,
  He,
  Ue
), _a = ge(
  we,
  He,
  Ue
);
function ka(n) {
  return ve(
    n,
    [ma, Qs],
    [ya, va],
    [pa, wa],
    [ga, _a]
  );
}
function Sa(n) {
  return ve(ua(n), [oa, la]);
}
function ba(n) {
  return ve(
    n,
    [ca, An],
    [da, An],
    [ha, fa]
  );
}
function Ta(n) {
  return ve(n, [ia, ra]);
}
const $a = ge(we);
function Ea(n) {
  return ve(n, [sa, $a]);
}
const Oa = pe(ea, ta), Ma = pe(Ks), Da = ge(
  we,
  He,
  Ue
);
function Aa(n) {
  return ve(
    n,
    [Oa, Qs],
    [Ma, Da]
  );
}
const xn = "Invalid Duration", Xs = {
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
}, xa = {
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
  ...Xs
}, D = 146097 / 400, re = 146097 / 4800, Na = {
  years: {
    quarters: 4,
    months: 12,
    weeks: D / 7,
    days: D,
    hours: D * 24,
    minutes: D * 24 * 60,
    seconds: D * 24 * 60 * 60,
    milliseconds: D * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: D / 28,
    days: D / 4,
    hours: D * 24 / 4,
    minutes: D * 24 * 60 / 4,
    seconds: D * 24 * 60 * 60 / 4,
    milliseconds: D * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: re / 7,
    days: re,
    hours: re * 24,
    minutes: re * 24 * 60,
    seconds: re * 24 * 60 * 60,
    milliseconds: re * 24 * 60 * 60 * 1e3
  },
  ...Xs
}, ee = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], Ia = ee.slice(0).reverse();
function W(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new g(s);
}
function ei(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of Ia.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function Nn(n, e) {
  const t = ei(n, e) < 0 ? -1 : 1;
  ee.reduceRight((s, i) => {
    if (y(e[i]))
      return s;
    if (s) {
      const r = e[s] * t, a = n[i][s], o = Math.floor(r / a);
      e[i] += o * t, e[s] -= o * a * t;
    }
    return i;
  }, null), ee.reduce((s, i) => {
    if (y(e[i]))
      return s;
    if (s) {
      const r = e[s] % 1;
      e[s] -= r, e[i] += r * n[s][i];
    }
    return i;
  }, null);
}
function In(n) {
  const e = {};
  for (const [t, s] of Object.entries(n))
    s !== 0 && (e[t] = s);
  return e;
}
class g {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let s = t ? Na : xa;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || w.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
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
  static fromMillis(e, t) {
    return g.fromObject({ milliseconds: e }, t);
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
  static fromObject(e, t = {}) {
    if (e == null || typeof e != "object")
      throw new $(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new g({
      values: at(e, g.normalizeUnit),
      loc: w.fromObject(t),
      conversionAccuracy: t.conversionAccuracy,
      matrix: t.matrix
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
    if (j(e))
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
  static fromISO(e, t) {
    const [s] = Ta(e);
    return s ? g.fromObject(s, t) : g.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
  static fromISOTime(e, t) {
    const [s] = Ea(e);
    return s ? g.fromObject(s, t) : g.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new $("need to specify a reason the Duration is invalid");
    const s = e instanceof V ? e : new V(e, t);
    if (b.throwOnInvalid)
      throw new rr(s);
    return new g({ invalid: s });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const t = {
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
    if (!t) throw new ls(e);
    return t;
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
  toFormat(e, t = {}) {
    const s = {
      ...t,
      floor: t.round !== !1 && t.floor !== !1
    };
    return this.isValid ? E.create(this.loc, s).formatDurationFromString(this, e) : xn;
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
    if (!this.isValid) return xn;
    const t = e.showZeros !== !1, s = ee.map((i) => {
      const r = this.values[i];
      return y(r) || r === 0 && !t ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: i.slice(0, -1) }).format(r);
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
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += qt(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
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
    const t = this.toMillis();
    return t < 0 || t >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, m.fromMillis(t, { zone: "UTC" }).toISOTime(e));
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
    return this.isValid ? ei(this.matrix, this.values) : NaN;
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
    const t = g.fromDurationLike(e), s = {};
    for (const i of ee)
      (me(t.values, i) || me(this.values, i)) && (s[i] = t.get(i) + this.get(i));
    return W(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = g.fromDurationLike(e);
    return this.plus(t.negate());
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
    const t = {};
    for (const s of Object.keys(this.values))
      t[s] = Ws(e(this.values[s], s));
    return W(this, { values: t }, !0);
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
    const t = { ...this.values, ...at(e, g.normalizeUnit) };
    return W(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: i } = {}) {
    const a = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: i, conversionAccuracy: s };
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
    return Nn(this.matrix, e), W(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = In(this.normalize().shiftToAll().toObject());
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
    const t = {}, s = {}, i = this.toObject();
    let r;
    for (const a of ee)
      if (e.indexOf(a) >= 0) {
        r = a;
        let o = 0;
        for (const u in s)
          o += this.matrix[u][a] * s[u], s[u] = 0;
        j(i[a]) && (o += i[a]);
        const l = Math.trunc(o);
        t[a] = l, s[a] = (o * 1e3 - l * 1e3) / 1e3;
      } else j(i[a]) && (s[a] = i[a]);
    for (const a in s)
      s[a] !== 0 && (t[r] += a === r ? s[a] : s[a] / this.matrix[r][a]);
    return Nn(this.matrix, t), W(this, { values: t }, !0);
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
    for (const t of Object.keys(this.values))
      e[t] = this.values[t] === 0 ? 0 : -this.values[t];
    return W(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = In(this.values);
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
    function t(s, i) {
      return s === void 0 || s === 0 ? i === void 0 || i === 0 : s === i;
    }
    for (const s of ee)
      if (!t(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const ae = "Invalid Interval";
function Ca(n, e) {
  return !n || !n.isValid ? S.invalid("missing or invalid start") : !e || !e.isValid ? S.invalid("missing or invalid end") : e < n ? S.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${n.toISO()} and end=${e.toISO()}`
  ) : null;
}
class S {
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
  static invalid(e, t = null) {
    if (!e)
      throw new $("need to specify a reason the Interval is invalid");
    const s = e instanceof V ? e : new V(e, t);
    if (b.throwOnInvalid)
      throw new ir(s);
    return new S({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = $e(e), i = $e(t), r = Ca(s, i);
    return r ?? new S({
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
  static after(e, t) {
    const s = g.fromDurationLike(t), i = $e(e);
    return S.fromDateTimes(i, i.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = g.fromDurationLike(t), i = $e(e);
    return S.fromDateTimes(i.minus(s), i);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, t) {
    const [s, i] = (e || "").split("/", 2);
    if (s && i) {
      let r, a;
      try {
        r = m.fromISO(s, t), a = r.isValid;
      } catch {
        a = !1;
      }
      let o, l;
      try {
        o = m.fromISO(i, t), l = o.isValid;
      } catch {
        l = !1;
      }
      if (a && l)
        return S.fromDateTimes(r, o);
      if (a) {
        const u = g.fromISO(i, t);
        if (u.isValid)
          return S.after(r, u);
      } else if (l) {
        const u = g.fromISO(s, t);
        if (u.isValid)
          return S.before(o, u);
      }
    }
    return S.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
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
  count(e = "milliseconds", t) {
    if (!this.isValid) return NaN;
    const s = this.start.startOf(e, t);
    let i;
    return t?.useLocaleWeeks ? i = this.end.reconfigure({ locale: s.locale }) : i = this.end, i = i.startOf(e, t), Math.floor(i.diff(s, e).get(e)) + (i.valueOf() !== this.end.valueOf());
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
  set({ start: e, end: t } = {}) {
    return this.isValid ? S.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map($e).filter((a) => this.contains(a)).sort((a, o) => a.toMillis() - o.toMillis()), s = [];
    let { s: i } = this, r = 0;
    for (; i < this.e; ) {
      const a = t[r] || this.e, o = +a > +this.e ? this.e : a;
      s.push(S.fromDateTimes(i, o)), i = o, r += 1;
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
    const t = g.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s } = this, i = 1, r;
    const a = [];
    for (; s < this.e; ) {
      const o = this.start.plus(t.mapUnits((l) => l * i));
      r = +o > +this.e ? this.e : o, a.push(S.fromDateTimes(s, r)), s = r, i += 1;
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
    const t = this.s > e.s ? this.s : e.s, s = this.e < e.e ? this.e : e.e;
    return t >= s ? null : S.fromDateTimes(t, s);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid) return this;
    const t = this.s < e.s ? this.s : e.s, s = this.e > e.e ? this.e : e.e;
    return S.fromDateTimes(t, s);
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
    const [t, s] = e.sort((i, r) => i.s - r.s).reduce(
      ([i, r], a) => r ? r.overlaps(a) || r.abutsStart(a) ? [i, r.union(a)] : [i.concat([r]), a] : [i, a],
      [[], null]
    );
    return s && t.push(s), t;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let t = null, s = 0;
    const i = [], r = e.map((l) => [
      { time: l.s, type: "s" },
      { time: l.e, type: "e" }
    ]), a = Array.prototype.concat(...r), o = a.sort((l, u) => l.time - u.time);
    for (const l of o)
      s += l.type === "s" ? 1 : -1, s === 1 ? t = l.time : (t && +t != +l.time && i.push(S.fromDateTimes(t, l.time)), t = null);
    return S.merge(i);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return S.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : ae;
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
  toLocaleString(e = st, t = {}) {
    return this.isValid ? E.create(this.s.loc.clone(t), e).formatInterval(this) : ae;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : ae;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : ae;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : ae;
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
  toFormat(e, { separator: t = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : ae;
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
  toDuration(e, t) {
    return this.isValid ? this.e.diff(this.s, e, t) : g.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return S.fromDateTimes(e(this.s), e(this.e));
  }
}
class je {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = b.defaultZone) {
    const t = m.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return P.isValidZone(e);
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
    return q(e, b.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || w.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || w.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || w.create(e)).getWeekendDays().slice();
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
  static months(e = "long", { locale: t = null, numberingSystem: s = null, locObj: i = null, outputCalendar: r = "gregory" } = {}) {
    return (i || w.create(t, s, r)).months(e);
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
  static monthsFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: i = null, outputCalendar: r = "gregory" } = {}) {
    return (i || w.create(t, s, r)).months(e, !0);
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
  static weekdays(e = "long", { locale: t = null, numberingSystem: s = null, locObj: i = null } = {}) {
    return (i || w.create(t, s, null)).weekdays(e);
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
  static weekdaysFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: i = null } = {}) {
    return (i || w.create(t, s, null)).weekdays(e, !0);
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
    return w.create(e).meridiems();
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
  static eras(e = "short", { locale: t = null } = {}) {
    return w.create(t, null, "gregory").eras(e);
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
    return { relative: zs(), localeWeek: Fs() };
  }
}
function Cn(n, e) {
  const t = (i) => i.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(g.fromMillis(s).as("days"));
}
function Va(n, e, t) {
  const s = [
    ["years", (l, u) => u.year - l.year],
    ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
    ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
    [
      "weeks",
      (l, u) => {
        const d = Cn(l, u);
        return (d - d % 7) / 7;
      }
    ],
    ["days", Cn]
  ], i = {}, r = n;
  let a, o;
  for (const [l, u] of s)
    t.indexOf(l) >= 0 && (a = l, i[l] = u(n, e), o = r.plus(i), o > e ? (i[l]--, n = r.plus(i), n > e && (o = n, i[l]--, n = r.plus(i))) : n = o);
  return [n, i, o, a];
}
function za(n, e, t, s) {
  let [i, r, a, o] = Va(n, e, t);
  const l = e - i, u = t.filter(
    (h) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(h) >= 0
  );
  u.length === 0 && (a < e && (a = i.plus({ [o]: 1 })), a !== i && (r[o] = (r[o] || 0) + l / (a - i)));
  const d = g.fromObject(r, s);
  return u.length > 0 ? g.fromMillis(l, s).shiftTo(...u).plus(d) : d;
}
const Fa = "missing Intl.DateTimeFormat.formatToParts support";
function v(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(Or(t)) };
}
const La = " ", ti = `[ ${La}]`, ni = new RegExp(ti, "g");
function Wa(n) {
  return n.replace(/\./g, "\\.?").replace(ni, ti);
}
function Vn(n) {
  return n.replace(/\./g, "").replace(ni, " ").toLowerCase();
}
function C(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(Wa).join("|")),
    deser: ([t]) => n.findIndex((s) => Vn(t) === Vn(s)) + e
  };
}
function zn(n, e) {
  return { regex: n, deser: ([, t, s]) => dt(t, s), groups: e };
}
function Je(n) {
  return { regex: n, deser: ([e]) => e };
}
function Ra(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Pa(n, e) {
  const t = I(e), s = I(e, "{2}"), i = I(e, "{3}"), r = I(e, "{4}"), a = I(e, "{6}"), o = I(e, "{1,2}"), l = I(e, "{1,3}"), u = I(e, "{1,6}"), d = I(e, "{1,9}"), h = I(e, "{2,4}"), p = I(e, "{4,6}"), f = (F) => ({ regex: RegExp(Ra(F.val)), deser: ([ie]) => ie, literal: !0 }), N = ((F) => {
    if (n.literal)
      return f(F);
    switch (F.val) {
      // era
      case "G":
        return C(e.eras("short"), 0);
      case "GG":
        return C(e.eras("long"), 0);
      // years
      case "y":
        return v(u);
      case "yy":
        return v(h, It);
      case "yyyy":
        return v(r);
      case "yyyyy":
        return v(p);
      case "yyyyyy":
        return v(a);
      // months
      case "M":
        return v(o);
      case "MM":
        return v(s);
      case "MMM":
        return C(e.months("short", !0), 1);
      case "MMMM":
        return C(e.months("long", !0), 1);
      case "L":
        return v(o);
      case "LL":
        return v(s);
      case "LLL":
        return C(e.months("short", !1), 1);
      case "LLLL":
        return C(e.months("long", !1), 1);
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
        return Je(d);
      case "uu":
        return Je(o);
      case "uuu":
        return v(t);
      // meridiem
      case "a":
        return C(e.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return v(r);
      case "kk":
        return v(h, It);
      // weekNumber (W)
      case "W":
        return v(o);
      case "WW":
        return v(s);
      // weekdays
      case "E":
      case "c":
        return v(t);
      case "EEE":
        return C(e.weekdays("short", !1), 1);
      case "EEEE":
        return C(e.weekdays("long", !1), 1);
      case "ccc":
        return C(e.weekdays("short", !0), 1);
      case "cccc":
        return C(e.weekdays("long", !0), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return zn(new RegExp(`([+-]${o.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return zn(new RegExp(`([+-]${o.source})(${s.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return Je(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return Je(/[^\S\n\r]/);
      default:
        return f(F);
    }
  })(n) || {
    invalidReason: Fa
  };
  return N.token = n, N;
}
const Ha = {
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
function Ua(n, e, t) {
  const { type: s, value: i } = n;
  if (s === "literal") {
    const l = /^\s+$/.test(i);
    return {
      literal: !l,
      val: l ? " " : i
    };
  }
  const r = e[s];
  let a = s;
  s === "hour" && (e.hour12 != null ? a = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? a = "hour12" : a = "hour24" : a = t.hour12 ? "hour12" : "hour24");
  let o = Ha[a];
  if (typeof o == "object" && (o = o[r]), o)
    return {
      literal: !1,
      val: o
    };
}
function Za(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function qa(n, e, t) {
  const s = n.match(e);
  if (s) {
    const i = {};
    let r = 1;
    for (const a in t)
      if (me(t, a)) {
        const o = t[a], l = o.groups ? o.groups + 1 : 1;
        !o.literal && o.token && (i[o.token.val[0]] = o.deser(s.slice(r, r + l))), r += l;
      }
    return [s, i];
  } else
    return [s, {}];
}
function Ba(n) {
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
  let t = null, s;
  return y(n.z) || (t = P.create(n.z)), y(n.Z) || (t || (t = new O(n.Z)), s = n.Z), y(n.q) || (n.M = (n.q - 1) * 3 + 1), y(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), y(n.u) || (n.S = Zt(n.u)), [Object.keys(n).reduce((r, a) => {
    const o = e(a);
    return o && (r[o] = n[a]), r;
  }, {}), t, s];
}
let vt = null;
function ja() {
  return vt || (vt = m.fromMillis(1555555555555)), vt;
}
function Ja(n, e) {
  if (n.literal)
    return n;
  const t = E.macroTokenToFormatOpts(n.val), s = ai(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function si(n, e) {
  return Array.prototype.concat(...n.map((t) => Ja(t, e)));
}
class ii {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = si(E.parseFormat(t), e), this.units = this.tokens.map((s) => Pa(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, i] = Za(this.units);
      this.regex = RegExp(s, "i"), this.handlers = i;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = qa(e, this.regex, this.handlers), [i, r, a] = s ? Ba(s) : [null, null, void 0];
      if (me(s, "a") && me(s, "H"))
        throw new ue(
          "Can't include meridiem when specifying 24-hour format"
        );
      return {
        input: e,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: t,
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
function ri(n, e, t) {
  return new ii(n, t).explainFromTokens(e);
}
function Ya(n, e, t) {
  const { result: s, zone: i, specificOffset: r, invalidReason: a } = ri(n, e, t);
  return [s, i, r, a];
}
function ai(n, e) {
  if (!n)
    return null;
  const s = E.create(e, n).dtFormatter(ja()), i = s.formatToParts(), r = s.resolvedOptions();
  return i.map((a) => Ua(a, n, r));
}
const wt = "Invalid DateTime", Fn = 864e13;
function Oe(n) {
  return new V("unsupported zone", `the zone "${n.name}" is not supported`);
}
function _t(n) {
  return n.weekData === null && (n.weekData = it(n.c)), n.weekData;
}
function kt(n) {
  return n.localWeekData === null && (n.localWeekData = it(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function K(n, e) {
  const t = {
    ts: n.ts,
    zone: n.zone,
    c: n.c,
    o: n.o,
    loc: n.loc,
    invalid: n.invalid
  };
  return new m({ ...t, ...e, old: t });
}
function oi(n, e, t) {
  let s = n - e * 60 * 1e3;
  const i = t.offset(s);
  if (e === i)
    return [s, e];
  s -= (i - e) * 60 * 1e3;
  const r = t.offset(s);
  return i === r ? [s, i] : [n - Math.min(i, r) * 60 * 1e3, Math.max(i, r)];
}
function Ye(n, e) {
  n += e * 60 * 1e3;
  const t = new Date(n);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    millisecond: t.getUTCMilliseconds()
  };
}
function Qe(n, e, t) {
  return oi(ct(n), e, t);
}
function Ln(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), i = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, r = {
    ...n.c,
    year: s,
    month: i,
    day: Math.min(n.c.day, rt(s, i)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
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
  }).as("milliseconds"), o = ct(r);
  let [l, u] = oi(o, t, n.zone);
  return a !== 0 && (l += a, u = n.zone.offset(l)), { ts: l, o: u };
}
function oe(n, e, t, s, i, r) {
  const { setZone: a, zone: o } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const l = e || o, u = m.fromObject(n, {
      ...t,
      zone: l,
      specificOffset: r
    });
    return a ? u : u.setZone(o);
  } else
    return m.invalid(
      new V("unparsable", `the input "${i}" can't be parsed as ${s}`)
    );
}
function Ge(n, e, t = !0) {
  return n.isValid ? E.create(w.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function St(n, e, t) {
  const s = n.c.year > 9999 || n.c.year < 0;
  let i = "";
  if (s && n.c.year >= 0 && (i += "+"), i += T(n.c.year, s ? 6 : 4), t === "year") return i;
  if (e) {
    if (i += "-", i += T(n.c.month), t === "month") return i;
    i += "-";
  } else if (i += T(n.c.month), t === "month") return i;
  return i += T(n.c.day), i;
}
function Wn(n, e, t, s, i, r, a) {
  let o = !t || n.c.millisecond !== 0 || n.c.second !== 0, l = "";
  switch (a) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (l += T(n.c.hour), a === "hour") break;
      if (e) {
        if (l += ":", l += T(n.c.minute), a === "minute") break;
        o && (l += ":", l += T(n.c.second));
      } else {
        if (l += T(n.c.minute), a === "minute") break;
        o && (l += T(n.c.second));
      }
      if (a === "second") break;
      o && (!s || n.c.millisecond !== 0) && (l += ".", l += T(n.c.millisecond, 3));
  }
  return i && (n.isOffsetFixed && n.offset === 0 && !r ? l += "Z" : n.o < 0 ? (l += "-", l += T(Math.trunc(-n.o / 60)), l += ":", l += T(Math.trunc(-n.o % 60))) : (l += "+", l += T(Math.trunc(n.o / 60)), l += ":", l += T(Math.trunc(n.o % 60)))), r && (l += "[" + n.zone.ianaName + "]"), l;
}
const li = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ga = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ka = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Xe = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Qa = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], Xa = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function et(n) {
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
  }[n.toLowerCase()];
  if (!e) throw new ls(n);
  return e;
}
function Rn(n) {
  switch (n.toLowerCase()) {
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
      return et(n);
  }
}
function eo(n) {
  if (Me === void 0 && (Me = b.now()), n.type !== "iana")
    return n.offset(Me);
  const e = n.name;
  let t = Ct.get(e);
  return t === void 0 && (t = n.offset(Me), Ct.set(e, t)), t;
}
function Pn(n, e) {
  const t = q(e.zone, b.defaultZone);
  if (!t.isValid)
    return m.invalid(Oe(t));
  const s = w.fromObject(e);
  let i, r;
  if (y(n.year))
    i = b.now();
  else {
    for (const l of Xe)
      y(n[l]) && (n[l] = li[l]);
    const a = Cs(n) || Vs(n);
    if (a)
      return m.invalid(a);
    const o = eo(t);
    [i, r] = Qe(n, o, t);
  }
  return new m({ ts: i, zone: t, loc: s, o: r });
}
function Hn(n, e, t) {
  const s = y(t.round) ? !0 : t.round, i = y(t.rounding) ? "trunc" : t.rounding, r = (o, l) => (o = qt(o, s || t.calendary ? 0 : 2, t.calendary ? "round" : i), e.loc.clone(t).relFormatter(t).format(o, l)), a = (o) => t.calendary ? e.hasSame(n, o) ? 0 : e.startOf(o).diff(n.startOf(o), o).get(o) : e.diff(n, o).get(o);
  if (t.unit)
    return r(a(t.unit), t.unit);
  for (const o of t.units) {
    const l = a(o);
    if (Math.abs(l) >= 1)
      return r(l, o);
  }
  return r(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function Un(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let Me;
const Ct = /* @__PURE__ */ new Map();
class m {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || b.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new V("invalid input") : null) || (t.isValid ? null : Oe(t));
    this.ts = y(e.ts) ? b.now() : e.ts;
    let i = null, r = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [i, r] = [e.old.c, e.old.o];
      else {
        const o = j(e.o) && !e.old ? e.o : t.offset(this.ts);
        i = Ye(this.ts, o), s = Number.isNaN(i.year) ? new V("invalid input") : null, i = s ? null : i, r = s ? null : o;
      }
    this._zone = t, this.loc = e.loc || w.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = i, this.o = r, this.isLuxonDateTime = !0;
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
    const [e, t] = Un(arguments), [s, i, r, a, o, l, u] = t;
    return Pn({ year: s, month: i, day: r, hour: a, minute: o, second: l, millisecond: u }, e);
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
    const [e, t] = Un(arguments), [s, i, r, a, o, l, u] = t;
    return e.zone = O.utcInstance, Pn({ year: s, month: i, day: r, hour: a, minute: o, second: l, millisecond: u }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = Nr(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return m.invalid("invalid input");
    const i = q(t.zone, b.defaultZone);
    return i.isValid ? new m({
      ts: s,
      zone: i,
      loc: w.fromObject(t)
    }) : m.invalid(Oe(i));
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
  static fromMillis(e, t = {}) {
    if (j(e))
      return e < -Fn || e > Fn ? m.invalid("Timestamp out of range") : new m({
        ts: e,
        zone: q(t.zone, b.defaultZone),
        loc: w.fromObject(t)
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
  static fromSeconds(e, t = {}) {
    if (j(e))
      return new m({
        ts: e * 1e3,
        zone: q(t.zone, b.defaultZone),
        loc: w.fromObject(t)
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
  static fromObject(e, t = {}) {
    e = e || {};
    const s = q(t.zone, b.defaultZone);
    if (!s.isValid)
      return m.invalid(Oe(s));
    const i = w.fromObject(t), r = at(e, Rn), { minDaysInFirstWeek: a, startOfWeek: o } = En(r, i), l = b.now(), u = y(t.specificOffset) ? s.offset(l) : t.specificOffset, d = !y(r.ordinal), h = !y(r.year), p = !y(r.month) || !y(r.day), f = h || p, _ = r.weekYear || r.weekNumber;
    if ((f || d) && _)
      throw new ue(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (p && d)
      throw new ue("Can't mix ordinal dates with month/day");
    const N = _ || r.weekday && !f;
    let F, ie, _e = Ye(l, u);
    N ? (F = Qa, ie = Ga, _e = it(_e, a, o)) : d ? (F = Xa, ie = Ka, _e = gt(_e)) : (F = Xe, ie = li);
    let Kt = !1;
    for (const Se of F) {
      const pi = r[Se];
      y(pi) ? Kt ? r[Se] = ie[Se] : r[Se] = _e[Se] : Kt = !0;
    }
    const hi = N ? Dr(r, a, o) : d ? Ar(r) : Cs(r), Qt = hi || Vs(r);
    if (Qt)
      return m.invalid(Qt);
    const fi = N ? Tn(r, a, o) : d ? $n(r) : r, [mi, yi] = Qe(fi, u, s), ke = new m({
      ts: mi,
      zone: s,
      o: yi,
      loc: i
    });
    return r.weekday && f && e.weekday !== ke.weekday ? m.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${r.weekday} and a date of ${ke.toISO()}`
    ) : ke.isValid ? ke : m.invalid(ke.invalid);
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
  static fromISO(e, t = {}) {
    const [s, i] = ka(e);
    return oe(s, i, t, "ISO 8601", e);
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
  static fromRFC2822(e, t = {}) {
    const [s, i] = Sa(e);
    return oe(s, i, t, "RFC 2822", e);
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
  static fromHTTP(e, t = {}) {
    const [s, i] = ba(e);
    return oe(s, i, t, "HTTP", t);
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
  static fromFormat(e, t, s = {}) {
    if (y(e) || y(t))
      throw new $("fromFormat requires an input string and a format");
    const { locale: i = null, numberingSystem: r = null } = s, a = w.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    }), [o, l, u, d] = Ya(a, e, t);
    return d ? m.invalid(d) : oe(o, l, s, `format ${t}`, e, u);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, s = {}) {
    return m.fromFormat(e, t, s);
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
  static fromSQL(e, t = {}) {
    const [s, i] = Aa(e);
    return oe(s, i, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new $("need to specify a reason the DateTime is invalid");
    const s = e instanceof V ? e : new V(e, t);
    if (b.throwOnInvalid)
      throw new sr(s);
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
  static parseFormatForOpts(e, t = {}) {
    const s = ai(e, w.fromObject(t));
    return s ? s.map((i) => i ? i.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, t = {}) {
    return si(E.parseFormat(e), w.fromObject(t)).map((i) => i.val).join("");
  }
  static resetCache() {
    Me = void 0, Ct.clear();
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
    return this.isValid ? _t(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? _t(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? _t(this).weekday : NaN;
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
    return this.isValid ? kt(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? kt(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? kt(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gt(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? je.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? je.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? je.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? je.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
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
    const e = 864e5, t = 6e4, s = ct(this.c), i = this.zone.offset(s - e), r = this.zone.offset(s + e), a = this.zone.offset(s - i * t), o = this.zone.offset(s - r * t);
    if (a === o)
      return [this];
    const l = s - a * t, u = s - o * t, d = Ye(l, a), h = Ye(u, o);
    return d.hour === h.hour && d.minute === h.minute && d.second === h.second && d.millisecond === h.millisecond ? [K(this, { ts: l }), K(this, { ts: u })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Pe(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return rt(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? de(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Fe(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Fe(
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
    const { locale: t, numberingSystem: s, calendar: i } = E.create(
      this.loc.clone(e),
      e
    ).resolvedOptions(this);
    return { locale: t, numberingSystem: s, outputCalendar: i };
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
  toUTC(e = 0, t = {}) {
    return this.setZone(O.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(b.defaultZone);
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
  setZone(e, { keepLocalTime: t = !1, keepCalendarTime: s = !1 } = {}) {
    if (e = q(e, b.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let i = this.ts;
      if (t || s) {
        const r = e.offset(this.ts), a = this.toObject();
        [i] = Qe(a, r, e);
      }
      return K(this, { ts: i, zone: e });
    } else
      return m.invalid(Oe(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: s } = {}) {
    const i = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: s });
    return K(this, { loc: i });
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
    const t = at(e, Rn), { minDaysInFirstWeek: s, startOfWeek: i } = En(t, this.loc), r = !y(t.weekYear) || !y(t.weekNumber) || !y(t.weekday), a = !y(t.ordinal), o = !y(t.year), l = !y(t.month) || !y(t.day), u = o || l, d = t.weekYear || t.weekNumber;
    if ((u || a) && d)
      throw new ue(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (l && a)
      throw new ue("Can't mix ordinal dates with month/day");
    let h;
    r ? h = Tn(
      { ...it(this.c, s, i), ...t },
      s,
      i
    ) : y(t.ordinal) ? (h = { ...this.toObject(), ...t }, y(t.day) && (h.day = Math.min(rt(h.year, h.month), h.day))) : h = $n({ ...gt(this.c), ...t });
    const [p, f] = Qe(h, this.o, this.zone);
    return K(this, { ts: p, o: f });
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
    const t = g.fromDurationLike(e);
    return K(this, Ln(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = g.fromDurationLike(e).negate();
    return K(this, Ln(this, t));
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
  startOf(e, { useLocaleWeeks: t = !1 } = {}) {
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
      if (t) {
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
  endOf(e, t) {
    return this.isValid ? this.plus({ [e]: 1 }).startOf(e, t).minus(1) : this;
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
  toFormat(e, t = {}) {
    return this.isValid ? E.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : wt;
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
  toLocaleString(e = st, t = {}) {
    return this.isValid ? E.create(this.loc.clone(t), e).formatDateTime(this) : wt;
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
    suppressSeconds: t = !1,
    suppressMilliseconds: s = !1,
    includeOffset: i = !0,
    extendedZone: r = !1,
    precision: a = "milliseconds"
  } = {}) {
    if (!this.isValid)
      return null;
    a = et(a);
    const o = e === "extended";
    let l = St(this, o, a);
    return Xe.indexOf(a) >= 3 && (l += "T"), l += Wn(
      this,
      o,
      t,
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
  toISODate({ format: e = "extended", precision: t = "day" } = {}) {
    return this.isValid ? St(this, e === "extended", et(t)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Ge(this, "kkkk-'W'WW-c");
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
    suppressSeconds: t = !1,
    includeOffset: s = !0,
    includePrefix: i = !1,
    extendedZone: r = !1,
    format: a = "extended",
    precision: o = "milliseconds"
  } = {}) {
    return this.isValid ? (o = et(o), (i && Xe.indexOf(o) >= 3 ? "T" : "") + Wn(
      this,
      a === "extended",
      t,
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
    return Ge(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
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
    return Ge(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? St(this, !0) : null;
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
  toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: s = !0 } = {}) {
    let i = "HH:mm:ss.SSS";
    return (t || e) && (s && (i += " "), t ? i += "z" : e && (i += "ZZ")), Ge(this, i, !0);
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
    return this.isValid ? this.toISO() : wt;
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
    const t = { ...this.c };
    return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
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
  diff(e, t = "milliseconds", s = {}) {
    if (!this.isValid || !e.isValid)
      return g.invalid("created by diffing an invalid DateTime");
    const i = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, r = Ir(t).map(g.normalizeUnit), a = e.valueOf() > this.valueOf(), o = a ? this : e, l = a ? e : this, u = za(o, l, r, i);
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
  diffNow(e = "milliseconds", t = {}) {
    return this.diff(m.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? S.fromDateTimes(this, e) : this;
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
  hasSame(e, t, s) {
    if (!this.isValid) return !1;
    const i = e.valueOf(), r = this.setZone(e.zone, { keepLocalTime: !0 });
    return r.startOf(t, s) <= i && i <= r.endOf(t, s);
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
    const t = e.base || m.fromObject({}, { zone: this.zone }), s = e.padding ? this < t ? -e.padding : e.padding : 0;
    let i = ["years", "months", "days", "hours", "minutes", "seconds"], r = e.unit;
    return Array.isArray(e.unit) && (i = e.unit, r = void 0), Hn(t, this.plus(s), {
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
    return this.isValid ? Hn(e.base || m.fromObject({}, { zone: this.zone }), this, {
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
    return On(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(m.isDateTime))
      throw new $("max requires all arguments be DateTimes");
    return On(e, (t) => t.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, t, s = {}) {
    const { locale: i = null, numberingSystem: r = null } = s, a = w.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    });
    return ri(a, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, s = {}) {
    return m.fromFormatExplain(e, t, s);
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
  static buildFormatParser(e, t = {}) {
    const { locale: s = null, numberingSystem: i = null } = t, r = w.fromOpts({
      locale: s,
      numberingSystem: i,
      defaultToEN: !0
    });
    return new ii(r, e);
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
  static fromFormatParser(e, t, s = {}) {
    if (y(e) || y(t))
      throw new $(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: i = null, numberingSystem: r = null } = s, a = w.fromOpts({
      locale: i,
      numberingSystem: r,
      defaultToEN: !0
    });
    if (!a.equals(t.locale))
      throw new $(
        `fromFormatParser called with a locale of ${a}, but the format parser was created for ${t.locale}`
      );
    const { result: o, zone: l, specificOffset: u, invalidReason: d } = t.explainFromTokens(e);
    return d ? m.invalid(d) : oe(
      o,
      l,
      s,
      `format ${t.format}`,
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
    return st;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return us;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return ar;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return cs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return ds;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return hs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return fs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return ms;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return ys;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return ps;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return gs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return vs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return ws;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return _s;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return ks;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Ss;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return bs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return or;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Ts;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return $s;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return Es;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Os;
  }
}
function $e(n) {
  if (m.isDateTime(n))
    return n;
  if (n && n.valueOf && j(n.valueOf()))
    return m.fromJSDate(n);
  if (n && typeof n == "object")
    return m.fromObject(n);
  throw new $(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
const to = [
  { value: "HH:mm", label: "18:38" },
  { value: "HH:mm:ss", label: "18:38:05" },
  { value: "h:mm a", label: "6:38 PM" },
  { value: "H:mm", label: "8:38" }
], no = [
  { value: "cccc dd. L.", label: "úterý 08. 9." },
  { value: "ccc dd. LL.", label: "út 08. 09." },
  { value: "dd. MM. yyyy", label: "08. 09. 2026" },
  { value: "cccc d. MMMM", label: "úterý 8. září" },
  { value: "EEE, MMM d", label: "Tue, Sep 8" }
];
function so(n, e) {
  let t = m.local();
  return e && (t = t.setZone(e)), n && (t = t.setLocale(n)), t;
}
function io(n, e) {
  return n.toFormat(e || os);
}
function ro(n, e) {
  return n.toFormat(e || nr);
}
function ao(n) {
  const e = n || os;
  return e.includes("s") || e.includes("S");
}
function Yt(n) {
  const e = n % 19, t = Math.floor(n / 100), s = n % 100, i = Math.floor(t / 4), r = t % 4, a = Math.floor((t + 8) / 25), o = Math.floor((t - a + 1) / 3), l = (19 * e + t - i - o + 15) % 30, u = Math.floor(s / 4), d = s % 4, h = (32 + 2 * r + 2 * u - l - d) % 7, p = Math.floor((e + 11 * l + 22 * h) / 451), f = Math.floor((l + h - 7 * p + 114) / 31), _ = (l + h - 7 * p + 114) % 31 + 1;
  return new Date(Date.UTC(n, f - 1, _));
}
function oo(n) {
  const e = Yt(n);
  return e.setDate(e.getDate() + 1), e;
}
function lo(n) {
  const e = oo(n.getFullYear());
  return n.getFullYear() === e.getFullYear() && n.getMonth() === e.getMonth() && n.getDate() === e.getDate();
}
function uo(n) {
  const e = Yt(n);
  return e.setDate(e.getDate() - 2), e;
}
function co(n) {
  const e = uo(n.getFullYear());
  return n.getFullYear() === e.getFullYear() && n.getMonth() === e.getMonth() && n.getDate() === e.getDate();
}
function ho(n) {
  return lo(n instanceof Date ? n : n.toJSDate());
}
function ui(n) {
  return m.fromJSDate(Yt(n)).setZone("Europe/Prague").startOf("day");
}
function fo(n) {
  return co(n instanceof Date ? n : n.toJSDate());
}
function mo(n) {
  const e = ui(n);
  return S.fromDateTimes(
    e.minus({ days: 7 }),
    // Palm Sunday
    e.plus({ days: 1 })
  );
}
function yo(n) {
  n = (n instanceof Date ? m.fromJSDate(n) : n).setZone("Europe/Prague").startOf("day");
  const e = mo(n.year);
  return e.isValid && e.start && e.end ? e.start <= n && n <= e.end : !1;
}
const po = {
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
function Zn(n) {
  if (n = (n instanceof Date ? m.fromJSDate(n) : n).setZone("Europe/Prague").startOf("day"), yo(n)) {
    const e = ui(n.year).setZone("Europe/Prague").startOf("day"), t = n.diff(e, "days").as("days");
    return po[t] ?? void 0;
  }
}
const go = {
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
function vo(n) {
  return n = n instanceof Date ? m.fromJSDate(n) : n, ho(n) || fo(n) ? Zn(n) : go[n.toFormat("ddMM")];
}
const wo = {
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
}, _o = wo;
function ko(n) {
  return n = n instanceof Date ? m.fromJSDate(n) : n, _o[n.toFormat("ddMM")];
}
function So(n) {
  const e = vo(n);
  return typeof e == "string" && e.length > 0 ? e : null;
}
function bo(n) {
  const e = ko(n);
  if (!e || typeof e != "object")
    return null;
  const t = e.name;
  return t && t.length > 0 ? t : null;
}
const To = {
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
}, ci = To, qn = (n) => String(n).padStart(2, "0");
function di(n) {
  return n ? Array.isArray(n) ? n : [n] : [];
}
const Bn = /* @__PURE__ */ new Map();
for (const [n, e] of Object.entries(ci))
  for (const t of di(e)) {
    const s = t.toLowerCase(), i = Bn.get(s);
    i ? i.push(n) : Bn.set(s, [n]);
  }
function $o(n) {
  const e = `${qn(n.getMonth() + 1)}-${qn(n.getDate())}`;
  return di(ci[e]);
}
function Eo(n, e) {
  const t = $o(n.toJSDate());
  if (!t.length)
    return null;
  const s = t.join(" a "), i = e?.trim();
  return i ? `${i} ${s}` : s;
}
const Oo = Yn`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: default;
  }

  ha-card.has-action {
    cursor: pointer;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    min-height: 100%;
  }

  .row.no-temps {
    grid-template-columns: 1fr;
  }

  .center {
    text-align: center;
    min-width: 0;
  }

  .time {
    display: block;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
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
    line-height: 1.25;
    margin-top: 4px;
    opacity: 0.9;
  }

  .holiday {
    font-weight: 700;
    color: var(--accent-color, var(--primary-color));
    opacity: 1;
  }

  .significant {
    font-style: italic;
    opacity: 0.85;
  }

  .temp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-width: 0;
    text-align: center;
  }

  .temp.left {
    align-items: flex-start;
    text-align: left;
  }

  .temp.right {
    align-items: flex-end;
    text-align: right;
  }

  .temp-header {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .temp.right .temp-header {
    flex-direction: row-reverse;
  }

  .temp-label {
    font-size: 0.85em;
    font-weight: 600;
    opacity: 0.85;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .temp-value {
    font-size: 1.35em;
    font-weight: 700;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .temp-unit {
    font-size: 0.7em;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 2px;
  }

  ha-icon {
    --mdc-icon-size: 1.15em;
    width: 1.15em;
    height: 1.15em;
    flex-shrink: 0;
  }

  /* Size variants */
  :host([data-size='compact']) .time {
    font-size: 2.1em;
  }
  :host([data-size='compact']) .date {
    font-size: 1.05em;
  }
  :host([data-size='compact']) .nameday,
  :host([data-size='compact']) .holiday,
  :host([data-size='compact']) .significant {
    font-size: 0.85em;
  }
  :host([data-size='compact']) .temp-value {
    font-size: 1.15em;
  }

  :host([data-size='normal']) .time {
    font-size: 2.8em;
  }
  :host([data-size='normal']) .date {
    font-size: 1.35em;
  }
  :host([data-size='normal']) .nameday,
  :host([data-size='normal']) .holiday,
  :host([data-size='normal']) .significant {
    font-size: 0.95em;
  }

  :host([data-size='large']) .time {
    font-size: 3.4em;
  }
  :host([data-size='large']) .date {
    font-size: 1.6em;
  }
  :host([data-size='large']) .nameday,
  :host([data-size='large']) .holiday,
  :host([data-size='large']) .significant {
    font-size: 1.1em;
  }
  :host([data-size='large']) .temp-value {
    font-size: 1.55em;
  }
`, Mo = "mdi:thermometer";
function Do(n, e) {
  return !!(n?.entity || e?.entity);
}
function jn(n, e, t, s) {
  if (!e?.entity)
    return null;
  const i = n?.states?.[e.entity], r = i?.state, a = i?.attributes?.unit_of_measurement ?? "°C", o = e.precision ?? 1;
  let l = "—";
  if (r !== void 0 && r !== "unavailable" && r !== "unknown") {
    const u = Number(r);
    Number.isNaN(u) ? l = String(r) : l = u.toFixed(o).replace(".", ",");
  }
  return {
    label: e.name || i?.attributes?.friendly_name || t,
    value: l,
    unit: a,
    icon: e.icon || i?.attributes?.icon || s || Mo,
    iconColor: e.icon_color,
    entity: e.entity
  };
}
var Ao = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, J = (n, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? xo(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Ao(e, t, i), i;
};
console.info(
  `%c ${as.toUpperCase()} %c ${er} `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
const Vt = window;
Vt.customCards = Vt.customCards || [];
Vt.customCards.push({
  type: We,
  name: as,
  description: tr,
  preview: !0
});
let L = class extends ce {
  constructor() {
    super(...arguments), this._time = "", this._date = "", this._nameday = null, this._holiday = null, this._significant = null;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Co), document.createElement(`${We}-editor`);
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
  setConfig(n) {
    if (!n)
      throw new Error("Invalid configuration");
    this._config = { ...n }, this._updateDateTime(), this._restartInterval();
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
    super.connectedCallback(), this._restartInterval();
  }
  disconnectedCallback() {
    this._stopInterval(), super.disconnectedCallback();
  }
  updated(n) {
    (n.has("_config") || n.has("hass")) && this._updateDateTime();
    const e = this._config?.size || "normal";
    if (this.setAttribute("data-size", e), this.hass && this._config && (n.has("_config") || n.has("hass"))) {
      const t = this.hass.selectedTheme, s = typeof t == "string" ? t : t?.theme;
      Hi(
        this,
        this.hass.themes,
        this._config.theme || s || "default"
      );
    }
  }
  render() {
    if (!this._config)
      return k;
    const n = jn(
      this.hass,
      this._config.left_temperature,
      "Venkovní",
      "mdi:home-thermometer"
    ), e = jn(
      this.hass,
      this._config.right_temperature,
      "Vnitřní",
      "mdi:thermometer"
    ), t = Do(
      this._config.left_temperature,
      this._config.right_temperature
    ), s = Te(this._config.tap_action) || Te(this._config.hold_action) || Te(this._config.double_tap_action), i = dn({
      background: this._config.background_color || void 0,
      color: this._config.text_color || void 0
    });
    return Q`
      <ha-card
        class=${s ? "has-action" : ""}
        style=${i}
        tabindex=${s ? "0" : "-1"}
        @action=${this._handleAction}
        ${Xi({
      hasHold: Te(this._config.hold_action),
      hasDoubleClick: Te(this._config.double_tap_action)
    })}
      >
        <div class="row ${t ? "" : "no-temps"}">
          ${t ? this._renderTemp(n, "left") : k}
          <div class="center">
            <span class="time">${this._time}</span>
            <span class="date">${this._date}</span>
            ${this._nameday ? Q`<span class="nameday">${this._nameday}</span>` : k}
            ${this._holiday ? Q`<span class="holiday">${this._holiday}</span>` : k}
            ${this._significant ? Q`<span class="significant">${this._significant}</span>` : k}
          </div>
          ${t ? this._renderTemp(e, "right") : k}
        </div>
      </ha-card>
    `;
  }
  _renderTemp(n, e) {
    if (!n)
      return Q`<div class="temp ${e}"></div>`;
    const t = dn({
      color: n.iconColor || void 0
    });
    return Q`
      <div class="temp ${e}">
        <div class="temp-header">
          <ha-icon .icon=${n.icon} style=${t}></ha-icon>
          <span class="temp-label">${n.label}</span>
        </div>
        <div class="temp-value">
          ${n.value}<span class="temp-unit">${n.unit}</span>
        </div>
      </div>
    `;
  }
  _handleAction(n) {
    !this._config || !this.hass || Yi(this, this.hass, this._config, n.detail.action);
  }
  _updateDateTime() {
    if (!this._config)
      return;
    const n = this._config.locale ?? this.hass?.locale?.language, e = this._config.time_zone ?? this.hass?.config?.time_zone, t = so(n, e);
    this._time = io(t, this._config.time_format), this._date = ro(t, this._config.date_format), this._nameday = this._config.show_nameday ? Eo(t, this._config.nameday_prefix ?? bt) : null, this._holiday = this._config.show_public_holiday ? So(t) : null, this._significant = this._config.show_significant_day ? bo(t) : null;
  }
  _restartInterval() {
    this._stopInterval();
    const n = ao(this._config?.time_format) ? 1e3 : 15e3;
    this._intervalId = window.setInterval(() => this._updateDateTime(), n), this._updateDateTime();
  }
  _stopInterval() {
    this._intervalId !== void 0 && (window.clearInterval(this._intervalId), this._intervalId = void 0);
  }
};
L.styles = Oo;
J([
  Rt({ attribute: !1 })
], L.prototype, "hass", 2);
J([
  ne()
], L.prototype, "_config", 2);
J([
  ne()
], L.prototype, "_time", 2);
J([
  ne()
], L.prototype, "_date", 2);
J([
  ne()
], L.prototype, "_nameday", 2);
J([
  ne()
], L.prototype, "_holiday", 2);
J([
  ne()
], L.prototype, "_significant", 2);
L = J([
  es(We)
], L);
var No = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, Gt = (n, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Io(e, t) : e, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && No(e, t, i), i;
};
let ye = class extends ce {
  constructor() {
    super(...arguments), this._computeLabel = (n) => ({
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
      right_entity: "Entita",
      right_name: "Popisek",
      right_icon: "Ikona",
      right_icon_color: "Barva ikony",
      right_precision: "Desetinná místa",
      tap_action: "Klepnutí",
      hold_action: "Podržení",
      double_tap_action: "Dvojité klepnutí"
    })[n.name ?? ""] ?? n.name ?? "";
  }
  setConfig(n) {
    this._config = { ...n };
  }
  render() {
    return !this.hass || !this._config ? k : Q`
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
    const n = this._config;
    return {
      locale: n.locale ?? "",
      time_zone: n.time_zone ?? "",
      time_format: n.time_format ?? "HH:mm",
      date_format: n.date_format ?? "cccc dd. L.",
      size: n.size ?? "normal",
      theme: n.theme ?? "",
      background_color: n.background_color ?? "",
      text_color: n.text_color ?? "",
      show_nameday: n.show_nameday ?? !1,
      nameday_prefix: n.nameday_prefix ?? bt,
      show_public_holiday: n.show_public_holiday ?? !1,
      show_significant_day: n.show_significant_day ?? !1,
      left_entity: n.left_temperature?.entity ?? "",
      left_name: n.left_temperature?.name ?? "",
      left_icon: n.left_temperature?.icon ?? "mdi:home-thermometer",
      left_icon_color: n.left_temperature?.icon_color ?? "",
      left_precision: n.left_temperature?.precision ?? 1,
      right_entity: n.right_temperature?.entity ?? "",
      right_name: n.right_temperature?.name ?? "",
      right_icon: n.right_temperature?.icon ?? "mdi:thermometer",
      right_icon_color: n.right_temperature?.icon_color ?? "",
      right_precision: n.right_temperature?.precision ?? 1,
      tap_action: n.tap_action ?? { action: "none" },
      hold_action: n.hold_action ?? { action: "none" },
      double_tap_action: n.double_tap_action ?? { action: "none" }
    };
  }
  _schema() {
    return [
      {
        name: "time_date",
        type: "expandable",
        title: "Čas a datum",
        schema: [
          {
            name: "time_format",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: !0,
                options: to.map((n) => ({
                  value: n.value,
                  label: `${n.label} (${n.value})`
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
                options: no.map((n) => ({
                  value: n.value,
                  label: `${n.label} (${n.value})`
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
          { name: "theme", selector: { theme: {} } },
          {
            type: "grid",
            name: "",
            schema: [
              { name: "background_color", selector: { text: {} } },
              { name: "text_color", selector: { text: {} } }
            ]
          }
        ]
      },
      {
        name: "calendar",
        type: "expandable",
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
        title: "Levá teplota",
        schema: [
          {
            name: "left_entity",
            selector: { entity: { domain: "sensor" } }
          },
          { name: "left_name", selector: { text: {} } },
          { name: "left_icon", selector: { icon: {} } },
          { name: "left_icon_color", selector: { text: {} } },
          {
            name: "left_precision",
            selector: { number: { min: 0, max: 3, mode: "box" } }
          }
        ]
      },
      {
        name: "right_temp",
        type: "expandable",
        title: "Pravá teplota",
        schema: [
          {
            name: "right_entity",
            selector: { entity: { domain: "sensor" } }
          },
          { name: "right_name", selector: { text: {} } },
          { name: "right_icon", selector: { icon: {} } },
          { name: "right_icon_color", selector: { text: {} } },
          {
            name: "right_precision",
            selector: { number: { min: 0, max: 3, mode: "box" } }
          }
        ]
      },
      {
        name: "actions",
        type: "expandable",
        title: "Akce",
        schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }
  _valueChanged(n) {
    if (n.stopPropagation(), !this._config || !this.hass)
      return;
    const e = n.detail.value, t = {
      ...this._config,
      type: `custom:${We}`,
      time_format: String(e.time_format || "HH:mm"),
      date_format: String(e.date_format || "cccc dd. L."),
      size: e.size || "normal",
      show_nameday: !!e.show_nameday,
      show_public_holiday: !!e.show_public_holiday,
      show_significant_day: !!e.show_significant_day,
      nameday_prefix: String(e.nameday_prefix || bt)
    }, s = String(e.locale || "").trim(), i = String(e.time_zone || "").trim(), r = String(e.theme || "").trim(), a = String(e.background_color || "").trim(), o = String(e.text_color || "").trim();
    s ? t.locale = s : delete t.locale, i ? t.time_zone = i : delete t.time_zone, r ? t.theme = r : delete t.theme, a ? t.background_color = a : delete t.background_color, o ? t.text_color = o : delete t.text_color, t.left_temperature = this._slotFromForm(e, "left"), t.right_temperature = this._slotFromForm(e, "right"), t.left_temperature || delete t.left_temperature, t.right_temperature || delete t.right_temperature, this._assignAction(t, "tap_action", e.tap_action), this._assignAction(t, "hold_action", e.hold_action), this._assignAction(t, "double_tap_action", e.double_tap_action), this._config = t, ze(this, "config-changed", { config: t });
  }
  _assignAction(n, e, t) {
    const s = t;
    if (!s || !s.action || s.action === "none") {
      delete n[e];
      return;
    }
    n[e] = s;
  }
  _slotFromForm(n, e) {
    const t = String(n[`${e}_entity`] || "").trim();
    if (!t)
      return;
    const s = { entity: t }, i = String(n[`${e}_name`] || "").trim(), r = String(n[`${e}_icon`] || "").trim(), a = String(n[`${e}_icon_color`] || "").trim(), o = Number(n[`${e}_precision`]);
    return i && (s.name = i), r && (s.icon = r), a && (s.icon_color = a), Number.isNaN(o) || (s.precision = o), s;
  }
};
ye.styles = Yn`
    .card-config {
      padding: 0 4px;
    }
  `;
Gt([
  Rt({ attribute: !1 })
], ye.prototype, "hass", 2);
Gt([
  ne()
], ye.prototype, "_config", 2);
ye = Gt([
  es(`${We}-editor`)
], ye);
const Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get EkDigitalClockEditor() {
    return ye;
  }
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=ek-digital-clock.js.map
