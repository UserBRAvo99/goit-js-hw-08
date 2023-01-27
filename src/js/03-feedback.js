import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const key = 'feedback-form-state';
// 1 створюємо пустий об'єкт, в який будемо записувати данні з форми
let formData = {};
// 2 ставимо слухача на форму (подія input) та вказуємо калбєк функцію handlerInput яка буде приймати подію як параметр
// 22 огортаємо handlerInput в throttle та вказуємо час затримки в секундах
formEl.addEventListener('input', throttle(handlerInput, 5000));
// 15 ставимо слухача на форму (подія submit) та вказуємо калбєк функцію onSubmit яка буде приймати подію як параметр
formEl.addEventListener('submit', onSubmit);

// 3 оголошуємо функцію в якій приймаємо подію event
function handlerInput(event) {
  // 4 в formData через квадратні дужки(динамічно) додаємо ключ[event.target.name] та вказуємо значення ключа
  formData[event.target.name] = event.target.value;
  // 5 в локальне сховище передаємо(та зберігаємо) значення key та об'єкт formData за допомогою JSON.stringify(formData) (передає ключ і значення як рядок)
  localStorage.setItem(key, JSON.stringify(formData));
}
// 6 оголошуємо функцію для збереження данних в формі
function getFormData() {
  // 7 оголошуємо змінну та передаємо їй значення з локалбного сховища за ключем
  const saveFormData = localStorage.getItem(key);
  // 8 перевіряємо змінну saveFormData (за допомогою інверсії), якщо вона пуста то виходимо з функції
  if (!saveFormData) return;
  // 9 додаємо try catch для потенційно небезпечного коду (JSON.parse - таким і являється)
  try {
    // 10 перевизначаємо formData та передаємо saveFormData(в форматі рядок: рядок), парсимо за допомогою JSON.parse щоб отримати об'єкт
    formData = JSON.parse(saveFormData);
    // 11 за допомогою метода Object.entries перетворюємо formData в багатовимірний масив (масив масивів)
    // 12 перебираємо масив forEach, одразу деструктуризуємо масив по ключу та значенню
    Object.entries(formData).forEach(([key, value]) => {
      // 13 перезаписуємо значення форми на отримане з formData (тобто записаного в локаьному сховищі)
      formEl[key].value = value;
    });
  } catch (error) {
    // в випадку отримання не валіднорго коду , тобто якщо try не виконається, наша сторінка не злетить
  }
}
// 14 викликаємо функцію getFormData
getFormData();

// функція onSubmit спрацює на натискання кнопки Submit
// 16 оголошуємо функцію onSubmit
function onSubmit(event) {
  // 17 скасовуємо дію браузера за замовчуванням  (не перезавантажуємо сторінку при кліку по кнопці Submit)
  event.preventDefault();
  // 18 виводимо в консоль об'єкт formData
  console.log(formData);
  // 19 очищуємо об'єкт formData
  formData = {};
  // 20 видаляємо з локального сховища данні по ключу
  localStorage.removeItem(key);
  // 21 видаляємо данні з форми
  formEl.reset();
}
