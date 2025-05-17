import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { userAPI, cardAPI } from './components/api.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
let userId = null;

const updateAvatarModal = document.querySelector('.popup_type_update-avatar');
const updateAvatarForm = updateAvatarModal.querySelector('.popup__form');
const updateAvatarInput = updateAvatarForm.querySelector('.popup__input_type_avatar');
const updateAvatarFormButton = updateAvatarForm.querySelector('.popup__button');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const profileSubmitButton = editProfileForm.querySelector('.popup__button');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = addCardModal.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = addCardForm.querySelector('.popup__input_type_url');
const addCardFormSubmitButton = addCardForm.querySelector('.popup__button');

const imageModal = document.querySelector('.popup_type_image');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

const deleteCardModal = document.querySelector('.popup_type_delete-card');
const deleteCardForm = deleteCardModal.querySelector('.popup__form');
let idCardForDelete = null;
let cardElementForDelete = null;

const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || (evt.currentTarget === evt.target)) {
      closeModal(popup);
    }
  });
});

Promise.all([userAPI.getUser(), cardAPI.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    cardsData.forEach(card => {
      const isLiked = card.likes.some(user => user._id === userId);

      cardList.append(renderCard({
        name: card.name, 
        link: card.link, 
        likes: card.likes.length,
        owner: card.owner,
        userId: userId,
        cardId: card._id,
        isLiked
      }));
    })
  })
  .catch(err => {
    console.error('Ошибка загрузки', err);
  });

function renderLoading(buttonElement, isLoading) {
  isLoading ? buttonElement.textContent = 'Сохранение...' : buttonElement.textContent = 'Сохранить';
}

function renderCard(card) {
  return createCard(card, openDeleteCardModal, likeCard, openImageModal, cardAPI.toggleLike);
}

function openDeleteCardModal(cardId, cardElement) {
  openModal(deleteCardModal);

  idCardForDelete = cardId;
  cardElementForDelete = cardElement;
}

function handleDeleteCard(evt) {
  evt.preventDefault();

  cardAPI.deleteCard(idCardForDelete)
    .then(() => {
      deleteCard(cardElementForDelete);
      closeModal(deleteCardModal);
    })
    .catch(err => console.error(err));
}

function openImageModal(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imageModal);
}

function handleProfileAvatarClick() {
  openModal(updateAvatarModal);
  clearValidation(addCardForm, validationConfig);
  clearValidation(updateAvatarForm, validationConfig);
}

function handleEditProfileButtonClick() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(editProfileModal);
  clearValidation(editProfileForm, validationConfig);
}

function handleAddCardButtonClick() {
  openModal(addCardModal);
  clearValidation(addCardForm, validationConfig);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(profileSubmitButton, true);

  userAPI.updateUser(profileNameInput.value, profileDescriptionInput.value)
    .then(data => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(editProfileModal);
      editProfileForm.reset();
    })
    .catch(err => console.error('Ошибка обновления профиля.', err))
    .finally(() => {
      renderLoading(profileSubmitButton, false);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(addCardFormSubmitButton, true);

  cardAPI.createCard(cardNameInput.value, cardUrlInput.value)
    .then(card => {
      cardList.prepend(renderCard({
        name: card.name,
        link: card.link, 
        owner: card.owner,
        userId: userId,
        cardId: card._id
      }))

      closeModal(addCardModal);
      addCardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(addCardFormSubmitButton, false);
    });
}

function handleUpdateAvatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(updateAvatarFormButton, true);

  userAPI.updateAvatar(updateAvatarInput.value)
    .then(user => {
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;

      closeModal(updateAvatarModal);
      updateAvatarForm.reset();
    })
    .catch(err => console.error('Ошибка добавления аватара:', err))
    .finally(() => {
      renderLoading(updateAvatarFormButton, false);
    });
}

profileAvatar.addEventListener('click', handleProfileAvatarClick);
editProfileButton.addEventListener('click', handleEditProfileButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
updateAvatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);
deleteCardForm.addEventListener('submit', handleDeleteCard);

enableValidation(validationConfig);