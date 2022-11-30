const URL = 'https://restcountries.com/v3.1/name';

const fetchCountries = name => {
  return fetch(
    `${URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchCountries };
