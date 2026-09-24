const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const mangaDisplayArea = document.getElementById('mangaDisplayArea');
let mangaDataCache = [];

async function fetchManga() {
    if (mangaDataCache.length) {
        renderMangaCards(mangaDataCache);
        return mangaDataCache;
    }

    try {
        const response = await fetch('./Js/dbz_manga.json');

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        mangaDataCache = Array.isArray(data) ? data : [];
        renderMangaCards(mangaDataCache);
        return mangaDataCache;
    } catch (error) {
        console.error(error.message);
        if (mangaDisplayArea) {
            mangaDisplayArea.innerHTML = '<p class="text-danger text-center">Failed to load manga data</p>';
        }
        return [];
    }
}

function renderMangaCards(mangaData) {
    if (!mangaDisplayArea) {
        return;
    }

    const fragment = document.createDocumentFragment();

    mangaData.forEach((manga) => {
        const mangaCard = document.createElement('div');
        mangaCard.className = 'rounded-4 row p-1 m-2 shadow-sm';
        mangaCard.innerHTML = `
            <div class="rounded-4 p-2 col-md-4 col-12">
                <img src="${manga.image}" style="width:100%; height:50vh; object-fit:fill;" alt="${manga.name}" class="img-fluid rounded-4" loading="lazy" />
            </div>
            <div class="col-md-8 col-12 p-4 d-flex flex-column" style="line-height:14px">
                <p class="h4 text-dark">ID: <strong>${manga.id}</strong></p>
                <h3 class="text-dark">${manga.name}</h3>
                <p class="h5 text-dark">Volume: <strong>${manga.volume}</strong></p>
                <p class="h5 text-dark">Saga Name: <strong class="text-danger">${manga.saga}</strong></p>
                <p class="h5 text-dark-emphasis">${manga.description}</p>
                <h3 class="text-dark">Episodes:</h3>
                <ul class="list-unstyled" style="line-height:14px; padding-left:10vh;">
                    <li class="h5 text-info">Start: <strong class="text-dark">${manga.episodes.start}</strong></li>
                    <li class="h5 text-info">End: <strong class="text-dark">${manga.episodes.end}</strong></li>
                    <li class="h5 text-info">Total Episodes: <strong class="text-dark">${manga.episodes.count}</strong></li>
                </ul>
            </div>
        `;
        fragment.appendChild(mangaCard);
    });

    mangaDisplayArea.innerHTML = '';
    mangaDisplayArea.appendChild(fragment);
}

function filterManga() {
    if (!mangaDisplayArea || !searchInput) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredManga = !searchTerm
        ? mangaDataCache
        : mangaDataCache.filter((manga) => {
              const searchableText = [manga.name, String(manga.id), String(manga.volume), manga.saga]
                  .join(' ')
                  .toLowerCase();

              return searchableText.includes(searchTerm);
          });

    if (!filteredManga.length) {
        mangaDisplayArea.innerHTML = '<p class="text-danger text-center">No results found</p>';
        return;
    }

    renderMangaCards(filteredManga);
}

if (searchButton && searchInput) {
    searchButton.addEventListener('click', filterManga);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            filterManga();
        }
    });
}

fetchManga();
