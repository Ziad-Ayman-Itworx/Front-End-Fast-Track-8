import { fetchText, parseHTML } from '../../service.js';

var templatePromise = fetchText("scripts/components/news-item/news-item.template.html");

export class NewsItemComponent {
	constructor(item) {
		this.elementRefPromise = templatePromise.then(template => parseHTML(template));

		Promise.all([this.elementRefPromise, templatePromise]).then(promisesResults => {
			let [ elementRef, template ] = promisesResults;
			$(elementRef).html($(parseHTML(Mustache.render(template, item))).html());
		});
	}

	render() {
		return this.elementRefPromise;
	}
}