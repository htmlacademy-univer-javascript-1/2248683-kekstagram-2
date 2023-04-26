import {getCloseListers, trimField} from './util.js';
import {validator} from './form-validation.js';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const closeButton = overlay.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const descField = form.querySelector('.text__description');
const [closeForm, closeEscape] = getCloseListers(overlay, closeButton, clearForm);
const scale = form.querySelector('.scale__control--value');
const scaleControls = form.querySelectorAll('button.scale__control');

const scaleValueMin = 25;
const scaleValueMax = 100;

const trimFieldOnChange = (ev) => trimField(ev.target);
const stopPropogation = (ev) => ev.stopPropagation();

function submitForm(ev) {
  if (!validator.validate()) {
    ev.preventDefault();
  }
}

function changeScale(ev) {
  const newVal = +(scale.value.slice(0, -1)) + +ev.target.dataset.delta;
  if (newVal >= scaleValueMin && newVal <= scaleValueMax) {
    scale.value = `${newVal}%`;
  }
}

function clearForm() {
  form.reset();
  scaleControls.forEach((ctrl) => {
    ctrl.removeEventListener('click', changeScale);
  });
  form.removeEventListener('submit', submitForm);
  hashtagField.removeEventListener('change', trimFieldOnChange);
  hashtagField.removeEventListener('keydown', stopPropogation);
  descField.removeEventListener('change', trimFieldOnChange);
  descField.removeEventListener('keydown', stopPropogation);
}

export function showFileForm() {
  form.addEventListener('submit', submitForm);
  scaleControls.forEach((ctrl) => {
    ctrl.addEventListener('click', changeScale);
  });
  hashtagField.addEventListener('change', trimFieldOnChange);
  hashtagField.addEventListener('keydown', stopPropogation);
  descField.addEventListener('change', trimFieldOnChange);
  descField.addEventListener('keydown', stopPropogation);
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeEscape);
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}
