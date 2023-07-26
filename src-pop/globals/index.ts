import { _MENU_DEFAULT } from "../constants";
import { localSaveValueSettings } from "../store";
import { MenuItem } from "../types/MenuItem";

let _inputSelected: any = undefined;
let _activeExtension = false;
let _activeAutoSave: boolean = false;
let _MENU: MenuItem = { items: [], settings: { pages: [], activeAutoSave: true, activeMenu: true } };
let _URL: string = '';
let _JOINED_ARRAY: any[] = [];
let _variables_loaded: boolean = false;
let _shadowRoot: any;
let _activeMenu: boolean = false;

var _CURRENT_URL = '';

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

export function getActiveExtension(): boolean {
  return _activeExtension;
}

export function setActiveExtension(value: boolean): void {
  _activeExtension = value;
}

export function getActiveAutoSave(): boolean {
  return _activeAutoSave;
}

export function setActiveMenu(value: boolean): void {
  _activeMenu = value;
  localSaveValueSettings('activeMenu', value);
}

export function getActiveMenu(): boolean {
  return _activeMenu;
}

export function setActiveAutoSave(value: boolean): void {
  _activeAutoSave = value;
  localSaveValueSettings('activeAutoSave', value);
}

export function getMenu(): MenuItem {
  if (_MENU === undefined)
    _MENU = _MENU_DEFAULT;

  if (!_MENU.items)
    _MENU.items = []

  if (!_MENU.settings)
    _MENU.settings = _MENU_DEFAULT.settings;

  return _MENU;
}

export function setMenu(value: MenuItem): void {
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