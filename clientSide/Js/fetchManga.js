let searchbtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let mangaDisplayArea = document.getElementById("mangaDisplayArea");

async function fetchManga() {
    return await fetch('./Js/dbz_manga.json')
        .then(res => res.json())
        .then(data => {
            initialDiaplay(data);
            console.log(data);
            return data;
        })
        .catch(err => console.log(err.message))
}

function initialDiaplay(mangaData) {
    mangaData.forEach(manga => {
        let mangaCard = document.createElement('div');
        mangaCard.className = " rounded-4 row p-1 m-2 shadow-sm"
        mangaCard.innerHTML = `   
                           <div class="rounded-4 p-2 col-md-4 col-12">
                                <img 
                                    src="${manga.image}" 
                                    style="width:100%; height:50vh;object-fit:fill;"
                                    alt="${manga.name}"
                                    class="img-fluid rounded-4"
                                >
                            </div>
                            <div class="col-md-8 col-12 p-4 d-flex flex-column" style="line-height:14px">
                                <p class="h4 text-dark">ID: <strong>${manga.id}</strong></p>
                                <h3 class="text-dark">${manga.name}</h3>
                                <p class="h5 text-dark">Volume: <strong>${manga.volume}</strong></p>
                                <p class="h5 text-dark">Saga Name: <strong class="text-danger">${manga.saga}</strong></p>
                                <p class="h5 text-dark-emphasis">${manga.description}</p>
                                <h3 class="text dark">Episodes:</h3>
                                <ul class="list-unstyled" style="line-height:14px;padding-left:10vh;">
                                    <li class="h5 text-info">Start: <strong class="text-dark">${manga.episodes.start}</strong></li>
                                    <li class=" h5 text-info">End: <strong class="text-dark">${manga.episodes.end}</strong></li>
                                    <li class="h5 text-info">Total Episodes: <strong class="text-dark">${manga.episodes.count}</strong></li>
                            </div>
        `;
        mangaDisplayArea.appendChild(mangaCard);
    });
}

searchbtn.addEventListener("click", () => {
    let mangaData = fetchManga();
    let searchTerm = searchInput.value.toLowerCase();
    let filteredManga = mangaData.filter(manga => manga.name.toLowerCase().includes(searchTerm) || manga.toString(id) === searchTerm || manga.toString(volume) === searchTerm);

    mangaDisplayArea.innerHTML = '';

    if (filteredManga.length > 0) {
        filteredManga.forEach(manga => {
            let mangaCard = document.createElement('div');
            mangaCard.className = "d-flex flex-column flex-md-row p-1 m-2"
            mangaCard.innerHTML = `
                            <img 
                                src="${manga.image}" 
                                alt="${manga.title}"
                            >
                            <div class="p-4 d-flex flex-column" style="line-height:24px">
                                <p>ID: <strong>${manga.id}</strong></p>
                                <p>Volume: <strong>${manga.volume}</strong></p>
                                <h3>${manga.name}</h3>
                                <p>${manga.description}</p>
                            </div>
            `;
            mangaDisplayArea.appendChild(mangaCard);
        });
    } else {
        mangaDisplayArea.innerHTML = '<p>No results found</p>';
    }
});

fetchManga()