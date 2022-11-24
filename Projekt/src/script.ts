import fetch from "node-fetch";

fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
    .then((result) => result.json())
    .then((news) => console.log(news));
