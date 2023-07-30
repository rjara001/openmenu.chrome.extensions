import { MenuItem } from "./types/MenuItem.js";

export const NAME_EXTENSION = 'Menu Extend';
export const _OPENMENU_MENU_ID = '__open_menu_id';

// const _STYLE_AS_STRING = '#__open_menu_id{display: none;position: fixed;top: 0;width: 300px;background-color: #fff;z-index: 9999;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);font-family: Roboto, Helvetica, Arial, sans-serif;font-weight: 400;font-size: 14px;line-height: 1.43;letter-spacing: 0.01071em}#__open_menu_id select{appearance: none;border: none;background: transparent;font-size: 18px;padding: 10px;width: 100%;cursor: pointer;outline: none}#__open_menu_id select option{font-weight: bold}#__open_menu_id select option:first-child{color: #999;font-weight: normal}#__open_menu_id select::-ms-expand{display: none}#__open_menu_id select option:before{content: "";display: none}#__open_menu_id ul{list-style-type: none;padding-inline-start: 10px}#__open_menu_id .closeBtn{font-size: 15px;color: #180606;background: none;border: none;cursor: pointer}#__open_menu_id .closeBtn:hover{color: #ccc}#__open_menu_id .header{cursor:move; background-color: #999;height: 20px;justify-content: space-between;display: flex}#__open_menu_id .item{color: rgb(144, 202, 249);text-decoration: underline rgba(144, 202, 249, 0.4);position: relative;-webkit-tap-highlight-color: transparent;background-color: transparent;outline: 0px;border: 0px;margin: 0px;border-radius: 0px;padding: 0px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;display: inline-block;font-size:12px}#__open_menu_id .remove{align-self: center;display: inline-block;width: 10%;font-size: 11px}#__open_menu_id .remove:hover{color: #ccc;cursor: pointer}#__open_menu_id .category{color: rgb(144, 202, 249);cursor: pointer}#__open_menu_id .item{text-align: left;width: 100%}#__open_menu_id .itemline{display: flex}#__open_menu_id .submenu{display: flex} #__open_menu_id .subheader{background-color: floralwhite;text-align: left;width: 100%} #__open_menu_id .svg{padding-left:2px} #__open_menu_id .optionmenu{font-size:12px} #__open_menu_id .pr5{padding-right:5px} #__open_menu_id .disabled{cursor: not-allowed;color: #C6C6C6;} #__open_menu_id .fulfill{color: blue;font-weight: 400;}'

export const _MENU_DEFAULT: MenuItem = { items: [], settings:{activeAutoSave:true, activeMenu:true, pages:[]} }
export const LIMIT_LEN = 100;
export const LIMIT_LEN_TEXT = 500;
export const PLUS_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">    <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />    <path d="M12 16V8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>'
export const INPUT_TEXTS = 'input[type="password"], input[type="datetime"], input[type="time"], input[type="tel"], input[type="search"], input[type="url"], input[type="text"], input[type="email"], input[type="number"], input[type="date"], textarea';
export const _BOX_ID = '__open_menu_id';

export const URL_IFRAME = chrome.runtime.getURL('html/index.html');

export const SRC_IMG = chrome.runtime.getURL('icons/recording.png');
export const ID_IMG = _BOX_ID + '_img';

export const _HTML_IMG = `
<img src='${SRC_IMG}' id='${ID_IMG}' class='img-menu'></img>
`

export const _HTML_BOX = `
<div class="balloon-header">
      <img src='${SRC_IMG}' class='img-menu'></img>
      <h3>Menu Extend</h3>
      <div>
      <span class="minimize-btn">-</span>
      <span class="close-btn">&times;</span></div>
    </div>
    <iframe id='imenu' src='${URL_IFRAME}' style="border-width: 0px;width:100%"></iframe>
    <div class="status-bar"></div>
  `;

export const _STYLE_AS_STRING = `  
  :host {
    all: initial; /* Reset all styles */
    display: block; /* Make the host element a block-level element */
  }
  .balloon {
    position: fixed;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    display: none;
    z-index: 9999;
    width: 400px;
  }
  .balloon-header {
    display: flex;
    cursor:move;
    background-color: #999;
    justify-content: space-between;
    align-items: center;
  }
  .balloon-header h3 {
    margin: 0;
  }
  .balloon-header .close-btn {
    cursor: pointer;
    font-size: 21px;
    padding: 0px 4px;
  }
  .minimize-btn {
    cursor: pointer;
    font-size: 21px;
  }
  .balloon label {
    display: block;
    margin-bottom: 5px;
  }
  .img-menu {
    width:20px;
  }
  .div-img-menu {
    position:absolute;
    display: none;
    top:10px;
    left:10px
  }
 `
