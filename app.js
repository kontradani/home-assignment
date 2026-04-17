const app = document.getElementById('app');
let currentPage = 1;

async function homePage(page = 1){
    currentPage = page;
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json()
    const characters = data.results;
    const totalPages = data.info.pages;

    let html = `

        <table id="character-table">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    characters.forEach(character => {
        html += `
            <tr onclick="profilePage(${character.id})">
                <td>
                    <img src="${character.image}" alt="${character.name} image">
                </td>
                <td>${character.name}</td>
                <td>${character.species}</td>
                <td>${character.status}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <div class="pagination-container">
            <button onclick="homePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="page-btn">Previous</button>
            <span class="page-info">Page ${currentPage} / ${totalPages}</span>
            <button onclick="homePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="page-btn">Next</button>
        </div>
    `;

    app.innerHTML = html;
}

async function profilePage(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await response.json();
    const createdDate = new Date(character.created).toLocaleDateString('en-EN');
    app.innerHTML = `
        <div class="details-card">
            <button onclick="homePage(currentPage)" class="back-btn">Back</button>
            
            <div class="details-content">
                <img src="${character.image}" alt="${character.name}">
                <div class="info">
                    <h1>${character.name}</h1>
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Origin:</strong> ${character.origin.name}</p>
                    <p><strong>Last location:</strong> ${character.location.name}</p>
                    <p><strong>Episodes:</strong> ${character.episode.length} episodes</p>
                    <p><strong>Created:</strong> ${createdDate}</p>
                    <p><strong>API URL:</strong> <a href="${character.url}" target="_blank" class="api-link">${character.url}</a></p>
                </div>
            </div>
        </div>
    `;
}

window.onload = () => homePage(1);