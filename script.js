// API for Fetching data
// Getting HTML Elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};

// Fetching Quote
const fetchQuote = async () => {
  loading();
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data?.author === ""
      ? (authorText.innerText = "Anonymous")
      : (authorText.innerText = data?.author);
    data?.content?.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data?.content;
    complete();
  } catch (err) {
    fetchQuote();
  }
};

// Tweeting Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
};

// Calling function on Event Listener
newQuoteBtn.addEventListener("click", fetchQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
fetchQuote();
