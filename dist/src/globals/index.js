let _inputSelected = undefined;
let _activeExtension = false;
let _activeAutoSave = false;
let _MENU = { items: [], settings: { pages: [] } };
let _URL = '';
let _JOINED_ARRAY = [];
let _variables_loaded = false;
let _shadowRoot;
var _CURRENT_URL = '';
export function getShadowRoot() {
    return _shadowRoot;
}
export function setShadowRoot(value) {
    _shadowRoot = value;
}
export function getVariablesLoaded() {
    return _variables_loaded;
}
export function setVariablesLoaded(value) {
    _variables_loaded = value;
}
export function getInputSelected() {
    return _inputSelected;
}
export function setInputSelected(value) {
    _inputSelected = value;
}
export function getActiveExtension() {
    return _activeExtension;
}
export function setActiveExtension(value) {
    _activeExtension = value;
}
export function getActiveAutoSave() {
    return _activeAutoSave;
}
export function setActiveAutoSave(value) {
    _activeAutoSave = value;
}
export function getMenu() {
    return _MENU;
}
export function setMenu(value) {
    _MENU = value;
}
export function getURL() {
    return _URL;
}
export function setURL(value) {
    _URL = value;
}
export function getJoinedData() {
    return _JOINED_ARRAY;
}
export function setJoinedData(value) {
    _JOINED_ARRAY = value;
}
