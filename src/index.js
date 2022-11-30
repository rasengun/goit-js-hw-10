import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { createInfoMarkup, createListMarkup } from './js/markup';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const cleanMarkup = ref => (ref.innerHTML = '');

const inputHandler = e => {
  e.preventDefault();

  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(listEl);
    cleanMarkup(infoEl);
  }

  fetchCountries(textInput).then(onSuccess).catch(onError);
};

const renderMarkup = data => {
  if (data.length === 1) {
    cleanMarkup(listEl);
    infoEl.innerHTML = createInfoMarkup(data);
  } else {
    cleanMarkup(infoEl);
    listEl.innerHTML = createInfoMarkup(data);
  }
};

function onSuccess(data) {
  if (data.length > 10) {
    cleanMarkup(listEl);
    cleanMarkup(infoEl);
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  renderMarkup(data);
}

function onError() {
  cleanMarkup(listEl);
  cleanMarkup(listEl);
  Notify.failure('Oops, there is no country with that name');
}

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
