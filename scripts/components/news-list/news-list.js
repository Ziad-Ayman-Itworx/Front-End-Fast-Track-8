import { fetchText, fetchNewsHeadlines, parseHTML, stringifyDOMElement } from "../../service.js";
import { NewsItemComponent } from "../news-item/news-item.js";

var templatePromise = fetchText("scripts/components/news-list/news-list.template.html");

export class NewsListComponent {
    constructor(newsAPIIdentifier) {
        this.elementRefPromise = templatePromise.then(template => parseHTML(template));

		let newsItemsElementsPromise = fetchNewsHeadlines(newsAPIIdentifier)
			.then(headlines => Promise.all(headlines.map(headline => new NewsItemComponent(headline).render())));

		Promise.all([this.elementRefPromise, newsItemsElementsPromise, templatePromise]).then(promisesResults => {
			let [ elementRef, newsItemsElements, template ] = promisesResults;
			let $element = $(elementRef);

			if (newsItemsElements.length == 0) {
				$element.find(".no-news-label").removeClass("d-none");
			}
			else {
				let $newElement = $(parseHTML(Mustache.render(template, {
					newsItems: newsItemsElements.map(card => ({ newsItem: stringifyDOMElement(card) }))
				})));
	
				$element.html($newElement.html());
				$element.find(".news-items").removeClass("d-none");
			}

			$element.find(".spinner-container").addClass("d-none");
		});
    }

	render() {
		return this.elementRefPromise;
	}
}