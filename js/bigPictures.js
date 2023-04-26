import {getCloseListeners} from './util.js';
import {getCommentsUpdater} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const avatarImageSize = 35;
let updateComments;
const [closeBigPicture, closeEscape] = getCloseListeners(bigPicture, closeButton, () => {
  bigPicture.querySelector('.social__comments-loader').removeEventListener('click', updateComments);
});

function createBigPicture({url, likes, description, comments}) {
  updateComments = getCommentsUpdater(
    bigPicture.querySelector('.social__comments'),
    bigPicture.querySelector('.comments-current'),
    bigPicture.querySelector('.social__comments-loader'),
    comments,
    avatarImageSize);
  bigPicture.querySelector('.big-picture__img').children[0].src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comments').replaceChildren();
  updateComments();
  bigPicture.querySelector('.social__caption').textContent = description;
}

export function showBigPicture(picture) {
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  bigPicture.querySelector('.social__comments-loader').removeEventListener('click', updateComments);
  createBigPicture(picture);
  //bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeEscape);
  closeButton.addEventListener('click', closeBigPicture);
  bigPicture.querySelector('.social__comments-loader').addEventListener('click', updateComments);
}

