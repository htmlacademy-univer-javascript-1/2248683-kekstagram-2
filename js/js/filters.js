import {insertPhotoMiniature, clearPhotoMiniature} from './photoMiniature.js';
import {debounce, getRandomInt} from './util.js';

const filterSection = document.querySelector('.img-filters');
let photos;
let lastActive = filterSection.querySelector('.img-filters__button--active');

function defaultSort() {
  return photos;
}

function tenRandomSort() {
  const newPhotos = [];
  const used = new Set();
  while (used.size < 10) {
    const i = getRandomInt(0, photos.length - 1);
    if (used.has(i)) {
      continue;
    }
    used.add(i);
    newPhotos.push(photos[i]);
  }
  return newPhotos;
}

function discussedSort() {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(curElem, sorting) {
  clearPhotoMiniature();
  insertPhotoMiniature(sorting());
  lastActive.classList.remove('img-filters__button--active');
  curElem.classList.add('img-filters__button--active');
  lastActive = curElem;
}

export function showFilters(data) {
  photos = data;
  filterSection.classList.remove('img-filters--inactive');
  const defButton = filterSection.querySelector('#filter-default');
  const randomButton = filterSection.querySelector('#filter-random');
  const dicsuccedButton = filterSection.querySelector('#filter-discussed');
  defButton.addEventListener('click', debounce(() => applyFilter(defButton, defaultSort)));
  randomButton.addEventListener('click', debounce(() => applyFilter(randomButton, tenRandomSort)));
  dicsuccedButton.addEventListener('click', debounce(() => applyFilter(dicsuccedButton, discussedSort)));
}
