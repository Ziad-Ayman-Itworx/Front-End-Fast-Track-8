import { Country, NewsHeadline } from "./models.js";

const countriesAPIUrl = "https://restcountries.eu/rest/v2/";
const newsAPIUrl = "https://newsapi.org/v2/top-headlines";
const domParser = new DOMParser();

export function fetchJSON(url) {
	return fetch(url).then(response => {
		if (response.ok) return response.json();
		else throw "Response Error: " + response.status;
	});
}

export function fetchText(url) {
	return fetch(url).then(response => {
		if (response.ok) return response.text();
		else throw "Response Error: " + response.status;
	});
}

export function fetchCountries() {
	return fetchJSON(countriesAPIUrl).then(rawCountriesArray => {
		let alpha3CodeMap = {};
		rawCountriesArray.forEach(rawCountry => {
			alpha3CodeMap[rawCountry.alpha3Code] = rawCountry.name;
		});

		return rawCountriesArray.map(rawCountry => {
			rawCountry.borderNames = rawCountry.borders.map(borderAlpha3Code => alpha3CodeMap[borderAlpha3Code]).join(", ");
			return new Country(rawCountry);
		});
	});
}

export function fetchNewsHeadlines(countryNewsAPIIdentifier) {
	return new Promise((resolve, reject) => {
		fetchJSON("news-api-credentials.json").then(credeintials => {
			fetchJSON(newsAPIUrl + `?country=${countryNewsAPIIdentifier}&apiKey=${credeintials.APIKey}`).then(rawNewsHeadlinesObject => {
				console.log(rawNewsHeadlinesObject);
				if (rawNewsHeadlinesObject.status == "ok") resolve(rawNewsHeadlinesObject.articles.map(article => new NewsHeadline(article)));
				else reject("News Request Error");
			});
		});
	});
}

export function stringifyDOMElement(DOMElement) {
	return DOMElement.outerHTML;
}

export function parseHTML(html) {
	return domParser.parseFromString(html, "text/html").querySelector("body").children[0];
}