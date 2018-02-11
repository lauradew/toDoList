const { getMetadata } = require('page-metadata-parser');

const url = "http://www.imdb.com/title/tt0120737/";
const response = await fetch(url, {body: JSON.stringify(data)});
const html = await response.text();
const doc = new JSDOM(html);
const metadata = getMetadata(doc, url);