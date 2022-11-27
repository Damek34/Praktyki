"use strict";
exports.__esModule = true;
exports.getNewsView = void 0;
var getNewsView = function (item) {
    var newsCard = document.createElement('div');
    newsCard.className += 'card my-4';
    var itemHeader = document.createElement('div');
    itemHeader.className += 'card-header inline-flex';
    var itemFooter = document.createElement('footer');
    itemFooter.className += 'card-footer';
    var itemTitle = document.createElement('p');
    itemTitle.innerHTML = item.title;
    itemTitle.className += 'card-header-title';
    itemTitle.setAttribute('style', 'cursor: pointer');
    var itemScore = document.createElement('p');
    itemScore.innerHTML = item.score;
    itemScore.setAttribute('style', 'width: 5%; text-align:center');
    itemScore.className += 'card-header-icon';
    itemHeader.appendChild(itemTitle);
    itemHeader.appendChild(itemScore);
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
    //ukrywanie newsów
    var hideButton = document.createElement('p');
    hideButton.className += 'hideNews card-footer-item';
    hideButton.innerHTML += "<i class='fa-solid fa-eye-slash'></i>Hide";
    hideButton.setAttribute('style', 'cursor: pointer');
    itemFooter.appendChild(hideButton);
    hideButton.addEventListener("click", function () {
        global.hide(item);
    });
    itemFooter.appendChild(itemDate);
    newsCard.appendChild(itemFooter);
    //otwieranie linku
    var newsLink = function (itemF) {
        window.open(itemF.url, "_blank");
    };
    itemTitle.addEventListener("click", function () {
        newsLink(item);
    });
    return newsCard;
};
exports.getNewsView = getNewsView;
