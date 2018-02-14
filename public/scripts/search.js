var google = require('google-query');

google.search("watch lotr imdb", 1, function (url_list) {
  var url_str = url_list.slice(0, 3).join('\n');
  console.log(url_str);
});
