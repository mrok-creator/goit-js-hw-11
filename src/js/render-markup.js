import { gallery } from './ref';

function renderMarkup(images) {
  const markup = images
    .map(img => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = img;
      return `
        <a  href="${largeImageURL}" class="gallery__link">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');
  updateMarkup(markup);
}

function updateMarkup(markup = '') {
  gallery.insertAdjacentHTML('beforeend', markup);
}

export { renderMarkup, updateMarkup };
