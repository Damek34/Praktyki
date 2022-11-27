import { getNewsView } from "./components";

let newsIdList
let newsList
let firstNewsNum = 0
let range = 30;
let sortingType: Function

global.ChangeRange = () =>
{
	let select = document.getElementById("number_of_news") as HTMLSelectElement;
	range = parseInt(select.value)
	loadNews(firstNewsNum, range, sortingType);
}

global.prevPage = () => {
	if(firstNewsNum > 0) {
		firstNewsNum -= 1;
		let p = document.getElementById('pageNumber') as HTMLParagraphElement
		p.innerHTML = firstNewsNum.toString()
		loadNews(firstNewsNum, range, sortingType);
	}
}

global.nextPage = () => {
	firstNewsNum += 1;
	let p = document.getElementById('pageNumber') as HTMLParagraphElement
	p.innerHTML = firstNewsNum.toString()
	loadNews(firstNewsNum, range, sortingType);
}

global.changeSortingType = () => {
	let select = document.getElementById("sortingType") as HTMLSelectElement;
	sortingType = select.value == "new" ? sortNew : sortBest
	loadNews(firstNewsNum, range, sortingType);
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
const getNewsList = async () => {
	return await Promise.all(newsIdList.map(async (newsId) => await getNewsData(newsId)));
}

const getBestNewsList = async () => {
	return await fetch('https://hacker-news.firebaseio.com/v0/beststories')
		.then((result) => result.json())
		.then(async (bestIdList) =>
			await Promise.all(
				bestIdList.map(async (newsId) => await getNewsData(newsId))
			)
		)
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
global.onloadFun = () => getNewsIdList().then(async (list)=> {
	newsIdList = list
	sortingType = sortNew
	newsList = await getNewsList()
	loadNews(firstNewsNum, range, sortingType)
})

// pobiera dane
const loadNews = async (first, range, sortMethod) => {


	let newsListHTML = document.getElementById('newsList') as HTMLDivElement;
	newsListHTML.innerHTML = ""

	newsList.sort((a, b) => sortMethod(a, b))

	newsList.slice(first * range, first*range + range).forEach(news => {
		showItem(news)
	})
}

const sortNew = (a, b) => b.time - a.time
const sortBest = (a, b) => b.score - a.score