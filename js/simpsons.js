const searchBar = document.getElementById('simpsons-search');
const searchBarPink = document.getElementById('simpsons-search-pink');
const searchBtn = document.getElementById('search-btn');
const searchBtnPink = document.getElementById('search-btn-pink')
const quoteInput = document.getElementById('quote-input');
const quoteBy = document.getElementById('quote-by');
const quoteImg = document.getElementById('quote-img');

const errorMessage = document.getElementById('error-message');
const quoteResults = document.getElementById('quote-results');

const apiUrl = "https://thesimpsonsquoteapi.glitch.me/quotes?";
const apiCharacter = "character=";

errorMessage.style.display = "none";
quoteResults.style.display = "none";

searchBtn.addEventListener("click", Search);
searchBtnPink.addEventListener("click", SearchPink);

function Search() {
  const characterSearch = searchBar.value;
  findData(characterSearch);
  searchBar.value = "";
}

function SearchPink() {
  const characterSearchPink = searchBarPink.value;
  findData(characterSearchPink);
  searchBarPink.value = "";
}

async function findData(characterSearch) {
  try {
    const res = await fetch(`${apiUrl}${apiCharacter}${characterSearch}`);
    const json = await res.json();
    errorMessage.style.display = "none";
    displayQuote(json);
    if(characterSearch == "") {
      errorMessage.style.display = "block";
      quoteResults.style.display = "none";
    }
  } catch(error) {
      errorMessage.style.display = "block";
      quoteResults.style.display = "none";
  }
}

function displayQuote(data) {
  console.log(data.Error);
  if(data.Error) {
    errorMessage.style.display = "block";
    quoteResults.style.display = "none";
    errorMessage.innerText = "This Character Quote cannot be Found! Oops";
    return;
  }
  quoteResults.style.display = "block";
  quoteInput.innerHTML = "'" + data[0].quote + "'";
  quoteBy.innerHTML = "An insightful quote by " + data[0].character;
  quoteImg.src = data[0].image;
}