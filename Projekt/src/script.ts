let arr
var range = 30;
global.ChangeRange = () =>
{
	let select = document.getElementById("number_of_news") as HTMLSelectElement;
	range = select.value
	console.log(range);
	showNews(firstNews, parseInt(range));
}



let firstNews = 0

// zwraca tablice z id nowych newsow
const getNewsIdList = async (first, range) => {
	return await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?type=story')
		.then((result) => result.json())
		.then(async (newsIdList: Array<number>) => {
			newsIdList = newsIdList.slice(first, range);
			arr = await Promise.all(newsIdList.map(async (newsId) => await getNews(newsId)));
			return arr
		});
};

// zwraca obiekt news
const getNews = async (id) => {
	let data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
	let news = await data.json()
	return news
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
	itemDate.innerHTML += date.toLocaleDateString()
	itemDate.innerHTML += " " + date.toLocaleTimeString('pl-PL')
	itemDate.className += 'card-footer-item has-text-right'
	itemFooter.appendChild(itemDate)

	listElement.appendChild(itemFooter)

	list?.appendChild(listElement)
}

const showNews = (first, range) => getNewsIdList(first, range).then((list)=> {
	document.getElementById('newsList').innerHTML = "";
	list.sort((a, b) => a.time - b.time)
	list.forEach(news => {
		showItem(news)
	})
})

showNews(firstNews, range)