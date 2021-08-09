import { fetchText, parseHTML } from '../../service.js';

var templatePromise = fetchText("scripts/components/country-card/country-card.template.html");

export class CountryCardComponent {
	constructor(country) {
		this.elementRefPromise = templatePromise.then(template => parseHTML(template));

		Promise.all([this.elementRefPromise, templatePromise]).then(promisesResults => {
			let [ elementRef, template ] = promisesResults;
			let $element = $(elementRef);
			
			$element.html($(parseHTML(Mustache.render(template, country))).html());
			elementRef.dataset.countryData = JSON.stringify(country);
		});
	}

	render() {
		return this.elementRefPromise;
	}
}