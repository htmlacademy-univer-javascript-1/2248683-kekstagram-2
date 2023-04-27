export function getCommentsUpdater(commentsContainer, commentsCounter, commentsButton, comments, avatarImageSize) {
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
