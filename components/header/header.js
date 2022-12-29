import initiateGravity from "../../js/gravity.js";
import initiateCollision from "../../js/collision.js";
import initiateBubbles from "../../js/bubbles.js";

function getElement(className) {
    return document.querySelector(`.${className}`);
}

const gravityBtn = getElement('nav__btn_gravity');
const collisionBtn = getElement('nav__btn_collision');
const bubblesBtn = getElement('nav__btn_bubbles');
function openScreen(screenName) {
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

gravityBtn.addEventListener('click', () => openScreen('gravity'));
collisionBtn.addEventListener('click', () => openScreen('collision'));
bubblesBtn.addEventListener('click', () => openScreen('bubbles'));