const cleanData = require('../index');

describe('should clean null values ', () => {
    const testData = {
        name: "Mohammad",
        age: null,
        email: null,
        address: {
            street: "456 Elm St",
            city: undefined,
            zip: null
        },
        hobbies: [
            {name: "Swimming", level: "Intermediate"},
            {name: "Gaming", level: null},
            null
        ],
    };

    test('should clean null values based on config', () => {
        const config = {cleanNull: true};
        const cleaned = cleanData(testData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St",
                city: undefined,
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"},
            ],
        });
    });

    test('should clean null values based on default config', () => {
        const cleaned = cleanData(testData);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St",
                city: undefined,
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"},
            ],
        });
    });
});

describe('should clean undefined values ', () => {
    const testData = {
        name: "Mohammad",
        age: undefined,
        email: undefined,
        address: {
            street: "456 Elm St",
            city: undefined,
            zip: null
        },
        hobbies: [
            {name: "Swimming", level: "Intermediate"},
            {name: "Gaming", level: undefined},
            undefined
        ],
    };

    test('should clean undefined values based on config', () => {
        const config = {cleanNull: false, cleanUndefined: true};
        const cleaned = cleanData(testData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St",
                zip: null
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"},
            ],
        });
    });

    test('should clean undefined values based on default config', () => {
        const cleaned = cleanData(testData);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St",
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"},
            ],
        });
    });
});

describe('should clean empty strings values', () => {
    test('should clean empty strings based on config', () => {
        const config = {cleanUndefined: false, cleanNull: false, cleanEmptyString: true};
        const testData = {
            name: "Mohammad",
            age: '',
            email: '',
            address: {
                street: "456 Elm St",
                city: undefined,
                zip: ''
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming", level: ''},
                ''
            ],
            preferences: {
                color: "blue",
                food: "Pasta",
                nestedArray: ['', "Item", undefined, ['', 1, 2]]
            }
        };
        const cleaned = cleanData(testData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St",
                city: undefined
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"}
            ],
            preferences: {
                color: "blue",
                food: "Pasta",
                nestedArray: ["Item", undefined, [1, 2]]
            }
        });
    });
});

describe('should clean zero values', () => {

    test('clean zero values based on config', () => {
        const config = {cleanZero: true};
        const testData = {
            name: "Mohammad",
            age: 0,
            email: 'mohammad.rostami13@gmail.com',
            address: {
                street: "456 Elm St",
                city: undefined,
                zip: 0
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming", level: 0},
                ''
            ],
            preferences: {
                color: "blue",
                food: "Pasta",
                nestedArray: [0, "Item", undefined, [0, 1, 2]]
            }
        };

        const cleaned = cleanData(testData, config);

        expect(cleaned).toEqual({
            name: "Mohammad",
            email: 'mohammad.rostami13@gmail.com',
            address: {
                street: "456 Elm St",
            },
            hobbies: [
                {name: "Swimming", level: "Intermediate"},
                {name: "Gaming"},
                ''
            ],
            preferences: {
                color: "blue",
                food: "Pasta",
                nestedArray: ["Item", [1, 2]]
            }
        });
    });
});

describe('should throw an error', () => {
    test('should throw an error for invalid JSON string', () => {
        expect(() => cleanData('Invalid JSON', {})).toThrow("Invalid JSON string provided.");
    });

    test('should throw an error for unsupported types', () => {
        expect(() => cleanData(123, {})).toThrow("Input must be an object, array, or a valid JSON string.");
        expect(() => cleanData(true, {})).toThrow("Input must be an object, array, or a valid JSON string.");
        expect(() => cleanData(null, {})).toThrow("Input must be an object, array, or a valid JSON string.");
    });
});


describe('cleanData with JSON data types', () => {
    test('should clean JSON string input with null values', () => {
        const jsonData = JSON.stringify({
            name: "Mohammad",
            age: null,
            address: {
                street: "123 Main St",
                city: null
            },
            hobbies: ["Reading", null, "Traveling"]
        });

        const config = {cleanNull: true};
        const cleaned = cleanData(jsonData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "123 Main St"
            },
            hobbies: ["Reading", "Traveling"]
        });
    });

    test('should clean JSON string input with undefined values', () => {
        const jsonData = JSON.stringify({
            name: "Mohammad",
            age: undefined,
            address: {
                street: "456 Elm St",
                city: undefined
            }
        });

        const config = {cleanUndefined: true};
        const cleaned = cleanData(jsonData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "456 Elm St"
            }
        });
    });

    test('should clean JSON string input with empty strings', () => {
        const jsonData = JSON.stringify({
            name: "Mohammad",
            email: "",
            address: {
                street: "789 Oak St",
                city: ""
            }
        });

        const config = {cleanEmptyString: true};
        const cleaned = cleanData(jsonData, config);
        expect(cleaned).toEqual({
            name: "Mohammad",
            address: {
                street: "789 Oak St"
            }
        });
    });

    test('should clean JSON string input with zero values', () => {
        const jsonData = JSON.stringify({
            id: 1,
            value: 0,
            details: {
                count: 0,
                description: "Sample"
            }
        });

        const config = {cleanZero: true};
        const cleaned = cleanData(jsonData, config);
        expect(cleaned).toEqual({
            id: 1,
            details: {
                description: "Sample"
            }
        });
    });
});