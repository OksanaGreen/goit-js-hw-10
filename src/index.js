import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
new SlimSelect({
  select: '#selectElement',
});
const catSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// 1.HTTP - запити( і повертає проміс із масивом порід - результатом запиту. )
let breedId;
function fetchBreeds() {
  const BaseUrl = 'https://api.thecatapi.com/v1/';
  const ApiKey =
    'live_sHTcMzdhlueqqIpYr2EasVgaHY3pGwpKXvGupiU3EuYOITKGy0u5HY4qZgnVuIUr';

  return fetchBreeds(`${BaseUrl}breeds?api_key=${ApiKey}`)
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

// // 2.Колекція порід
// // 3.Інформація про кота
// fetchCatByBreed(breedId);
// // 4.Опрацювання стану завантаження
// // 5.Опрацювання помилки
// https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}
