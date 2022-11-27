/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nvar arr;\r\nvar range;\r\n__webpack_require__.g.ChangeRange = function () {\r\n    var select = document.getElementById(\"number_of_news\");\r\n    range = select.value;\r\n    console.log(range);\r\n    showNews(firstNews, parseInt(range));\r\n};\r\nvar firstNews = 0;\r\n// zwraca tablice z id nowych newsow\r\nvar getNewsIdList = function (first, range) { return __awaiter(_this, void 0, void 0, function () {\r\n    var _this = this;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, fetch('https://hacker-news.firebaseio.com/v0/newstories.json?type=story')\r\n                    .then(function (result) { return result.json(); })\r\n                    .then(function (newsIdList) { return __awaiter(_this, void 0, void 0, function () {\r\n                    var _this = this;\r\n                    return __generator(this, function (_a) {\r\n                        switch (_a.label) {\r\n                            case 0:\r\n                                newsIdList = newsIdList.slice(first, range);\r\n                                return [4 /*yield*/, Promise.all(newsIdList.map(function (newsId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {\r\n                                        switch (_a.label) {\r\n                                            case 0: return [4 /*yield*/, getNews(newsId)];\r\n                                            case 1: return [2 /*return*/, _a.sent()];\r\n                                        }\r\n                                    }); }); }))];\r\n                            case 1:\r\n                                arr = _a.sent();\r\n                                return [2 /*return*/, arr];\r\n                        }\r\n                    });\r\n                }); })];\r\n            case 1: return [2 /*return*/, _a.sent()];\r\n        }\r\n    });\r\n}); };\r\n// zwraca obiekt news\r\nvar getNews = function (id) { return __awaiter(_this, void 0, void 0, function () {\r\n    var data, news;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, fetch(\"https://hacker-news.firebaseio.com/v0/item/\".concat(id, \".json\"))];\r\n            case 1:\r\n                data = _a.sent();\r\n                return [4 /*yield*/, data.json()];\r\n            case 2:\r\n                news = _a.sent();\r\n                return [2 /*return*/, news];\r\n        }\r\n    });\r\n}); };\r\nvar showItem = function (item) {\r\n    var list = document.getElementById('newsList');\r\n    var listElement = document.createElement('div');\r\n    listElement.className += 'card my-4';\r\n    var itemHeader = document.createElement('div');\r\n    itemHeader.className += 'card-header';\r\n    var itemFooter = document.createElement('div');\r\n    itemFooter.className += 'card-footer';\r\n    var itemTitle = document.createElement('p');\r\n    itemTitle.innerHTML = item.title;\r\n    itemTitle.className += 'card-header-title';\r\n    itemHeader.appendChild(itemTitle);\r\n    listElement.appendChild(itemHeader);\r\n    if (item.text != null) {\r\n        var itemBody = document.createElement('p');\r\n        itemBody.innerHTML = item.text;\r\n        itemBody.className += 'card-content';\r\n        listElement.appendChild(itemBody);\r\n    }\r\n    var itemDate = document.createElement('p');\r\n    var date = new Date(item.time * 1000);\r\n    itemDate.innerHTML += date.toLocaleDateString();\r\n    itemDate.innerHTML += \" \" + date.toLocaleTimeString('pl-PL');\r\n    itemDate.className += 'card-footer-item has-text-right';\r\n    itemFooter.appendChild(itemDate);\r\n    listElement.appendChild(itemFooter);\r\n    list === null || list === void 0 ? void 0 : list.appendChild(listElement);\r\n    //otwieranie linku\r\n    var newsLink = function (itemF) {\r\n        window.open(itemF.url, \"_blank\");\r\n    };\r\n    listElement.addEventListener(\"click\", function () {\r\n        newsLink(item);\r\n    });\r\n};\r\nvar showNews = function (first, range) { return getNewsIdList(first, range).then(function (list) {\r\n    document.getElementById('newsList').innerHTML = \"\";\r\n    list.sort(function (a, b) { return a.time - b.time; });\r\n    list.forEach(function (news) {\r\n        showItem(news);\r\n    });\r\n}); };\r\n/*const newsLink = (item) =>\r\n    {\r\n        window.open (item.url, \"_blank\");\r\n    }\r\n*/\r\nshowNews(firstNews, range);\r\n\n\n//# sourceURL=webpack://hackernews/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;