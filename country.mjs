// Pull short country data
async function fetchCountriesData() {
    try {
        const englishNotPrimary = "BDI,CMR,SWZ,IND,KIR,LSO,MLT,MHL,NAM,NRU,PAK,PLW,PHL,RWA,WSM,SYC,SDN,TON,TUV,VUT";
        const response = await fetch('https://restcountries.com/v3.1/all?fields=languages,cca2,cca3');
        const countries = await response.json();

        const transformedData = countries.map(country => {
            if (englishNotPrimary.indexOf(country.cca3)!==-1) {
                if (country.languages && country.languages.eng) {
                    delete country.languages.eng;
                }
            }
            return country;
        });

        console.log(JSON.stringify(transformedData, null, 2));

    } catch (error) {
        console.error("Error fetching countries data:", error);
    }
}

fetchCountriesData();
