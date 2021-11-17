import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-message';
const formData = {};

form.addEventListener('submit', onBtnSubmit);
form.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value;

  const inputtedFormData = JSON.stringify(formData);
  localStorage.setItem('message-fbck', inputtedFormData);
});
textarea.addEventListener('input', throttle(onTextAreaInput, 500));

populateTextArea();

function onTextAreaInput(evt) {
  const message = evt.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function onBtnSubmit(evt) {
  evt.preventDefault();

  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// console.log(formData);

function populateTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    textarea.value = savedMessage;
  }
}

console.log(formData);
