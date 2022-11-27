"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var components_1 = require("./components");
var newsIdList;
var newsList;
var firstNewsNum = 0;
var range = 30;
var sortingType;
var curNewsList;
var askStoryList;
var jobStoryList;
var topStoryList;
var bestStoryList;
global.ChangeRange = function () {
    var select = document.getElementById("number_of_news");
    range = parseInt(select.value);
    loadNews(firstNewsNum, range, sortingType, curNewsList);
};
global.prevPage = function () {
    if (firstNewsNum > 0) {
        firstNewsNum -= 1;
        var p = document.getElementById('pageNumber');
        p.innerHTML = firstNewsNum.toString();
        loadNews(firstNewsNum, range, sortingType, curNewsList);
    }
};
global.nextPage = function () {
    if (firstNewsNum <= curNewsList.length / range) {
        firstNewsNum += 1;
        var p = document.getElementById('pageNumber');
        p.innerHTML = firstNewsNum.toString();
        loadNews(firstNewsNum, range, sortingType, curNewsList);
    }
};
global.changeSortingType = function () {
    var select = document.getElementById("sortingType");
    switch (select.value) {
        case "new":
            sortingType = sortNew;
            break;
        case "best":
            sortingType = sortBest;
            break;
        case "old":
            sortingType = sortOld;
            break;
        default:
            sortingType = sortNew;
            break;
    }
    loadNews(firstNewsNum, range, sortingType, curNewsList);
};
global.changeNewsType = function () {
    var select = document.getElementById("newsType");
    switch (select.value) {
        case "today":
            curNewsList = newsList;
            break;
        case "ask":
            curNewsList = askStoryList;
            break;
        case 'job':
            curNewsList = jobStoryList;
            break;
        case 'past':
            curNewsList = bestStoryList;
            break;
        case 'welcome':
            curNewsList = topStoryList;
            break;
        default:
            curNewsList = newsList;
            break;
    }
    loadNews(firstNewsNum, range, sortingType, curNewsList);
};
// zwraca tablice z id nowych newsow
var getNewsIdList = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
                    .then(function (result) { return result.json(); })
                    .then(function (newsIdList) {
                    return newsIdList;
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// zwraca tablice newsow
var getNewsList = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(newsIdList.map(function (newsId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNewsData(newsId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getStoriesList = function (type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://hacker-news.firebaseio.com/v0/".concat(type, ".json"))
                    .then(function (result) { return result.json(); })
                    .then(function (storiesIdList) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Promise.all(storiesIdList.map(function (newsId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getNewsData(newsId)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); }))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// zwraca obiekt news
var getNewsData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, news;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://hacker-news.firebaseio.com/v0/item/".concat(id, ".json"))];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                news = _a.sent();
                return [2 /*return*/, news];
        }
    });
}); };
// konwertuje dane na html i wyświetla
var showItem = function (item) {
    var list = document.getElementById('newsList');
    list === null || list === void 0 ? void 0 : list.appendChild((0, components_1.getNewsView)(item));
};
// pobiera newsy gdy załaduje strone
global.onloadFun = function () { return getNewsIdList().then(function (list) { return __awaiter(void 0, void 0, void 0, function () {
    var sel1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newsIdList = list;
                sortingType = sortNew;
                return [4 /*yield*/, getNewsList()];
            case 1:
                newsList = _a.sent();
                curNewsList = newsList;
                loadNews(firstNewsNum, range, sortingType, newsList);
                return [4 /*yield*/, getStoriesList('askstories')];
            case 2:
                askStoryList = _a.sent();
                return [4 /*yield*/, getStoriesList('jobstories')];
            case 3:
                jobStoryList = _a.sent();
                return [4 /*yield*/, getStoriesList('topstories')];
            case 4:
                topStoryList = _a.sent();
                return [4 /*yield*/, getStoriesList('beststories')];
            case 5:
                bestStoryList = _a.sent();
                sel1 = document.getElementById('newsTypeDiv');
                sel1.className = "select";
                console.log("all loaded");
                return [2 /*return*/];
        }
    });
}); }); };
// pobiera dane
var loadNews = function (first, range, sortMethod, list) { return __awaiter(void 0, void 0, void 0, function () {
    var newsListHTML;
    return __generator(this, function (_a) {
        newsListHTML = document.getElementById('newsList');
        newsListHTML.innerHTML = "";
        list.sort(function (a, b) { return sortMethod(a, b); });
        list.slice(first * range, first * range + range).forEach(function (news) {
            showItem(news);
        });
        return [2 /*return*/];
    });
}); };
var sortNew = function (a, b) { return b.time - a.time; };
var sortOld = function (a, b) { return a.time - b.time; };
var sortBest = function (a, b) { return b.score - a.score; };
global.hide = function (itemF) {
    var id = newsList.indexOf(itemF);
    newsList.splice(id, 1);
    loadNews(firstNewsNum * range, range, sortingType, curNewsList);
};
