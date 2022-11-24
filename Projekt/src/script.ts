let arr: Array<number>
let range: number = 30

// zwraca tablice z id nowych newsow
fetch('https://hacker-news.firebaseio.com/v0/newstories.json?type=story')
	.then((result) => result.json())
	.then((news) => {
		arr = [...news]
		arr.slice(0, range).forEach(newsid => getNews(newsid))
	});

// zwraca obiekt news
const getNews = async (id) => {
	fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((result) => result.json())
		.then((news) => showItem(news));
}


const showItem = (item) => {
	let list = document.getElementById('newsList')
	let listElement = document.createElement('div')
	listElement.className += 'card my-4'
	let itemHeader = document.createElement('div')
	itemHeader.className += 'card-header'
	let itemFooter = document.createElement('div')
	itemFooter.className += 'card-footer'

	let itemTitle = document.createElement('p')
	itemTitle.innerHTML = item.title
	itemTitle.className += 'card-header-title'
	itemHeader.appendChild(itemTitle)
	listElement.appendChild(itemHeader)

	if(item.text != null) {
		let itemBody = document.createElement('p')
		itemBody.innerHTML = item.text
		itemBody.className += 'card-content'
		listElement.appendChild(itemBody)
	}

	let itemDate = document.createElement('p')
	let date = new Date(item.time * 1000)
	itemDate.innerHTML = date.toUTCString()

	listElement.appendChild(itemFooter)

	list?.appendChild(listElement)
}