function addCard(card,  deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').setAttribute('src', card.link);
  cardElement.querySelector('.card__image').setAttribute('alt', card.name);
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function showCards(cards) {
  const cardList = document.querySelector('.places__list');

  cards.map(card => {
    cardList.append(addCard(card, deleteCard));
  });
}

showCards(initialCards);