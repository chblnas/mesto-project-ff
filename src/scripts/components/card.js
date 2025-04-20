function createCard(card, handleDeleteCard, handleLikeCard, handleOpenImageModal) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
  likeButton.addEventListener('click', () => handleLikeCard(likeButton));
  cardImage.addEventListener('click', () => handleOpenImageModal(card));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};
