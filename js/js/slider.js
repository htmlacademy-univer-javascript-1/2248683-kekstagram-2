import {transformFromHundredProcent} from './util.js';

const sliderContainer = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview');
const [defaultButton, ...effectButtons] = document.querySelectorAll('.effects__preview');

let curConfig;

class Config {
  constructor(name, min, max, fixed, postfix = '') {
    this.name = name;
    this.min = min;
    this.max = max;
    this.fixed = fixed;
    this.postfix = postfix;
  }
}

const effectSliderConfigs = {
  'effects__preview--chrome': new Config('grayscale', 0, 1, 1),
  'effects__preview--sepia': new Config('sepia', 0, 1, 1),
  'effects__preview--marvin': new Config('invert', 0, 100, 0, '%'),
  'effects__preview--phobos': new Config('blur', 0, 3, 1, 'px'),
  'effects__preview--heat': new Config('brightness', 1, 3, 1),
};

const applyEffect = (ev) => {
  curConfig = effectSliderConfigs[ev.target.classList[ev.target.classList.length - 1]];
  if (!sliderContainer.noUiSlider) {
    noUiSlider.create(sliderContainer, {
      range: {min: 0, max: 100},
      step: 1,
      start: 100,
      connect: 'lower'
    });
    sliderContainer.noUiSlider.on('update', () => {
      const val = transformFromHundredProcent(sliderContainer.noUiSlider.get().toString(),
        curConfig.max, curConfig.min, curConfig.fixed);
      sliderValue.value = val;
      imgPreview.style.filter = `${curConfig.name}(${val}${curConfig.postfix})`;
    });
  }
  sliderContainer.noUiSlider.set(100, true);
};

const deleteEffect = () => {
  if (sliderContainer.noUiSlider) {
    sliderContainer.noUiSlider.destroy();
  }
  imgPreview.style.filter = '';
};

export function addSliderListeners() {
  defaultButton.addEventListener('click', deleteEffect);
  effectButtons.forEach((btn) => btn.addEventListener('click', applyEffect));
}

export function deleteSliderListeners(){
  defaultButton.removeEventListener('click', deleteEffect);
  effectButtons.forEach((btn) => btn.removeEventListener('click', applyEffect));
  deleteEffect();
}
