const createListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="60" height="40">${name.official}</li>`
    )
    .join('');
};

const createInfoMarkup = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" alt="${name.official}" width="60" height="40">${
        name.official
      }
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
};

export { createInfoMarkup, createListMarkup };
