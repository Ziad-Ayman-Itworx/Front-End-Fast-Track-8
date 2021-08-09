import { CountriesCarouselComponent } from "./components/countries-carousel/countries-carousel.js";
import { CountryDetailsComponent } from "./components/country-details/country-details.js";
import { NewsListComponent } from "./components/news-list/news-list.js";

const pageSectionsSelectors = {
	carousel: "#countriesCarouselContainer",
	countryDetails: "#countryDetailsContainer",
	newsList: "#newsListContainer"
};

function populateSection(sectionSelector, element) {
	$(sectionSelector).empty();
	$(sectionSelector).append(element);
}

function populateCarousel() {
	return new CountriesCarouselComponent().render().then(carouselElement => {
		populateSection(pageSectionsSelectors.carousel, carouselElement);
		$(document).on("click", "div.country-card", (e) => {
			populateSelectedCountry($(e.target).closest("div.country-card").data("countryData"));
		});
	})
}

function populateSelectedCountry(country) {
	new CountryDetailsComponent(country).render().then(countryDetailsElement => {
		populateSection(pageSectionsSelectors.countryDetails, countryDetailsElement)
	});

	new NewsListComponent(country.newsAPIIdentifier).render().then(newsListElement => {
		populateSection(pageSectionsSelectors.newsList, newsListElement);
	});
}

$(document).ready(() => {
	populateCarousel();
});