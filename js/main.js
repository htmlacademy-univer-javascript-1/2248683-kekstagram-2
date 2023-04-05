import {generateDescription, PHOTOS_COUNT} from './data';
import {isCorrectLength} from './util';

const descriptions = Array.from({length: PHOTOS_COUNT}, generateDescription);

isCorrectLength(descriptions, PHOTOS_COUNT);
