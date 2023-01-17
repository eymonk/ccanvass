const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal__message');
const modalBtn = document.querySelector('.modal__btn');

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    modalMessage.textContent = 'Nice to meet you!';
    modal.style.display = 'none';
}

modalBtn.addEventListener('click', closeModal);

export { showModal, closeModal };