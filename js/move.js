var isDragging = false;
var initialX;
var initialY;


document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

function startDragging(event) {
    box = shadowRoot.getElementById('balloon');
  isDragging = true;
  initialX = event.clientX - box.offsetLeft;
  initialY = event.clientY - box.offsetTop;
}

function drag(event) {
  if (isDragging) {
    box = shadowRoot.getElementById('balloon');
    var newX = event.clientX - initialX;
    var newY = event.clientY - initialY;
    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
  }
}

function stopDragging() {
  isDragging = false;
}
