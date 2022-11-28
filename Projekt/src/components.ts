import { title } from "process"

const createDiv = (classname: string) => {
	let div = document.createElement('div')
	div.className = classname
	return div
}

const createElement = (element, classname: string) => {
	let el = document.createElement(element)
	el.className = classname
	return el
}

export const getNewsView = (item) => {
	let newsCard = document.createElement('div')
	newsCard.className += 'card my-4'
	let itemHeader = document.createElement('div')
	itemHeader.className += 'card-header inline-flex'
	let itemFooter = document.createElement('footer')
	itemFooter.className += 'card-footer'

	let itemTitle = document.createElement('p')
	itemTitle.innerHTML = item.title
	itemTitle.className += 'card-header-title'
	itemTitle.setAttribute('style', 'cursor: pointer')

	let itemScore = document.createElement('p')
	itemScore.innerHTML = item.score
	itemScore.setAttribute('style', 'width: 5%; text-align:center')
	itemScore.className += 'card-header-icon'

	itemHeader.appendChild(itemTitle)
	itemHeader.appendChild(itemScore)
	newsCard.appendChild(itemHeader)

	if(item.text != null) {
		let itemBody = document.createElement('p')
		itemBody.innerHTML = item.text
		itemBody.className += 'card-content'
		newsCard.appendChild(itemBody)
	}

	let itemDate = document.createElement('p')
	let date = new Date(item.time * 1000)
	itemDate.innerHTML += date.toLocaleDateString()
	itemDate.innerHTML += " " + date.toLocaleTimeString('pl-PL')
	itemDate.className += 'card-footer-item has-text-right'

	//ukrywanie newsów
	let hideButton = document.createElement('p');
	hideButton.className += 'hideNews card-footer-item';

	hideButton.innerHTML += "<i class='fa-solid fa-eye-slash'></i>Hide";
	hideButton.setAttribute('style', 'cursor: pointer')
	itemFooter.appendChild(hideButton);

	hideButton.addEventListener("click", function()
	{
		global.hide(item);
	});
	itemFooter.appendChild(itemDate)

	newsCard.appendChild(itemFooter)

	//otwieranie linku
	const newsLink = (itemF) =>
	{
		window.open (itemF.url, "_blank");
	}

	itemTitle.addEventListener("click", function()
	{
		newsLink(item);
	});

	return newsCard
}

export const getAddJobBtn = () => {
	let btn = createElement('button', 'button is-primary') as HTMLButtonElement
	btn.innerHTML = 'Add job offer'
	btn.addEventListener('click', () => {
		let options = btn.parentNode as HTMLElement
		if(options.getElementsByTagName('form').length == 0)
			btn.parentNode?.appendChild(addForm('Add job offer', 'Title', 'Description', global.addToJobList, 'job'))
	})

	return btn
}

export const getAddAskBtn = () => {
	let btn = createElement('button', 'button is-primary') as HTMLButtonElement
	btn.innerHTML = 'Ask question'
	btn.addEventListener('click', () => {
		let options = btn.parentNode as HTMLElement
		if(options.getElementsByTagName('form').length == 0)
			btn.parentNode?.appendChild(addForm('Ask question', 'Title', 'Description', global.addToAskList, 'ask'))
	})

	return btn
}


const addForm = (formtitle, label1, label2, onsubmit: Function, formType):Node => {
	let form = createElement('form', 'panel')

	// Heading
	let panelHeading = createElement('div', 'panel-heading notification')
	let header = createElement('p', '')
	header.innerHTML = formtitle

	let close = createElement('button', 'delete')
	close.type = 'button'
	close.addEventListener('click', () => {
		let options = form.parentNode as HTMLElement
		options.removeChild(form)
	})

	panelHeading.appendChild(header)
	panelHeading.appendChild(close)

	// Panel block
	let panelBlock = createElement('div', 'content')
	panelBlock.setAttribute('style', 'padding: .5em .75em;')

	// Job title
	let titleField = createDiv('field')
	let titleLabel = createElement('label', 'label')
	titleLabel.innerHTML = label1
	let titleControl = createDiv('control')
	let titleInput = createElement('input', 'input')

	titleControl.appendChild(titleInput)

	titleField.appendChild(titleLabel)
	titleField.appendChild(titleControl)

	// Job description
	let descField = createDiv('field')
	let descLabel = createElement('label', 'label')
	descLabel.innerHTML = label2
	let descControl = createDiv('control')
	let textArea  = createElement('textarea', 'textarea is-info')

	descControl.appendChild(textArea)

	descField.appendChild(descLabel)
	descField.appendChild(descControl)

	// Submit
	let subField = createDiv('control')
	let btn = createElement('button', 'button is-success') as HTMLButtonElement
	btn.innerHTML = 'Submit'


	btn.type = 'button'
	btn.addEventListener('click', () => {
		let item = {
			title: titleInput.value,
			text: textArea.value,
			type: formType,
			time: Date.now() / 1000,
			score: 0,
		}
		onsubmit(item)
	})
	subField.appendChild(btn)

	//
	form.appendChild(panelHeading)
	panelBlock.appendChild(titleField)
	panelBlock.appendChild(descField)
	form.appendChild(panelBlock)
	form.appendChild(subField)
	return form
}