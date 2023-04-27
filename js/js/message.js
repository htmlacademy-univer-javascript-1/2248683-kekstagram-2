import {useCloseOnClickOutside, useOnEscape, stopPropagation} from './util.js';

const succesTemplate = document.querySelector('#success').content.querySelector('.success');
let setOnclickOutside, removeOnclickOutside;
let setOnEsc, removeOnEsc;
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const MODAL_PRIORITISE = 10;


function closeSection(section, classPrefix) {
  section.querySelector(`.${classPrefix}__inner`).removeEventListener('click', closeSection);
  section.querySelector(`.${classPrefix}__inner`).removeEventListener('click', stopPropagation);
  //section.querySelector(`.${classPrefix}__inner`).removeEventListener('keydown', stopPropagation);
  removeOnclickOutside();
  removeOnEsc();
  document.body.removeChild(section);
  [setOnclickOutside, removeOnclickOutside] = [undefined, undefined];
  [setOnEsc, removeOnEsc] = [undefined, undefined];
}

function addEvents(elem, closeEvent, classPrefix) {
  elem.addEventListener('click', closeEvent);
  elem.addEventListener('click', stopPropagation);
  elem.querySelector(`.${classPrefix}__button`).addEventListener('keydown', stopPropagation);
  setOnclickOutside();
  setOnEsc();
}

function setHooksIfNull(elem, closeEvent) {
  if (!setOnclickOutside) {
    [setOnclickOutside, removeOnclickOutside] = useCloseOnClickOutside(elem, closeEvent);
  }
  if (!setOnEsc) {
    [setOnEsc, removeOnEsc] = useOnEscape(elem, closeEvent, MODAL_PRIORITISE);
  }
}

function showSection(template, classPrefix){
  const section = template.cloneNode(true);
  const close = () => closeSection(section, classPrefix);
  setHooksIfNull(section.querySelector(`.${classPrefix}__inner`), close);
  addEvents(section, close, classPrefix);
  document.body.appendChild(section);
}

export function showSuccessSection() {
  showSection(succesTemplate, 'success');
}

export function showErrorSection() {
  showSection(errorTemplate, 'error');
}
