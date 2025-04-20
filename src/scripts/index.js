import '../pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = editProfileForm.querySelector('.popup__input_type_description');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = addCardModal.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = addCardForm.querySelector('.popup__input_type_url');

const imageModal = document.querySelector('.popup_type_image');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => popup.classList.add('popup_is-animated'));

function renderCard(card) {
  return createCard(card, deleteCard, likeCard, openImageModal);
}

function showCards(cards) {
  cards.forEach(card => cardList.append(renderCard(card)));
}

showCards(initialCards);

function addCard() {
  const name = cardNameInput.value;
  const link = cardUrlInput.value;

  cardList.prepend(renderCard({name, link}));
}

function openImageModal(card) {
  popupImage.setAttribute('src', card.link);
  popupImage.setAttribute('alt', card.name);
  popupCaption.textContent = card.name;

  openModal(imageModal);
}

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(editProfileModal);
});

addCardButton.addEventListener('click', () => openModal(addCardModal));

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
  editProfileForm.reset();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCard();
  closeModal(addCardModal);
  addCardForm.reset();
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);