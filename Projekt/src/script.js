fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
    .then(function (result) { return result.json(); })
    .then(function (news) { return console.log(news); });
