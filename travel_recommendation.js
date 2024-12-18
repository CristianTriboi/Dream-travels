const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const btnSubmit = document.getElementById('btnSubmit');
const resultDiv = document.getElementById('result');
//resultDiv.innerHTML = '';


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
                if ("cities" in places) {
                    for(const citiesObj of places?.["cities"]) {
                        buildHtml(citiesObj);
                    }
                }
                if ("description" in places) {
                    buildHtml(places);
                }
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
    resultDiv.innerHTML += `<div id='card' class="card">`;
    resultDiv.innerHTML += `<h2>${finalObj.name}</h2>`;
    resultDiv.innerHTML += `<img src="${finalObj.imageUrl}" alt="card-image" class="card-image">`;
    resultDiv.innerHTML += `<div class="card-content">`;
    resultDiv.innerHTML += `<p class="card-description"> ${finalObj.description}</p>`;
    resultDiv.innerHTML += `</div>`;
    resultDiv.innerHTML += `</div>`;
}

function resetResults() {
    document.getElementById("result").innerHTML = "";
}

function submit(event) {
    event.preventDefault();

    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const userMessage = document.getElementById("message").value;
    console.log(userName + '-' + userEmail + '-' + userMessage);
    document.getElementById("name").innerHTML = "";
    document.getElementById("email").innerHTML = "";
    document.getElementById("message").innerHTML = "";
    console.log("Success");
}

btnSearch.addEventListener('click', searchDestination);
btnReset.addEventListener('click', resetResults);
btnSubmit.addEventListener('click', submit);