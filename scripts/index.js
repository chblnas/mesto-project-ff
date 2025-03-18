function addCard(card,  deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function showCards(cards) {
  const cardList = document.querySelector('.places__list');

  cards.forEach(card => {
    cardList.append(addCard(card, deleteCard));
  });
}

showCards(initialCards);