// src/index.ts
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
export {
  deepClean,
  index_default as default
};
