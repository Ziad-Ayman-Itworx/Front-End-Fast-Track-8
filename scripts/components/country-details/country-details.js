import { fetchText, parseHTML } from "../../service.js";

var templatePromise = fetchText("scripts/components/country-details/country-details.template.html");

export class CountryDetailsComponent {
	constructor(country) {
		this.elementRefPromise = templatePromise.then(template => this.elementRef = parseHTML(template));

		templatePromise.then(template => {
			$(this.elementRef).html($(parseHTML(Mustache.render(template, country))).html());
		});
	}

	render() {
		return this.elementRefPromise;
	}
}