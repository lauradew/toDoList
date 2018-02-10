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
  'i want to consume sushi',
  'i want to have a burger',
  'i want to eat pizza',
  'i would like a steak',
  'eat a horse',
  'drink a beer',
  'have a chocolate bar',
  'munch some chips',
  'make a salad',
  'make a sandwich'
];

const buyDocuments = [
  'i want a new phone',
  'i need to buy groceries',
  'i need a new car',
  'i need to buy school supplies',
  'i need a new laptop',
  'i need a new bike',
  'get a good book',
  'grab groceries',
  'buy some clothes',
  'pick up a new muffler'
];

const watchDocuments = [
  'i want see the new batman movie',
  'i need to watch black mirror',
  'checkout lord of the rings',
  'see the lion movie',
  'watch an episode of the office',
  'binge watch futurama',
  'watch the new season of better call saul',
  'see thor',
  'watch george lucas new movie'
];


const readDocuments = [
  'i want to read game of thrones',
  'i want to read the vancouver sun article',
  'i want to read lotr',
  'read girl with the dragon tattoo',
  'scan the political article',
  'read the newspaper',
  'look through seventeen magazine',
  'read a good cookbook',
  'read a stephen king novel'
];

// add the training data to corresponding category
bayesClassifier.addDocuments(eatDocuments, 'eat');
bayesClassifier.addDocuments(buyDocuments, 'buy');
bayesClassifier.addDocuments(watchDocuments, 'watch');
bayesClassifier.addDocuments(readDocuments, 'read');

bayesClassifier.train();

// sample for implementing into app
const str = "i wanna buy a bike";

// console.log(bayesClassifier.classify('pizza'));
// console.log(bayesClassifier.classify('read harry potter'));
// console.log(bayesClassifier.classify('buy a bike'));
// console.log(bayesClassifier.classify('watch batman'));

// function to export categorize by nlp


module.exports = function (phrase) {
  const userStringSplit = phrase.split(' ');
  const newStr = stopwords.removeStopwords(userStringSplit);
  return bayesClassifier.classify(newStr);
};
