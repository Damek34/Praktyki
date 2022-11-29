"use strict";
exports.__esModule = true;
exports.getFilterByDate = exports.getAddAskBtn = exports.getAddJobBtn = exports.getNewsView = void 0;
var createDiv = function (classname) {
    var div = document.createElement('div');
    div.className = classname;
    return div;
};
var createElement = function (element, classname) {
    var el = document.createElement(element);
    el.className = classname;
    return el;
};
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
var getAddJobBtn = function () {
    var btn = createElement('button', 'button is-primary');
    btn.innerHTML = 'Add job offer';
    btn.addEventListener('click', function () {
        var _a;
        var options = btn.parentNode;
        if (options.getElementsByTagName('form').length == 0)
            (_a = btn.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(addForm('Add job offer', 'Title', 'Description', global.addToJobList, 'job'));
    });
    return btn;
};
exports.getAddJobBtn = getAddJobBtn;
var getAddAskBtn = function () {
    var btn = createElement('button', 'button is-primary');
    btn.innerHTML = 'Ask question';
    btn.addEventListener('click', function () {
        var _a;
        var options = btn.parentNode;
        if (options.getElementsByTagName('form').length == 0)
            (_a = btn.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(addForm('Ask question', 'Title', 'Description', global.addToAskList, 'ask'));
    });
    return btn;
};
exports.getAddAskBtn = getAddAskBtn;
var getFilterByDate = function () {
    var input = createElement('input', 'input');
    input.setAttribute('type', 'date');
    input.min = new Date(Date.now()).toLocaleDateString();
    input.id = 'inputDate';
    var controlInput = createDiv('control');
    controlInput.appendChild(input);
    var btn = createElement('button', 'button is-info');
    var controlBtn = createDiv('control');
    controlBtn.appendChild(btn);
    btn.innerHTML = 'Search';
    btn.addEventListener('click', global.onClickSearchDate);
    btn.type = 'button';
    var group = createDiv('field has-addons');
    group.appendChild(controlInput);
    group.appendChild(controlBtn);
    return group;
};
exports.getFilterByDate = getFilterByDate;
var addForm = function (formtitle, label1, label2, onsubmit, formType) {
    var form = createElement('form', 'panel');
    // Heading
    var panelHeading = createElement('div', 'panel-heading notification');
    var header = createElement('p', '');
    panelHeading.setAttribute('style', 'margin-top: 10px;');
    header.innerHTML = formtitle;
    var close = createElement('button', 'delete');
    close.type = 'button';
    close.addEventListener('click', function () {
        var options = form.parentNode;
        options.removeChild(form);
    });
    panelHeading.appendChild(header);
    panelHeading.appendChild(close);
    // Panel block
    var panelBlock = createElement('div', 'content');
    panelBlock.setAttribute('style', 'padding: .5em .75em;');
    // Job title
    var titleField = createDiv('field');
    var titleLabel = createElement('label', 'label');
    titleLabel.innerHTML = label1;
    var titleControl = createDiv('control');
    var titleInput = createElement('input', 'input');
    titleControl.appendChild(titleInput);
    titleField.appendChild(titleLabel);
    titleField.appendChild(titleControl);
    // Job description
    var descField = createDiv('field');
    var descLabel = createElement('label', 'label');
    descLabel.innerHTML = label2;
    var descControl = createDiv('control');
    var textArea = createElement('textarea', 'textarea is-info');
    descControl.appendChild(textArea);
    descField.appendChild(descLabel);
    descField.appendChild(descControl);
    // Submit
    var subField = createDiv('control is-inline-flex is-justify-content-right');
    var btn = createElement('button', 'button is-success');
    btn.innerHTML = 'Submit';
    subField.setAttribute('style', 'width: 100%; padding-bottom: 15px; padding-right: 15px;');
    btn.type = 'button';
    btn.addEventListener('click', function () {
        var item = {
            title: titleInput.value,
            text: textArea.value,
            type: formType,
            time: Date.now() / 1000,
            score: 0
        };
        onsubmit(item);
    });
    subField.appendChild(btn);
    //
    form.appendChild(panelHeading);
    panelBlock.appendChild(titleField);
    panelBlock.appendChild(descField);
    form.appendChild(panelBlock);
    form.appendChild(subField);
    return form;
};
