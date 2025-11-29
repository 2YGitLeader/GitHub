const iterate = (object, callback) => {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      callback(key, object[key], object);
    }
  }
};
const obj = { a: 1, b: 2, c: 3, d: 4 };
console.log("--- Вывод iterate ---");
iterate(obj, (key, value, fullObject) => {
  console.log(`Ключ: ${key}, Значение: ${value}, Объект: ${fullObject === obj ? 'Совпадает' : 'Не совпадает'}`);
});
const store = (value) => {
  return () => {
    return value;
  };
};
const read1 = store(5);
const value1 = read1();
console.log("\n--- Вывод store ---");
console.log(`Первое значение: ${value1}`); 
const read2 = store("Hello Closure");
const value2 = read2();
console.log(`Второе значение: ${value2}`);
const contract = (fn, ...types) => {
  const resultType = types[types.length - 1];
  const argumentTypes = types.slice(0, types.length - 1);
  if (fn.length !== argumentTypes.length) {
    throw new Error(`Контракт типов: Ожидалось ${fn.length} типов аргументов, получено ${argumentTypes.length}.`);
  }
  return function (...args) {
    for (let i = 0; i < argumentTypes.length; i++) {
      const expectedType = argumentTypes[i];
      const actualValue = args[i];
      if (actualValue.constructor !== expectedType) {
        throw new TypeError(
          `Неверный тип аргумента #${i + 1}. Ожидался: ${expectedType.name}, Получен: ${actualValue.constructor.name}`
        );
      }
    }
    const result = fn.apply(this, args);
    if (result.constructor !== resultType) {
      throw new TypeError(
        `Неверный тип результата. Ожидался: ${resultType.name}, Получен: ${result.constructor.name}`
      );
    }
    return result;
  };
};
console.log("\n--- Вывод contract: Успешные вызовы ---");
const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
const resAdd = addNumbers(2, 3);
console.log(`addNumbers(2, 3) -> ${resAdd} (Тип: ${resAdd.constructor.name})`);
const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const resConcat = concatStrings('Hello ', 'world!');
console.log(`concatStrings('Hello ', 'world!') -> ${resConcat} (Тип: ${resConcat.constructor.name})`);
const identity = (o) => o;
const objectIdentity = contract(identity, Object, Object);
const resObj = objectIdentity({ x: 1 });
console.log(`objectIdentity({ x: 1 }) -> ${JSON.stringify(resObj)} (Тип: ${resObj.constructor.name})`);
console.log("\n--- Вывод contract: Неудачный вызов (ожидается TypeError) ---");
try {
  const failedRes = addNumbers(2, '3');
  console.log("ОШИБКА: Исключение не было сгенерировано.");
} catch (error) {
  if (error instanceof TypeError) {
    console.error(`Успешно сгенерировано исключение TypeError: ${error.message}`);
  } else {
    console.error(`Сгенерировано неожиданное исключение: ${error}`);
  }
}