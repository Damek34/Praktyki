import { getNewsView } from "./components";

let newsIdList
let newsList
let firstNewsNum = 0
let range = 30;

global.ChangeRange = () =>
{
	let select = document.getElementById("number_of_news") as HTMLSelectElement;
	range = parseInt(select.value)
	loadNews(firstNewsNum * range, range);
}

global.prevPage = () => {
	if(firstNewsNum > 0) {
		firstNewsNum -= 1;
		let p = document.getElementById('pageNumber') as HTMLParagraphElement
		p.innerHTML = firstNewsNum.toString()
		loadNews(firstNewsNum * range, range);
	}
}

global.nextPage = () => {
	firstNewsNum += 1;
	let p = document.getElementById('pageNumber') as HTMLParagraphElement
	p.innerHTML = firstNewsNum.toString()
	loadNews(firstNewsNum * range, range);
}

// zwraca tablice z id nowych newsow
const getNewsIdList = async () => {
	return await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?type=story')
		.then((result) => result.json())
		.then((newsIdList: Array<number>) => {
			return newsIdList
		});
};


// zwraca tablice newsow
const getNewsList = async (first, range) => {
	return await Promise.all(newsIdList.slice(first, first + range).map(async (newsId) => await getNewsData(newsId)));
}

// zwraca obiekt news
const getNewsData = async (id) => {
	let data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
	let news = await data.json()
	return news
}

// konwertuje dane na html i wyświetla
const showItem = (item) => {
	let list = document.getElementById('newsList')
	list?.appendChild(getNewsView(item))
}

// pobiera newsy gdy załaduje strone
global.onloadFun = () => getNewsIdList().then((list)=> {
	newsIdList = list
	loadNews(firstNewsNum * range, range)
})

// pobiera dane
const loadNews = async (first, range) => {
	newsList = await getNewsList(first, range)

	let newsListHTML = document.getElementById('newsList') as HTMLDivElement;
	newsListHTML.innerHTML = ""
	newsList.sort((a, b) => b.time - a.time)
	newsList.forEach(news => {
		showItem(news)
	})


}