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
// 1.HTTP - запити( і повертає проміс із масивом порід - результатом запиту. )
catSelect.addEventListener('change', onSearch);
function onSearch(event) {
  event.preventDefault();
  const beedyName = event.target.value.id;
  console.log(event.target.value.id);
  if (!beedyName) {
    catInfo.innerHTML = '';
    return;
  }
  new SlimSelect({
    select: '#selectElement',
    events: {
      beforeChange: (beedyName, oldVal) => {
        console.log(beedyName);
        return false; // this will stop the change from happening
      },
    },
  });
}

function fetchBreeds(beedyName) {
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
function createMarcap(arr) {
  return arr
    .map(
      ({
        reference_image_id,
        description,
        name,
      }) => `<option class="js-cat-breeds" value="${reference_image_id}" name="${name}" 
    
    ></option>`
    )
    .join('');
}
function fullCatBeeds(beed) {
  const fullBeed = `<div class=class="cat-info">
 <img src="${ImgUrl}value="${reference_image_id}">
 <p class="cat-info"> name="${name}""${description}"</p>
</div>`;

  return fullBeed;
}
