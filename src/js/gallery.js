import Notiflix from 'notiflix';
import axios from 'axios';
import { UnsplashAPI } from './unsplash-api';
import { CardHelper } from './image_template';

const searchFormEl = document.querySelector('.js-search-form');
const inputEl = searchFormEl.firstElementChild;
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashInstance = new UnsplashAPI();
const cardHelperInstance = new CardHelper();
const doSearchAndLoad = event => {
  event.preventDefault();
  loadMoreBtnEl.style.display = 'none';
  const searchQuery = inputEl.value.trim();
  if (!searchQuery) {
    return;
  }
  if (unsplashInstance.q !== searchQuery) {
    galleryListEl.innerHTML = '';
    unsplashInstance.page = 1;
  }
  unsplashInstance.q = searchQuery;
  unsplashInstance
    .fetchPhotos()
    .then(data => {
      console.log(data);
      if (!data.hits.length) {
        return Notiflix.Notify.failure(
          'К сожалению, нет изображений, соответствующих вашему поисковому запросу. Пожалуйста, попробуйте еще раз.'
        );
      } else {
        Notiflix.Notify.success(
          `Ура, было найдено ${data.totalHits} совпадений`
        );
      }
      galleryListEl.innerHTML += cardHelperInstance.generatePhotoCard(
        data.hits
      );
      if (
        data.totalHits / unsplashInstance.itemsPerPage <
        unsplashInstance.page
      ) {
        return Notiflix.Notify.failure('Вы дошли до конца списка');
      }
      loadMoreBtnEl.style.display = 'block';
    })
    .catch(console.warn);
};

const handleSearchFormLoadMore = event => {
  unsplashInstance.page += 1;
  doSearchAndLoad(event);
};

searchFormEl.addEventListener('submit', doSearchAndLoad);
loadMoreBtnEl.addEventListener('click', handleSearchFormLoadMore);
