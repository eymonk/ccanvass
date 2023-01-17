const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal__message');
const modalBtn = document.querySelector('.modal__btn');

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('open');
}

function closeModal() {
    modalMessage.textContent = 'Nice to meet you!';
    modal.classList.remove('open');
}

modalBtn.addEventListener('click', closeModal);

export { showModal, closeModal };