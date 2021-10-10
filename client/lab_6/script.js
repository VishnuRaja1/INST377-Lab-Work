/* eslint-disable no-shadow */
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const foodData = [];
fetch(endpoint).then((blob) => blob.json()).then((data) => foodData.push(...data));

function findMatches(wordsToMatch, foodData) {
  return foodData.filter((place) => {
    const regex = new RegExp(wordsToMatch, 'gi');
    return place.name.match(regex) || place.city.match(regex);
  });
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  const matchArray = findMatches(this.value, foodData);
  const html = matchArray.map((place) => `
      <li>
       <span class = "name">${place.name}, ${place.city}</span>
      </li>
      `).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);

window.onload = windowActions;