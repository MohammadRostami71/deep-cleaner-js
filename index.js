function cleanData(data, config = {}) {
    const defaultConfig = {
        cleanNull: true,
        cleanUndefined: true,
        cleanEmptyString: false,
        cleanZero: false,
    };

    config = { ...defaultConfig, ...config };

    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            throw new Error("Invalid JSON string provided.");
        }
    }

    if (Array.isArray(data)) {
        return cleanArray(data, config);
    } else if (data && typeof data === 'object') {
        return cleanObject(data, config);
    }

    throw new Error("Input must be an object, array, or a valid JSON string.");
}

function cleanObject(obj, config) {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            obj[key] = cleanArray(obj[key], config);
        } else if (obj[key] && typeof obj[key] === 'object') {
            obj[key] = cleanObject(obj[key], config);
        }

        if ((config.cleanNull && obj[key] === null) ||
            (config.cleanUndefined && obj[key] === undefined) ||
            (config.cleanEmptyString && obj[key] === '') ||
            (config.cleanZero && obj[key] === 0)) {
            delete obj[key];
        }
    });
    return obj;
}

function cleanArray(arr, config) {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            const cleanedItem = cleanArray(item, config);
            if (cleanedItem.length > 0) {
                acc.push(cleanedItem);
            }
        } else if (item && typeof item === 'object') {
            const cleanedItem = cleanObject(item, config);
            if (Object.keys(cleanedItem).length > 0) {
                acc.push(cleanedItem);
            }
        } else if (!((config.cleanNull && item === null) ||
            (config.cleanUndefined && item === undefined) ||
            (config.cleanEmptyString && item === '') ||
            (config.cleanZero && item === 0))) {
            acc.push(item);
        }
        return acc;
    }, []);
}

module.exports = cleanData;