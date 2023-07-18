import { getShadowRoot } from "./globals/index.js";

var isDragging = false;
var initialX:number;
var initialY:number;
var box;

document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

export function startDragging(event:any) {
    box = getShadowRoot().getElementById('balloon');
  isDragging = true;
  initialX = event.clientX - box.offsetLeft;
  initialY = event.clientY - box.offsetTop;
}

function drag(event:any) {
  if (isDragging) {
    box = getShadowRoot().getElementById('balloon');
    var newX = event.clientX - initialX;
    var newY = event.clientY - initialY;
    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
  }
}

function stopDragging() {
  isDragging = false;
}
