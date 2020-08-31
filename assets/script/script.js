const baseCurrency = document.getElementById("base-currency");
const convertedCurrency = document.getElementById("symbol-currency");
const convertFrom = document.getElementById("convert-from");
const convertTo = document.getElementById("convert-to");
const currentRate = document.querySelector(".cur-rate");
const convertBtn = document.getElementById("convert-btn");
const ratesBtn = document.getElementById("rates-btn");
const historyBtn = document.getElementById("history-btn");
const heroPage = document.getElementById("hero-page");
const landingPage = document.getElementById("landing");
const rightPage = document.getElementById("right");
const card = document.querySelector(".card");
const convertCard = document.querySelector(".convert-card");
const rateCard = document.querySelector(".currency-rates");
const currencyRate = document.getElementById("currency-rate");
const page = document.getElementById("home");
const loaderOverlay = document.getElementById("loader");
const calcLoader = document.getElementById("calc-loader");

init();

window.addEventListener("load", () => {
  setTimeout(removeLoader, 2000);
});

function removeLoader() {
  loaderOverlay.classList.add("hide");
  page.classList.remove("hide");
}

function removeCalcLoader() {
  calcLoader.classList.add("hide");
}

async function fetchData() {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${baseCurrency.value}`
  );
  const data = await res.json();
  const rate = data.rates[convertedCurrency.value].toFixed(2);
  convertTo.value = (convertFrom.value * rate)
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  currentRate.textContent = `1${baseCurrency.value} = ${rate}${convertedCurrency.value}`;
}

function displayHero() {
  heroPage.classList.add("hero-page");
  landingPage.classList.remove("landing-style");
  rightPage.classList.remove("hide");
}

window.addEventListener("resize", () => {
  if (
    convertBtn.classList.contains("active") ||
    ratesBtn.classList.contains("active")
  ) {
    responsive();
  }
  if (window.innerWidth > 1100) {
    landingPage.classList.remove("hide");
  }
});

function responsive() {
  if (
    window.innerWidth <= 500 ||
    window.innerWidth <= 800 ||
    window.innerWidth <= 1100
  ) {
    landingPage.classList.add("hide");
  } else if (window.innerWidth >= 1300) {
    landingPage.classList.remove("hide");
  }
}

function viewConvertCard() {
  if (convertBtn.classList.contains("active")) {
    calcLoader.classList.add("hide");
  } else {
    calcLoader.classList.remove("hide");
  }

  convertBtn.classList.add("active");
  ratesBtn.classList.remove("active");
  historyBtn.classList.remove("active");
  convertCard.classList.add("animate");

  convertCard.classList.add("hide");
  setTimeout(removeCalcLoader, 2000);
  convertCard.classList.remove("hide");
  rateCard.classList.add("hide");
  displayHero();
  responsive();
}

async function viewRatesCard() {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${currencyRate.value}`
  );
  const data = await res.json();
  convertCard.classList.add("hide");
  rateCard.classList.remove("hide");
  ratesBtn.classList.add("active");
  convertBtn.classList.remove("active");
  rateCard.classList.add("animate");

  if (ratesBtn.classList.contains("active")) {
    calcLoader.classList.remove("hide");
  } else {
    calcLoader.classList.add("hide");
  }

  setTimeout(removeCalcLoader, 2000);

  const curRates = data.rates;

  document.getElementById("aud").textContent = curRates["AUD"].toFixed(3);
  document.getElementById("cad").textContent = curRates["CAD"].toFixed(3);
  document.getElementById("cnh").textContent = curRates["CNH"].toFixed(3);
  document.getElementById("eur").textContent = curRates["EUR"].toFixed(3);
  document.getElementById("gbp").textContent = curRates["GBP"].toFixed(3);
  document.getElementById("jpy").textContent = curRates["JPY"].toFixed(3);
  document.getElementById("ngn").textContent = curRates["NGN"].toFixed(3);
  document.getElementById("usd").textContent = curRates["USD"].toFixed(3);

  displayHero();
}

function init() {
  convertedCurrency.value = "USD";
  page.classList.add("hide");
}

currencyRate.addEventListener("change", viewRatesCard);
ratesBtn.addEventListener("click", viewRatesCard);
convertBtn.addEventListener("click", viewConvertCard);
convertedCurrency.addEventListener("change", fetchData);
baseCurrency.addEventListener("change", fetchData);
convertFrom.addEventListener("input", fetchData);
