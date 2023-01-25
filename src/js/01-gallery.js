// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const getGalleryEl = document.querySelector('.gallery');

function makeGalleryItem(items) {
  return items
    .map(element => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${element.original}">
    <img
      class="gallery__image"
      src="${element.preview}"
      data-source="${element.original}"
      alt="${element.description}"
    />
  </a>
</div>`;
    })
    .join('');
}
const markupGallery = makeGalleryItem(galleryItems);

function addGallery(markup) {
  getGalleryEl.insertAdjacentHTML('beforeend', markup);
}

addGallery(markupGallery);
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
