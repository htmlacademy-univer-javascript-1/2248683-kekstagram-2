import {getCloseListeners} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const avatarImageSize = 35;
const [closeBigPicture, closeEscape] = getCloseListeners(bigPicture, closeButton);
let updateComments;

function getCommentsUpdater(commentsContainer, commentsCounter, commentsButton, comments) {
  const loadComments = (() => {
    let cur = 0;
    const perPage = 5;
    return () => {
      let addCount = perPage;
      const commentsFragment = document.createDocumentFragment();
      while (addCount > 0 && cur < comments.length) {
        const {avatar, message, name} = comments[cur];
        const listElem = document.createElement('li');
        listElem.classList.add('social__comment');
        const avatarImg = document.createElement('img');
        avatarImg.classList.add('social__picture');
        avatarImg.src = avatar;
        avatarImg.alt = name;
        avatarImg.width = avatarImageSize;
        avatarImg.height = avatarImageSize;
        const commentText = document.createElement('p');
        commentText.classList.add('social__text');
        commentText.textContent = message;
        listElem.appendChild(avatarImg);
        listElem.appendChild(commentText);
        commentsFragment.appendChild(listElem);
        addCount--;
        cur++;
      }
      commentsContainer.appendChild(commentsFragment);
      return cur;
    };
  })();

  return () => {
    const curCount = loadComments();
    if (curCount === comments.length) {
      commentsButton.classList.add('hidden');
    }
    commentsCounter.textContent = curCount.toString();
  };
}

function createBigPicture({url, likes, description, comments}) {
  updateComments = getCommentsUpdater(
    bigPicture.querySelector('.social__comments'),
    bigPicture.querySelector('.comments-current'),
    bigPicture.querySelector('.social__comments-loader'),
    comments);
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
  
   document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', closeEscape);
  closeButton.addEventListener('click', closeBigPicture);
  bigPicture.querySelector('.social__comments-loader').addEventListener('click', updateComments);
}
