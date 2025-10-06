import type { DeepCleanOptions } from '../src/types';
import {deepClean} from "../src";

describe('deepClean — comprehensive test suite (56 cases)', () => {
    it('1 - removes null and undefined values from root level object properties', () => {
        const input = { a: null, b: undefined, c: 3 };
        const out = deepClean(input);
        expect(out).toEqual({ c: 3 });
    });

    it('2 - removes empty arrays and empty objects from nested structures and filters empty items from arrays', () => {
        const input = {
            a: [],
            b: {},
            c: { d: [] },
            e: { f: { g: {} } },
            h: [1, [], 2],
        };
        const out = deepClean(input);
        expect(out).toEqual({ h: [1, 2] });
    });

    it('3 - respects removeNull and removeUndefined options to preserve null or undefined values when specified', () => {
        const input = { a: null, b: undefined, c: 5 };
        const options: DeepCleanOptions = { removeNull: false, removeUndefined: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ a: null, c: 5 });
    });

    it('4 - properly handles deeply nested objects while preserving valid structure', () => {
        const input = {
            user: {
                name: 'Ali',
                info: {
                    address: null,
                    contact: {
                        phone: undefined,
                        email: 'test@example.com',
                    },
                },
            },
            empty: {},
        };
        const out = deepClean(input);
        expect(out).toEqual({
            user: {
                name: 'Ali',
                info: { contact: { email: 'test@example.com' } },
            },
        });
    });

    it('5 - handles arrays of objects by removing null/undefined properties from array items', () => {
        const input = {
            list: [
                { id: 1, value: null },
                { id: 2, value: 'ok' },
                { id: 3, value: undefined },
            ],
        };
        const out = deepClean(input);
        expect(out).toEqual({
            list: [{ id: 1 }, { id: 2, value: 'ok' }, { id: 3 }],
        });
    });

    it('6 - returns primitive number input unchanged without any processing', () => {
        expect(deepClean(42 as any)).toBe(42);
    });

    it('7 - handles null input according to removeNull option configuration', () => {
        expect(deepClean(null as any, { removeNull: false })).toBeNull();
        expect(deepClean(null as any, { removeNull: true })).toBeUndefined();
        expect(deepClean(null as any)).toBeUndefined();
    });

    it('8 - returns undefined input unchanged without processing', () => {
        expect(deepClean(undefined as any)).toBeUndefined();
    });

    it('9 - preserves function references as values without modification', () => {
        const fn = () => 123;
        const input = { a: fn, b: null };
        const out = deepClean(input);
        expect(typeof out.a).toBe('function');
        expect(out.a).toBe(fn);
    });

    it('10 - preserves Date instances and treats non-plain objects as atomic values', () => {
        const d = new Date();
        const input = { created: d, removed: null };
        const out = deepClean(input);
        expect(out.created).toBe(d);
    });

    it('11 - preserves RegExp instances without modification', () => {
        const r = /abc/i;
        const input = { r, x: null };
        const out = deepClean(input);
        expect(out.r).toBe(r);
    });

    it('12 - preserves Map instances as desired behavior without converting to plain objects', () => {
        const m = new Map([['k', 'v']]);
        const input: any = { m, other: null };
        const out: any = deepClean(input);
        expect(out.m).toBe(m);
    });

    it('13 - preserves Set instances as desired behavior without converting to plain objects', () => {
        const s = new Set([1, 2, 3]);
        const input: any = { s, empty: {} };
        const out: any = deepClean(input);
        expect(out.s).toBe(s);
    });

    it('14 - preserves empty strings by default when cleanEmptyString option is not enabled', () => {
        const input = { a: '' };
        const out = deepClean(input);
        expect(out).toEqual({ a: '' });
    });

    it('15 - preserves zero values and false boolean values by default', () => {
        const input = { z: 0, f: false, n: null };
        const out = deepClean(input);
        expect(out).toEqual({ z: 0, f: false });
    });

    it('16 - removes undefined and null elements from arrays while preserving other values', () => {
        const input = { a: [1, undefined, null, 2] };
        const out = deepClean(input);
        expect(out).toEqual({ a: [1, 2] });
    });

    it('17 - performs deep cleaning on nested arrays removing empty arrays and null values', () => {
        const input = { a: [[null, 1], [], [2, []], [null]] };
        const out = deepClean(input);
        expect(out).toEqual({ a: [[1], [2]] });
    });

    it('18 - removes object properties from parent when all child properties become empty after cleaning', () => {
        const input = { a: { x: null }, b: { y: 5 } };
        const out = deepClean(input);
        expect(out).toEqual({ b: { y: 5 } });
    });

    it('19 - returns empty object for root object that becomes empty after cleaning rather than undefined', () => {
        const input = { only: null };
        const out = deepClean(input);
        expect(out).toEqual({});
    });

    it('20 - maintains functional behavior by not mutating the original input object', () => {
        const original = { a: null, b: { c: null, d: 2 } };
        const copy = JSON.parse(JSON.stringify(original));
        const out = deepClean(original);
        expect(original).toEqual(copy);
        expect(out).toEqual({ b: { d: 2 } });
    });

    it('21 - correctly handles numeric keys in objects during cleaning process', () => {
        const input: any = { 0: null, 1: 2, 2: {} };
        const out: any = deepClean(input);
        expect(out).toEqual({ '1': 2 });
    });

    it('22 - preserves symbol keys as desired behavior while removing other unwanted properties', () => {
        const sym = Symbol('s');
        const input: any = {};
        input[sym] = 'secret';
        input.trash = null;
        const out: any = deepClean(input);
        expect(out[sym]).toBe('secret');
        expect(out.trash).toBeUndefined();
    });

    it('23 - correctly cleans complex nested structure with multiple levels of data', () => {
        const input = {
            payload: {
                items: [
                    { id: 1, meta: null },
                    { id: 2, meta: undefined },
                    { id: 3, data: { v: 1, x: undefined } },
                    { id: null, skip: {} },
                ],
                extra: {},
            },
            temp: null,
        };

        const out = deepClean(input);

        expect(out).toEqual({
            payload: {
                items: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3, data: { v: 1 } },
                ],
            },
        });
    });

    it('24 - removes array items that become empty objects after cleaning process', () => {
        const input = { a: [{ x: null }, { y: 5 }] };
        const out = deepClean(input);
        expect(out).toEqual({ a: [{ y: 5 }] });
    });

    it('25 - preserves mixed primitive values inside nested structures while removing null', () => {
        const input = { a: { b: false, c: 0, d: '', e: null } };
        const out = deepClean(input);
        expect(out).toEqual({ a: { b: false, c: 0, d: '' } });
    });

    it('26 - preserves functions inside arrays while removing null and empty objects', () => {
        const fn = () => 'x';
        const input = { a: [fn, null, {}] };
        const out: any = deepClean(input);
        expect(out.a).toHaveLength(1);
        expect(out.a[0]).toBe(fn);
    });

    it('27 - returns cleaned array when input is a top-level array rather than object', () => {
        const arr = [null, 1, {}, [], 2];
        const out: any = deepClean(arr as any);
        expect(Array.isArray(out)).toBe(true);
        expect(out).toEqual([1, 2]);
    });

    it('28 - preserves Buffer-like objects by treating them as atomic values', () => {
        const bufferLike: any = { type: 'Buffer', data: [1, 2, 3] };
        const input = { b: bufferLike, trash: null };
        const out: any = deepClean(input);
        expect(out.b).toBe(bufferLike);
    });

    it('29 - demonstrates idempotent behavior where cleaning twice yields identical results', () => {
        const input = {
            a: null,
            b: { c: undefined, d: [null, 2, {}], e: '' },
        };
        const once = deepClean(input as any);
        const twice = deepClean(once as any);
        expect(twice).toEqual(once);
    });

    it('30 - handles large combined scenario with various data types and structures', () => {
        const date = new Date();
        const fn = () => {};
        const sym = Symbol('k');
        const input: any = {
            id: 1,
            name: '',
            meta: { created: date, updater: null },
            list: [
                { a: null, b: 2 },
                { a: { inner: null }, b: undefined },
                {},
                fn,
            ],
            [sym]: 'symValue',
            trash: [],
        };
        const out: any = deepClean(input);
        expect(out.id).toBe(1);
        expect(out.name).toBe('');
        expect(out.meta.created).toBe(date);
        expect(Array.isArray(out.list)).toBeTruthy();
        expect(out.list[0]).toEqual({ b: 2 });
        expect(out.list).toContain(fn);
        expect(out[sym]).toBe('symValue');
        expect(out.trash).toBeUndefined();
    });

    it('31 - removes empty strings when cleanEmptyString option is enabled', () => {
        const input = { a: '', b: 'text', c: null };
        const options: DeepCleanOptions = { cleanEmptyString: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ b: 'text' });
    });

    it('32 - removes zero values when cleanZero option is enabled', () => {
        const input = { a: 0, b: 5, c: false };
        const options: DeepCleanOptions = { cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ b: 5, c: false });
    });

    it('33 - combines cleanEmptyString and cleanZero options to remove both empty strings and zeros', () => {
        const input = { a: '', b: 0, c: 'text', d: 10, e: null };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ c: 'text', d: 10 });
    });

    it('34 - removes empty strings from arrays when cleanEmptyString option is enabled', () => {
        const input = { arr: ['', 'text', '', null] };
        const options: DeepCleanOptions = { cleanEmptyString: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ arr: ['text'] });
    });

    it('35 - removes zero values from arrays when cleanZero option is enabled', () => {
        const input = { arr: [0, 1, 0, 2] };
        const options: DeepCleanOptions = { cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ arr: [1, 2] });
    });

    it('36 - cleans nested objects using both cleanEmptyString and cleanZero options', () => {
        const input = {
            user: {
                name: '',
                age: 0,
                profile: {
                    email: '',
                    score: 0,
                    active: true
                }
            }
        };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({
            user: {
                profile: {
                    active: true
                }
            }
        });
    });

    it('37 - preserves null and undefined values when respective options are set to false', () => {
        const input = { a: null, b: undefined, c: '', d: 0 };
        const options: DeepCleanOptions = {
            removeNull: false,
            removeUndefined: false,
            cleanEmptyString: true,
            cleanZero: true
        };
        const out = deepClean(input, options);
        expect(out).toEqual({ a: null, b: undefined });
    });

    it('38 - cleans complex structure with all options enabled for comprehensive testing', () => {
        const input = {
            data: {
                users: [
                    { name: '', age: 0, active: false },
                    { name: 'John', age: 25, active: true },
                    { name: '', age: 30, active: false }
                ],
                config: {
                    timeout: 0,
                    retries: 3,
                    url: ''
                }
            },
            metadata: null
        };
        const options: DeepCleanOptions = {
            cleanEmptyString: true,
            cleanZero: true,
            removeNull: true,
            removeUndefined: true
        };
        const out = deepClean(input, options);
        expect(out).toEqual({
            data: {
                users: [
                    { active: false },
                    { name: 'John', age: 25, active: true },
                    { active: false, age: 30 }
                ],
                config: {
                    retries: 3
                }
            }
        });
    });

    it('39 - preserves false boolean values even when cleanZero option is enabled', () => {
        const input = { a: false, b: 0, c: '' };
        const options: DeepCleanOptions = { cleanZero: true, cleanEmptyString: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ a: false });
    });

    it('40 - preserves whitespace strings when cleanEmptyString is enabled, removing only truly empty strings', () => {
        const input = { a: '', b: '   ', c: '\t\n', d: 'text' };
        const options: DeepCleanOptions = { cleanEmptyString: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ b: '   ', c: '\t\n', d: 'text' });
    });

    it('41 - preserves negative numbers when cleanZero is enabled, removing only zero values', () => {
        const input = { a: 0, b: -1, c: -0, d: 5 };
        const options: DeepCleanOptions = { cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ b: -1, d: 5 });
    });

    it('42 - handles special characters in object keys during cleaning process', () => {
        const input: any = {
            'key-with-dash': null,
            'key.with.dots': '',
            'key with spaces': 0,
            'normalKey': 'value'
        };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({ 'normalKey': 'value' });
    });

    it('43 - cleans deeply nested arrays using cleanEmptyString and cleanZero options', () => {
        const input = {
            levels: [
                [
                    ['', 0, 'keep'],
                    [null, '', 1]
                ],
                [
                    [0, 0, 0],
                    ['text', '', '']
                ]
            ]
        };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({
            levels: [
                [
                    ['keep'],
                    [1]
                ],
                [
                    ['text']
                ]
            ]
        });
    });

    it('44 - handles empty array at root level by returning empty array unchanged', () => {
        const input: any[] = [];
        const out = deepClean(input);
        expect(out).toEqual([]);
    });

    it('45 - handles empty object at root level by returning empty object unchanged', () => {
        const input = {};
        const out = deepClean(input);
        expect(out).toEqual({});
    });

    it('46 - performs deeply nested removal with cleanEmptyString and cleanZero options across multiple levels', () => {
        const input = {
            level1: {
                level2: {
                    level3: {
                        level4: {
                            value: '',
                            number: 0,
                            keep: 'preserved'
                        }
                    }
                }
            }
        };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out).toEqual({
            level1: {
                level2: {
                    level3: {
                        level4: {
                            keep: 'preserved'
                        }
                    }
                }
            }
        });
    });

    it('47 - combines cleaning with preservation of other special types like Date and RegExp', () => {
        const date = new Date();
        const regex = /test/g;
        const input = {
            date,
            regex,
            empty: '',
            zero: 0,
            nullVal: null,
            arr: [date, regex, '', 0]
        };
        const options: DeepCleanOptions = { cleanEmptyString: true, cleanZero: true };
        const out = deepClean(input, options);
        expect(out.date).toBe(date);
        expect(out.regex).toBe(regex);
        expect(out.arr).toEqual([date, regex]);
    });

    it('48 - ultimate comprehensive test with all features and complex data structures', () => {
        const complexInput = {
            level1: {
                arrays: [
                    {
                        name: '',
                        scores: [0, 100, 0, 200],
                        config: {
                            timeout: 0,
                            enabled: false,
                            url: ''
                        }
                    },
                    {
                        name: 'Alice',
                        scores: [300, 0, 400],
                        config: {
                            timeout: 30,
                            enabled: true,
                            url: 'https://example.com'
                        }
                    }
                ],

                nestedObjects: {
                    empty: {
                        deeper: {
                            deepest: {
                                value: '',
                                number: 0
                            }
                        }
                    },
                    valid: {
                        deeper: {
                            deepest: {
                                value: 'important',
                                number: 42
                            }
                        }
                    }
                },

                specialTypes: {
                    date: new Date('2023-01-01'),
                    func: () => 'result',
                    map: new Map([['key', 'value']]),
                    set: new Set([1, 2, 3]),
                    bool: false,
                    zero: 0,
                    emptyStr: '',
                    nullVal: null,
                    undefinedVal: undefined
                }
            },

            rootArray: ['', 0, 'valid', null, {}, []],
            rootString: '',
            rootZero: 0,
            rootNull: null
        };

        const options: DeepCleanOptions = {
            cleanEmptyString: true,
            cleanZero: true,
            removeNull: true,
            removeUndefined: true
        };

        const result = deepClean(complexInput, options);

        expect(result.level1).toBeDefined();
        expect(result.level1.arrays).toHaveLength(2);
        expect(result.level1.nestedObjects.empty).toBeUndefined();
        expect(result.level1.nestedObjects.valid).toBeDefined();

        const firstArray = result.level1.arrays[0];
        expect(firstArray.name).toBeUndefined();
        expect(firstArray.scores).toEqual([100, 200]);
        expect(firstArray.config.enabled).toBe(false);
        expect(firstArray.config.timeout).toBeUndefined();
        expect(firstArray.config.url).toBeUndefined();

        const aliceArray = result.level1.arrays[1];
        expect(aliceArray.name).toBe('Alice');
        expect(aliceArray.scores).toEqual([300, 400]);
        expect(aliceArray.config.timeout).toBe(30);
        expect(aliceArray.config.enabled).toBe(true);
        expect(aliceArray.config.url).toBe('https://example.com');

        expect(result.level1.specialTypes.date).toBeInstanceOf(Date);
        expect(typeof result.level1.specialTypes.func).toBe('function');
        expect(result.level1.specialTypes.map).toBeInstanceOf(Map);
        expect(result.level1.specialTypes.set).toBeInstanceOf(Set);
        expect(result.level1.specialTypes.bool).toBe(false);
        expect(result.level1.specialTypes.zero).toBeUndefined();
        expect(result.level1.specialTypes.emptyStr).toBeUndefined();
        expect(result.level1.specialTypes.nullVal).toBeUndefined();
        expect(result.level1.specialTypes.undefinedVal).toBeUndefined();

        expect(result.rootArray).toEqual(['valid']);
        expect(result.rootString).toBeUndefined();
        expect(result.rootZero).toBeUndefined();
        expect(result.rootNull).toBeUndefined();
    });

    it('49 - handles large structures efficiently with performance requirements', () => {
        const largeInput: any = {};

        for (let i = 0; i < 1000; i++) {
            largeInput[`key${i}`] = i % 3 === 0 ? '' : i % 3 === 1 ? 0 : `value${i}`;
        }

        largeInput.nested = { ...largeInput };
        largeInput.array = Object.keys(largeInput).map(key => largeInput[key]);

        const options: DeepCleanOptions = {
            cleanEmptyString: true,
            cleanZero: true
        };

        const startTime = Date.now();
        const result = deepClean(largeInput, options);
        const endTime = Date.now();

        expect(endTime - startTime).toBeLessThan(1000);
        expect(Object.keys(result).length).toBeLessThan(1000);
        expect(result.array.every((item: any) => item !== '' && item !== 0)).toBe(true);
    });

    it('50 - handles circular references in objects without causing infinite recursion', () => {
        // Create an object with circular reference
        const circularObj: any = {
            name: 'test',
            data: { value: 42 },
            nested: {
                level: 1,
                items: ['a', 'b', 'c']
            }
        };

        // Create circular reference
        circularObj.self = circularObj;
        circularObj.nested.parent = circularObj;

        const input = {
            normal: 'value',
            circular: circularObj,
            nullValue: null,
            empty: {}
        };

        // This should not throw or cause infinite recursion
        const out = deepClean(input);

        // Verify that circular references are handled gracefully
        expect(out.normal).toBe('value');
        expect(out.circular).toBeDefined();
        expect(out.circular.name).toBe('test');
        expect(out.circular.data.value).toBe(42);
        expect(out.circular.nested.level).toBe(1);
        expect(out.circular.nested.items).toEqual(['a', 'b', 'c']);

        // Circular references should be preserved as-is (not cleaned)
        expect(out.circular.self).toBe(out.circular);
        expect(out.circular.nested.parent).toBe(out.circular);

        // Other cleaning should work normally
        expect(out.nullValue).toBeUndefined();
        expect(out.empty).toBeUndefined();
    });

    it('51 - handles edge cases with empty objects and arrays in combination with other options', () => {
        const input = {
            emptyObject: {},
            emptyArray: [],
            objectWithEmpty: {
                empty: {},
                nestedEmpty: { level: { deep: {} } },
                mixed: { valid: 'value', empty: {} }
            },
            arrayWithEmpty: [
                {},
                [],
                { valid: 1 },
                [],
                { empty: {} }
            ],
            zerosAndEmpties: {
                zero: 0,
                empty: '',
                false: false,
                null: null,
                array: [0, '', null, {}],
                nested: {
                    zero: 0,
                    empty: '',
                    object: {}
                }
            }
        };

        const options: DeepCleanOptions = {
            cleanEmptyString: true,
            cleanZero: true,
            removeNull: true,
            removeUndefined: true
        };

        const out = deepClean(input, options);

        expect(out.emptyObject).toBeUndefined();
        expect(out.emptyArray).toBeUndefined();

        expect(out.objectWithEmpty.empty).toBeUndefined();
        expect(out.objectWithEmpty.nestedEmpty).toBeUndefined();
        expect(out.objectWithEmpty.mixed).toEqual({ valid: 'value' });

        expect(out.arrayWithEmpty).toEqual([{ valid: 1 }]);

        expect(out.zerosAndEmpties.false).toBe(false);
        expect(out.zerosAndEmpties.array).toBeUndefined(); // Empty array becomes undefined
        expect(out.zerosAndEmpties.nested).toBeUndefined();
    });

    it('52 - handles combination of cleanZero with preserveFalse option behavior', () => {
        const input = {
            a: 0,
            b: false,
            c: '',
            d: null,
            e: undefined,
            nested: {
                zero: 0,
                false: false,
                empty: ''
            }
        };

        const options: DeepCleanOptions = {
            cleanZero: true,
            cleanEmptyString: true,
            removeNull: true,
            removeUndefined: true
        };

        const out = deepClean(input, options);
        expect(out).toEqual({
            b: false,
            nested: {
                false: false
            }
        });
    });

    it('53 - handles complex nested arrays with mixed empty values', () => {
        const input = {
            data: [
                [0, '', null],
                [1, [0, '', 2], {}],
                [{ value: 0 }, { text: '' }],
                []
            ]
        };

        const options: DeepCleanOptions = {
            cleanZero: true,
            cleanEmptyString: true,
            removeNull: true
        };

        const out = deepClean(input, options);
        expect(out).toEqual({
            data: [
                [1, [2]]
            ]
        });
    });

    // برای خط 14 (احتمالاً مربوط به Buffer-like objects)
    it('54 - handles Buffer-like objects and special atomic values', () => {
        // Buffer-like object
        const bufferLike = { type: 'Buffer', data: [1, 2, 3] };
        expect(deepClean(bufferLike as any)).toBe(bufferLike);

        // primitive wrapper objects
        expect(deepClean(new String('test') as any)).toBeInstanceOf(String);
        expect(deepClean(new Number(42) as any)).toBeInstanceOf(Number);
        expect(deepClean(new Boolean(true) as any)).toBeInstanceOf(Boolean);
    });

    it('55 - handles array edge cases with various empty values', () => {
        const input = {
            arr: [
                undefined,
                null,
                0,
                '',
                'valid',
                42
            ]
        };

        const out1 = deepClean(input, { removeUndefined: false });
        expect(out1.arr).toContain(undefined);

        const out2 = deepClean(input, { removeNull: false });
        expect(out2.arr).toContain(null);
    });

    it('56 - handles object property edge cases', () => {
        const input = {
            shouldKeep: 'value',
            shouldRemove: null,
            nested: {
                keep: 42,
                remove: undefined
            }
        };

        const out = deepClean(input, {
            removeNull: false,
            removeUndefined: false
        });

        expect(out.shouldRemove).toBeNull();
        expect(out.nested.remove).toBeUndefined();
    });
});