import {showBigPicture} from './photoFull.js';

const pictureTemplate = document.querySelector('#picture');
const pictureContainer = document.querySelector('.pictures');

export function insertPhotoMiniature(descriptions) {
  const pictureFragment = document.createDocumentFragment();
  for (const desc of descriptions) {
    const picture = pictureTemplate.cloneNode(true).content;
    picture.querySelector('.picture__img').src = desc.url;
    picture.querySelector('.picture').addEventListener('click', (ev) => {
      ev.preventDefault();
      showBigPicture(desc);
    });
    picture.querySelector('.picture__likes').textContent = desc.likes;
    picture.querySelector('.picture__comments').textContent = desc.comments.length;
    pictureFragment.appendChild(picture);
  }
  pictureContainer.appendChild(pictureFragment);
}

export function clearPhotoMiniature(){
  pictureContainer.querySelectorAll('.picture').forEach((p) => p.remove());
}
