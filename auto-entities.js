var _Symbol$metadata, _a$1$litPropertyMetad, _a$1$reactiveElementV, _t$litHtmlVersions, _globalThis$litElemen, _globalThis$litElemen2, _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n3 = 0, F = function F() {}; return { s: F, n: function n() { return _n3 >= r.length ? { done: !0 } : { done: !1, value: r[_n3++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1 = globalThis,
  e$4 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s$1 = Symbol(),
  o$3 = new WeakMap();
var n$3 = /*#__PURE__*/function () {
  function n(t, e, o) {
    _classCallCheck(this, n);
    if (this._$cssResult$ = true, o !== s$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  return _createClass(n, [{
    key: "styleSheet",
    get: function get() {
      var t = this.o;
      var s = this.t;
      if (e$4 && void 0 === t) {
        var _e2 = void 0 !== s && 1 === s.length;
        _e2 && (t = o$3.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), _e2 && o$3.set(s, t));
      }
      return t;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.cssText;
    }
  }]);
}();
var r$5 = function r$5(t) {
    return new n$3("string" == typeof t ? t : t + "", void 0, s$1);
  },
  i$3 = function i$3(t) {
    for (var _len = arguments.length, e = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      e[_key - 1] = arguments[_key];
    }
    var o = 1 === t.length ? t[0] : e.reduce(function (e, s, o) {
      return e + function (t) {
        if (true === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      }(s) + t[o + 1];
    }, t[0]);
    return new n$3(o, t, s$1);
  },
  S$1 = function S$1(s, o) {
    if (e$4) s.adoptedStyleSheets = o.map(function (t) {
      return t instanceof CSSStyleSheet ? t : t.styleSheet;
    });else {
      var _iterator = _createForOfIteratorHelper(o),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _e3 = _step.value;
          var _o2 = document.createElement("style"),
            _n = t$1.litNonce;
          void 0 !== _n && _o2.setAttribute("nonce", _n), _o2.textContent = _e3.cssText, s.appendChild(_o2);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  },
  c$2 = e$4 ? function (t) {
    return t;
  } : function (t) {
    return t instanceof CSSStyleSheet ? function (t) {
      var e = "";
      var _iterator2 = _createForOfIteratorHelper(t.cssRules),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _s = _step2.value;
          e += _s.cssText;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return r$5(e);
    }(t) : t;
  };

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i$2 = Object.is,
  e$3 = Object.defineProperty,
  r$4 = Object.getOwnPropertyDescriptor,
  h$1 = Object.getOwnPropertyNames,
  o$2 = Object.getOwnPropertySymbols,
  n$2 = Object.getPrototypeOf,
  a$1 = globalThis,
  c$1 = a$1.trustedTypes,
  l$1 = c$1 ? c$1.emptyScript : "",
  p$1 = a$1.reactiveElementPolyfillSupport,
  d$1 = function d$1(t, s) {
    return t;
  },
  u$1 = {
    toAttribute: function toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? l$1 : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute: function fromAttribute(t, s) {
      var i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    }
  },
  f$1 = function f$1(t, s) {
    return !i$2(t, s);
  },
  y$1 = {
    attribute: true,
    type: String,
    converter: u$1,
    reflect: false,
    hasChanged: f$1
  };
(_Symbol$metadata = Symbol.metadata) !== null && _Symbol$metadata !== void 0 ? _Symbol$metadata : Symbol.metadata = Symbol("metadata"), (_a$1$litPropertyMetad = a$1.litPropertyMetadata) !== null && _a$1$litPropertyMetad !== void 0 ? _a$1$litPropertyMetad : a$1.litPropertyMetadata = new WeakMap();
var b = /*#__PURE__*/function (_HTMLElement) {
  function b() {
    var _this;
    _classCallCheck(this, b);
    _this = _callSuper(this, b), _this._$Ep = void 0, _this.isUpdatePending = false, _this.hasUpdated = false, _this._$Em = null, _this._$Ev();
    return _this;
  }
  _inherits(b, _HTMLElement);
  return _createClass(b, [{
    key: "_$Ev",
    value: function _$Ev() {
      var _this2 = this,
        _this$constructor$l;
      this._$ES = new Promise(function (t) {
        return _this2.enableUpdating = t;
      }), this._$AL = new Map(), this._$E_(), this.requestUpdate(), (_this$constructor$l = this.constructor.l) === null || _this$constructor$l === void 0 ? void 0 : _this$constructor$l.forEach(function (t) {
        return t(_this2);
      });
    }
  }, {
    key: "addController",
    value: function addController(t) {
      var _this$_$EO, _t$hostConnected;
      ((_this$_$EO = this._$EO) !== null && _this$_$EO !== void 0 ? _this$_$EO : this._$EO = new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && ((_t$hostConnected = t.hostConnected) === null || _t$hostConnected === void 0 ? void 0 : _t$hostConnected.call(t));
    }
  }, {
    key: "removeController",
    value: function removeController(t) {
      var _this$_$EO2;
      (_this$_$EO2 = this._$EO) === null || _this$_$EO2 === void 0 || _this$_$EO2["delete"](t);
    }
  }, {
    key: "_$E_",
    value: function _$E_() {
      var t = new Map(),
        s = this.constructor.elementProperties;
      var _iterator3 = _createForOfIteratorHelper(s.keys()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _i = _step3.value;
          this.hasOwnProperty(_i) && (t.set(_i, this[_i]), delete this[_i]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      t.size > 0 && (this._$Ep = t);
    }
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _this$shadowRoot;
      var t = (_this$shadowRoot = this.shadowRoot) !== null && _this$shadowRoot !== void 0 ? _this$shadowRoot : this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(t, this.constructor.elementStyles), t;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$renderRoot, _this$_$EO3;
      (_this$renderRoot = this.renderRoot) !== null && _this$renderRoot !== void 0 ? _this$renderRoot : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_this$_$EO3 = this._$EO) === null || _this$_$EO3 === void 0 ? void 0 : _this$_$EO3.forEach(function (t) {
        var _t$hostConnected2;
        return (_t$hostConnected2 = t.hostConnected) === null || _t$hostConnected2 === void 0 ? void 0 : _t$hostConnected2.call(t);
      });
    }
  }, {
    key: "enableUpdating",
    value: function enableUpdating(t) {}
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$_$EO4;
      (_this$_$EO4 = this._$EO) === null || _this$_$EO4 === void 0 || _this$_$EO4.forEach(function (t) {
        var _t$hostDisconnected;
        return (_t$hostDisconnected = t.hostDisconnected) === null || _t$hostDisconnected === void 0 ? void 0 : _t$hostDisconnected.call(t);
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
  }, {
    key: "_$EC",
    value: function _$EC(t, s) {
      var i = this.constructor.elementProperties.get(t),
        e = this.constructor._$Eu(t, i);
      if (void 0 !== e && true === i.reflect) {
        var _i$converter;
        var _r = (void 0 !== ((_i$converter = i.converter) === null || _i$converter === void 0 ? void 0 : _i$converter.toAttribute) ? i.converter : u$1).toAttribute(s, i.type);
        this._$Em = t, null == _r ? this.removeAttribute(e) : this.setAttribute(e, _r), this._$Em = null;
      }
    }
  }, {
    key: "_$AK",
    value: function _$AK(t, s) {
      var i = this.constructor,
        e = i._$Eh.get(t);
      if (void 0 !== e && this._$Em !== e) {
        var _t$converter;
        var _t = i.getPropertyOptions(e),
          _r2 = "function" == typeof _t.converter ? {
            fromAttribute: _t.converter
          } : void 0 !== ((_t$converter = _t.converter) === null || _t$converter === void 0 ? void 0 : _t$converter.fromAttribute) ? _t.converter : u$1;
        this._$Em = e, this[e] = _r2.fromAttribute(s, _t.type), this._$Em = null;
      }
    }
  }, {
    key: "requestUpdate",
    value: function requestUpdate(t, s, i) {
      if (void 0 !== t) {
        var _i$hasChanged;
        if (i !== null && i !== void 0 ? i : i = this.constructor.getPropertyOptions(t), !((_i$hasChanged = i.hasChanged) !== null && _i$hasChanged !== void 0 ? _i$hasChanged : f$1)(this[t], s)) return;
        this.P(t, s, i);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
  }, {
    key: "P",
    value: function P(t, s, i) {
      var _this$_$Ej;
      this._$AL.has(t) || this._$AL.set(t, s), true === i.reflect && this._$Em !== t && ((_this$_$Ej = this._$Ej) !== null && _this$_$Ej !== void 0 ? _this$_$Ej : this._$Ej = new Set()).add(t);
    }
  }, {
    key: "_$ET",
    value: function () {
      var _$ET2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var t;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.isUpdatePending = true;
              _context.prev = 1;
              _context.next = 4;
              return this._$ES;
            case 4:
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              Promise.reject(_context.t0);
            case 9:
              t = this.scheduleUpdate();
              _context.t1 = null != t;
              if (!_context.t1) {
                _context.next = 14;
                break;
              }
              _context.next = 14;
              return t;
            case 14:
              return _context.abrupt("return", !this.isUpdatePending);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 6]]);
      }));
      function _$ET() {
        return _$ET2.apply(this, arguments);
      }
      return _$ET;
    }()
  }, {
    key: "scheduleUpdate",
    value: function scheduleUpdate() {
      return this.performUpdate();
    }
  }, {
    key: "performUpdate",
    value: function performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        var _this$renderRoot2;
        if ((_this$renderRoot2 = this.renderRoot) !== null && _this$renderRoot2 !== void 0 ? _this$renderRoot2 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
          var _iterator4 = _createForOfIteratorHelper(this._$Ep),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _step4$value = _slicedToArray(_step4.value, 2),
                _t2 = _step4$value[0],
                _s2 = _step4$value[1];
              this[_t2] = _s2;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          this._$Ep = void 0;
        }
        var _t3 = this.constructor.elementProperties;
        if (_t3.size > 0) {
          var _iterator5 = _createForOfIteratorHelper(_t3),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = _slicedToArray(_step5.value, 2),
                _s3 = _step5$value[0],
                _i2 = _step5$value[1];
              true !== _i2.wrapped || this._$AL.has(_s3) || void 0 === this[_s3] || this.P(_s3, this[_s3], _i2);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
      var t = false;
      var s = this._$AL;
      try {
        var _this$_$EO5;
        t = this.shouldUpdate(s), t ? (this.willUpdate(s), (_this$_$EO5 = this._$EO) !== null && _this$_$EO5 !== void 0 && _this$_$EO5.forEach(function (t) {
          var _t$hostUpdate;
          return (_t$hostUpdate = t.hostUpdate) === null || _t$hostUpdate === void 0 ? void 0 : _t$hostUpdate.call(t);
        }), this.update(s)) : this._$EU();
      } catch (s) {
        throw t = false, this._$EU(), s;
      }
      t && this._$AE(s);
    }
  }, {
    key: "willUpdate",
    value: function willUpdate(t) {}
  }, {
    key: "_$AE",
    value: function _$AE(t) {
      var _this$_$EO6;
      (_this$_$EO6 = this._$EO) !== null && _this$_$EO6 !== void 0 && _this$_$EO6.forEach(function (t) {
        var _t$hostUpdated;
        return (_t$hostUpdated = t.hostUpdated) === null || _t$hostUpdated === void 0 ? void 0 : _t$hostUpdated.call(t);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
    }
  }, {
    key: "_$EU",
    value: function _$EU() {
      this._$AL = new Map(), this.isUpdatePending = false;
    }
  }, {
    key: "updateComplete",
    get: function get() {
      return this.getUpdateComplete();
    }
  }, {
    key: "getUpdateComplete",
    value: function getUpdateComplete() {
      return this._$ES;
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(t) {
      return true;
    }
  }, {
    key: "update",
    value: function update(t) {
      var _this3 = this;
      this._$Ej && (this._$Ej = this._$Ej.forEach(function (t) {
        return _this3._$EC(t, _this3[t]);
      })), this._$EU();
    }
  }, {
    key: "updated",
    value: function updated(t) {}
  }, {
    key: "firstUpdated",
    value: function firstUpdated(t) {}
  }], [{
    key: "addInitializer",
    value: function addInitializer(t) {
      var _this$l;
      this._$Ei(), ((_this$l = this.l) !== null && _this$l !== void 0 ? _this$l : this.l = []).push(t);
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return this.finalize(), this._$Eh && _toConsumableArray(this._$Eh.keys());
    }
  }, {
    key: "createProperty",
    value: function createProperty(t) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : y$1;
      if (s.state && (s.attribute = false), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
        var _i3 = Symbol(),
          _r3 = this.getPropertyDescriptor(t, _i3, s);
        void 0 !== _r3 && e$3(this.prototype, t, _r3);
      }
    }
  }, {
    key: "getPropertyDescriptor",
    value: function getPropertyDescriptor(t, s, i) {
      var _r$;
      var _ref = (_r$ = r$4(this.prototype, t)) !== null && _r$ !== void 0 ? _r$ : {
          get: function get() {
            return this[s];
          },
          set: function set(t) {
            this[s] = t;
          }
        },
        e = _ref.get,
        h = _ref.set;
      return {
        get: function get() {
          return e === null || e === void 0 ? void 0 : e.call(this);
        },
        set: function set(s) {
          var r = e === null || e === void 0 ? void 0 : e.call(this);
          h.call(this, s), this.requestUpdate(t, r, i);
        },
        configurable: true,
        enumerable: true
      };
    }
  }, {
    key: "getPropertyOptions",
    value: function getPropertyOptions(t) {
      var _this$elementProperti;
      return (_this$elementProperti = this.elementProperties.get(t)) !== null && _this$elementProperti !== void 0 ? _this$elementProperti : y$1;
    }
  }, {
    key: "_$Ei",
    value: function _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties"))) return;
      var t = n$2(this);
      t.finalize(), void 0 !== t.l && (this.l = _toConsumableArray(t.l)), this.elementProperties = new Map(t.elementProperties);
    }
  }, {
    key: "finalize",
    value: function finalize() {
      if (this.hasOwnProperty(d$1("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        var _t4 = this.properties,
          _s4 = [].concat(_toConsumableArray(h$1(_t4)), _toConsumableArray(o$2(_t4)));
        var _iterator6 = _createForOfIteratorHelper(_s4),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _i4 = _step6.value;
            this.createProperty(_i4, _t4[_i4]);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
      var t = this[Symbol.metadata];
      if (null !== t) {
        var _s5 = litPropertyMetadata.get(t);
        if (void 0 !== _s5) {
          var _iterator7 = _createForOfIteratorHelper(_s5),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _step7$value = _slicedToArray(_step7.value, 2),
                _t5 = _step7$value[0],
                _i5 = _step7$value[1];
              this.elementProperties.set(_t5, _i5);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      }
      this._$Eh = new Map();
      var _iterator8 = _createForOfIteratorHelper(this.elementProperties),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = _slicedToArray(_step8.value, 2),
            _t6 = _step8$value[0],
            _s6 = _step8$value[1];
          var _i6 = this._$Eu(_t6, _s6);
          void 0 !== _i6 && this._$Eh.set(_i6, _t6);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
  }, {
    key: "finalizeStyles",
    value: function finalizeStyles(s) {
      var i = [];
      if (Array.isArray(s)) {
        var _e4 = new Set(s.flat(1 / 0).reverse());
        var _iterator9 = _createForOfIteratorHelper(_e4),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _s7 = _step9.value;
            i.unshift(c$2(_s7));
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      } else void 0 !== s && i.push(c$2(s));
      return i;
    }
  }, {
    key: "_$Eu",
    value: function _$Eu(t, s) {
      var i = s.attribute;
      return false === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
b.elementStyles = [], b.shadowRootOptions = {
  mode: "open"
}, b[d$1("elementProperties")] = new Map(), b[d$1("finalized")] = new Map(), p$1 !== null && p$1 !== void 0 && p$1({
  ReactiveElement: b
}), ((_a$1$reactiveElementV = a$1.reactiveElementVersions) !== null && _a$1$reactiveElementV !== void 0 ? _a$1$reactiveElementV : a$1.reactiveElementVersions = []).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t = globalThis,
  i$1 = t.trustedTypes,
  s = i$1 ? i$1.createPolicy("lit-html", {
    createHTML: function createHTML(t) {
      return t;
    }
  }) : void 0,
  e$2 = "$lit$",
  h = "lit$".concat(Math.random().toFixed(9).slice(2), "$"),
  o$1 = "?" + h,
  n$1 = "<".concat(o$1, ">"),
  r$3 = document,
  l = function l() {
    return r$3.createComment("");
  },
  c = function c(t) {
    return null === t || "object" != _typeof(t) && "function" != typeof t;
  },
  a = Array.isArray,
  u = function u(t) {
    return a(t) || "function" == typeof (t === null || t === void 0 ? void 0 : t[Symbol.iterator]);
  },
  d = "[ \t\n\f\r]",
  f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v = /-->/g,
  _ = />/g,
  m = RegExp(">|".concat(d, "(?:([^\\s\"'>=/]+)(").concat(d, "*=").concat(d, "*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)"), "g"),
  p = /'/g,
  g = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  y = function y(t) {
    return function (i) {
      for (var _len2 = arguments.length, s = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        s[_key2 - 1] = arguments[_key2];
      }
      return {
        _$litType$: t,
        strings: i,
        values: s
      };
    };
  },
  x = y(1),
  T = Symbol["for"]("lit-noChange"),
  E = Symbol["for"]("lit-nothing"),
  A = new WeakMap(),
  C = r$3.createTreeWalker(r$3, 129);
function P(t, i) {
  if (!a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s ? s.createHTML(i) : i;
}
var V = function V(t, i) {
  var s = t.length - 1,
    o = [];
  var r,
    l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "",
    c = f;
  for (var _i7 = 0; _i7 < s; _i7++) {
    var _s8 = t[_i7];
    var _a2 = void 0,
      _u = void 0,
      _d2 = -1,
      _y = 0;
    for (; _y < _s8.length && (c.lastIndex = _y, _u = c.exec(_s8), null !== _u);) _y = c.lastIndex, c === f ? "!--" === _u[1] ? c = v : void 0 !== _u[1] ? c = _ : void 0 !== _u[2] ? ($.test(_u[2]) && (r = RegExp("</" + _u[2], "g")), c = m) : void 0 !== _u[3] && (c = m) : c === m ? ">" === _u[0] ? (c = r !== null && r !== void 0 ? r : f, _d2 = -1) : void 0 === _u[1] ? _d2 = -2 : (_d2 = c.lastIndex - _u[2].length, _a2 = _u[1], c = void 0 === _u[3] ? m : '"' === _u[3] ? g : p) : c === g || c === p ? c = m : c === v || c === _ ? c = f : (c = m, r = void 0);
    var _x2 = c === m && t[_i7 + 1].startsWith("/>") ? " " : "";
    l += c === f ? _s8 + n$1 : _d2 >= 0 ? (o.push(_a2), _s8.slice(0, _d2) + e$2 + _s8.slice(_d2) + h + _x2) : _s8 + h + (-2 === _d2 ? _i7 : _x2);
  }
  return [P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")), o];
};
var N = /*#__PURE__*/function () {
  function N(_ref2, n) {
    var t = _ref2.strings,
      s = _ref2._$litType$;
    _classCallCheck(this, N);
    var r;
    this.parts = [];
    var c = 0,
      a = 0;
    var u = t.length - 1,
      d = this.parts,
      _V = V(t, s),
      _V2 = _slicedToArray(_V, 2),
      f = _V2[0],
      v = _V2[1];
    if (this.el = N.createElement(f, n), C.currentNode = this.el.content, 2 === s || 3 === s) {
      var _t7 = this.el.content.firstChild;
      _t7.replaceWith.apply(_t7, _toConsumableArray(_t7.childNodes));
    }
    for (; null !== (r = C.nextNode()) && d.length < u;) {
      if (1 === r.nodeType) {
        if (r.hasAttributes()) {
          var _iterator10 = _createForOfIteratorHelper(r.getAttributeNames()),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var _t8 = _step10.value;
              if (_t8.endsWith(e$2)) {
                var _i8 = v[a++],
                  _s9 = r.getAttribute(_t8).split(h),
                  _e5 = /([.?@])?(.*)/.exec(_i8);
                d.push({
                  type: 1,
                  index: c,
                  name: _e5[2],
                  strings: _s9,
                  ctor: "." === _e5[1] ? H : "?" === _e5[1] ? I : "@" === _e5[1] ? L : k
                }), r.removeAttribute(_t8);
              } else _t8.startsWith(h) && (d.push({
                type: 6,
                index: c
              }), r.removeAttribute(_t8));
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
        if ($.test(r.tagName)) {
          var _t9 = r.textContent.split(h),
            _s10 = _t9.length - 1;
          if (_s10 > 0) {
            r.textContent = i$1 ? i$1.emptyScript : "";
            for (var _i9 = 0; _i9 < _s10; _i9++) r.append(_t9[_i9], l()), C.nextNode(), d.push({
              type: 2,
              index: ++c
            });
            r.append(_t9[_s10], l());
          }
        }
      } else if (8 === r.nodeType) if (r.data === o$1) d.push({
        type: 2,
        index: c
      });else {
        var _t10 = -1;
        for (; -1 !== (_t10 = r.data.indexOf(h, _t10 + 1));) d.push({
          type: 7,
          index: c
        }), _t10 += h.length - 1;
      }
      c++;
    }
  }
  return _createClass(N, null, [{
    key: "createElement",
    value: function createElement(t, i) {
      var s = r$3.createElement("template");
      return s.innerHTML = t, s;
    }
  }]);
}();
function S(t, i) {
  var _s$_$Co, _h2, _h3, _h3$_$AO, _s$_$Co2;
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
  var e = arguments.length > 3 ? arguments[3] : undefined;
  if (i === T) return i;
  var h = void 0 !== e ? (_s$_$Co = s._$Co) === null || _s$_$Co === void 0 ? void 0 : _s$_$Co[e] : s._$Cl;
  var o = c(i) ? void 0 : i._$litDirective$;
  return ((_h2 = h) === null || _h2 === void 0 ? void 0 : _h2.constructor) !== o && ((_h3 = h) !== null && _h3 !== void 0 && (_h3$_$AO = _h3._$AO) !== null && _h3$_$AO !== void 0 && _h3$_$AO.call(_h3, false), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? ((_s$_$Co2 = s._$Co) !== null && _s$_$Co2 !== void 0 ? _s$_$Co2 : s._$Co = [])[e] = h : s._$Cl = h), void 0 !== h && (i = S(t, h._$AS(t, i.values), h, e)), i;
}
var M = /*#__PURE__*/function () {
  function M(t, i) {
    _classCallCheck(this, M);
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  return _createClass(M, [{
    key: "parentNode",
    get: function get() {
      return this._$AM.parentNode;
    }
  }, {
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "u",
    value: function u(t) {
      var _t$creationScope;
      var _this$_$AD = this._$AD,
        i = _this$_$AD.el.content,
        s = _this$_$AD.parts,
        e = ((_t$creationScope = t === null || t === void 0 ? void 0 : t.creationScope) !== null && _t$creationScope !== void 0 ? _t$creationScope : r$3).importNode(i, true);
      C.currentNode = e;
      var h = C.nextNode(),
        o = 0,
        n = 0,
        l = s[0];
      for (; void 0 !== l;) {
        var _l2;
        if (o === l.index) {
          var _i10 = void 0;
          2 === l.type ? _i10 = new R(h, h.nextSibling, this, t) : 1 === l.type ? _i10 = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (_i10 = new z(h, this, t)), this._$AV.push(_i10), l = s[++n];
        }
        o !== ((_l2 = l) === null || _l2 === void 0 ? void 0 : _l2.index) && (h = C.nextNode(), o++);
      }
      return C.currentNode = r$3, e;
    }
  }, {
    key: "p",
    value: function p(t) {
      var i = 0;
      var _iterator11 = _createForOfIteratorHelper(this._$AV),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _s11 = _step11.value;
          void 0 !== _s11 && (void 0 !== _s11.strings ? (_s11._$AI(t, _s11, i), i += _s11.strings.length - 2) : _s11._$AI(t[i])), i++;
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }]);
}();
var R = /*#__PURE__*/function () {
  function R(t, i, s, e) {
    var _e$isConnected;
    _classCallCheck(this, R);
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = (_e$isConnected = e === null || e === void 0 ? void 0 : e.isConnected) !== null && _e$isConnected !== void 0 ? _e$isConnected : true;
  }
  return _createClass(R, [{
    key: "_$AU",
    get: function get() {
      var _this$_$AM$_$AU, _this$_$AM;
      return (_this$_$AM$_$AU = (_this$_$AM = this._$AM) === null || _this$_$AM === void 0 ? void 0 : _this$_$AM._$AU) !== null && _this$_$AM$_$AU !== void 0 ? _this$_$AM$_$AU : this._$Cv;
    }
  }, {
    key: "parentNode",
    get: function get() {
      var _t11;
      var t = this._$AA.parentNode;
      var i = this._$AM;
      return void 0 !== i && 11 === ((_t11 = t) === null || _t11 === void 0 ? void 0 : _t11.nodeType) && (t = i.parentNode), t;
    }
  }, {
    key: "startNode",
    get: function get() {
      return this._$AA;
    }
  }, {
    key: "endNode",
    get: function get() {
      return this._$AB;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      t = S(this, t, i), c(t) ? t === E || null == t || "" === t ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : u(t) ? this.k(t) : this._(t);
    }
  }, {
    key: "O",
    value: function O(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
  }, {
    key: "T",
    value: function T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
  }, {
    key: "_",
    value: function _(t) {
      this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r$3.createTextNode(t)), this._$AH = t;
    }
  }, {
    key: "$",
    value: function $(t) {
      var _this$_$AH;
      var i = t.values,
        s = t._$litType$,
        e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
      if (((_this$_$AH = this._$AH) === null || _this$_$AH === void 0 ? void 0 : _this$_$AH._$AD) === e) this._$AH.p(i);else {
        var _t12 = new M(e, this),
          _s12 = _t12.u(this.options);
        _t12.p(i), this.T(_s12), this._$AH = _t12;
      }
    }
  }, {
    key: "_$AC",
    value: function _$AC(t) {
      var i = A.get(t.strings);
      return void 0 === i && A.set(t.strings, i = new N(t)), i;
    }
  }, {
    key: "k",
    value: function k(t) {
      a(this._$AH) || (this._$AH = [], this._$AR());
      var i = this._$AH;
      var s,
        e = 0;
      var _iterator12 = _createForOfIteratorHelper(t),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _h4 = _step12.value;
          e === i.length ? i.push(s = new R(this.O(l()), this.O(l()), this, this.options)) : s = i[e], s._$AI(_h4), e++;
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
  }, {
    key: "_$AR",
    value: function _$AR() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
      var i = arguments.length > 1 ? arguments[1] : undefined;
      for ((_this$_$AP = this._$AP) === null || _this$_$AP === void 0 ? void 0 : _this$_$AP.call(this, false, true, i); t && t !== this._$AB;) {
        var _this$_$AP;
        var _i11 = t.nextSibling;
        t.remove(), t = _i11;
      }
    }
  }, {
    key: "setConnected",
    value: function setConnected(t) {
      var _this$_$AP2;
      void 0 === this._$AM && (this._$Cv = t, (_this$_$AP2 = this._$AP) === null || _this$_$AP2 === void 0 ? void 0 : _this$_$AP2.call(this, t));
    }
  }]);
}();
var k = /*#__PURE__*/function () {
  function k(t, i, s, e, h) {
    _classCallCheck(this, k);
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
  }
  return _createClass(k, [{
    key: "tagName",
    get: function get() {
      return this.element.tagName;
    }
  }, {
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var s = arguments.length > 2 ? arguments[2] : undefined;
      var e = arguments.length > 3 ? arguments[3] : undefined;
      var h = this.strings;
      var o = false;
      if (void 0 === h) t = S(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== T, o && (this._$AH = t);else {
        var _e6 = t;
        var _n2, _r4;
        for (t = h[0], _n2 = 0; _n2 < h.length - 1; _n2++) _r4 = S(this, _e6[s + _n2], i, _n2), _r4 === T && (_r4 = this._$AH[_n2]), o || (o = !c(_r4) || _r4 !== this._$AH[_n2]), _r4 === E ? t = E : t !== E && (t += (_r4 !== null && _r4 !== void 0 ? _r4 : "") + h[_n2 + 1]), this._$AH[_n2] = _r4;
      }
      o && !e && this.j(t);
    }
  }, {
    key: "j",
    value: function j(t) {
      t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t !== null && t !== void 0 ? t : "");
    }
  }]);
}();
var H = /*#__PURE__*/function (_k2) {
  function H() {
    var _this4;
    _classCallCheck(this, H);
    _this4 = _callSuper(this, H, arguments), _this4.type = 3;
    return _this4;
  }
  _inherits(H, _k2);
  return _createClass(H, [{
    key: "j",
    value: function j(t) {
      this.element[this.name] = t === E ? void 0 : t;
    }
  }]);
}(k);
var I = /*#__PURE__*/function (_k3) {
  function I() {
    var _this5;
    _classCallCheck(this, I);
    _this5 = _callSuper(this, I, arguments), _this5.type = 4;
    return _this5;
  }
  _inherits(I, _k3);
  return _createClass(I, [{
    key: "j",
    value: function j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== E);
    }
  }]);
}(k);
var L = /*#__PURE__*/function (_k4) {
  function L(t, i, s, e, h) {
    var _this6;
    _classCallCheck(this, L);
    _this6 = _callSuper(this, L, [t, i, s, e, h]), _this6.type = 5;
    return _this6;
  }
  _inherits(L, _k4);
  return _createClass(L, [{
    key: "_$AI",
    value: function _$AI(t) {
      var _S;
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      if ((t = (_S = S(this, t, i, 0)) !== null && _S !== void 0 ? _S : E) === T) return;
      var s = this._$AH,
        e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
        h = t !== E && (s === E || e);
      e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(t) {
      var _this$options$host, _this$options;
      "function" == typeof this._$AH ? this._$AH.call((_this$options$host = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.host) !== null && _this$options$host !== void 0 ? _this$options$host : this.element, t) : this._$AH.handleEvent(t);
    }
  }]);
}(k);
var z = /*#__PURE__*/function () {
  function z(t, i, s) {
    _classCallCheck(this, z);
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  return _createClass(z, [{
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      S(this, t);
    }
  }]);
}();
var j = t.litHtmlPolyfillSupport;
j !== null && j !== void 0 && j(N, R), ((_t$litHtmlVersions = t.litHtmlVersions) !== null && _t$litHtmlVersions !== void 0 ? _t$litHtmlVersions : t.litHtmlVersions = []).push("3.2.1");
var B = function B(t, i, s) {
  var _s$renderBefore;
  var e = (_s$renderBefore = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore !== void 0 ? _s$renderBefore : i;
  var h = e._$litPart$;
  if (void 0 === h) {
    var _s$renderBefore2;
    var _t13 = (_s$renderBefore2 = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore2 !== void 0 ? _s$renderBefore2 : null;
    e._$litPart$ = h = new R(i.insertBefore(l(), _t13), _t13, void 0, s !== null && s !== void 0 ? s : {});
  }
  return h._$AI(t), h;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var r$2 = /*#__PURE__*/function (_b2) {
  function r() {
    var _this7;
    _classCallCheck(this, r);
    _this7 = _callSuper(this, r, arguments), _this7.renderOptions = {
      host: _assertThisInitialized(_this7)
    }, _this7._$Do = void 0;
    return _this7;
  }
  _inherits(r, _b2);
  return _createClass(r, [{
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _this$renderOptions, _this$renderOptions$r;
      var t = _superPropGet(r, "createRenderRoot", this, 3)([]);
      return (_this$renderOptions$r = (_this$renderOptions = this.renderOptions).renderBefore) !== null && _this$renderOptions$r !== void 0 ? _this$renderOptions$r : _this$renderOptions.renderBefore = t.firstChild, t;
    }
  }, {
    key: "update",
    value: function update(t) {
      var s = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), _superPropGet(r, "update", this, 3)([t]), this._$Do = B(s, this.renderRoot, this.renderOptions);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$_$Do;
      _superPropGet(r, "connectedCallback", this, 3)([]), (_this$_$Do = this._$Do) === null || _this$_$Do === void 0 ? void 0 : _this$_$Do.setConnected(true);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$_$Do2;
      _superPropGet(r, "disconnectedCallback", this, 3)([]), (_this$_$Do2 = this._$Do) === null || _this$_$Do2 === void 0 ? void 0 : _this$_$Do2.setConnected(false);
    }
  }, {
    key: "render",
    value: function render() {
      return T;
    }
  }]);
}(b);
r$2._$litElement$ = true, r$2["finalized"] = true, (_globalThis$litElemen = globalThis.litElementHydrateSupport) === null || _globalThis$litElemen === void 0 ? void 0 : _globalThis$litElemen.call(globalThis, {
  LitElement: r$2
});
var i = globalThis.litElementPolyfillSupport;
i === null || i === void 0 || i({
  LitElement: r$2
});
((_globalThis$litElemen2 = globalThis.litElementVersions) !== null && _globalThis$litElemen2 !== void 0 ? _globalThis$litElemen2 : globalThis.litElementVersions = []).push("4.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var o = {
    attribute: true,
    type: String,
    converter: u$1,
    reflect: false,
    hasChanged: f$1
  },
  r$1 = function r$1() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : o;
    var e = arguments.length > 1 ? arguments[1] : undefined;
    var r = arguments.length > 2 ? arguments[2] : undefined;
    var n = r.kind,
      i = r.metadata;
    var s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map()), s.set(r.name, t), "accessor" === n) {
      var _o3 = r.name;
      return {
        set: function set(r) {
          var n = e.get.call(this);
          e.set.call(this, r), this.requestUpdate(_o3, n, t);
        },
        init: function init(e) {
          return void 0 !== e && this.P(_o3, void 0, t), e;
        }
      };
    }
    if ("setter" === n) {
      var _o4 = r.name;
      return function (r) {
        var n = this[_o4];
        e.call(this, r), this.requestUpdate(_o4, n, t);
      };
    }
    throw Error("Unsupported decorator location: " + n);
  };
function n(t) {
  return function (e, o) {
    return "object" == _typeof(o) ? r$1(t, e, o) : function (t, e, o) {
      var r = e.hasOwnProperty(o);
      return e.constructor.createProperty(o, r ? _objectSpread(_objectSpread({}, t), {}, {
        wrapped: true
      }) : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
    }(t, e, o);
  };
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r) {
  return n(_objectSpread(_objectSpread({}, r), {}, {
    state: true,
    attribute: false
  }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var e$1 = function e$1(e, t, c) {
  return c.configurable = true, c.enumerable = true, Reflect.decorate && "object" != _typeof(t) && Object.defineProperty(e, t, c), c;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e, r) {
  return function (n, s, i) {
    var o = function o(t) {
      var _t$renderRoot$querySe, _t$renderRoot;
      return (_t$renderRoot$querySe = (_t$renderRoot = t.renderRoot) === null || _t$renderRoot === void 0 ? void 0 : _t$renderRoot.querySelector(e)) !== null && _t$renderRoot$querySe !== void 0 ? _t$renderRoot$querySe : null;
    };
    return e$1(n, s, {
      get: function get() {
        return o(this);
      }
    });
  };
}
function hass_base_el() {
  return _hass_base_el.apply(this, arguments);
}
function _hass_base_el() {
  _hass_base_el = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42() {
    var element;
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return Promise.race([customElements.whenDefined("home-assistant"), customElements.whenDefined("hc-main")]);
        case 2:
          element = customElements.get("home-assistant") ? "home-assistant" : "hc-main";
        case 3:
          if (document.querySelector(element)) {
            _context42.next = 8;
            break;
          }
          _context42.next = 6;
          return new Promise(function (r) {
            return window.setTimeout(r, 100);
          });
        case 6:
          _context42.next = 3;
          break;
        case 8:
          return _context42.abrupt("return", document.querySelector(element));
        case 9:
        case "end":
          return _context42.stop();
      }
    }, _callee42);
  }));
  return _hass_base_el.apply(this, arguments);
}
function hass() {
  return _hass.apply(this, arguments);
}
function _hass() {
  _hass = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43() {
    var base;
    return _regeneratorRuntime().wrap(function _callee43$(_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return hass_base_el();
        case 2:
          base = _context43.sent;
        case 3:
          if (base.hass) {
            _context43.next = 8;
            break;
          }
          _context43.next = 6;
          return new Promise(function (r) {
            return window.setTimeout(r, 100);
          });
        case 6:
          _context43.next = 3;
          break;
        case 8:
          return _context43.abrupt("return", base.hass);
        case 9:
        case "end":
          return _context43.stop();
      }
    }, _callee43);
  }));
  return _hass.apply(this, arguments);
}
var ID_STORAGE_KEY = "browser_mod-browser-id";
function BrowserID() {
  if (document.querySelector("hc-main")) return "CAST";
  if (localStorage[ID_STORAGE_KEY]) return localStorage[ID_STORAGE_KEY];
  return "";
}
window.cardMod_template_cache = window.cardMod_template_cache || {};
var cachedTemplates = window.cardMod_template_cache;
function template_updated(key, result) {
  var cache = cachedTemplates[key];
  if (!cache) {
    return;
  }
  cache.value = result.result;
  cache.callbacks.forEach(function (f) {
    return f(result.result);
  });
}
function hasTemplate(str) {
  if (!str) return false;
  return String(str).includes("{%") || String(str).includes("{{");
}
function bind_template(_x3, _x4, _x5) {
  return _bind_template.apply(this, arguments);
}
function _bind_template() {
  _bind_template = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44(callback, template, variables) {
    var hs, connection, cacheKey, cache;
    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          _context44.next = 2;
          return hass();
        case 2:
          hs = _context44.sent;
          connection = hs.connection;
          cacheKey = JSON.stringify([template, variables]);
          cache = cachedTemplates[cacheKey];
          if (!cache) {
            unbind_template(callback);
            callback("");
            variables = Object.assign({
              user: hs.user.name,
              browser: BrowserID(),
              hash: location.hash.substr(1) || ""
            }, variables);
            cachedTemplates[cacheKey] = cache = {
              template: template,
              variables: variables,
              value: "",
              callbacks: new Set([callback]),
              unsubscribe: connection.subscribeMessage(function (result) {
                return template_updated(cacheKey, result);
              }, {
                type: "render_template",
                template: template,
                variables: variables
              })
            };
          } else {
            if (!cache.callbacks.has(callback)) unbind_template(callback);
            callback(cache.value);
            cache.callbacks.add(callback);
          }
        case 7:
        case "end":
          return _context44.stop();
      }
    }, _callee44);
  }));
  return _bind_template.apply(this, arguments);
}
function unbind_template(_x6) {
  return _unbind_template.apply(this, arguments);
}
function _unbind_template() {
  _unbind_template = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45(callback) {
    var unsubscriber, _i13, _Object$entries, _Object$entries$_i, key, _cache;
    return _regeneratorRuntime().wrap(function _callee45$(_context45) {
      while (1) switch (_context45.prev = _context45.next) {
        case 0:
          _i13 = 0, _Object$entries = Object.entries(cachedTemplates);
        case 1:
          if (!(_i13 < _Object$entries.length)) {
            _context45.next = 10;
            break;
          }
          _Object$entries$_i = _slicedToArray(_Object$entries[_i13], 2), key = _Object$entries$_i[0], _cache = _Object$entries$_i[1];
          if (!_cache.callbacks.has(callback)) {
            _context45.next = 7;
            break;
          }
          _cache.callbacks["delete"](callback);
          if (_cache.callbacks.size == 0) {
            unsubscriber = _cache.unsubscribe;
            delete cachedTemplates[key];
          }
          return _context45.abrupt("break", 10);
        case 7:
          _i13++;
          _context45.next = 1;
          break;
        case 10:
          if (!unsubscriber) {
            _context45.next = 16;
            break;
          }
          _context45.next = 13;
          return unsubscriber;
        case 13:
          _context45.t0 = _context45.sent;
          _context45.next = 16;
          return (0, _context45.t0)();
        case 16:
        case "end":
          return _context45.stop();
      }
    }, _callee45);
  }));
  return _unbind_template.apply(this, arguments);
}
var _a;
var loadHaForm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _a, _b, helpers, card;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!customElements.get("ha-form")) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          _context2.next = 4;
          return (_b = (_a = window).loadCardHelpers) === null || _b === void 0 ? void 0 : _b.call(_a);
        case 4:
          helpers = _context2.sent;
          if (helpers) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return");
        case 7:
          _context2.next = 9;
          return helpers.createCardElement({
            type: "entity"
          });
        case 9:
          card = _context2.sent;
          if (card) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return");
        case 12:
          _context2.next = 14;
          return card.getConfigElement();
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loadHaForm() {
    return _ref3.apply(this, arguments);
  };
}();
var _compare_deep = function compare_deep(a, b) {
  if (a === b) return true;
  if (_typeof(a) !== _typeof(b)) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (var _x7 in a) {
    if (!a.hasOwnProperty(_x7)) continue;
    if (!b.hasOwnProperty(_x7)) return false;
    if (a[_x7] === b[_x7]) continue;
    if (_typeof(a[_x7]) !== "object") return false;
    if (!_compare_deep(a[_x7], b[_x7])) return false;
  }
  for (var _x8 in b) {
    if (!b.hasOwnProperty(_x8)) continue;
    if (!a.hasOwnProperty(_x8)) return false;
  }
  return true;
};
window.autoEntities_cache = (_a = window.autoEntities_cache) !== null && _a !== void 0 ? _a : {};
var cache = window.autoEntities_cache;
function getAreas(_x9) {
  return _getAreas.apply(this, arguments);
}
function _getAreas() {
  _getAreas = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46(hass) {
    var _a;
    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
      while (1) switch (_context46.prev = _context46.next) {
        case 0:
          cache.areas = (_a = cache.areas) !== null && _a !== void 0 ? _a : hass.callWS({
            type: "config/area_registry/list"
          });
          return _context46.abrupt("return", cache.areas);
        case 2:
        case "end":
          return _context46.stop();
      }
    }, _callee46);
  }));
  return _getAreas.apply(this, arguments);
}
function getDevices(_x10) {
  return _getDevices.apply(this, arguments);
}
function _getDevices() {
  _getDevices = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47(hass) {
    var _a;
    return _regeneratorRuntime().wrap(function _callee47$(_context47) {
      while (1) switch (_context47.prev = _context47.next) {
        case 0:
          cache.devices = (_a = cache.devices) !== null && _a !== void 0 ? _a : hass.callWS({
            type: "config/device_registry/list"
          });
          return _context47.abrupt("return", cache.devices);
        case 2:
        case "end":
          return _context47.stop();
      }
    }, _callee47);
  }));
  return _getDevices.apply(this, arguments);
}
function getEntities(_x11) {
  return _getEntities.apply(this, arguments);
}
function _getEntities() {
  _getEntities = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(hass) {
    var _a;
    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
      while (1) switch (_context48.prev = _context48.next) {
        case 0:
          cache.entities = (_a = cache.entities) !== null && _a !== void 0 ? _a : hass.callWS({
            type: "config/entity_registry/list"
          });
          return _context48.abrupt("return", cache.entities);
        case 2:
        case "end":
          return _context48.stop();
      }
    }, _callee48);
  }));
  return _getEntities.apply(this, arguments);
}
function getLabels(_x12) {
  return _getLabels.apply(this, arguments);
} // Debugging helper
// (window as any).AutoEntities = {
//   getAreas,
//   getDevices,
//   getEntities,
// };
function _getLabels() {
  _getLabels = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(hass) {
    var _a;
    return _regeneratorRuntime().wrap(function _callee49$(_context49) {
      while (1) switch (_context49.prev = _context49.next) {
        case 0:
          cache.labels = (_a = cache.labels) !== null && _a !== void 0 ? _a : hass.callWS({
            type: "config/label_registry/list"
          });
          return _context49.abrupt("return", cache.labels);
        case 2:
        case "end":
          return _context49.stop();
      }
    }, _callee49);
  }));
  return _getLabels.apply(this, arguments);
}
var ago_suffix_regex$1 = /([mhd])\s+ago\s*$/i;
function matcher(_x13) {
  return _matcher.apply(this, arguments);
}
function _matcher() {
  _matcher = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(pattern) {
    var matchers, transforms, regex, time_match, now, parameter, _parameter, _parameter2, _parameter3, _parameter4, _parameter5, _parameter6, _parameter7;
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          matchers = [];
          transforms = [];
          if (typeof pattern === "string") {
            if (pattern.startsWith("$$")) {
              pattern = pattern.substring(2);
              transforms.push(JSON.stringify);
            }
            // Regular expression match
            if (pattern.startsWith("/") && pattern.endsWith("/") || pattern.indexOf("*") !== -1) {
              // Convert globs to regex
              if (!pattern.startsWith("/")) {
                pattern = pattern.replace(/\./g, ".").replace(/\*/g, ".*");
                pattern = "/^".concat(pattern, "$/");
              }
              regex = new RegExp(pattern.slice(1, -1));
              matchers.push(function (value) {
                return typeof value === "string" ? regex.test(value) : false;
              });
            }
            // Convert timestamps if pattern ends with "X ago"
            time_match = ago_suffix_regex$1.exec(pattern);
            if (time_match) {
              pattern = pattern.replace(time_match[0], "");
              now = new Date().getTime();
              transforms.push(function (value) {
                var updated = new Date(value).getTime();
                var diff = (now - updated) / 60000; // minutes
                var period = time_match[1];
                if (period === "h") {
                  return diff / 60;
                } else if (period === "d") {
                  return diff / 60 / 24;
                }
                return diff;
              });
            }
            if (pattern.startsWith("<=")) {
              parameter = parseFloat(pattern.substring(2));
              matchers.push(function (value) {
                return parseFloat(value) <= parameter;
              });
            }
            if (pattern.startsWith(">=")) {
              _parameter = parseFloat(pattern.substring(2));
              matchers.push(function (value) {
                return parseFloat(value) >= _parameter;
              });
            }
            if (pattern.startsWith("==")) {
              _parameter2 = parseFloat(pattern.substring(2));
              matchers.push(function (value) {
                return parseFloat(value) == _parameter2;
              });
            }
            if (pattern.startsWith("!=")) {
              _parameter3 = parseFloat(pattern.substring(2));
              matchers.push(function (value) {
                return parseFloat(value) != _parameter3;
              });
            }
            if (pattern.startsWith("<")) {
              _parameter4 = parseFloat(pattern.substring(1));
              matchers.push(function (value) {
                return parseFloat(value) < _parameter4;
              });
            }
            if (pattern.startsWith(">")) {
              _parameter5 = parseFloat(pattern.substring(1));
              matchers.push(function (value) {
                return parseFloat(value) > _parameter5;
              });
            }
            if (pattern.startsWith("!")) {
              _parameter6 = parseFloat(pattern.substring(1));
              matchers.push(function (value) {
                return parseFloat(value) != _parameter6;
              });
            }
            if (pattern.startsWith("=")) {
              _parameter7 = parseFloat(pattern.substring(1));
              matchers.push(function (value) {
                return parseFloat(value) == _parameter7;
              });
            }
            matchers.push(function (value) {
              return value === pattern;
            });
          } else {
            matchers.push(function (value) {
              return value === pattern;
            });
          }
          return _context50.abrupt("return", function (value) {
            var transformed = transforms.reduce(function (a, x) {
              return x(a);
            }, value);
            if (transformed === undefined) return false;
            if (transformed === null) return false;
            return matchers.some(function (x) {
              return x(transformed);
            });
          });
        case 4:
        case "end":
          return _context50.stop();
      }
    }, _callee50);
  }));
  return _matcher.apply(this, arguments);
}
var ago_suffix_regex = /([mhd])\s+ago\s*$/i;
var default_ago_suffix = "m ago";
var RULES = {
  options: function () {
    var _options = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(hass, value) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", function (entity) {
              return true;
            });
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function options(_x14, _x15) {
      return _options.apply(this, arguments);
    }
    return options;
  }(),
  sort: function () {
    var _sort = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(hass, value) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", function (entity) {
              return true;
            });
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function sort(_x16, _x17) {
      return _sort.apply(this, arguments);
    }
    return sort;
  }(),
  domain: function () {
    var _domain = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return matcher(value);
          case 2:
            match = _context5.sent;
            return _context5.abrupt("return", function (entity) {
              return match(entity.entity_id.split(".")[0]);
            });
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function domain(_x18, _x19) {
      return _domain.apply(this, arguments);
    }
    return domain;
  }(),
  entity_id: function () {
    var _entity_id = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return matcher(value);
          case 2:
            match = _context6.sent;
            return _context6.abrupt("return", function (entity) {
              return match(entity.entity_id);
            });
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function entity_id(_x20, _x21) {
      return _entity_id.apply(this, arguments);
    }
    return entity_id;
  }(),
  state: function () {
    var _state = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return matcher(value);
          case 2:
            match = _context7.sent;
            return _context7.abrupt("return", function (entity) {
              return match(entity.state);
            });
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function state(_x22, _x23) {
      return _state.apply(this, arguments);
    }
    return state;
  }(),
  name: function () {
    var _name = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return matcher(value);
          case 2:
            match = _context8.sent;
            return _context8.abrupt("return", function (entity) {
              var _a;
              return match((_a = entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name);
            });
          case 4:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function name(_x24, _x25) {
      return _name.apply(this, arguments);
    }
    return name;
  }(),
  group: function () {
    var _group = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(hass, value) {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", function (entity) {
              var _a, _b, _c;
              return (_c = (_b = (_a = hass.states[value]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.entity_id) === null || _c === void 0 ? void 0 : _c.includes(entity.entity_id);
            });
          case 1:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function group(_x26, _x27) {
      return _group.apply(this, arguments);
    }
    return group;
  }(),
  attributes: function () {
    var _attributes = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(hass, value) {
      var matchers;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return Promise.all(Object.entries(value).map(/*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref4) {
                var _ref6, k, v, attr, prepare, match;
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      _ref6 = _slicedToArray(_ref4, 2), k = _ref6[0], v = _ref6[1];
                      attr = k.split(" ")[0];
                      prepare = function prepare(obj) {
                        return attr.split(":").reduce(function (a, x) {
                          return a === null || a === void 0 ? void 0 : a[x];
                        }, obj);
                      };
                      _context10.next = 5;
                      return matcher(v);
                    case 5:
                      match = _context10.sent;
                      return _context10.abrupt("return", {
                        prepare: prepare,
                        match: match
                      });
                    case 7:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10);
              }));
              return function (_x30) {
                return _ref5.apply(this, arguments);
              };
            }()));
          case 2:
            matchers = _context11.sent;
            return _context11.abrupt("return", function (entity) {
              return matchers.every(function (_ref7) {
                var prepare = _ref7.prepare,
                  match = _ref7.match;
                return match(prepare(entity.attributes));
              });
            });
          case 4:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function attributes(_x28, _x29) {
      return _attributes.apply(this, arguments);
    }
    return attributes;
  }(),
  not: function () {
    var _not = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(hass, value) {
      var filter;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return get_filter(hass, value);
          case 2:
            filter = _context12.sent;
            return _context12.abrupt("return", function (entity) {
              return !filter(entity.entity_id);
            });
          case 4:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function not(_x31, _x32) {
      return _not.apply(this, arguments);
    }
    return not;
  }(),
  and: function () {
    var _and = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(hass, value) {
      var filters;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return Promise.all(value.map(function (v) {
              return get_filter(hass, v);
            }));
          case 2:
            filters = _context13.sent;
            return _context13.abrupt("return", function (entity) {
              return filters.every(function (x) {
                return x(entity.entity_id);
              });
            });
          case 4:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function and(_x33, _x34) {
      return _and.apply(this, arguments);
    }
    return and;
  }(),
  or: function () {
    var _or = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(hass, value) {
      var filters;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return Promise.all(value.map(function (v) {
              return get_filter(hass, v);
            }));
          case 2:
            filters = _context14.sent;
            return _context14.abrupt("return", function (entity) {
              return filters.some(function (x) {
                return x(entity.entity_id);
              });
            });
          case 4:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }));
    function or(_x35, _x36) {
      return _or.apply(this, arguments);
    }
    return or;
  }(),
  device: function () {
    var _device = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(hass, value) {
      var _yield$Promise$all, _yield$Promise$all2, match, entities, devices;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return Promise.all([matcher(value), getEntities(hass), getDevices(hass)]);
          case 2:
            _yield$Promise$all = _context15.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
            match = _yield$Promise$all2[0];
            entities = _yield$Promise$all2[1];
            devices = _yield$Promise$all2[2];
            return _context15.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              var dev = devices.find(function (d) {
                return d.id === ent.device_id;
              });
              if (!dev) return false;
              return match(dev.name_by_user) || match(dev.name);
            });
          case 8:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    function device(_x37, _x38) {
      return _device.apply(this, arguments);
    }
    return device;
  }(),
  device_manufacturer: function () {
    var _device_manufacturer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(hass, value) {
      var _yield$Promise$all3, _yield$Promise$all4, match, entities, devices;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return Promise.all([matcher(value), getEntities(hass), getDevices(hass)]);
          case 2:
            _yield$Promise$all3 = _context16.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
            match = _yield$Promise$all4[0];
            entities = _yield$Promise$all4[1];
            devices = _yield$Promise$all4[2];
            return _context16.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              var dev = devices.find(function (d) {
                return d.id === ent.device_id;
              });
              if (!dev) return false;
              return match(dev.manufacturer);
            });
          case 8:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }));
    function device_manufacturer(_x39, _x40) {
      return _device_manufacturer.apply(this, arguments);
    }
    return device_manufacturer;
  }(),
  device_model: function () {
    var _device_model = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(hass, value) {
      var _yield$Promise$all5, _yield$Promise$all6, match, entities, devices;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return Promise.all([matcher(value), getEntities(hass), getDevices(hass)]);
          case 2:
            _yield$Promise$all5 = _context17.sent;
            _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 3);
            match = _yield$Promise$all6[0];
            entities = _yield$Promise$all6[1];
            devices = _yield$Promise$all6[2];
            return _context17.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              var dev = devices.find(function (d) {
                return d.id === ent.device_id;
              });
              if (!dev) return false;
              return match(dev.model);
            });
          case 8:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }));
    function device_model(_x41, _x42) {
      return _device_model.apply(this, arguments);
    }
    return device_model;
  }(),
  area: function () {
    var _area = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(hass, value) {
      var _yield$Promise$all7, _yield$Promise$all8, match, entities, devices, areas;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return Promise.all([matcher(value), getEntities(hass), getDevices(hass), getAreas(hass)]);
          case 2:
            _yield$Promise$all7 = _context18.sent;
            _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
            match = _yield$Promise$all8[0];
            entities = _yield$Promise$all8[1];
            devices = _yield$Promise$all8[2];
            areas = _yield$Promise$all8[3];
            return _context18.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              var area = areas.find(function (a) {
                return a.area_id === ent.area_id;
              });
              if (area) return match(area.name) || match(area.area_id);
              var dev = devices.find(function (d) {
                return d.id === ent.device_id;
              });
              if (!dev) return false;
              area = areas.find(function (a) {
                return a.area_id === dev.area_id;
              });
              if (!area) return false;
              return match(area.name) || match(area.area_id);
            });
          case 9:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }));
    function area(_x43, _x44) {
      return _area.apply(this, arguments);
    }
    return area;
  }(),
  entity_category: function () {
    var _entity_category = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(hass, value) {
      var _yield$Promise$all9, _yield$Promise$all10, match, entities;
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return Promise.all([matcher(value), getEntities(hass)]);
          case 2:
            _yield$Promise$all9 = _context19.sent;
            _yield$Promise$all10 = _slicedToArray(_yield$Promise$all9, 2);
            match = _yield$Promise$all10[0];
            entities = _yield$Promise$all10[1];
            return _context19.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              return match(ent.entity_category);
            });
          case 7:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    }));
    function entity_category(_x45, _x46) {
      return _entity_category.apply(this, arguments);
    }
    return entity_category;
  }(),
  last_changed: function () {
    var _last_changed = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
            _context20.next = 3;
            return matcher(value);
          case 3:
            match = _context20.sent;
            return _context20.abrupt("return", function (entity) {
              return match(entity.last_changed);
            });
          case 5:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    }));
    function last_changed(_x47, _x48) {
      return _last_changed.apply(this, arguments);
    }
    return last_changed;
  }(),
  last_updated: function () {
    var _last_updated = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
            _context21.next = 3;
            return matcher(value);
          case 3:
            match = _context21.sent;
            return _context21.abrupt("return", function (entity) {
              return match(entity.last_updated);
            });
          case 5:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    }));
    function last_updated(_x49, _x50) {
      return _last_updated.apply(this, arguments);
    }
    return last_updated;
  }(),
  last_triggered: function () {
    var _last_triggered = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(hass, value) {
      var match;
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            if (!ago_suffix_regex.test(value)) value = value + default_ago_suffix;
            _context22.next = 3;
            return matcher(value);
          case 3:
            match = _context22.sent;
            return _context22.abrupt("return", function (entity) {
              return match(entity.attributes.last_triggered);
            });
          case 5:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }));
    function last_triggered(_x51, _x52) {
      return _last_triggered.apply(this, arguments);
    }
    return last_triggered;
  }(),
  integration: function () {
    var _integration = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(hass, value) {
      var _yield$Promise$all11, _yield$Promise$all12, match, entities;
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return Promise.all([matcher(value), getEntities(hass)]);
          case 2:
            _yield$Promise$all11 = _context23.sent;
            _yield$Promise$all12 = _slicedToArray(_yield$Promise$all11, 2);
            match = _yield$Promise$all12[0];
            entities = _yield$Promise$all12[1];
            return _context23.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              return match(ent.platform);
            });
          case 7:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }));
    function integration(_x53, _x54) {
      return _integration.apply(this, arguments);
    }
    return integration;
  }(),
  hidden_by: function () {
    var _hidden_by = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(hass, value) {
      var _yield$Promise$all13, _yield$Promise$all14, match, entities;
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return Promise.all([matcher(value), getEntities(hass)]);
          case 2:
            _yield$Promise$all13 = _context24.sent;
            _yield$Promise$all14 = _slicedToArray(_yield$Promise$all13, 2);
            match = _yield$Promise$all14[0];
            entities = _yield$Promise$all14[1];
            return _context24.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              return match(ent.hidden_by);
            });
          case 7:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    }));
    function hidden_by(_x55, _x56) {
      return _hidden_by.apply(this, arguments);
    }
    return hidden_by;
  }(),
  label: function () {
    var _label = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(hass, value) {
      var _yield$Promise$all15, _yield$Promise$all16, match, entities, devices, labels, match_label;
      return _regeneratorRuntime().wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.next = 2;
            return Promise.all([matcher(value), getEntities(hass), getDevices(hass), getLabels(hass)]);
          case 2:
            _yield$Promise$all15 = _context25.sent;
            _yield$Promise$all16 = _slicedToArray(_yield$Promise$all15, 4);
            match = _yield$Promise$all16[0];
            entities = _yield$Promise$all16[1];
            devices = _yield$Promise$all16[2];
            labels = _yield$Promise$all16[3];
            match_label = function match_label(lbl) {
              if (match(lbl)) return true;
              var label = labels.find(function (l) {
                return l.label_id === lbl;
              });
              return match(label === null || label === void 0 ? void 0 : label.name);
            };
            return _context25.abrupt("return", function (entity) {
              var ent = entities.find(function (e) {
                return e.entity_id === entity.entity_id;
              });
              if (!ent) return false;
              if (!ent.labels) return false;
              if (ent.labels.some(match_label)) return true;
              var dev = devices.find(function (d) {
                return d.id === ent.device_id;
              });
              if (!dev) return false;
              return dev.labels.some(match_label);
            });
          case 10:
          case "end":
            return _context25.stop();
        }
      }, _callee25);
    }));
    function label(_x57, _x58) {
      return _label.apply(this, arguments);
    }
    return label;
  }()
};
function get_filter(_x59, _x60) {
  return _get_filter.apply(this, arguments);
}
function _get_filter() {
  _get_filter = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51(hass, filter) {
    var rules;
    return _regeneratorRuntime().wrap(function _callee51$(_context51) {
      while (1) switch (_context51.prev = _context51.next) {
        case 0:
          _context51.next = 2;
          return Promise.all(Object.entries(filter).map(function (_ref22) {
            var _ref23 = _slicedToArray(_ref22, 2),
              rule = _ref23[0],
              value = _ref23[1];
            var _a;
            rule = rule.trim().split(" ")[0].trim();
            return (_a = RULES[rule]) === null || _a === void 0 ? void 0 : _a.call(RULES, hass, value);
          }));
        case 2:
          rules = _context51.sent.filter(Boolean);
          return _context51.abrupt("return", function (entity) {
            var _a;
            if (!rules.length) return false;
            if (typeof entity !== "string") entity = entity.entity;
            if (!entity) return false;
            var hass_entity = (_a = hass === null || hass === void 0 ? void 0 : hass.states) === null || _a === void 0 ? void 0 : _a[entity];
            if (!hass_entity) return false;
            return rules.every(function (x) {
              return x(hass_entity);
            });
          });
        case 4:
        case "end":
          return _context51.stop();
      }
    }, _callee51);
  }));
  return _get_filter.apply(this, arguments);
}
function compare(_a, _b, method) {
  var _c, _d, _e, _f;
  // lt = a before b (a < b)
  // gt = a after b (a > b)
  var _ref8 = method.reverse ? [1, -1] : [-1, 1],
    _ref9 = _slicedToArray(_ref8, 2),
    lt = _ref9[0],
    gt = _ref9[1];
  if (method.ignore_case) {
    _a = (_d = (_c = _a === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(_a)) !== null && _d !== void 0 ? _d : _a;
    _b = (_f = (_e = _b === null || _b === void 0 ? void 0 : _b.toLowerCase) === null || _e === void 0 ? void 0 : _e.call(_b)) !== null && _f !== void 0 ? _f : _b;
  }
  if (method.numeric) {
    if (!(isNaN(parseFloat(_a)) && isNaN(parseFloat(_b)))) {
      _a = isNaN(parseFloat(_a)) ? undefined : parseFloat(_a);
      _b = isNaN(parseFloat(_b)) ? undefined : parseFloat(_b);
    }
  }
  if (_a === undefined && _b === undefined) return 0;
  if (_a === undefined) return gt;
  if (_b === undefined) return lt;
  if (method.numeric) {
    if (_a === _b) return 0;
    return _a < _b ? lt : gt;
  }
  if (method.ip) {
    _a = _a.split(".");
    _b = _b.split(".");
    return (method.reverse ? -1 : 1) * (compare(_a[0], _b[0], {
      method: "",
      numeric: true
    }) || compare(_a[1], _b[1], {
      method: "",
      numeric: true
    }) || compare(_a[2], _b[2], {
      method: "",
      numeric: true
    }) || compare(_a[3], _b[3], {
      method: "",
      numeric: true
    }));
  }
  return (method.reverse ? -1 : 1) * String(_a).localeCompare(String(_b), undefined, method);
}
var COMPARISONS = {
  none: function none(x) {
    return 0;
  },
  domain: function domain(x) {
    var _c;
    return (_c = x === null || x === void 0 ? void 0 : x.entity_id) === null || _c === void 0 ? void 0 : _c.split(".")[0];
  },
  entity_id: function entity_id(x) {
    return x === null || x === void 0 ? void 0 : x.entity_id;
  },
  friendly_name: function friendly_name(x) {
    var _c, _d;
    return ((_c = x === null || x === void 0 ? void 0 : x.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || ((_d = x === null || x === void 0 ? void 0 : x.entity_id) === null || _d === void 0 ? void 0 : _d.split(".")[1]);
  },
  name: function name(x) {
    var _c, _d;
    return ((_c = x === null || x === void 0 ? void 0 : x.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || ((_d = x === null || x === void 0 ? void 0 : x.entity_id) === null || _d === void 0 ? void 0 : _d.split(".")[1]);
  },
  device: function () {
    var _device2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(x, m, hass) {
      var _c, _yield$Promise$all17, _yield$Promise$all18, entities, devices, ent, dev;
      return _regeneratorRuntime().wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return Promise.all([getEntities(hass), getDevices(hass)]);
          case 2:
            _yield$Promise$all17 = _context26.sent;
            _yield$Promise$all18 = _slicedToArray(_yield$Promise$all17, 2);
            entities = _yield$Promise$all18[0];
            devices = _yield$Promise$all18[1];
            ent = entities.find(function (e) {
              return e.entity_id === x.entity_id;
            });
            if (ent) {
              _context26.next = 9;
              break;
            }
            return _context26.abrupt("return", undefined);
          case 9:
            dev = devices.find(function (d) {
              return d.id === ent.device_id;
            });
            if (dev) {
              _context26.next = 12;
              break;
            }
            return _context26.abrupt("return", undefined);
          case 12:
            return _context26.abrupt("return", (_c = dev.name_by_user) !== null && _c !== void 0 ? _c : dev.name);
          case 13:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    }));
    function device(_x61, _x62, _x63) {
      return _device2.apply(this, arguments);
    }
    return device;
  }(),
  area: function () {
    var _area2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(x, m, hass) {
      var _yield$Promise$all19, _yield$Promise$all20, entities, devices, areas, ent, area, dev;
      return _regeneratorRuntime().wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.next = 2;
            return Promise.all([getEntities(hass), getDevices(hass), getAreas(hass)]);
          case 2:
            _yield$Promise$all19 = _context27.sent;
            _yield$Promise$all20 = _slicedToArray(_yield$Promise$all19, 3);
            entities = _yield$Promise$all20[0];
            devices = _yield$Promise$all20[1];
            areas = _yield$Promise$all20[2];
            ent = entities.find(function (e) {
              return e.entity_id === x.entity_id;
            });
            if (ent) {
              _context27.next = 10;
              break;
            }
            return _context27.abrupt("return", undefined);
          case 10:
            area = areas.find(function (a) {
              return a.area_id === ent.area_id;
            });
            if (!area) {
              _context27.next = 13;
              break;
            }
            return _context27.abrupt("return", area.name);
          case 13:
            dev = devices.find(function (d) {
              return d.id === ent.device_id;
            });
            if (dev) {
              _context27.next = 16;
              break;
            }
            return _context27.abrupt("return", undefined);
          case 16:
            area = areas.find(function (a) {
              return a.area_id === dev.area_id;
            });
            if (area) {
              _context27.next = 19;
              break;
            }
            return _context27.abrupt("return", undefined);
          case 19:
            return _context27.abrupt("return", area.name);
          case 20:
          case "end":
            return _context27.stop();
        }
      }, _callee27);
    }));
    function area(_x64, _x65, _x66) {
      return _area2.apply(this, arguments);
    }
    return area;
  }(),
  state: function state(x) {
    return x === null || x === void 0 ? void 0 : x.state;
  },
  attribute: function attribute(x, m) {
    var _c;
    return (_c = m === null || m === void 0 ? void 0 : m.attribute) === null || _c === void 0 ? void 0 : _c.split(":").reduce(function (_x, key) {
      return _x === null || _x === void 0 ? void 0 : _x[key];
    }, x === null || x === void 0 ? void 0 : x.attributes);
  },
  last_changed: function last_changed(x) {
    return (x === null || x === void 0 ? void 0 : x.last_changed) ? new Date(x.last_changed).getTime() : undefined;
  },
  last_updated: function last_updated(x) {
    return (x === null || x === void 0 ? void 0 : x.last_updated) ? new Date(x.last_updated).getTime() : undefined;
  },
  last_triggered: function last_triggered(x) {
    var _c;
    return ((_c = x === null || x === void 0 ? void 0 : x.attributes) === null || _c === void 0 ? void 0 : _c.last_triggered) ? new Date(x.attributes.last_triggered).getTime() : undefined;
  }
};
function get_sorter(_x67, _x68) {
  return _get_sorter.apply(this, arguments);
}
function _get_sorter() {
  _get_sorter = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54(hass, method) {
    var prepare, sort;
    return _regeneratorRuntime().wrap(function _callee54$(_context54) {
      while (1) switch (_context54.prev = _context54.next) {
        case 0:
          prepare = COMPARISONS[method.method];
          if (prepare) {
            _context54.next = 3;
            break;
          }
          return _context54.abrupt("return", function (x) {
            return x;
          });
        case 3:
          if (["last_changed", "last_updated", "last_triggered"].includes(method.method)) method.numeric = true;
          sort = /*#__PURE__*/function () {
            var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53(values) {
              var map;
              return _regeneratorRuntime().wrap(function _callee53$(_context53) {
                while (1) switch (_context53.prev = _context53.next) {
                  case 0:
                    _context53.next = 2;
                    return Promise.all(values.map(/*#__PURE__*/function () {
                      var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(x) {
                        return _regeneratorRuntime().wrap(function _callee52$(_context52) {
                          while (1) switch (_context52.prev = _context52.next) {
                            case 0:
                              _context52.t0 = x;
                              _context52.next = 3;
                              return prepare(hass.states[x.entity], method, hass);
                            case 3:
                              _context52.t1 = _context52.sent;
                              return _context52.abrupt("return", [_context52.t0, _context52.t1]);
                            case 5:
                            case "end":
                              return _context52.stop();
                          }
                        }, _callee52);
                      }));
                      return function (_x83) {
                        return _ref25.apply(this, arguments);
                      };
                    }()));
                  case 2:
                    map = _context53.sent;
                    map.sort(function (a, b) {
                      return compare(a[1], b[1], method);
                    });
                    return _context53.abrupt("return", map.map(function (x) {
                      return x[0];
                    }));
                  case 5:
                  case "end":
                    return _context53.stop();
                }
              }, _callee53);
            }));
            return function sort(_x82) {
              return _ref24.apply(this, arguments);
            };
          }();
          return _context54.abrupt("return", sort);
        case 6:
        case "end":
          return _context54.stop();
      }
    }, _callee54);
  }));
  return _get_sorter.apply(this, arguments);
}
var version = "1.14.7";
var pjson = {
  version: version
};
var GUI_EDITOR_FILTERS = ["none", "domain", "entity_id", "state", "name", "group", "area", "device", "device_manufacturer", "device_model", "attributes", "last_changed", "last_updated", "last_triggered", "entity_category", "integration", "hidden_by", "label"];
var filterKeySelector = {
  type: "select",
  options: [["domain", "Entity Domain"], ["entity_id", "Entity ID"], ["state", "Entity State"], ["name", "Friendly Name"], ["group", "Member of Group"], ["area", "In area"], ["device", "Device"], ["label", "Label"], ["device_manufacturer", "Device Manufacturer"], ["device_model", "Device Model"], ["attributes", "Attribute"], ["last_changed", "Last Change"], ["last_updated", "Last Update"], ["last_triggered", "Last Trigger"], ["entity_category", "Entity Category"], ["integration", "Governing integration"], ["hidden_by", "Hidden by"]]
};
var filterSchema = function filterSchema(_ref10, idx) {
  var _ref11 = _slicedToArray(_ref10, 2),
    key = _ref11[0],
    value = _ref11[1];
  var _a;
  var filterValueSelector = {
    attributes: {
      object: {}
    }
  };
  if (!GUI_EDITOR_FILTERS.includes(key)) return {
    type: "Constant",
    name: "Some filters are not shown",
    value: "Please switch to the CODE EDITOR to access all options."
  };
  return {
    type: "grid",
    name: "",
    schema: [Object.assign(Object.assign({}, filterKeySelector), {
      name: "key_".concat(idx),
      label: "Property"
    }), {
      name: "value_".concat(idx),
      selector: (_a = filterValueSelector[key]) !== null && _a !== void 0 ? _a : {
        text: {}
      },
      label: "Value"
    }]
  };
};
var filterGroupSchema = function filterGroupSchema(group) {
  var filters = Object.assign({}, group);
  delete filters.options;
  return [].concat(_toConsumableArray(Object.entries(filters).map(filterSchema)), [Object.assign(Object.assign({}, filterKeySelector), {
    name: "key_new",
    label: "Select property"
  })]);
};
var filter2form = function filter2form(group) {
  var filters = Object.assign({}, group);
  delete filters.options;
  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(filters).map(function (_ref12, idx) {
    var _ref13 = _slicedToArray(_ref12, 2),
      key = _ref13[0],
      value = _ref13[1];
    return _defineProperty(_defineProperty({}, "key_".concat(idx), key), "value_".concat(idx), value);
  }))));
};
var form2filter = function form2filter(config, filter) {
  var _a;
  var data = {};
  for (var _i12 = 0; _i12 <= config.filter.include.length + 1; _i12++) {
    if (filter["key_".concat(_i12)] !== undefined) data[filter["key_".concat(_i12)]] = (_a = filter["value_".concat(_i12)]) !== null && _a !== void 0 ? _a : "";
  }
  if (filter.key_new !== undefined) {
    data[filter.key_new] = "";
  }
  return data;
};
var filterGroupOptionsSchema = [{
  name: "options",
  selector: {
    object: {}
  }
}];
var specialGroupSchema = [{
  name: "data",
  selector: {
    object: {}
  }
}];
var sortSchema = [{
  name: "method",
  label: "Sort method",
  type: "select",
  options: [["domain", "Entity Domain"], ["entity_id", "Entity ID"], ["friendly_name", "Friendly Name"], ["state", "Entity State"], ["last_changed", "Last Change"], ["last_updated", "Last Update"], ["last_triggered", "Last Trigger"]]
}, {
  type: "constant",
  name: "Sorting options:",
  value: ""
}, {
  type: "grid",
  name: "",
  schema: [{
    name: "reverse",
    type: "boolean",
    label: "Reverse"
  }, {
    name: "ignore_case",
    type: "boolean",
    label: "Ignore case"
  }, {
    name: "numeric",
    type: "boolean",
    label: "Numeric sort"
  }, {
    name: "ip",
    type: "boolean",
    label: "IP address sort"
  }]
}];
var cardOptionsSchema = [{
  type: "grid",
  name: "",
  schema: [{
    name: "show_empty",
    type: "boolean",
    label: "Show if empty"
  }, {
    name: "card_param",
    type: "string",
    label: "Parameter to populate"
  }]
}];
var AutoEntitiesEditor = /*#__PURE__*/function (_r$2) {
  function AutoEntitiesEditor() {
    var _this8;
    _classCallCheck(this, AutoEntitiesEditor);
    _this8 = _callSuper(this, AutoEntitiesEditor, arguments);
    _this8._selectedTab = 0;
    _this8._cardGUIMode = true;
    _this8._cardGUIModeAvailable = true;
    return _this8;
  }
  _inherits(AutoEntitiesEditor, _r$2);
  return _createClass(AutoEntitiesEditor, [{
    key: "setConfig",
    value: function setConfig(config) {
      this._config = config;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _superPropGet(AutoEntitiesEditor, "connectedCallback", this, 3)([]);
      loadHaForm();
    }
  }, {
    key: "_handleSwitchTab",
    value: function _handleSwitchTab(ev) {
      this._selectedTab = parseInt(ev.detail.index, 10);
    }
  }, {
    key: "_addFilterGroup",
    value: function _addFilterGroup() {
      var _a;
      if (!this._config) return;
      var include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
      include.push({});
      var filter = Object.assign(Object.assign({}, this._config.filter), {
        include: include
      });
      this._config = Object.assign(Object.assign({}, this._config), {
        filter: filter
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_deleteFilterGroup",
    value: function _deleteFilterGroup(idx) {
      var _a;
      if (!this._config) return;
      var include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
      include.splice(idx, 1);
      var filter = Object.assign(Object.assign({}, this._config.filter), {
        include: include
      });
      this._config = Object.assign(Object.assign({}, this._config), {
        filter: filter
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_moveFilterGroup",
    value: function _moveFilterGroup(idx, pos) {
      var _a;
      if (!this._config) return;
      var include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
      var _ref15 = [include[idx + pos], include[idx]];
      include[idx] = _ref15[0];
      include[idx + pos] = _ref15[1];
      var filter = Object.assign(Object.assign({}, this._config.filter), {
        include: include
      });
      this._config = Object.assign(Object.assign({}, this._config), {
        filter: filter
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_addSpecialEntry",
    value: function _addSpecialEntry() {
      var _a;
      if (!this._config) return;
      var include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
      include.push({
        type: ""
      });
      var filter = Object.assign(Object.assign({}, this._config.filter), {
        include: include
      });
      this._config = Object.assign(Object.assign({}, this._config), {
        filter: filter
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_changeSpecialEntry",
    value: function () {
      var _changeSpecialEntry2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(group, ev) {
        var _a, _b, data, include, filter;
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              if (this._config) {
                _context28.next = 2;
                break;
              }
              return _context28.abrupt("return");
            case 2:
              data = ev.detail.value ? Object.assign({}, ev.detail.value.data) : {
                type: ""
              };
              data.type = (_a = data.type) !== null && _a !== void 0 ? _a : "";
              include = _toConsumableArray((_b = this._config.filter) === null || _b === void 0 ? void 0 : _b.include);
              include[group] = data;
              filter = Object.assign(Object.assign({}, this._config.filter), {
                include: include
              });
              this._config = Object.assign(Object.assign({}, this._config), {
                filter: filter
              });
              this.dispatchEvent(new CustomEvent("config-changed", {
                detail: {
                  config: this._config
                }
              }));
            case 9:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function _changeSpecialEntry(_x69, _x70) {
        return _changeSpecialEntry2.apply(this, arguments);
      }
      return _changeSpecialEntry;
    }()
  }, {
    key: "_changeGroupOptions",
    value: function () {
      var _changeGroupOptions2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(group, ev) {
        var _a, data, include, filter;
        return _regeneratorRuntime().wrap(function _callee29$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              if (this._config) {
                _context29.next = 2;
                break;
              }
              return _context29.abrupt("return");
            case 2:
              data = ev.detail.value;
              include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
              include[group] = Object.assign({}, data);
              filter = Object.assign(Object.assign({}, this._config.filter), {
                include: include
              });
              this._config = Object.assign(Object.assign({}, this._config), {
                filter: filter
              });
              this.dispatchEvent(new CustomEvent("config-changed", {
                detail: {
                  config: this._config
                }
              }));
            case 8:
            case "end":
              return _context29.stop();
          }
        }, _callee29, this);
      }));
      function _changeGroupOptions(_x71, _x72) {
        return _changeGroupOptions2.apply(this, arguments);
      }
      return _changeGroupOptions;
    }()
  }, {
    key: "_changeFilter",
    value: function _changeFilter(group, ev) {
      var _a;
      if (!this._config) return;
      var data = form2filter(this._config, ev.detail.value);
      var include = _toConsumableArray((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include);
      include[group] = Object.assign(Object.assign({}, data), {
        options: include[group].options
      });
      var filter = Object.assign(Object.assign({}, this._config.filter), {
        include: include
      });
      this._config = Object.assign(Object.assign({}, this._config), {
        filter: filter
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_changeSortOptions",
    value: function _changeSortOptions(ev) {
      if (!this._config) return;
      var sort = ev.detail.value;
      this._config = Object.assign(Object.assign({}, this._config), {
        sort: sort
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_changeCardOptions",
    value: function _changeCardOptions(ev) {
      if (!this._config) return;
      var data = ev.detail.value;
      this._config = Object.assign(Object.assign({}, this._config), data);
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_showEmptyToggle",
    value: function _showEmptyToggle() {
      if (!this._config) return;
      var show_empty = this._config.show_empty === false;
      this._config = Object.assign(Object.assign({}, this._config), {
        show_empty: show_empty
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_changeCardParam",
    value: function _changeCardParam(ev) {
      if (!this._config) return;
      var card_param = ev.target.value === "" || ev.target.value === "entities" ? undefined : ev.target.value;
      this._config = Object.assign(Object.assign({}, this._config), {
        card_param: card_param
      });
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_getCardConfig",
    value: function _getCardConfig() {
      var cfg = Object.assign({}, this._config.card);
      cfg[this._config.card_param || "entities"] = [];
      return cfg;
    }
  }, {
    key: "_handleCardConfigChanged",
    value: function _handleCardConfigChanged(ev) {
      ev.stopPropagation();
      if (!this._config) return;
      var card = Object.assign({}, ev.detail.config);
      delete card[this._config.card_param || "entities"];
      this._config = Object.assign(Object.assign({}, this._config), {
        card: card
      });
      this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_deleteCard",
    value: function _deleteCard(ev) {
      if (!this._config) return;
      this._config = Object.assign({}, this._config);
      delete this._config.card;
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
  }, {
    key: "_toggleCardMode",
    value: function _toggleCardMode(ev) {
      var _a;
      (_a = this._cardEditorEl) === null || _a === void 0 ? void 0 : _a.toggleMode();
    }
  }, {
    key: "_cardGUIModeChanged",
    value: function _cardGUIModeChanged(ev) {
      ev.stopPropagation();
      this._cardGUIMode = ev.detail.guiMode;
      this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.hass || !this._config) {
        return x(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
      }
      return x(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <div class=\"card-config\">\n        <div class=\"toolbar\">\n          <mwc-tab-bar\n            .activeIndex=", "\n            @MDCTabBar:activated=", "\n          >\n            <mwc-tab .label=", "></mwc-tab>\n            <mwc-tab .label=", "></mwc-tab>\n            <mwc-tab .label=", "></mwc-tab>\n            <mwc-tab .label=", " style=\"flex: 0 1 min-content;\"></mwc-tab>\n          </mwc-tab-bar>\n        </div>\n        <div id=\"editor\">\n          ", "\n        </div>\n      </div>\n    "])), this._selectedTab, this._handleSwitchTab, "Filters", "Sorting", "Card", "?", [this._renderFilterEditor, this._renderSortEditor, this._renderCardEditor, this._renderHelp][this._selectedTab].bind(this)());
    }
  }, {
    key: "_renderHelp",
    value: function _renderHelp() {
      return x(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      <div class=\"box\">\n        <p>Auto entities</p>\n        <p>\n          See\n          <a\n            href=\"https://github.com/thomasloven/lovelace-auto-entities\"\n            target=\"_blank\"\n            rel=\"noreferrer\"\n          >\n            auto-entities on github\n          </a>\n          for usage instructions.\n        </p>\n        <p>Not all options are available in the GUI editor.</p>\n      </div>\n    "])));
    }
  }, {
    key: "_renderFilterEditor",
    value: function _renderFilterEditor() {
      var _this9 = this;
      var _a;
      if (((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.template) || this._config.entities) return x(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        <div class=\"box\">\n          <p>\n            <b>Your filter method is not handled by the GUI editor.</b>\n          </p>\n          <p>Please switch to the CODE EDITOR to access all options.</p>\n        </div>\n      "])));
      return x(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n      ", "\n      <mwc-button @click=", ">\n        <ha-icon .icon=", "></ha-icon>Add filter group\n      </mwc-button>\n      <mwc-button @click=", ">\n        <ha-icon .icon=", "></ha-icon>Add non-filter entry\n      </mwc-button>\n    "])), this._config.filter.include.map(function (group, group_idx) {
        return x(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n          <div class=\"box\">\n            <div class=\"toolbar\">\n              <mwc-icon-button\n                .disabled=", "\n                @click=", "\n              >\n                <ha-icon .icon=", "></ha-icon>\n              </mwc-icon-button>\n              <mwc-icon-button\n                .disabled=", "\n                @click=", "\n              >\n                <ha-icon .icon=", "></ha-icon>\n              </mwc-icon-button>\n              <mwc-icon-button\n                @click=", "\n              >\n                <ha-icon .icon=", "></ha-icon>\n              </mwc-icon-button>\n            </div>\n            ", "\n          </div>\n        "])), group_idx === 0, function () {
          return _this9._moveFilterGroup(group_idx, -1);
        }, "mdi:arrow-up", group_idx === _this9._config.filter.include.length - 1, function () {
          return _this9._moveFilterGroup(group_idx, 1);
        }, "mdi:arrow-down", function () {
          return _this9._deleteFilterGroup(group_idx);
        }, "mdi:close", group.type === undefined ? x(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n                  <ha-form\n                    .hass=", "\n                    .schema=", "\n                    .data=", "\n                    .computeLabel=", "\n                    @value-changed=", "\n                  ></ha-form>\n                  <p>Options:</p>\n                  <ha-form\n                    .hass=", "\n                    .schema=", "\n                    .data=", "\n                    @value-changed=", "\n                  ></ha-form>\n                "])), _this9.hass, filterGroupSchema(group), filter2form(group), function (s) {
          var _a;
          return (_a = s.label) !== null && _a !== void 0 ? _a : s.name;
        }, function (ev) {
          return _this9._changeFilter(group_idx, ev);
        }, _this9.hass, filterGroupOptionsSchema, group, function (ev) {
          return _this9._changeGroupOptions(group_idx, ev);
        }) : x(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n                  <ha-form\n                    .hass=", "\n                    .schema=", "\n                    .data=", "\n                    @value-changed=", "\n                  ></ha-form>\n                "])), _this9.hass, specialGroupSchema, {
          data: group
        }, function (ev) {
          return _this9._changeSpecialEntry(group_idx, ev);
        }));
      }), this._addFilterGroup, "mdi:plus", this._addSpecialEntry, "mdi:plus");
    }
  }, {
    key: "_renderSortEditor",
    value: function _renderSortEditor() {
      var _a;
      var data = (_a = this._config.sort) !== null && _a !== void 0 ? _a : {
        method: "none"
      };
      return x(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      <div class=\"box\">\n        <ha-form\n          .hass=", "\n          .data=", "\n          .schema=", "\n          .computeLabel=", "\n          @value-changed=", "\n        ></ha-form>\n      </div>\n    "])), this.hass, data, sortSchema, function (s) {
        var _a;
        return (_a = s.label) !== null && _a !== void 0 ? _a : s.name;
      }, this._changeSortOptions);
    }
  }, {
    key: "_renderCardEditor",
    value: function _renderCardEditor() {
      var _a;
      var data = Object.assign({}, this._config);
      data.show_empty = (_a = data.show_empty) !== null && _a !== void 0 ? _a : true;
      return x(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      <div class=\"box cards\">\n        <ha-form\n          .hass=", "\n          .schema=", "\n          .computeLabel=", "\n          .data=", "\n          @value-changed=", "\n        ></ha-form>\n        ", "\n      </div>\n    "])), this.hass, cardOptionsSchema, function (s) {
        var _a;
        return (_a = s.label) !== null && _a !== void 0 ? _a : s.name;
      }, data, this._changeCardOptions, this._config.card ? x(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n              <div>\n                <mwc-button\n                  @click=", "\n                  .disabled=", "\n                  class=\"gui-mode-button\"\n                >\n                  ", "\n                </mwc-button>\n                <mwc-button\n                  .title=", "\n                  @click=", "\n                >\n                  Change card type\n                </mwc-button>\n              </div>\n              <hui-card-element-editor\n                .hass=", "\n                .lovelace=", "\n                .value=", "\n                @config-changed=", "\n                @GUImode-changed=", "\n              ></hui-card-element-editor>\n            "])), this._toggleCardMode, !this._cardGUIModeAvailable, !this._cardEditorEl || this._cardGUIMode ? "Show code editor" : "Show Visual Editor", "Change card type", this._deleteCard, this.hass, this.lovelace, this._getCardConfig(), this._handleCardConfigChanged, this._cardGUIModeChanged) : x(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n              <hui-card-picker\n                .hass=", "\n                .lovelace=", "\n                @config-changed=", "\n              ></hui-card-picker>\n            "])), this.hass, this.lovelace, this._handleCardConfigChanged));
    }
  }], [{
    key: "styles",
    get: function get() {
      return [i$3(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n        mwc-tab-bar {\n          border-bottom: 1px solid var(--divider-color);\n        }\n\n        .box {\n          margin-top: 8px;\n          border: 1px solid var(--divider-color);\n          padding: 12px;\n        }\n        .option {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n        }\n\n        .box .toolbar {\n          display: flex;\n          justify-content: flex-end;\n          width: 100%;\n          gap: 8px;\n        }\n        .gui-mode-button {\n          margin-right: auto;\n        }\n        a {\n          color: var(--primary-color);\n        }\n      "])))];
    }
  }]);
}(r$2);
__decorate([r()], AutoEntitiesEditor.prototype, "_config", void 0);
__decorate([n()], AutoEntitiesEditor.prototype, "lovelace", void 0);
__decorate([n()], AutoEntitiesEditor.prototype, "hass", void 0);
__decorate([r()], AutoEntitiesEditor.prototype, "_selectedTab", void 0);
__decorate([r()], AutoEntitiesEditor.prototype, "_cardGUIMode", void 0);
__decorate([r()], AutoEntitiesEditor.prototype, "_cardGUIModeAvailable", void 0);
__decorate([e("hui-card-element-editor")], AutoEntitiesEditor.prototype, "_cardEditorEl", void 0);
customElements.define("auto-entities-editor", AutoEntitiesEditor);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "auto-entities",
  name: "Auto Entities",
  preview: false,
  description: "Entity Filter on Steroids. Auto Entities allows you to fill other cards with entities automatically, based on a number of attributes."
});
var process_entity = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(hass, entity, entity_id) {
    var _a, _b, _c, _d, _yield$Promise$all21, _yield$Promise$all22, entities, devices, areas, state, ent, dev, area, str, evl;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return Promise.all([getEntities(hass), getDevices(hass), getAreas(hass)]);
        case 2:
          _yield$Promise$all21 = _context30.sent;
          _yield$Promise$all22 = _slicedToArray(_yield$Promise$all21, 3);
          entities = _yield$Promise$all22[0];
          devices = _yield$Promise$all22[1];
          areas = _yield$Promise$all22[2];
          state = (_a = hass === null || hass === void 0 ? void 0 : hass.states) === null || _a === void 0 ? void 0 : _a[entity_id];
          ent = entities.find(function (e) {
            return e.entity_id === entity_id;
          });
          dev = ent ? devices.find(function (d) {
            return d.id === ent.device_id;
          }) : undefined;
          area = ent ? areas.find(function (a) {
            return a.area_id === ent.area_id;
          }) : undefined;
          if (area === undefined) area = dev ? areas.find(function (a) {
            return a.area_id === dev.area_id;
          }) : undefined;
          str = JSON.stringify(entity);
          str = str.replace(/this.entity_id/g, entity_id);
          // Experimental
          // ---
          // Process the entire configuration as a javascript template string
          // This lets you use ${} expressions and the variables
          // - entity_id (the entity id as a string)
          // - entity (the Entity name if applicable)
          // - device (the name of the Device the entity belongs to if applicable)
          // - area (the name of the Area the entity is in if applicable)
          // - state (the Home Assistant state object of the entity)
          if (!(entity.eval_js === true)) {
            _context30.next = 23;
            break;
          }
          evl = new Function("entity_id", "entity", "device", "area", "state", "\n    \"use strict\";\n    return (String.raw`".concat(str, "`);\n    "));
          _context30.prev = 16;
          str = evl(entity_id, (_b = ent === null || ent === void 0 ? void 0 : ent.name_by_user) !== null && _b !== void 0 ? _b : ent === null || ent === void 0 ? void 0 : ent.name, (_c = dev === null || dev === void 0 ? void 0 : dev.name_by_user) !== null && _c !== void 0 ? _c : dev === null || dev === void 0 ? void 0 : dev.name, (_d = area === null || area === void 0 ? void 0 : area.name_by_user) !== null && _d !== void 0 ? _d : area === null || area === void 0 ? void 0 : area.name, state);
          _context30.next = 23;
          break;
        case 20:
          _context30.prev = 20;
          _context30.t0 = _context30["catch"](16);
          return _context30.abrupt("return", {
            error: _context30.t0.message
          });
        case 23:
          return _context30.abrupt("return", JSON.parse(str));
        case 24:
        case "end":
          return _context30.stop();
      }
    }, _callee30, null, [[16, 20]]);
  }));
  return function process_entity(_x73, _x74, _x75) {
    return _ref16.apply(this, arguments);
  };
}();
window.queueMicrotask = window.queueMicrotask || function (handler) {
  return window.setTimeout(handler, 1);
};
var HIDDEN_TYPES = ["section", "divider"];
var AutoEntities = /*#__PURE__*/function (_r$3) {
  function AutoEntities() {
    var _this10;
    _classCallCheck(this, AutoEntities);
    _this10 = _callSuper(this, AutoEntities, arguments);
    _this10.connectedWhileHidden = true;
    _this10.empty = false;
    _this10._updateCooldown = {
      timer: undefined,
      rerun: false
    };
    _this10._renderer = function (tpl) {
      if (typeof tpl === "string") {
        _this10._template = tpl.split(/[\s,]+/);
      } else {
        _this10._template = tpl;
      }
      queueMicrotask(function () {
        return _this10.update_all();
      });
    };
    return _this10;
  }
  _inherits(AutoEntities, _r$3);
  return _createClass(AutoEntities, [{
    key: "setConfig",
    value: function setConfig(config) {
      var _this11 = this;
      var _a;
      if (!config) {
        throw new Error("No configuration.");
      }
      // if (!config.card?.type) {
      //   throw new Error("No card type specified.");
      // }
      if (!config.filter && !config.entities) {
        throw new Error("No filters specified.");
      }
      config = JSON.parse(JSON.stringify(config));
      this._config = config;
      if (((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.template) && hasTemplate(this._config.filter.template)) {
        bind_template(this._renderer, this._config.filter.template, {
          config: config
        });
      }
      this._cardBuilt = new Promise(function (resolve) {
        return _this11._cardBuiltResolve = resolve;
      });
      queueMicrotask(function () {
        return _this11.build_else();
      });
      queueMicrotask(function () {
        return _this11.update_all();
      });
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _a, _b;
      _superPropGet(AutoEntities, "connectedCallback", this, 3)([]);
      if (((_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.template) && hasTemplate(this._config.filter.template)) {
        bind_template(this._renderer, this._config.filter.template, {
          config: this._config
        });
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _superPropGet(AutoEntities, "disconnectedCallback", this, 3)([]);
      unbind_template(this._renderer);
    }
  }, {
    key: "update_all",
    value: function () {
      var _update_all = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
        var _this12 = this;
        var entities;
        return _regeneratorRuntime().wrap(function _callee31$(_context31) {
          while (1) switch (_context31.prev = _context31.next) {
            case 0:
              if (this.card) this.card.hass = this.hass;
              if (this["else"]) this["else"].hass = this.hass;
              if (!this._updateCooldown.timer) {
                _context31.next = 7;
                break;
              }
              this._updateCooldown.rerun = true;
              return _context31.abrupt("return");
            case 7:
              this._updateCooldown.rerun = false;
              this._updateCooldown.timer = window.setTimeout(function () {
                _this12._updateCooldown.timer = undefined;
                if (_this12._updateCooldown.rerun) _this12.update_all();
              }, 500);
            case 9:
              if (this.hass) {
                _context31.next = 11;
                break;
              }
              return _context31.abrupt("return");
            case 11:
              _context31.next = 13;
              return this.update_entities();
            case 13:
              entities = _context31.sent;
              this.update_card(entities);
            case 15:
            case "end":
              return _context31.stop();
          }
        }, _callee31, this);
      }));
      function update_all() {
        return _update_all.apply(this, arguments);
      }
      return update_all;
    }()
  }, {
    key: "build_else",
    value: function () {
      var _build_else = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
        var helpers;
        return _regeneratorRuntime().wrap(function _callee32$(_context32) {
          while (1) switch (_context32.prev = _context32.next) {
            case 0:
              if (!(this._config["else"] === undefined)) {
                _context32.next = 2;
                break;
              }
              return _context32.abrupt("return");
            case 2:
              _context32.next = 4;
              return window.loadCardHelpers();
            case 4:
              helpers = _context32.sent;
              _context32.next = 7;
              return helpers.createCardElement(this._config["else"]);
            case 7:
              this["else"] = _context32.sent;
              this["else"].hass = this.hass;
            case 9:
            case "end":
              return _context32.stop();
          }
        }, _callee32, this);
      }));
      function build_else() {
        return _build_else.apply(this, arguments);
      }
      return build_else;
    }()
  }, {
    key: "update_card",
    value: function () {
      var _update_card = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(entities) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, newType, cardConfig, helpers, _consoleError, errorCard, ctr;
        return _regeneratorRuntime().wrap(function _callee33$(_context33) {
          while (1) switch (_context33.prev = _context33.next) {
            case 0:
              if (!(this._entities && _compare_deep(entities, this._entities) && _compare_deep(this._cardConfig, this._config.card))) {
                _context33.next = 2;
                break;
              }
              return _context33.abrupt("return");
            case 2:
              newType = ((_a = this._cardConfig) === null || _a === void 0 ? void 0 : _a.type) !== ((_b = this._config.card) === null || _b === void 0 ? void 0 : _b.type);
              this._entities = entities;
              this._cardConfig = JSON.parse(JSON.stringify((_c = this._config.card) !== null && _c !== void 0 ? _c : {}));
              cardConfig = Object.assign(_defineProperty({
                type: "entities"
              }, this._config.card_param || "entities", entities), this._config.card);
              if (!(!this.card || newType)) {
                _context33.next = 40;
                break;
              }
              _context33.next = 9;
              return window.loadCardHelpers();
            case 9:
              helpers = _context33.sent;
              // Replace console.error in order to catch errors from cards which don't like to be given an empty entities list
              console.oldError = console.oldError || [];
              _consoleError = console.error;
              console.oldError.push(_consoleError);
              console.error = function () {
                var _a, _b, _c, _d, _e, _f;
                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }
                if (args.length === 3 && args[2].message) {
                  if (((_b = (_a = args[2].message).startsWith) === null || _b === void 0 ? void 0 : _b.call(_a, "Entities")) || (
                  // Logbook-card
                  (_d = (_c = args[2].message).startsWith) === null || _d === void 0 ? void 0 : _d.call(_c, "Either entities")) || (
                  // Map card
                  (_f = (_e = args[2].message).endsWith) === null || _f === void 0 ? void 0 : _f.call(_e, "entity")) // History-graph card
                  ) {
                    return;
                  }
                }
                _consoleError.apply(void 0, args);
              };
              _context33.prev = 14;
              _context33.next = 17;
              return helpers.createCardElement(cardConfig);
            case 17:
              this.card = _context33.sent;
              if (!(this.card.localName === "hui-error-card")) {
                _context33.next = 35;
                break;
              }
              errorCard = this.card;
              _context33.next = 22;
              return customElements.whenDefined("hui-error-card");
            case 22:
              ctr = 10;
            case 23:
              if (!(!errorCard._config && ctr)) {
                _context33.next = 29;
                break;
              }
              _context33.next = 26;
              return new Promise(function (resolve) {
                return window.setTimeout(resolve, 100);
              });
            case 26:
              ctr--;
              _context33.next = 23;
              break;
            case 29:
              if (!(((_f = (_e = (_d = errorCard._config) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.startsWith) === null || _f === void 0 ? void 0 : _f.call(_e, "Entities")) || ((_j = (_h = (_g = errorCard._config) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.startsWith) === null || _j === void 0 ? void 0 : _j.call(_h, "Either entities")) || ((_m = (_l = (_k = errorCard._config) === null || _k === void 0 ? void 0 : _k.error) === null || _l === void 0 ? void 0 : _l.endsWith) === null || _m === void 0 ? void 0 : _m.call(_l, "entity")))) {
                _context33.next = 35;
                break;
              }
              this.card = undefined;
              this._entities = undefined;
              this._cardConfig = undefined;
              (_o = this._cardBuiltResolve) === null || _o === void 0 ? void 0 : _o.call(this);
              return _context33.abrupt("return");
            case 35:
              _context33.prev = 35;
              console.error = console.oldError.pop();
              return _context33.finish(35);
            case 38:
              _context33.next = 41;
              break;
            case 40:
              this.card.setConfig(cardConfig);
            case 41:
              (_p = this._cardBuiltResolve) === null || _p === void 0 ? void 0 : _p.call(this);
              this.card.hass = this.hass;
              this.empty = entities.length === 0 || entities.every(function (e) {
                return HIDDEN_TYPES.includes(e.type);
              });
              this.dispatchEvent(new Event("card-visibility-changed", {
                bubbles: true,
                cancelable: true
              }));
              if (!this.card.requestUpdate) {
                _context33.next = 49;
                break;
              }
              _context33.next = 48;
              return this.updateComplete;
            case 48:
              this.card.requestUpdate();
            case 49:
            case "end":
              return _context33.stop();
          }
        }, _callee33, this, [[14,, 35, 38]]);
      }));
      function update_card(_x76) {
        return _update_card.apply(this, arguments);
      }
      return update_card;
    }()
  }, {
    key: "update_entities",
    value: function () {
      var _update_entities = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
        var _this13 = this,
          _entities;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, format, entities, include_filters, exclude_filters, all_entities, sorter, _sorter, start, count;
        return _regeneratorRuntime().wrap(function _callee39$(_context39) {
          while (1) switch (_context39.prev = _context39.next) {
            case 0:
              format = function format(entity) {
                if (!entity) return null;
                return typeof entity === "string" ? {
                  entity: entity.trim()
                } : entity;
              };
              entities = _toConsumableArray(((_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.entities) === null || _b === void 0 ? void 0 : _b.map(format)) || []);
              if (this.hass) {
                _context39.next = 4;
                break;
              }
              return _context39.abrupt("return", entities);
            case 4:
              if (this._template) {
                entities = entities.concat(this._template.map(format));
              }
              entities = entities.filter(Boolean);
              _context39.next = 8;
              return Promise.all(((_d = (_c = this._config.filter) === null || _c === void 0 ? void 0 : _c.include) !== null && _d !== void 0 ? _d : []).map(/*#__PURE__*/function () {
                var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37(filter) {
                  var _a, filters, sorter, post_process;
                  return _regeneratorRuntime().wrap(function _callee37$(_context37) {
                    while (1) switch (_context37.prev = _context37.next) {
                      case 0:
                        if (!filter.type) {
                          _context37.next = 2;
                          break;
                        }
                        return _context37.abrupt("return", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34() {
                          return _regeneratorRuntime().wrap(function _callee34$(_context34) {
                            while (1) switch (_context34.prev = _context34.next) {
                              case 0:
                                return _context34.abrupt("return", [filter]);
                              case 1:
                              case "end":
                                return _context34.stop();
                            }
                          }, _callee34);
                        })));
                      case 2:
                        _context37.next = 4;
                        return get_filter(_this13.hass, filter);
                      case 4:
                        filters = _context37.sent;
                        if (!((_a = filter.sort) === null || _a === void 0 ? void 0 : _a.method)) {
                          _context37.next = 11;
                          break;
                        }
                        _context37.next = 8;
                        return get_sorter(_this13.hass, filter.sort);
                      case 8:
                        _context37.t0 = _context37.sent;
                        _context37.next = 12;
                        break;
                      case 11:
                        _context37.t0 = function (x) {
                          return x;
                        };
                      case 12:
                        sorter = _context37.t0;
                        post_process = /*#__PURE__*/function () {
                          var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(entity) {
                            return _regeneratorRuntime().wrap(function _callee35$(_context35) {
                              while (1) switch (_context35.prev = _context35.next) {
                                case 0:
                                  _context35.next = 2;
                                  return process_entity(_this13.hass, Object.assign(Object.assign({}, entity), filter.options), entity.entity);
                                case 2:
                                  return _context35.abrupt("return", _context35.sent);
                                case 3:
                                case "end":
                                  return _context35.stop();
                              }
                            }, _callee35);
                          }));
                          return function post_process(_x78) {
                            return _ref19.apply(this, arguments);
                          };
                        }();
                        return _context37.abrupt("return", /*#__PURE__*/function () {
                          var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(entities) {
                            var _a, _b, _c, _d, _e, _f, add, start, count;
                            return _regeneratorRuntime().wrap(function _callee36$(_context36) {
                              while (1) switch (_context36.prev = _context36.next) {
                                case 0:
                                  add = entities.filter(filters); // Filter-local sort
                                  _context36.next = 3;
                                  return sorter(add);
                                case 3:
                                  add = _context36.sent;
                                  // Filter-local pagination
                                  if (((_a = filter.sort) === null || _a === void 0 ? void 0 : _a.count) || ((_b = filter.sort) === null || _b === void 0 ? void 0 : _b.first)) {
                                    start = (_d = (_c = filter.sort) === null || _c === void 0 ? void 0 : _c.first) !== null && _d !== void 0 ? _d : 0;
                                    count = (_f = (_e = filter.sort) === null || _e === void 0 ? void 0 : _e.count) !== null && _f !== void 0 ? _f : Infinity;
                                    add = add.slice(start, start + count);
                                  }
                                  _context36.next = 7;
                                  return Promise.all(add.map(post_process));
                                case 7:
                                  add = _context36.sent;
                                  return _context36.abrupt("return", add);
                                case 9:
                                case "end":
                                  return _context36.stop();
                              }
                            }, _callee36);
                          }));
                          return function (_x79) {
                            return _ref20.apply(this, arguments);
                          };
                        }());
                      case 15:
                      case "end":
                        return _context37.stop();
                    }
                  }, _callee37);
                }));
                return function (_x77) {
                  return _ref17.apply(this, arguments);
                };
              }()));
            case 8:
              include_filters = _context39.sent;
              _context39.next = 11;
              return Promise.all(((_f = (_e = this._config.filter) === null || _e === void 0 ? void 0 : _e.exclude) !== null && _f !== void 0 ? _f : []).map(/*#__PURE__*/function () {
                var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(filter) {
                  var filters;
                  return _regeneratorRuntime().wrap(function _callee38$(_context38) {
                    while (1) switch (_context38.prev = _context38.next) {
                      case 0:
                        _context38.next = 2;
                        return get_filter(_this13.hass, filter);
                      case 2:
                        filters = _context38.sent;
                        return _context38.abrupt("return", filters);
                      case 4:
                      case "end":
                        return _context38.stop();
                    }
                  }, _callee38);
                }));
                return function (_x80) {
                  return _ref21.apply(this, arguments);
                };
              }()));
            case 11:
              exclude_filters = _context39.sent;
              all_entities = Object.keys(this.hass.states).map(format); // Include
              _context39.t0 = (_entities = entities).concat;
              _context39.t1 = _entities;
              _context39.t2 = _toConsumableArray;
              _context39.next = 18;
              return Promise.all(include_filters.map(function (f) {
                return f(all_entities);
              }));
            case 18:
              _context39.t3 = _context39.sent;
              _context39.t4 = (0, _context39.t2)(_context39.t3);
              entities = _context39.t0.apply.call(_context39.t0, _context39.t1, _context39.t4);
              // Exclude
              entities = entities.filter(function (e) {
                return !exclude_filters.some(function (f) {
                  return f(e);
                });
              });
              // Global sort
              if (!((_g = this._config.sort) === null || _g === void 0 ? void 0 : _g.method)) {
                _context39.next = 28;
                break;
              }
              _context39.next = 25;
              return get_sorter(this.hass, this._config.sort);
            case 25:
              _context39.t5 = _context39.sent;
              _context39.next = 29;
              break;
            case 28:
              _context39.t5 = function (x) {
                return x;
              };
            case 29:
              sorter = _context39.t5;
              _context39.next = 32;
              return sorter(entities);
            case 32:
              entities = _context39.sent;
              // Unique
              if (this._config.unique) {
                _sorter = function _sorter(entity, index, self) {
                  return index === self.findIndex(function (e) {
                    return _compare_deep(e, entity);
                  });
                };
                if (this._config.unique === "entity") {
                  _sorter = function _sorter(entity, index, self) {
                    return index === self.findIndex(function (e) {
                      return e.entity === entity.entity;
                    });
                  };
                }
                entities = entities.filter(_sorter);
              }
              // Pagination
              if (((_h = this._config.sort) === null || _h === void 0 ? void 0 : _h.count) || ((_j = this._config.sort) === null || _j === void 0 ? void 0 : _j.first)) {
                start = (_l = (_k = this._config.sort) === null || _k === void 0 ? void 0 : _k.first) !== null && _l !== void 0 ? _l : 0;
                count = (_o = (_m = this._config.sort) === null || _m === void 0 ? void 0 : _m.count) !== null && _o !== void 0 ? _o : Infinity;
                entities = entities.slice(start, start + count);
              }
              return _context39.abrupt("return", entities);
            case 36:
            case "end":
              return _context39.stop();
          }
        }, _callee39, this);
      }));
      function update_entities() {
        return _update_entities.apply(this, arguments);
      }
      return update_entities;
    }()
  }, {
    key: "updated",
    value: function () {
      var _updated = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40(changedProperties) {
        var _this14 = this;
        return _regeneratorRuntime().wrap(function _callee40$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              if (changedProperties.has("_template") || changedProperties.has("hass") && this.hass) {
                queueMicrotask(function () {
                  return _this14.update_all();
                });
              }
            case 1:
            case "end":
              return _context40.stop();
          }
        }, _callee40, this);
      }));
      function updated(_x81) {
        return _updated.apply(this, arguments);
      }
      return updated;
    }()
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      return x(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["", ""])), this.empty && (this._config.show_empty === false || this._config["else"]) ? this["else"] : this.card);
    }
  }, {
    key: "getCardSize",
    value: function () {
      var _getCardSize = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41() {
        var _a, _b, len;
        return _regeneratorRuntime().wrap(function _callee41$(_context41) {
          while (1) switch (_context41.prev = _context41.next) {
            case 0:
              len = 0;
              _context41.next = 3;
              return this._cardBuilt;
            case 3:
              if (!(this.card && this.card.getCardSize)) {
                _context41.next = 7;
                break;
              }
              _context41.next = 6;
              return this.card.getCardSize();
            case 6:
              len = _context41.sent;
            case 7:
              if (len === 1 && ((_a = this._entities) === null || _a === void 0 ? void 0 : _a.length)) len = this._entities.length;
              if (len === 0 && ((_b = this._config.filter) === null || _b === void 0 ? void 0 : _b.include)) len = Object.keys(this._config.filter.include).length;
              return _context41.abrupt("return", len || 5);
            case 10:
            case "end":
              return _context41.stop();
          }
        }, _callee41, this);
      }));
      function getCardSize() {
        return _getCardSize.apply(this, arguments);
      }
      return getCardSize;
    }()
  }, {
    key: "hidden",
    get: function get() {
      var hide = this.empty && this._config.show_empty === false && this._config["else"] === undefined;
      return hide;
    }
  }], [{
    key: "getConfigElement",
    value: function getConfigElement() {
      return document.createElement("auto-entities-editor");
    }
  }, {
    key: "getStubConfig",
    value: function getStubConfig() {
      return {
        card: {
          type: "entities"
        },
        filter: {
          include: [],
          exclude: []
        }
      };
    }
  }]);
}(r$2);
__decorate([n()], AutoEntities.prototype, "_config", void 0);
__decorate([n()], AutoEntities.prototype, "hass", void 0);
__decorate([n()], AutoEntities.prototype, "card", void 0);
__decorate([n()], AutoEntities.prototype, "else", void 0);
__decorate([n()], AutoEntities.prototype, "_template", void 0);
__decorate([r()], AutoEntities.prototype, "empty", void 0);
if (!customElements.get("auto-entities")) {
  customElements.define("auto-entities", AutoEntities);
  console.groupCollapsed("%cAUTO-ENTITIES ".concat(pjson.version, " IS INSTALLED"), "color: green; font-weight: bold");
  console.log("Readme:", "https://github.com/thomasloven/lovelace-auto-entities");
  console.groupEnd();
}
