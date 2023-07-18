let _inputSelected = undefined;
let _activeExtension = false;
let _activeAutoSave: boolean = false;

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

export function setActiveAutoSave(value: boolean): void {
  _activeAutoSave = value;
}
