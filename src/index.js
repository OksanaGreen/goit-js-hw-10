import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const newSlimSelect = new SlimSelect({
  select: '#selectElement',
  settings: {
    openPosition: 'auto', // 'auto', 'up' or 'down'
  },
});
const catSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
let el = document.querySelector('#selectElement');
// 1.HTTP - запити( і повертає проміс із масивом порід - результатом запиту. )
catSelect.addEventListener('change', onSearch);
function onSearch(event) {
  event.preventDefault();
  const breedyName = event.target.value;
  if (!breedyName) {
    catSelect.innerHTML = '';
    return;
  }
  new SlimSelect({
    select: '#selectElement',
    events: {
      beforeChange: (breedyName, oldVal) => {
        console.log(breedyName);
        return false; // this will stop the change from happening
      },
    },
  });
}

el.slim.open();

function fetchBreeds() {
  const BaseUrl = 'https://api.thecatapi.com/v1/';
  const ImgUrl = 'https://cdn2.thecatapi.com/images/';
  const ApiKey =
    'live_sHTcMzdhlueqqIpYr2EasVgaHY3pGwpKXvGupiU3EuYOITKGy0u5HY4qZgnVuIUr';
  return fetch(`${BaseUrl}breeds?api_key=${ApiKey}`)
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText, 'p.error');
      }

      return resp.json();
    })
    .catch(err => console.log(err));
}
fetchBreeds().then(data => {
  console.log(data);
  catSelect.insertAdjacentHTML('beforeend', createMarcap(data));
});
let breeds;
function createMarcap(breeds) {
  return (breedyName = breeds
    .map(
      ({
        reference_image_id,
        description,
        name,
      }) => `<option class="js-cat-breeds" value="${reference_image_id}" name="${name}" 
    
    ></option>`
    )
    .join(''));
}
function fullCatBreed(breeds) {
  const fullBreed = `<div class=class="cat-info">
 <img src="${ImgUrl}value="${reference_image_id}">
 <p class="cat-info"> name="${name}""${description}"</p>
</div>`;

  return fullBreed;
}
