import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('input');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onBtnSubmit);
form.addEventListener('input', throttle(onTextAreaInput, 500));

populateTextArea();

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;

  const inputtedFormData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, inputtedFormData);
}

function onBtnSubmit(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextArea() {
  const parsedDateFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parsedDateFromStorage) {
    input.value = parsedDateFromStorage.email;
    textarea.value = parsedDateFromStorage.message;
  }
}
