const display = document.getElementById('displayArea');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
let outChar = [];

function createCharacterCard(character) {
    const { name, ki, maxKi, race, id, gender, image, affiliation } = character;
    const cardArea = document.createElement('div');
    cardArea.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';
    cardArea.innerHTML = `
        <div class="card h-100 shadow-lg rounded-4 bg-light text-dark p-2">
            <img src="${image}" style="height:200px;object-fit:contain;" alt="${name}" loading="lazy" />
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
    return cardArea;
}

async function fetchCharacter() {
    try {
        const response = await fetch('https://dragonball-api.com/api/characters?limit=65');

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        outChar = Array.isArray(data.items) ? data.items : [];
        displayChar(outChar);
    } catch (error) {
        console.error(error);
        if (display) {
            display.innerHTML = `<p class='text-danger text-center'>Failed to load character data</p>`;
        }
    }
}

function displayChar(chars) {
    if (!display) {
        return;
    }

    if (!Array.isArray(chars) || chars.length === 0) {
        display.innerHTML = `<p class='text-danger text-center'>No characters found</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    chars.forEach((character) => fragment.appendChild(createCharacterCard(character)));

    display.innerHTML = '';
    display.appendChild(fragment);
}

function filterSearch() {
    if (!display || !searchInput) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredChars = !searchTerm
        ? outChar
        : outChar.filter((character) => {
              const searchableText = [character.name, String(character.id), character.race, character.affiliation]
                  .join(' ')
                  .toLowerCase();

              return searchableText.includes(searchTerm);
          });

    displayChar(filteredChars);
}

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', filterSearch);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            filterSearch();
        }
    });
}

fetchCharacter();

