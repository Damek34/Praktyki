"use strict";
exports.__esModule = true;
exports.getNewsView = void 0;
var getNewsView = function (item) {
    var newsCard = document.createElement('div');
    newsCard.className += 'card my-4';
    var itemHeader = document.createElement('div');
    itemHeader.className += 'card-header';
    var itemFooter = document.createElement('div');
    itemFooter.className += 'card-footer';
    var itemTitle = document.createElement('p');
    itemTitle.innerHTML = item.title;
    itemTitle.className += 'card-header-title';
    itemHeader.appendChild(itemTitle);
    newsCard.appendChild(itemHeader);
    if (item.text != null) {
        var itemBody = document.createElement('p');
        itemBody.innerHTML = item.text;
        itemBody.className += 'card-content';
        newsCard.appendChild(itemBody);
    }
    var itemDate = document.createElement('p');
    var date = new Date(item.time * 1000);
    itemDate.innerHTML += date.toLocaleDateString();
    itemDate.innerHTML += " " + date.toLocaleTimeString('pl-PL');
    itemDate.className += 'card-footer-item has-text-right';
    itemFooter.appendChild(itemDate);
    newsCard.appendChild(itemFooter);
    //otwieranie linku
    var newsLink = function (itemF) {
        window.open(itemF.url, "_blank");
    };
    newsCard.addEventListener("click", function () {
        newsLink(item);
    });
    return newsCard;
};
exports.getNewsView = getNewsView;
