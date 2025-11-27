function sumFor(...args) {
  let total = 0;
  for (let i = 0; i < args.length; i++) {
    total += args[i];
  }
  return total;
}

function sumForOf(...args) {
  let total = 0;
  for (const num of args) {
    total += num;
  }
  return total;
}

function sumWhile(...args) {
  let total = 0;
  let i = 0;
  while (i < args.length) {
    total += args[i];
    i++;
  }
  return total;
}

function sumDoWhile(...args) {
  if (args.length === 0) return 0;

  let total = 0;
  let i = 0;
  do {
    total += args[i];
    i++;
  } while (i < args.length);
  return total;
}

function sumReduce(...args) {
  return args.reduce((acc, current) => acc + current, 0);
}

const max = (matrix) => {
  let maxVal = -Infinity; 
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > maxVal) {
        maxVal = matrix[i][j];
      }
    }
  }
  return maxVal;
};
console.log(max([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); 

const persons = {
  lenin: { born: 1870, died: 1924 },
  mao: { born: 1893, died: 1976 },
  gandhi: { born: 1869, died: 1948 },
  hirohito: { born: 1901, died: 1989 },
};

const ages = (personsDict) => {
  const lifeSpans = {}; 
  for (const name in personsDict) {
    const person = personsDict[name];
    lifeSpans[name] = person.died - person.born;
  }
  return lifeSpans;
};
console.log(ages(persons));