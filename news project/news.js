const url = "https://newsapi.org/v2/everything?q=";
const api = "1788c039620d4291abc6f3a43feb44b2";
let MainParent = document.getElementById("main");
MainParent.classList.add("articles-grid");

async function news(query) {
    try {
        let response = await fetch(`${url}${query}&apiKey=${api}`);
        let data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

function displayArticles(articles) {
    MainParent.innerHTML = ""; // Clear previous articles
    articles.forEach(element => {
        if (element.urlToImage) {
            let articleContainer = document.createElement("div");
            articleContainer.classList.add("articleContainer");

            let childImage = document.createElement("img");
            childImage.src = element.urlToImage;
            childImage.setAttribute("id", "image");
            childImage.alt = element.title;

            let childTitle = document.createElement("h4");
            childTitle.setAttribute("id", "childTitle");
            childTitle.innerHTML = element.title;

            let source = document.createElement("p");
            source.setAttribute("id", "source");
            source.innerHTML = `Source: ${element.source.name}`;

            let publishedAt = document.createElement("p");
            publishedAt.setAttribute("id", "publishedAt");
            let date = new Date(element.publishedAt);
            publishedAt.innerHTML = `Published: ${date.toLocaleDateString()}`;

            let description = document.createElement("p");
            description.setAttribute("id", "description");
            description.innerHTML = element.description;

            let author = document.createElement("p");
            author.setAttribute("id", "author");
            author.innerHTML = element.author ? `Author: ${element.author}` : "Author: unknown";

            let readMore = document.createElement("a");
            readMore.setAttribute("id", "readMore");
            readMore.href = element.url;
            readMore.target = "_blank";
            readMore.innerHTML = "Read More";

            articleContainer.appendChild(childTitle);
            articleContainer.appendChild(childImage);
            articleContainer.appendChild(source);
            articleContainer.appendChild(publishedAt);
            articleContainer.appendChild(description);
            articleContainer.appendChild(author);
            articleContainer.appendChild(readMore);

            MainParent.appendChild(articleContainer);
        }
    });
}

// Initial news fetch
news("anything").then(displayArticles);
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async () => {
    const articles = await news(searchInput.value);
    displayArticles(articles);
});

async function Search(query) {
    const articles = await news(query);
    displayArticles(articles);
}

let debounceTimeout;
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = searchInput.value;
        if (query) {
            const articles = await news(query);
            displayArticles(articles);
        }
    }, 300);
});
