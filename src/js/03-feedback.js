import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('input');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onBtnSubmit);
form.addEventListener('input', throttle(onTextAreaInput, 500));

populateTextArea();

function onTextAreaInput({ target: { name, value } }) {
  const fieldToUpdate = { [name]: value };
  const store = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  const updatedStore = JSON.stringify({
    ...store,
    ...fieldToUpdate,
  });

  localStorage.setItem(STORAGE_KEY, updatedStore);
}

function onBtnSubmit(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextArea() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  input.value = parsedData?.email || '';
  textarea.value = parsedData?.message || '';
}
