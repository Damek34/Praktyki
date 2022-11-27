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