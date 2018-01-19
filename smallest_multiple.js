/**
 * Build a function that finds the smallest positive number that is evenly
 * divisible by all of the numbers starting from 1 up to the value passed into your function.
 *
 * @param  { Number } ceiling This value will serve as your ceiling.
 * @return { Number }         Lowest Positive Number that is evenly divisible by all numbers
 *                            between 1 and `ceiling`
 */
module.exports = function (ceiling) {
  /** BRUTE FORCE METHOD
  for (let i = ceiling; ; i ++) {
    let j = ceiling;
    for (; j >= 2; j --) {
      if (i % j !== 0) {
        break;
      }
    }
    if (j === 1) {
      return i;
    }
  }
  */
  let counts = {};
  for (let i = 1; i <= ceiling; i++) {
    let primeFactorization = primeFactors(i);
    Object.keys(primeFactorization).forEach((key) => {
      if (counts.hasOwnProperty(key)) {
        if (primeFactorization[key] > counts[key]) {
          counts[key] = primeFactorization[key];
        }
      } else {
        counts[key] = primeFactorization[key];
      }
    });
  }

  return Object.keys(counts).reduce((accum, key) => {
    accum *= Math.pow(key, counts[key]);
    return accum;
  }, 1);

};


function primeFactors(num) {
  let res = {};
  while (num % 2 === 0) {
    addToObject(res, 2);
    num /= 2;
  }

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      addToObject(res, i);
      num /= i;
    }
  }

  if (num > 2) {
    addToObject(res, num);
  }

  return res;
}

function addToObject(obj, key) {
  if (obj.hasOwnProperty(key)) {
    obj[key] ++;
  } else {
    obj[key] = 1;
  }
}