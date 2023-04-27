import {getMiniatures} from './api.js';
import {insertPhotoMiniature} from './photoMiniature.js';
import {showFileForm} from './form.js';
import {showFilters} from './filters.js';

//const descriptions = Array.from({length: PHOTOS_COUNT}, generateDescription);
//insertPhotoMiniature(descriptions);


getMiniatures()
 
  .then((r) => {
    insertPhotoMiniature(r);
    return r;
  })
  .then(showFilters);
document.querySelector('#upload-file').addEventListener('change', showFileForm);
