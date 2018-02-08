// ----------------------------------------
// v1.0 of categorization with NLP
// need more training data
// ----------------------------------------
const bayes = require('bayes-classifier');
const bayesClassifier = new bayes();
const stopwords = require('stopword');

// create arrays to train each category
const eatDocuments = ['i want to eat some fries',
  'i want to eat noodles',
  'i want some chinese food',
  'i want to consume sushi'
];

const buyDocuments = [
  'i want a new phone',
  'i need to buy groceries',
  'i need a new car',
  'i need to buy school supplies',
  'i need a new laptop',
  'i need a new bike'
];

const watchDocuments = [
  'I want see the new batman movie',
  'i need to watch black mirror'
];


const readDocuments = [
  'i want to read game of thrones',
  'i want to read the vancouver sun article',
  'i want to read lotr'
];

// add the training data to corresponding category
bayesClassifier.addDocuments(eatDocuments, 'eat');
bayesClassifier.addDocuments(buyDocuments, 'buy');
bayesClassifier.addDocuments(watchDocuments, 'watch');
bayesClassifier.addDocuments(readDocuments, 'read');

bayesClassifier.train();

// sample for implementing into app
const str = "i wanna buy a bike";
const userStringSplit = str.split(' ');
const newStr = stopwords.removeStopwords(userStringSplit);

// console.log(bayesClassifier.classify('pizza'));
// console.log(bayesClassifier.classify('read harry potter'));
// console.log(bayesClassifier.classify('buy a bike'));
// console.log(bayesClassifier.classify('watch batman'));

// should log the string 'buy'
console.log(bayesClassifier.classify(newStr));
