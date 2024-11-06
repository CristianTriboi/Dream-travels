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
        console.log("single obj: " + JSON.stringify(data?.[keyMatch]));
        /*const atraction = data.find((item) => item.toLowerCase() === input);*/
        const destination = Object.values(data).filter(item => item.keyMatch.toLowerCase() === input);
        console.log(destination);
        /*if (destination) {
            const symptoms = destination.symptoms.join(', ');
            const prevention = destination.prevention.join(', ');
            const treatment = destination.treatment;
            resultDiv.innerHTML += `<h2>${destination.name}</h2>`;
            resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;
            resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
            resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
            resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }*/
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