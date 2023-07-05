var isDragging = false;
var initialX;
var initialY;


document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

function startDragging(event) {
    box = shadowRoot.getElementById(_OPENMENU_MENU_ID);
  isDragging = true;
  initialX = event.clientX - box.offsetLeft;
  initialY = event.clientY - box.offsetTop;
}

function drag(event) {
  if (isDragging) {
    box = shadowRoot.getElementById(_OPENMENU_MENU_ID);
    var newX = event.clientX - initialX;
    var newY = event.clientY - initialY;
    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
  }
}

function stopDragging() {
  isDragging = false;
}
