import { getCloseTemporary, getShadowRoot } from "./globals/index";

let isDragging = false;
let initialX: number;
let initialY: number;
let box:any;
let boxHeader:any;
let headerBoundingBox: any;

document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

export function startDragging(event: any) {
    if (getCloseTemporary() === false) {
        box = getShadowRoot().getElementById('balloon');
        boxHeader = box.querySelector('.header-move');
        // Get the header's bounding box
        

        isDragging = true;
        initialX = event.clientX - box.offsetLeft;
        initialY = event.clientY - box.offsetTop;
    }
}

function drag(event: any) {
    if (isDragging) {

        // headerBoundingBox = boxHeader.getBoundingClientRect();
        // // Check if the cursor is within the header's boundaries
        // if (
        //     event.clientX >= headerBoundingBox.left &&
        //     event.clientX <= headerBoundingBox.right &&
        //     event.clientY >= headerBoundingBox.top &&
        //     event.clientY <= headerBoundingBox.bottom
        // ) {
            // Calculate new position
            var newX = event.clientX - initialX;
            var newY = event.clientY - initialY;
            box.style.left = newX + 'px';
            box.style.top = newY + 'px';
        // }
    }
}

function stopDragging() {
    isDragging = false;
}
