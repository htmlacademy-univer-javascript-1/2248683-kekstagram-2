import {getMiniatures} from './api.js';
import {insertPhotoMiniature} from './photoMiniature.js';
import {showFileForm} from './form.js';
import {showFilters} from './filters.js';

//const descriptions = Array.from({length: PHOTOS_COUNT}, generateDescription);
//insertPhotoMiniature(descriptions);
const fileInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview').querySelector('img');

getMiniatures()
  .then((r) => {
    insertPhotoMiniature(r);
    showFilters(r);
  });

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!['png', 'jpg', 'jpeg'].some((suf) => file.name.toLowerCase().endsWith(suf))){
    return;
  }
  preview.src = URL.createObjectURL(file);
  showFileForm();
});
