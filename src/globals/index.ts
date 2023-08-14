import { _MENU_DEFAULT } from "../constants";
import { MenuItem } from "../types/MenuItem";

let _inputSelected: any = undefined;
let _MENU: MenuItem = _MENU_DEFAULT;
let _URL: string = '';
let _JOINED_ARRAY: any[] = [];
let _variables_loaded: boolean = false;
let _shadowRoot: any;
let _closeTemporary: boolean = false;

export function getCloseTemporary() : boolean {
  return _closeTemporary;
}
export function setCloseTemporary(value: boolean) {
  _closeTemporary = value;
}

export function getShadowRoot(): any {
  return _shadowRoot;
}

export function setShadowRoot(value: any): void {
  _shadowRoot = value;
}

export function getVariablesLoaded(): boolean {
  return _variables_loaded;
}

export function setVariablesLoaded(value: boolean): void {
  _variables_loaded = value;
}

export function getInputSelected(): any {
  return _inputSelected;
}

export function setInputSelected(value: any): void {
  _inputSelected = value;
}

export function getMenu(): MenuItem {
  if (_MENU === undefined)
    _MENU = _MENU_DEFAULT;

  if (!_MENU.items)
    _MENU.items = []
    
    _MENU = {... _MENU, items:_MENU.items.filter((_:any)=> _ !==null)}

  return _MENU;
}

export function setMenu(value: MenuItem): void {
  if (Array.isArray(value)) // old fashion
  getMenu().items = value;
else
  if (!value)
  _MENU = _MENU_DEFAULT;
  else
_MENU = value;
}

export function getURL(): string {
  return _URL;
}

export function setURL(value: string): void {
  _URL = value;
}

export function getJoinedData(): any[] {
  return _JOINED_ARRAY;
}

export function setJoinedData(value: any[]): void {
  _JOINED_ARRAY = value;
}