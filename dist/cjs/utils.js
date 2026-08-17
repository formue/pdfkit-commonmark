"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = deepClone;
exports.deepDefaults = deepDefaults;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Type enforcing deep defaults
 *
 * Defaults will be recursively enforced except for
 * arrays.
 *
 * If the obj type does not match the default type,
 * this function will return the default value.
 *
 * This is a pure function, as it will not modify either
 * the obj or the defaults and always returns a copy.
 *
 * @param {any} obj
 * @param {any} defaults
 * @returns {any}
 */
function deepDefaults(obj, defaults) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (defaults === undefined || defaults === null) {
    return deepClone(obj);
  }
  if (obj === undefined || obj === null) {
    return deepClone(defaults);
  }
  if (_typeof(obj) !== _typeof(defaults)) {
    if (context.length > 0) {
      console.info('deepDefaults type mismatch at `%s` (actual %s !== expected %s)', context.join('.'), _typeof(obj), _typeof(defaults));
    } else {
      console.info('deepDefaults type mismatch (actual `%s` !== expected `%s`)', _typeof(obj), _typeof(defaults));
    }
    return deepClone(defaults);
  }
  if (Array.isArray(obj)) {
    if (!Array.isArray(defaults)) {
      return deepClone(defaults);
    }
    return deepClone([].concat(_toConsumableArray(obj), _toConsumableArray(defaults.filter(function (element) {
      return !obj.includes(element);
    }))));
  }
  if (_typeof(obj) === 'object') {
    if (Array.isArray(defaults) || _typeof(defaults) !== 'object') {
      return deepClone(defaults);
    }
    return Object.entries(obj).reduce(function (copy, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return Object.assign(copy, _defineProperty({}, key, deepDefaults(value, defaults[key], [].concat(_toConsumableArray(context), [key]))));
    }, deepClone(defaults));
  }
  return deepClone(obj);
}
function deepClone(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }
  if (_typeof(obj) === 'object') {
    return Object.entries(obj).reduce(function (copy, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
      return Object.assign(copy, _defineProperty({}, key, deepClone(value)));
    }, {});
  }
  return obj;
}