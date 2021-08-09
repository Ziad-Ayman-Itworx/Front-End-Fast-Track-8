import { fetchText, fetchCountries, parseHTML, stringifyDOMElement } from "../../service.js";
import { CountryCardComponent } from "../country-card/country-card.js";

var templatePromise = fetchText("scripts/components/countries-carousel/countries-carousel.template.html");

export class CountriesCarouselComponent {
	constructor() {
		this.elementRefPromise = templatePromise.then(template => parseHTML(template));

		let countriesCardsPromise = fetchCountries()
			.then(countries => Promise.all(countries.map(country => new CountryCardComponent(country).render())));

		Promise.all([this.elementRefPromise, countriesCardsPromise, templatePromise]).then(promisesResults => {
			let [ elementRef, countriesCards, template ] = promisesResults;

			let $newElement = $(parseHTML(Mustache.render(template, {
				pageCards: countriesCards.map(card => ({ pageCard: stringifyDOMElement(card) }))
			})));

			let $element = $(elementRef);

			$element.html($newElement.html());
			$element.find(".spinner-container").remove();
			$element.find(".owl-carousel").owlCarousel({
				responsiveClass: true,
				responsive: {
					0: { items: 1 },
					576: { items:1 },
					768: { items:2 },
					1200: { items:4 }
				}
			});
		});
	}

	render() {
		return this.elementRefPromise;
	}
}