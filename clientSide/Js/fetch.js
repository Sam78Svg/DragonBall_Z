
const display = document.getElementById('displayArea');
const searchBtn = document.getElementById('searchBtn');
let outChar = [];

//This function will be used to fetch data from api
function fetchCharacter() {
    return fetch(`https://dragonball-api.com/api/characters?limit=65`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            outChar = data.items || [];
            displayChar(outChar);
        })
        .catch(error => {
            console.error(error);
            display.innerHTML = `<p class='text-danger text-center'>Failed to load character data</p>`;
        })
}

// This function will display the fetched data on the browser screen
function displayChar(chars) {
    if (!Array.isArray(chars) || chars.length === 0) {
        display.innerHTML = `<p class='text-danger text-center'>No characters found</p>`;
        return;
    }

    display.innerHTML = ''; // Clear previous content

    chars.forEach((characters) => {
        const { name, ki, maxKi, race, id, gender, image, affiliation } = characters;
        const cardArea = document.createElement('div');
        cardArea.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
        cardArea.innerHTML = `
            <div class="card h-100 shadow-lg rounded-4 bg-light text-dark p-2">
                        <img 
                            src="${image}"
                            style="height:200px;object-fit:contain;"
                            alt="${name}"
                        />
                        <div class="card-body">
                            <h4 class="card-title"><strong>Name: </strong>${name}</h4>
                            <p class="card-text text-muted"><strong>ID: </strong>${id}</p>
                            <p class="card-text text-muted"><strong>Gender: </strong>${gender}</p>
                            <p class="card-text text-muted"><strong>Race: </strong>${race}</p> 
                            <p class="card-text text-muted"><strong>Kills: </strong>${ki}</p>
                            <p class="card-text text-muted"><strong>Max Kills: </strong>${maxKi}</p>
                            <p class="card-text text-muted"><strong>Affiliation: </strong>${affiliation}</p>
                        </div>
            </div>
    `;
        display.appendChild(cardArea);

    });
}

//the function will fiter the fetched data on lthe basis of inputs by user
function filterSearch() {

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCars = outChar.filter((character) => {
        return character.name.toLowerCase() === searchInput || String(character.id) === searchInput || character.race.toLowerCase().includes(searchInput);  //convert the character id to string for comparison
    });
    displayChar(filteredCars);
    if (filteredCars.length === 0) {
        display.innerHTML = `<p class='text-danger text-center'>No characters found</p>`;
    }
}
fetchCharacter();
searchBtn.addEventListener('click', filterSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        filterSearch();
    }
})

