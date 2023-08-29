import { URL_IFRAME, _BOX_ID } from "./constants";
import { getShadowRoot } from "./globals/index";

export function addEllipsis(text:string, maxLength:number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}
export function barMessage(text:string) {
    let balloon = getShadowRoot().getElementById("balloon");
    
    var status = balloon.querySelector(".status-bar");
    status.innerText = text;
}

export function resizeIframe(size:string) {
    var iframe = getShadowRoot().getElementById('imenu');
    iframe.style.height = `${size}px`;
}

export function minimizeIframe(hidden:boolean) {
    var iframe = getShadowRoot().getElementById('imenu');
    iframe.style.display = hidden?'none':'block';
}

export function hideBalloon() {
    let balloon = getShadowRoot().getElementById("balloon");
    balloon.style.display = "none";
}