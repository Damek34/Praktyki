import { getAddJobBtn, getAddAskBtn, getNewsView } from "./components";

let newsIdList
let newsList
let firstNewsNum = 0
let range = 30;
let sortingType: Function
let curNewsList
let askStoryList
let jobStoryList
let topStoryList
let bestStoryList
var keyword = " ";

global.ChangeRange = () =>
{
	let select = document.getElementById("number_of_news") as HTMLSelectElement;
	range = parseInt(select.value)
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}

global.prevPage = () => {
	if(firstNewsNum > 0) {
		firstNewsNum -= 1;
		let p = document.getElementById('pageNumber') as HTMLParagraphElement
		p.innerHTML = firstNewsNum.toString()
		loadNews(firstNewsNum, range, sortingType, curNewsList);
	}
}

global.nextPage = () => {
	if (firstNewsNum <= curNewsList.length / range) {
		firstNewsNum += 1;
		let p = document.getElementById('pageNumber') as HTMLParagraphElement
		p.innerHTML = firstNewsNum.toString()
		loadNews(firstNewsNum, range, sortingType, curNewsList);
	}
}

global.changeSortingType = () => {
	let select = document.getElementById("sortingType") as HTMLSelectElement;
	switch (select.value) {
		case "new":
			sortingType = sortNew
			break;
		case "best":
			sortingType = sortBest

			break;
		case "old":
			sortingType = sortOld
			break;

		default:
			sortingType = sortNew
			break;
	}
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}

global.changeNewsType = () => {
	let select = document.getElementById("newsType") as HTMLSelectElement;
	switch (select.value) {
		case "today":
			curNewsList = newsList
			break;
		case "ask":
			curNewsList = askStoryList
			break;
		case 'job':
			curNewsList = jobStoryList
			break;
		case 'past':
			curNewsList = bestStoryList
			break;
		case 'welcome':
			curNewsList = topStoryList
			break;
		default:
			curNewsList = newsList
			break;
	}

	loadNews(firstNewsNum, range, sortingType, curNewsList);
}

// zwraca tablice z id nowych newsow
const getNewsIdList = async () => {
	return await fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
		.then((result) => result.json())
		.then((newsIdList: Array<number>) => {
			return newsIdList
		});
};


// zwraca tablice newsow
const getNewsList = async () => {
	return await Promise.all(newsIdList.map(async (newsId) => await getNewsData(newsId)));
}

const getStoriesList = async (type) => {
	return await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json`)
		.then((result) => result.json())
		.then(async (storiesIdList) =>
			await Promise.all(
				storiesIdList.map(async (newsId) => await getNewsData(newsId))
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
	curNewsList = newsList
	loadNews(firstNewsNum, range, sortingType, newsList)
	askStoryList = await getStoriesList('askstories')
	jobStoryList = await getStoriesList('jobstories')
	topStoryList = await getStoriesList('topstories')
	bestStoryList = await getStoriesList('beststories')
	let sel1 = document.getElementById('newsTypeDiv') as HTMLSelectElement
	sel1.className = "select"
	console.log("all loaded");
})

// pobiera dane
const loadNews = async (first, range, sortMethod, list: Array<Object>) => {
	let newsListHTML = document.getElementById('newsList') as HTMLDivElement;
	newsListHTML.innerHTML = ""

	let options = document.getElementById('additional-options') as HTMLDivElement
	let listType = document.getElementById('newsType') as HTMLSelectElement
	let listTypeVal = listType.value

	if(listTypeVal == 'job') {
		options.innerHTML = ""
		options.appendChild(getAddJobBtn())
	}else if (listTypeVal == 'ask'){
		options.innerHTML = ""
		options.appendChild(getAddAskBtn())
	} else if (listTypeVal != 'ask' && listTypeVal != 'job') {
		options.innerHTML = ""
	}



	if(keyword != "")
	{
		list = list.filter(news => filtr(news));
	
		
	}
		list.sort((a, b) => sortMethod(a, b))

	list.slice(first * range, first*range + range).forEach(news => {
		showItem(news)
	})
	
}


global.Search = () =>
{
	let Keyword = document.getElementById("Search") as HTMLSelectElement;
	keyword = Keyword.value;
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}

function filtr(item)
{
	keyword.toLowerCase();
	item.title.toLowerCase();
	return item.title.includes(keyword)
}



const sortNew = (a, b) => b.time - a.time
const sortOld = (a, b) => a.time - b.time
const sortBest = (a, b) => b.score - a.score

global.hide = (itemF) =>
{
	let id = curNewsList.indexOf(itemF);
	curNewsList.splice(id, 1);
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}

global.addToJobList = (item) => {
	jobStoryList.push(item)
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}
global.addToAskList = (item) => {
	askStoryList.push(item)
	loadNews(firstNewsNum, range, sortingType, curNewsList);
}