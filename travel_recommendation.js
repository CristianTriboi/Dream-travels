const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = '';


function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

        const keyMatch = containsWord(input, Object.keys(data));

        if (keyMatch) {
            for (const places of data?.[keyMatch]) {
                const countryName = JSON.stringify(places.name);
                if ("cities" in places) {
                    for(const citiesObj of places?.["cities"]) {
                        if (!citiesObj.description) {
                            continue;
                        }
                        buildHtml(citiesObj);
                    }
                }
                buildHtml(places);
            }
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

function buildHtml(finalObj) {
    console.log("we finaly are here with the final obj " + finalObj.name);
    /*const name = finalObj.name.join(', ');
    const description = finalObj.description;?*/
    resultDiv.innerHTML += `<div id='card' class="card">`;
    resultDiv.innerHTML += `<h2>${finalObj.name}</h2>`;
    resultDiv.innerHTML += `<img src="${finalObj.imageUrl}" alt="card-image" class="card-image">`;
    resultDiv.innerHTML += `<div class="card-content">`;
    //resultDiv.innerHTML += `<p class="card-title"> ${finalObj.name}</p>`;
    resultDiv.innerHTML += `<p class="card-description"> ${finalObj.description}</p>`;
    resultDiv.innerHTML += `</div>`;
    resultDiv.innerHTML += `</div>`;
}

function resetResults() {
    document.getElementById("result").innerHTML = "";
}

btnSearch.addEventListener('click', searchDestination);
btnReset.addEventListener('click', resetResults);