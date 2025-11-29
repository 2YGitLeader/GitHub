const pipe = (...fns) => {
    for (const fn of fns) {
        if (typeof fn !== 'function') {
            throw new Error(`pipe: Argument must be a function. Received ${typeof fn}.`);
        }
    }
    return initialValue => {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
};
const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;
const f1 = pipe(inc, twice, cube);
const x1 = f1(5); 
console.log(`f1(5) = ${x1}`);
const f2 = pipe(inc, inc);
const x2 = f2(7);
console.log(`f2(7) = ${x2}`); 
const composeWithErrorHandler = (...fns) => {
    const errorListeners = [];
    const composed = initialValue => {
        let result = initialValue;
        const reversedFns = [...fns].reverse();
        for (const fn of reversedFns) {
            if (typeof fn !== 'function') {
                const error = new Error(`compose: Argument must be a function. Received ${typeof fn}.`);
                errorListeners.forEach(listener => listener(error));
                return undefined;
                try {
                    result = fn(result);
                } catch (e) {
                    errorListeners.forEach(listener => listener(e));
                    return undefined;
                }
            }
            return result;
        };
        composed.on = (eventName, listener) => {
            if (eventName === 'error' && typeof listener === 'function') {
                errorListeners.push(listener);
            }
            return composed;
        };
        return composed;
    };
    const inc = x => ++x;
    const errorFn = x => {
        if (x === 10) {
            throw new Error("Value is exactly 10!");
        }
        return x + 1;
    };
    const square = x => x * x;
    const f = composeWithErrorHandler(square, errorFn, inc);
    f.on('error', e => {
        console.error(`\n Ошибка перехвачена слушателем: ${e.message}`);
    });
    console.log('--- Тест 1: Без ошибки ---');
    const x1 = f(1);
    console.log(`f(1) = ${x1}`);
    console.log('\n--- Тест 2: С ошибкой ---');
    const x2 = f(8);
    console.log(`f(8) = ${x2}`);
}