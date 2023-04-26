import {isCorrectLength} from './util.js';

const form = document.querySelector('#upload-select-image');
const hashtagField = form.querySelector('.text__hashtags');
const descField = form.querySelector('.text__description');
const descriptionMaxLength = 140;
const hashtagsMaxCount = 5;

export const validator = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field__error'
});
validator.addValidator(hashtagField, validateHashtags, 'Хэштегов может быть не больше 5 через пробел.' +
  ' Допускаются только буквы и числа.');
validator.addValidator(descField, validateDescription, 'Максимальное количество символов - 140');

function validateDescription(value) {
  return isCorrectLength(value, descriptionMaxLength);
}

function validateHashtags(value) {
  const hashtags = value.split(' ').map((v) => v.toLowerCase());
  return (new Set(hashtags)).size === hashtags.length &&
    hashtags.length <= hashtagsMaxCount &&
    hashtags.every((tag) => /^#[а-яa-z0-9]{1,19}}$/.test(tag));
}
