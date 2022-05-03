import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';

import { getData, perPage } from './js/api';
import { input, form, gallery, moreBtn } from './js/ref';
import { renderMarkup, updateMarkup } from './js/render-markup';
import { onScroll, onUpBtnClick } from './js/helpers';

let page = 1;
let galleryLib = null;

form.addEventListener('submit', onInputDataSearch);
moreBtn.addEventListener('click', onMoreBtnClickLoader);
onScroll();
onUpBtnClick();

function onInputDataSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  moreBtn.classList.add('visually-hidden');
  const query = input.value.trim();

  if (!query) {
    return Notify.warning('Ваш запит порожній, спробуйте знову');
  }

  getData(query)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        return Notify.failure('Ваш запит не приніс успіху, сформуйте думку чіткіше і повторіть');
      } else {
        Notify.success('Вітаю!!! Ми знайшли потрібні фото для Вас)');
        initGalleryRes(data.hits);
      }

      if (data.totalHits > perPage) {
        page = 2;
        moreBtn.classList.remove('visually-hidden');
      }
    })
    .catch(error => {
      Notify.failure('А зась тобі! Введіть коректний запит');
      console.log(error);
    });
}

function initGalleryRes(arr) {
  renderMarkup(arr);
  if (!galleryLib) {
    galleryLib = new SimpleLightbox('.gallery a');
  } else galleryLib.refresh();
}

function onMoreBtnClickLoader(e) {
  const query = input.value.trim();
  //
  getData(query, page)
    .then(({ data }) => {
      console.log(page);
      const numberOfPage = Math.ceil(data.totalHits / perPage);
      if (numberOfPage > page) {
        page += 1;
      } else if (numberOfPage >= page) {
        page = 1;
        Notify.failure('А все,а більше немає! Глянь щось інше');
        moreBtn.classList.add('visually-hidden');
      }
      initGalleryRes(data.hits);
    })
    .catch(console.log);
}
