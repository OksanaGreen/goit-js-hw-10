import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
new SlimSelect({
  select: '#selectElement',
});
const catSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// 1.HTTP - запити( і повертає проміс із масивом порід - результатом запиту. )
function getCat(breedsName, breedId) {
  // https://api.thecatapi.com/v1/images/search?api_key=live_sHTcMzdhlueqqIpYr2EasVgaHY3pGwpKXvGupiU3EuYOITKGy0u5HY4qZgnVuIUr&limit=100&has_breeds=0&breed_ids=none
  const BaseUrl = 'https://api.thecatapi.com/v1/images/search';
  const ApiKey =
    'live_sHTcMzdhlueqqIpYr2EasVgaHY3pGwpKXvGupiU3EuYOITKGy0u5HY4qZgnVuIUr';

  return fetch(
    `${BaseUrl}?api_key=${ApiKey}&limit=100&has_breeds${breedsName}&breed_ids${breedId}`
  )
    .then(resp => {
      return resp.joson();
    })
    .then((has_breeds, breed_ids) => {
      console.log(has_breeds, breed_ids);
    });
}
//   if (!resp.ok) {
//     throw new Error(resp.statusText, 'p.error');
//   }
//   return resp.jeson();
// });

getCat();
// fetchBreeds()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
// // 2.Колекція порід
// // 3.Інформація про кота
// fetchCatByBreed(breedId);
// // 4.Опрацювання стану завантаження
// // 5.Опрацювання помилки
