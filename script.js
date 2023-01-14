import './components/header/header.js';
import state from './components/state.js';


const itemsNumberBtn = document.querySelector('.main__items-number-btn');
itemsNumberBtn.addEventListener('click', () => {
    const itemsNumber = document.querySelector('.main__items-number').value;
    cancelAnimationFrame(state.animation);
    state.number = itemsNumber;
    state.resetCurrentScreen && state.resetCurrentScreen();
})