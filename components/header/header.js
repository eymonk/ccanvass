import state from "../state.js";
import initiateGravity from "../../js/gravity.js";
import initiateCollision from "../../js/collision.js";
import initiateBubbles from "../../js/bubbles.js";


const canvas = document.querySelector('.canvas');
const header = document.querySelector('.header');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - header.offsetHeight;

function getElement(className) {
    return document.querySelector(`.${className}`);
}


function openScreen(screenName) {
    cancelAnimationFrame(state.animation);
    switch (screenName) {
        case 'gravity':
            initiateGravity();
            break;
        case 'collision':
            initiateCollision();
            break;
        default: initiateBubbles();
    }
}

const gravityBtn = getElement('nav__btn_gravity');
gravityBtn.addEventListener('click', () => openScreen('gravity'));

const collisionBtn = getElement('nav__btn_collision');
collisionBtn.addEventListener('click', () => openScreen('collision'));

const bubblesBtn = getElement('nav__btn_bubbles');
bubblesBtn.addEventListener('click', () => openScreen('bubbles'));