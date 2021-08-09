export class Country {
	constructor(rawCountryObject) {
		this.flagImageUrl = rawCountryObject.flag;
		this.countryName = rawCountryObject.name;
		this.capitalName = rawCountryObject.capital;
		this.currency = rawCountryObject.currencies[0]?.name;
		this.language = rawCountryObject.languages[0]?.name;
		this.populationCount = Number(rawCountryObject.population).toLocaleString();
		this.subregion = rawCountryObject.subregion;
		this.timezone = rawCountryObject.timezones[0];
		this.neighbors = rawCountryObject.borderNames;
		this.newsAPIIdentifier = rawCountryObject.alpha2Code.toLowerCase();
	}
}

export class NewsHeadline {
	constructor(rawHeadline) {
		this.imageUrl = rawHeadline.urlToImage;
		this.title = rawHeadline.title;
		this.content = rawHeadline.content;
		this.sourceName = rawHeadline.source.name;
		this.date = new Date(rawHeadline.publishedAt);
	}
}