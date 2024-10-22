import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fulfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
const submitButton = document.querySelector('button');
const inputNumber = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

const resetToDefault = () => {
  inputNumber.value = '';
  fulfilledRadio.checked = false;
  rejectedRadio.checked = false;
};

let delay = 0;
inputNumber.addEventListener('input', event => {
  delay = Number(event.target.value);
});

const makePromise = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledRadio.checked) {
        resolve(delay);
      } else if (rejectedRadio.checked) {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  makePromise(delay)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});

iziToast.settings({
  timeout: 4000,
  resetOnHover: true,
  //   icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  onOpening: function () {},
  onClosing: function () {},
});
