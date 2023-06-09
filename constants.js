const NAME_EXTENSION = 'Menu Extend';
const _OPENMENU_MENU_ID = '__open_menu_id';

const _STYLE_AS_STRING = '#__open_menu_id{display: none;position: fixed;top: 0;width: 300px;background-color: #fff;z-index: 9999;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);font-family: Roboto, Helvetica, Arial, sans-serif;font-weight: 400;font-size: 14px;line-height: 1.43;letter-spacing: 0.01071em}#__open_menu_id select{appearance: none;border: none;background: transparent;font-size: 18px;padding: 10px;width: 100%;cursor: pointer;outline: none}#__open_menu_id select option{font-weight: bold}#__open_menu_id select option:first-child{color: #999;font-weight: normal}#__open_menu_id select::-ms-expand{display: none}#__open_menu_id select option:before{content: "";display: none}#__open_menu_id ul{list-style-type: none;padding-inline-start: 10px}#__open_menu_id .closeBtn{font-size: 15px;color: #180606;background: none;border: none;cursor: pointer}#__open_menu_id .closeBtn:hover{color: #ccc}#__open_menu_id .header{cursor:move; background-color: #999;height: 20px;justify-content: space-between;display: flex}#__open_menu_id .item{color: rgb(144, 202, 249);text-decoration: underline rgba(144, 202, 249, 0.4);position: relative;-webkit-tap-highlight-color: transparent;background-color: transparent;outline: 0px;border: 0px;margin: 0px;border-radius: 0px;padding: 0px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;display: inline-block;font-size:12px}#__open_menu_id .remove{align-self: center;display: inline-block;width: 10%;font-size: 11px}#__open_menu_id .remove:hover{color: #ccc;cursor: pointer}#__open_menu_id .category{color: rgb(144, 202, 249);cursor: pointer}#__open_menu_id .item{text-align: left;width: 100%}#__open_menu_id .itemline{display: flex}#__open_menu_id .submenu{display: flex} #__open_menu_id .subheader{background-color: floralwhite;text-align: left;width: 100%} #__open_menu_id .svg{padding-left:2px} #__open_menu_id .optionmenu{font-size:12px} #__open_menu_id .pr5{padding-right:5px} #__open_menu_id .disabled{cursor: not-allowed;color: #C6C6C6;} #__open_menu_id .fulfill{color: blue;font-weight: 400;}'

var inputSelected = undefined;
var activeExtension = false;
var activeAutoSave = false;
const LIMIT_LEN = 100;
const LIMIT_LEN_TEXT = 500;
const PLUS_SVG='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">    <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />    <path d="M12 16V8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>'
const INPUT_TEXTS = 'input[type="datetime"], input[type="time"], input[type="tel"], input[type="search"], input[type="url"], input[type="text"], input[type="email"], input[type="number"], input[type="date"], textarea';

var _MENU = {items:[], settings:{pages:[]}};

