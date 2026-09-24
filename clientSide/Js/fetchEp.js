const area = document.getElementById('episodeListingArea');
const area2 = document.getElementById('episodeListingArea2');
const area3 = document.getElementById('episodeListingArea3');

function createEpisodeCard(ep) {
    const displayEp = document.createElement('div');
    displayEp.className = 'p-3 bg-light border border-4 border-danger-subtle mb-4 mt-2 rounded-4 row shadow-sm';
    displayEp.innerHTML = `
        <div class="col-12 rounded-4 border border-2 p-0 col-md-3">
            <img src="${ep.image}" style="object-fit:cover; height:100%;width:100%;cursor:pointer;" alt="${ep.episode_name}" class="rounded-4" id="epImg" loading="lazy" />
        </div>
        <div class="col-12 col-md-9 d-flex text-dark fs-5 flex-column p-1 p-md-4" style="line-height:auto">
            <p><strong>Episode No. </strong>${ep.episode_number}</p>
            <p><strong>Name: </strong>${ep.episode_name}</p>
            <p><strong>Season: </strong>${ep.season_name}</p>
            <p><strong>Description: </strong>${ep.description}</p>
            <p><strong>Duration: </strong>${ep.duration}</p>
            <button class="btn btn-danger col-4 col-sm-3 col-md-2 mt-2" onclick="window.location.href='#'">Watch Now</button>
        </div>
    `;
    return displayEp;
}

function renderEpisodeCards(container, data) {
    if (!container) {
        return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach((ep) => fragment.appendChild(createEpisodeCard(ep)));

    container.innerHTML = '';
    container.appendChild(fragment);
}

async function fetchSeasonData(url, renderCallback) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        renderCallback(Array.isArray(data.episodes) ? data.episodes : []);
    } catch (error) {
        console.error(error.message);
    }
}

function fetchEp() {
    return fetchSeasonData('./Js/dragon_ball_z_season_1.json', (episodes) => renderEpisodeCards(area, episodes));
}

function fetchEp2() {
    return fetchSeasonData('./Js/dragon_ball_z_season_2.json', (episodes) => renderEpisodeCards(area2, episodes));
}

function fetchEp3() {
    return fetchSeasonData('./Js/dragon_ball_z_season_3.json', (episodes) => renderEpisodeCards(area3, episodes));
}
