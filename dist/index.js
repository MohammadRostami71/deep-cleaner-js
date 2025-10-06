"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  deepClean: () => deepClean,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isAtomicValue(value) {
  return typeof value !== "object" || value === null || !isPlainObject(value) && !Array.isArray(value) || (value == null ? void 0 : value.type) === "Buffer" && Array.isArray(value == null ? void 0 : value.data);
}
function deepClean(value, options = {}, seen = /* @__PURE__ */ new WeakMap()) {
  const {
    removeNull = true,
    removeUndefined = true,
    cleanEmptyString = false,
    cleanZero = false
  } = options;
  if (isAtomicValue(value)) {
    if (value === null) return removeNull ? void 0 : value;
    if (value === void 0) return removeUndefined ? void 0 : value;
    if (cleanEmptyString && value === "") return void 0;
    if (cleanZero && value === 0) return void 0;
    return value;
  }
  if (seen.has(value)) {
    return seen.get(value);
  }
  if (Array.isArray(value)) {
    const arr = [];
    seen.set(value, arr);
    for (const item of value) {
      const cleaned = deepClean(item, options, seen);
      if (removeNull && cleaned === null) continue;
      if (removeUndefined && cleaned === void 0) continue;
      if (cleanEmptyString && cleaned === "") continue;
      if (cleanZero && cleaned === 0) continue;
      if (Array.isArray(cleaned) && cleaned.length === 0) continue;
      if (isPlainObject(cleaned) && Object.keys(cleaned).length === 0) continue;
      arr.push(cleaned);
    }
    return arr;
  }
  const cleanedObj = {};
  seen.set(value, cleanedObj);
  const keys = [
    ...Object.keys(value),
    ...Object.getOwnPropertySymbols(value)
  ];
  for (const key of keys) {
    const val = value[key];
    const cleaned = deepClean(val, options, seen);
    if (removeNull && cleaned === null) continue;
    if (removeUndefined && cleaned === void 0) continue;
    if (cleanEmptyString && cleaned === "") continue;
    if (cleanZero && cleaned === 0) continue;
    if (Array.isArray(cleaned) && cleaned.length === 0) continue;
    if (isPlainObject(cleaned) && Object.keys(cleaned).length === 0) continue;
    cleanedObj[key] = cleaned;
  }
  return cleanedObj;
}
var index_default = deepClean;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deepClean
});
