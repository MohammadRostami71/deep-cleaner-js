Deep Cleaner JS 🚀

A TypeScript-ready, ultra-flexible data cleaning library for JavaScript/Node.js.

Deep Cleaner recursively removes unwanted values (null, undefined, empty objects, empty arrays) from your data structures while preserving functions, Date, RegExp, Map, Set, Buffer, and Symbol keys. Ideal for preparing JSON, API payloads, or any nested structures before processing or saving.
⸻
🔥 Features

- ✅ Recursive cleaning: Cleans objects and arrays at any depth.
- ✅ Preserves important types: Functions, Dates, RegExp, Map, Set, Buffer, and Symbols remain untouched.
- ✅ Flexible options:
    - Remove null and/or undefined
    - Customize behavior for empty arrays and objects
- ✅ Non-mutating / functional: Returns a cleaned copy, original input stays intact.
- ✅ TypeScript support: Fully typed for safer code.
- ✅ Handles complex nested structures without breaking.
- ✅ Idempotent: Running it twice yields the same result.
  ⸻
  📦 Installation

# Using npm
npm install deep-cleaner-js

# Using yarn
yarn add deep-cleaner-js

⸻
⚡ Quick Start

import deepClean from 'deep-cleaner-js';

const input = {
name: "John",
age: null,
meta: {
created: undefined,
tags: [],
profile: {
bio: "",
},
},
scores: [10, null, 20, undefined],
};

const cleaned = deepClean(input);

console.log(cleaned);
/* Output:
{
name: "John",
meta: {
profile: { bio: "" }
},
scores: [10, 20]
}
*/

⸻
🛠 Options

deepClean(value, options?)
Option	Type	Default	Description
removeNull	boolean	true	Remove null values.
removeUndefined	boolean	true	Remove undefined values.

Example:

deepClean({ a: null, b: undefined, c: 0 }, { removeNull: false });
// Output: { a: null, c: 0 }

⸻
🌈 Supported Data Types

- Primitive types: number, string, boolean → preserved.
- Null / undefined → removed if options enabled.
- Array → cleaned recursively, empty arrays removed.
- Object → cleaned recursively, empty objects removed.
- Function → preserved.
- Date, RegExp → preserved.
- Map, Set → preserved.
- Buffer-like objects → preserved.
- Symbol keys → preserved.
  ⸻
  💡 Advanced Usage

Cleaning nested arrays:

const data = [{ a: null }, { b: 2 }, {}];
const result = deepClean(data);
// Output: [{ b: 2 }]


Preserving special objects:

const date = new Date();
const regex = /test/i;
const map = new Map([['k','v']]);

const obj = { date, regex, map, empty: {} };
const cleaned = deepClean(obj);

console.log(cleaned);
// { date: ..., regex: ..., map: Map(1), ... }


Functional & non-mutating:

const original = { a: null, b: 1 };
const cleaned = deepClean(original);
console.log(original); // { a: null, b: 1 }

⸻
🧪 Testing

Deep Cleaner comes with 30 comprehensive tests using Jest to cover all edge cases.

Run tests:

npm run test

⸻
📈 Roadmap / Next Features

- Selective cleaning rules (clean only specific paths)
- Diff logging (track what was removed with full paths)
- Configurable empty-value handling
- Performance optimization for huge nested structures
  ⸻
  🌟 Why Deep Cleaner?

- Safe: preserves important objects and references.
- Flexible: works on any nested structure.
- TypeScript-ready: autocompletion and type safety.
- Lightweight & fast: only pure JS/TS code, no heavy dependencies.
  ⸻
  📜 License

MIT © 2025