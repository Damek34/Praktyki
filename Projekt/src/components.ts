export const getNewsView = (item) => {
	let newsCard = document.createElement('div')
	newsCard.className += 'card my-4'
	let itemHeader = document.createElement('div')
	itemHeader.className += 'card-header inline-flex'
	let itemFooter = document.createElement('div')
	itemFooter.className += 'card-footer'

	let itemTitle = document.createElement('p')
	itemTitle.innerHTML = item.title
	itemTitle.className += 'card-header-title'
	// itemTitle.setAttribute('style', 'width: 60%')

	let itemScore = document.createElement('p')
	itemScore.innerHTML = item.score
	itemScore.setAttribute('style', 'width: 10%; text-algin:center')

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
	itemFooter.appendChild(itemDate)

	newsCard.appendChild(itemFooter)

	//otwieranie linku
	const newsLink = (itemF) =>
	{
		window.open (itemF.url, "_blank");
	}

		newsCard.addEventListener("click", function()
	{
		newsLink(item);
	});

	return newsCard
}