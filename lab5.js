function seq(fn) {
  function chain(arg) {
    if (typeof arg === 'function') {
      funcStack.push(arg);
      return chain;
    } else if (typeof arg === 'number') {
      return funcStack.reduce((result, currentFn) => currentFn(result), arg);
    }
  }
  return chain;
}
console.log(
  seq(x => x + 7)
     (x => x * 2)(5)
);
function seq(fn) {
  const funcStack = [fn];
  function chain(arg) {
    if (typeof arg === 'function') {
      funcStack.push(arg);
      return chain;
    } else if (typeof arg === 'number') {
      return funcStack.reduceRight((result, currentFn) => currentFn(result), arg);
    }
  }
  return chain;
}
console.log(
  seq(x => x + 7)
     (x => x * 2)(5)
); 
console.log(
  seq(x => x * 2)
     (x => x + 7)(5)
); 
console.log(
  seq(x => x + 1)
     (x => x * 2)
     (x => x / 3)
     (x => x - 4)(7)
); 
function array() {
  const data = [];
  const accessor = function(index) {
    return data[index];
  };
  accessor.push = function(value) {
    return data.push(value);
  };
  accessor.pop = function() {
    return data.pop();
  };
  return accessor;
}
const arr = array();
arr.push('first');
arr.push('second');
arr.push('third');
console.log(arr(0)); 
console.log(arr(1)); 
console.log(arr(2));
console.log('---');
console.log(arr.pop()); 
console.log(arr.pop());
console.log(arr.pop()); 
console.log(arr.pop()); 