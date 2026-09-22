let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let results = document.getElementById("results");

function searchCountry() {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            let country = data[0];
            let capital = country.capital ? country.capital[0] : "N/A";
            let currencyCode = Object.keys(country.currencies)[0];
            let currencyName = country.currencies[currencyCode].name;
            let languages = Object.values(country.languages).join(", ");

            results.innerHTML = `
        <img src="${country.flags.svg}" class="flag-img" alt="Flag of ${country.name.common}">
        <h2>${country.name.common}</h2>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Capital:</h4>
              <span>${capital}</span>
            </div>
        </div>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Continent:</h4>
              <span>${country.continents[0]}</span>
            </div>
        </div>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Population:</h4>
              <span>${country.population}</span>
            </div>
        </div>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Currencies:</h4>
              <span>${currencyName} - ${currencyCode}</span>
            </div>
        </div>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Common Languages:</h4>
              <span>${languages}</span>
            </div>
        </div>
        <div class="wrapper">
           <div class="data-wrapper">
              <h4>Timezone:</h4>
              <span>${country.timezones[0]}</span>
            </div>
        </div>
        `;
        })
        .catch(() => {
            if (countryName.length == 0) {
                results.innerHTML = `<h3>The input field cannot be empty</h3>`;
            }
            else {
                results.innerHTML = `<h3>Please enter a valid country name.</h3>`;
            }
        });
}

searchBtn.addEventListener("click", searchCountry);

countryInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});
