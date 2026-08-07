const currentPage = document.body.dataset.page || "";

const navbar = `
<nav class="app-nav">

    <div class="nav-brand" onclick="location.href='home.html'">

        <img src="../assets/logo.png" alt="MediaTrack">

        <span>MediaTrack</span>

    </div>

    <ul class="nav-links">

        <li>
            <a href="home.html"
               class="${currentPage === "home" ? "is-active" : ""}">
               Home
            </a>
        </li>

        <li>
            <a href="media.html?type=Movie">
                Movies
            </a>
        </li>

        <li>
            <a href="media.html?type=Series">
                Series
            </a>
        </li>

        <li>
            <a href="media.html?type=Anime">
                Anime
            </a>
        </li>

        <li>
            <a href="media.html?type=Book">
                Books
            </a>
        </li>

        <li>
            <a href="watchlist.html">
                Watchlist
            </a>
        </li>

        <li>
            <a href="calendar.html">
                Calendar
            </a>
        </li>

        <li>
            <a href="ranking.html">
                Rankings
            </a>
        </li>

    </ul>

    <div
        class="nav-avatar"
        onclick="location.href='profile.html'"
        title="Profile">

        F

    </div>

</nav>
`;

document.body.insertAdjacentHTML("afterbegin", navbar);