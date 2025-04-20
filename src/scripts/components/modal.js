function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  const popupCloseButton = modalElement.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => closeModal(modalElement));

  modalElement.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  modalElement.removeEventListener('click', closeModalOverlay);
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

export {openModal, closeModal};