function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

export {openModal, closeModal};