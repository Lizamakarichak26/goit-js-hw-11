import axios from 'axios';
import Notiflix from 'notiflix';
import './css/style.css';
import { fetchImage } from './fetch.Form';
import { createMarkup } from './create.Markup';



const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
const { form, input, gallery, loadMore } = refs;
let page = 1;
form.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoadMoreBtn);
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 300 });

async function onSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  const inputValue = input.value;
  const value = inputValue.trim();
  if (!value) {
    Notiflix.Notify.failure('Вибачте, порожній рядок. Введіть свій запит!');
    loadMore.hidden = true;
    return;
  }
  return await fetchThen(value);
}
loadMore.hidden = true;
// REQUEST
async function fetchThen(value) {
  try {
    const resp = await fetchImage(value);
    const array = resp.data.hits;
    const number = resp.data.totalHits;
    if (array.length === 0) {
      Notiflix.Notify.failure(
        'На жаль, немає зображень за вашим пошуковим запитом.Будь ласка спробуйте ще раз'
      );
      loadMore.hidden = true;
      return;
    }
    
    createMarkup(array, gallery);
    lightbox.refresh();
    loadMore.hidden = false;
    if (array.length < 40) {
      loadMore.hidden = true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtn() {
  const valueLoadBtn = input.value;
  let limitAdd = 40;
  page += 1;
  try {
    const resp = await fetchImage(valueLoadBtn, page, limitAdd);
    const hits = resp.data.hits;
    const totalHits = resp.data.totalHits;
    const maxIndex = (page - 1) * limitAdd + hits.length; 
    createMarkup(hits, gallery);
    onPageScrolling();
    lightbox.refresh();
    if (maxIndex >= totalHits) {
      
      loadMore.hidden = true;
      Notiflix.Notify.info(
        "Вибачте, ви досягли кінця результатів пошуку."
      );
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function onPageScrolling() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}