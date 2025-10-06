# 🧹 deep-cleaner-js

![npm](https://img.shields.io/npm/v/deep-cleaner-js.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![Coverage](https://img.shields.io/badge/Coverage-100%25-success.svg)
![Zero Dependencies](https://img.shields.io/badge/Zero%20Dependencies-✔️-brightgreen.svg)

> **deep-cleaner-js** — a powerful, zero-dependency TypeScript/JavaScript library for deeply cleaning nested objects and arrays.  
> Remove `null`, `undefined`, empty strings, zeros, and empty structures safely — without losing data integrity.

---

## ✨ Features

✅ Deep recursive cleaning of objects and arrays  
🧠 Handles circular references safely  
⚙️ Fully configurable behavior  
💪 Written in TypeScript with full type definitions  
🔒 Non-destructive (doesn’t mutate the original object)  
⚡ Blazing-fast performance (optimized recursion)  
🧰 Preserves `Date`, `RegExp`, `Map`, `Set`, `Buffer`, and `Function`  
🧩 Zero dependencies — pure, portable, and lightweight  

---

## 📦 Installation

```bash
# npm
npm install deep-cleaner-js

# yarn
yarn add deep-cleaner-js

# pnpm
pnpm add deep-cleaner-js
```

### 🪶 CDN

```html
<script src="https://unpkg.com/deep-cleaner-js/dist/index.umd.js"></script>
<script>
  const result = deepCleaner.deepClean({ a: null, b: 2 });
  console.log(result); // { b: 2 }
</script>
```

---

## 🚀 Quick Start

### JavaScript

```js
import { deepClean } from "deep-cleaner-js";

const input = {
  name: "John",
  email: "",
  meta: {
    score: 0,
    address: null,
    active: true,
  },
  tags: [null, "dev", undefined],
};

const cleaned = deepClean(input, {
  removeNull: true,
  removeUndefined: true,
  cleanEmptyString: true,
  cleanZero: false,
});

console.log(cleaned);
// {
//   name: "John",
//   meta: { score: 0, active: true },
//   tags: ["dev"]
// }
```

### TypeScript

```ts
import { deepClean, DeepCleanOptions } from "deep-cleaner-js";

const options: DeepCleanOptions = {
  removeNull: true,
  removeUndefined: true,
  cleanEmptyString: true,
  cleanZero: false,
};

const cleaned = deepClean({ user: "", id: 0 }, options);
```

---

## ⚙️ API Reference

### **`deepClean(input, options?)`**

| Option | Type | Default | Description |
|--------|------|----------|-------------|
| `removeNull` | `boolean` | `false` | Removes properties or items that are `null`. |
| `removeUndefined` | `boolean` | `false` | Removes properties or items that are `undefined`. |
| `cleanEmptyString` | `boolean` | `false` | Removes empty strings (`""`). |
| `cleanZero` | `boolean` | `false` | Removes zero (`0`) values. |

**Returns:** A deeply cleaned clone of the input.

---

## 🧠 Advanced Examples

### Nested Objects

```js
deepClean({
  user: {
    name: "",
    address: { city: null, zip: undefined },
    scores: [10, null, 0],
  },
}, {
  removeNull: true,
  removeUndefined: true,
  cleanEmptyString: true,
});
```

**Output:**
```js
{ user: { scores: [10, 0] } }
```

### Circular References

```js
const a = { name: "A" };
a.self = a;
const result = deepClean(a);
console.log(result.self === result); // true ✅
```

### Special Types Preserved

```js
const data = {
  date: new Date(),
  regex: /abc/i,
  fn: () => {},
  buffer: Buffer.from("123"),
};

deepClean(data); // Keeps all intact ✅
```

---

## ⚖️ Comparison with Other Libraries

| Feature / Library | deep-cleaner-js | clean-deep | lodash | deepdash |
|-------------------|:---------------:|:-----------:|:-------:|:---------:|
| Removes null/undefined | ✅ | ✅ | ⚙️ (custom) | ⚙️ |
| Removes empty strings | ✅ | ✅ | ⚙️ | ⚙️ |
| Removes zero values | ✅ | ❌ | ⚙️ | ⚙️ |
| Handles circular refs | ✅ | ❌ | ⚙️ | ⚙️ |
| Preserves Date/Map/Set | ✅ | ❌ | ⚙️ | ⚙️ |
| TypeScript support | ✅ | ⚠️ Partial | ⚠️ | ⚠️ |
| Zero dependencies | ✅ | ❌ | ❌ | ❌ |
---

## 🧬 Architecture Overview

```
src/
 ├── index.ts          # Entry point
 └── types.ts          # TypeScript interfaces
 tests/
 ├── cleanData.test.js          # tests
```

- Recursion is **safe** and **stack-optimized**
- Circulars handled with `WeakMap`
- Deep cloning ensures **immutability**

---

## 🧪 Testing

Over **50 comprehensive test cases** ensure 100% coverage.

```bash
npm test
```

---

## 🤝 Contributing

Pull requests are welcome!  
Open an issue to discuss major changes.

```bash
git clone https://github.com/MohammadRostami71/deep-cleaner-js.git
cd deep-cleaner-js
npm install
npm test
```

---

## 📄 License

MIT © 2025 — Created with ❤️ by Mohammad Rostami

---

### 🌐 Links

- **NPM:** [npmjs.com/package/deep-cleaner-js](https://www.npmjs.com/package/deep-cleaner-js)
- **GitHub:** [https://github.com/MohammadRostami71/deep-cleaner-js](https://github.com/MohammadRostami71/deep-cleaner-js)
- **Issues:** [Report a Bug](https://github.com/MohammadRostami71/deep-cleaner-js/issues)
