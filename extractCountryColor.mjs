import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// Function to fetch and scrape the page
async function fetchAndScrape(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        let rows = $('table.wikitable tbody tr');
        let countryColors = [];

        rows.each((index, row) => {
            let countryName = $(row).find('td:nth-child(1) a').text();
            let firstColorStyle = $(row).find('td:nth-child(5) .legend-color').first().attr('style');
            let firstColor = '';

            if (firstColorStyle) {
                let match = firstColorStyle.match(/background-color:(#[0-9a-fA-F]{6});/);
                if (match) {
                    firstColor = match[1];
                }
            }

            if (countryName && firstColor) {
                countryColors.push({ country: countryName, primaryColor: firstColor });
            }
        });

        return countryColors;

    } catch (error) {
        console.error("Error fetching and scraping the page:", error);
    }
}
// URL of the page to scrape
const url = 'https://en.wikipedia.org/wiki/National_colours';

// Call the function to fetch and scrape the page
const countryFullName = await fetchAndScrape(url);

// Get name mappings
const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
const resp_json = await response.json();
const countryMap = new Map(resp_json.map(country => [country.name.common.toLowerCase(), country.cca2]));
const countryOfficialMap = new Map(resp_json.map(country => [country.name.official.toLowerCase(), country.cca2]));

// Apply
const countryCCA2 = countryFullName.map(country => {
    const common = countryMap.get(country.country.toLowerCase());
    const official = countryOfficialMap.get(country.country.toLowerCase());
    country.country = common ? common : official ? official : country.country;
    return country;
}).filter(x=>x.country.length===2);

console.log(countryCCA2.filter(x=>x.country.length > 2).length, countryCCA2.length);
console.log(countryCCA2.filter(x=>x.country.length > 2));
