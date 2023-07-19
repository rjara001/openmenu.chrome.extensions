let _MENU:any;
let _URL:any;
let _JOINED_ARRAY:any;

export function getMenu() : any {
    return _MENU;
}

export function setMenu(value:any) {
    _MENU = value;
}

export function getURL() : string {
    return _URL;
}

export function setURL(value:string) {
    _URL = value;
}

export function getJoinedArray() : any {
    return _JOINED_ARRAY;
}

export function setJoinedArray(value:any[]) {
    _JOINED_ARRAY = value;
}