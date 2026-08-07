let selectedMediaId = null;
const mediaGrid = document.getElementById("mediaGrid");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

// Read ?type=Movie from URL
const params = new URLSearchParams(window.location.search);
const type = params.get("type") || "Movie";

// Update page title
const titles = {

    "Movie": "Movies",

    "Series": "Series",

    "Anime": "Anime",

    "Mini Series": "Mini Series",

    "Book": "Books"

};

pageTitle.textContent = titles[type] || type;
pageSubtitle.textContent =
    `Explore ${pageTitle.textContent.toLowerCase()} in your archive.`;
// Fetch media
fetch(`http://localhost:5000/api/media/type/${encodeURIComponent(type)}`)
    .then(res => res.json())
    .then(data => {

        if (!data.success) return;

        mediaGrid.innerHTML = "";

        data.media.forEach(item => {

            mediaGrid.innerHTML += `
<article class="media-card"

data-id="${item.id}"
data-title="${item.title}"
data-genre="${item.genre}"
data-year="${item.release_year}"
data-description="${item.description}"
data-poster="${item.poster_url}"

>

    <img
        src="${item.poster_url}"
        alt="${item.title}"
    >

    <div class="media-info">

        <h3>${item.title}</h3>

        <p>${item.genre} • ${item.release_year}</p>

    </div>

</article>
`;

        });

    })
    .catch(err => {

        console.error(err);

        mediaGrid.innerHTML = "<p>Unable to load media.</p>";

    });
    const modal = document.getElementById("mediaModal");

const closeBtn = document.getElementById("closeModal");

mediaGrid.addEventListener("click", (e)=>{

    const card = e.target.closest(".media-card");

    if(!card) return;

    selectedMediaId = card.dataset.id;

    document.getElementById("modalPoster").src =
        card.dataset.poster;

    document.getElementById("modalTitle").textContent =
        card.dataset.title;

    document.getElementById("modalMeta").textContent =
        `${card.dataset.genre} • ${card.dataset.year}`;

    document.getElementById("modalDescription").textContent =
        card.dataset.description;

    modal.style.display="flex";

});

closeBtn.onclick=()=>{

    modal.style.display="none";

};

window.onclick=(e)=>{

    if(e.target===modal)

        modal.style.display="none";

};

const search = document.querySelector(".media-search input");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(".media-card").forEach(card => {

        const title = card.dataset.title.toLowerCase();

        card.style.display = title.includes(value)
            ? "block"
            : "none";

    });

});

const watchlistBtn = document.getElementById("watchlistBtn");

watchlistBtn.addEventListener("click", () => {

    fetch("http://localhost:5000/api/watchlist/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_id: 1,
            media_id: selectedMediaId

        })

    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);

    });

});