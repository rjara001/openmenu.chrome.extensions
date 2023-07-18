import { getShadowRoot } from "./globals/index.js";
let ITEMS = [];
export function addEllipsis(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    else {
        return text;
    }
}
export function barMessage(text) {
    let balloon = getShadowRoot().getElementById("balloon");
    var status = balloon.querySelector(".status-bar");
    status.innerText = text;
}
export function resizeIframe(size) {
    var iframe = getShadowRoot().getElementById('imenu');
    iframe.style.height = `${size}px`;
}
// function showBalloon(x, y) {
//     let balloon = getShadowRoot().getElementById("balloon");
//     x = x || 0;
//     y = y || 0;
//     balloon.style.display = "block";
//     // var url = shadowRoot.getElementById("url");
//     // url.value = window.location.href;
//     balloon.style.left = x + "px";
//     balloon.style.top = y + "px";
//     var iframe = getShadowRoot().getElementById('imenu');
//     const domain = URL_IFRAME.split('/')[0] + '//' + URL_IFRAME.split('/')[2];
//     iframe.contentWindow.postMessage({ items: ITEMS, currentUrl: window.location.href }, domain);
// }
export function hideBalloon() {
    let balloon = getShadowRoot().getElementById("balloon");
    balloon.style.display = "none";
}
function isMenuOpened() {
    if (!getShadowRoot())
        return;
    const balloon = getShadowRoot().getElementById("balloon");
    if (balloon)
        return balloon.style.display === 'block';
}
// function clickOutOfBox(obj) {
//     if (obj == null)
//         return true;
//     if (obj.shadowRoot !== undefined && obj.shadowRoot !== null)
//         return false;
//     if (obj.nodeName === 'INPUT' || obj.nodeName === 'TEXTAREA')
//         return false;
//     if (obj.id != _BOX_ID)// && obj.id != _divVeryMatch_IMAGEN)
//         return clickOutOfBox(obj.parentNode);
//     return false;
// }
