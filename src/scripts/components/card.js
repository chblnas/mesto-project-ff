function createCard(card, handleDeleteCard, handleLikeCard, handleOpenImageModal) {
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
    likeButton.classList.toggle('card__like-button_is-active');
  }

  if (card.owner._id !== card.userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', () => handleDeleteCard(card.cardId, cardElement));
  likeButton.addEventListener('click', () => handleLikeCard(card.cardId, likeButton, likeCount));
  cardImage.addEventListener('click', () => handleOpenImageModal(card.name, card.link));

  return cardElement;
}

export {createCard};
