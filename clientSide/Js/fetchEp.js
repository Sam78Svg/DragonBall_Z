let area = document.getElementById('episodeListingArea');
let ar = [];
function fetchEp() {
    return fetch('./Js/dragon_ball_z_season_1.json')
        .then(res => res.json())
        .then(data => {
            console.log(data.episodes);
            ar = data.episodes || [];
            display(ar);
        })
        .catch(err => console.error(err.message));
};

// Two fetch the Season 2
let area2 = document.getElementById('episodeListingArea2');
let ar2 = [];
function fetchEp2() {
    return fetch('./Js/dragon_ball_z_season_2.json')
        .then(res => res.json())
        .then(data => {
            console.log(data.episodes);
            ar2 = data.episodes || [];
            display2(ar2); // Corrected to call display2
        })
        .catch(err => console.error(err.message));
};

// to Fetch the Season 3
let area3 = document.getElementById('episodeListingArea3');
let ar3 = [];
function fetchEp3() {
    return fetch('./Js/dragon_ball_z_season_3.json')
        .then(res => res.json())
        .then(data => {
            console.log(data.episodes);
            ar3 = data.episodes || [];
            display3(ar3); // Corrected to call display3
        })
        .catch(err => console.error(err.message))
};

// Season 1 Cards
function display(data) {
    data.forEach(ep => {
        let displayEp = document.createElement('div');
        displayEp.className = "p-3 bg-light border border-4 border-danger-subtle mb-4 mt-2 rounded-4 row shadow-sm ";
        displayEp.setAttribute = ('background-color', '#dab5a3')
        displayEp.innerHTML = `
                            <div class="col-12 rounded-4 border border-2 p-0 col-md-3">
                                <img src="${ep.image}"
                                     style="object-fit:cover; height:100%;width:100%;cursor:pointer;"
                                     alt="${ep.episode_name}"
                                     class="rounded-4"
                                     id="epImg"
                                />
        
                            </div>
                            <div class="col-12 col-md-9 d-flex text-dark fs-5 flex-column p-1 p-md-4" style="line-height:auto">
                                <p><strong>Episode No. </strong>${ep.episode_number}</p>
                                <p><strong>Name: </strong>${ep.episode_name}</p>
                                <p><strong>Season: </strong>${ep.season_name}</p>
                                <p><strong>Description:  </strong>${ep.description}</p>
                                <p><strong>Duration: </strong>${ep.duration}</p>
                                <button class="btn btn-danger col-4 col-sm-3 col-md-2 mt-2" onclick="window.location.href="#">Watch Now</button>
                            </div>
        `;

        area.appendChild(displayEp);
    });
}
// Season 2 Cards
function display2(data) {
    data.forEach(ep => {
        let displayEp = document.createElement('div');
        displayEp.className = "p-3 bg-light border border-4 border-danger-subtle mb-4 mt-2 rounded-4 row shadow-sm ";
        displayEp.setAttribute = ('background-color', '#dab5a3')
        displayEp.innerHTML = `
                            <div class="col-12 rounded-4 border border-2 p-0 col-md-3">
                                <img src="${ep.image}"
                                     style="object-fit:cover; height:100%;width:100%;cursor:pointer;"
                                     alt="${ep.episode_name}"
                                     class="rounded-4"
                                     id="epImg"
                                />
        
                            </div>
                            <div class="col-12 col-md-9 d-flex text-dark fs-5 flex-column p-1 p-md-4" style="line-height:auto">
                                <p><strong>Episode No. </strong>${ep.episode_number}</p>
                                <p><strong>Name: </strong>${ep.episode_name}</p>
                                <p><strong>Season: </strong>${ep.season_name}</p>
                                <p><strong>Description:  </strong>${ep.description}</p>
                                <p><strong>Duration: </strong>${ep.duration}</p>
                                <button class="btn btn-danger col-4 col-sm-3 col-md-2 mt-2" onclick="window.location.href="#">Watch Now</button>
                            </div>
        `;

        area2.appendChild(displayEp);
    });
}
// Season 3 Cards
function display3(data) {
    data.forEach(ep => {
        let displayEp = document.createElement('div');
        displayEp.className = "p-3 bg-light border border-4 border-danger-subtle mb-4 mt-2 rounded-4 row shadow-sm ";
        displayEp.setAttribute = ('background-color', '#dab5a3')
        displayEp.innerHTML = `
                            <div class="col-12 rounded-4 border border-2 p-0 col-md-3">
                                <img src="${ep.image}"
                                     style="object-fit:cover; height:100%;width:100%;cursor:pointer;"
                                     alt="${ep.episode_name}"
                                     class="rounded-4"
                                     id="epImg"
                                />
        
                            </div>
                            <div class="col-12 col-md-9 d-flex text-dark fs-5 flex-column p-1 p-md-4" style="line-height:auto">
                                <p><strong>Episode No. </strong>${ep.episode_number}</p>
                                <p><strong>Name: </strong>${ep.episode_name}</p>
                                <p><strong>Season: </strong>${ep.season_name}</p>
                                <p><strong>Description:  </strong>${ep.description}</p>
                                <p><strong>Duration: </strong>${ep.duration}</p>
                                <button class="btn btn-danger col-4 col-sm-3 col-md-2 mt-2" onclick="window.location.href="#">Watch Now</button>
                            </div>
        `;

        area3.appendChild(displayEp);
    });
}

fetchEp();
fetchEp2();
fetchEp3();

