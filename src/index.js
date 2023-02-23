import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js"
import  debounce  from 'lodash.debounce';
import Notiflix from 'notiflix'


const DEBOUNCE_DELAY = 300;

const inputFiled = document.querySelector("#search-box")
const countriesList = document.querySelector(".country-list")

const fooInput = () => {
    if(inputFiled.value !== "" && inputFiled.value.trim()) {
        fetchCountries(inputFiled.value)
        .then((countries) => {
            renderCountries(countries)})
        .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"))
    }
    countriesList.innerHTML = ""
}

inputFiled.addEventListener("input", debounce(fooInput, DEBOUNCE_DELAY))
   
function renderCountries(countries) {
    console.log(countries)
    if(countries.length >= 2 && countries.length < 10) {
        const markUp = countries.map((countrie) => {
        return `<li class="country-list-li inline-li"><img class="country-img" src="${countrie.flags.svg}" alt=""></li>
                <li class="country-list-li inline-li"><b>${countrie.name.official}</b></li>
                <br/>` 
     }).join("")
    
     countriesList.innerHTML = markUp
    
    } else if(countries.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        const markUp = countries.map((countrie) => {
        return `<li class="country-list-li inline-li"><img class="country-img" src="${countrie.flags.svg}" alt=""></li>
            <li class="country-list-li inline-li"><b>${countrie.name.official}</b></li>
            <li class="country-list-li"><b>Capital:</b> ${countrie.capital}</li>
            <li class="country-list-li"><b>Population:</b> ${countrie.population}</li>
            <li class="country-list-li"><b>Languages:</b> ${Object.values(countrie.languages)}</li>` 
     }).join("")

     countriesList.innerHTML = markUp
}
}

