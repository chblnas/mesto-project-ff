function createCard(card, handleDeleteCard, handleLikeCard, handleOpenImageModal, toggleLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCount.textContent = card.likes;

  if (card.isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id !== card.userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => handleDeleteCard(card.cardId, cardElement));
  }

  likeButton.addEventListener('click', () => handleLikeCard(card.cardId, likeButton, likeCount, toggleLike));
  cardImage.addEventListener('click', () => handleOpenImageModal(card.name, card.link));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(cardId, likeButton, likeCount, toggleLike) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  toggleLike(cardId, isLiked)
    .then(card => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = card.likes.length;
    })
    .catch(err => console.error(`Ошибка лайка ${err}`));
}

export { createCard, deleteCard, likeCard };
