const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');


function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    console.log(input);
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

        /*console.log(JSON.stringify(data));*/
        const keyMatch = containsWord(input, Object.keys(data));
        console.log(keyMatch);
        console.log("single obj: " + JSON.stringify(data.countries));
        //const atraction = data.keyMatch.find(item => item.name);
        
        /*const destination = Object.values(data).filter(item => item.keyMatch.toLowerCase() === input);*/
        console.log(keyMatch);
        if (keyMatch) {
            for (const places of data?.[keyMatch]) {
                const countryName = JSON.stringify(places.name);
                console.log("try to iterate through array: " + JSON.stringify(places));
                if ("cities" in places) {
                    for(const citiesObj of places?.["cities"]) {
                        console.log("we found the cities object: " + JSON.stringify(citiesObj));
                    }
                }
                const cities = places.name;
                console.log(cities);
            }
            /*const name = keyMatch.name.join(', ');
            const prevention = keyMatch.prevention.join(', ');
            const treatment = keyMatch.treatment;
            resultDiv.innerHTML += `<h2>${keyMatch.name}</h2>`;
            resultDiv.innerHTML += `<img src="${keyMatch.imagesrc}" alt="hjh">`;
            resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${name}</p>`;
            resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
            resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;*/
        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }
        })
        .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function containsWord(word, objArr) {
    for (const key of objArr) {
        const find = key.toLowerCase().includes(word.toLowerCase());
        find ??= false;
        if (find) {
            return key;
        }
    }
    return false;
}

btnSearch.addEventListener('click', searchDestination);