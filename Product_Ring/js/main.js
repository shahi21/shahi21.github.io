// JavaScript to handle thumbnail image click
document.querySelectorAll('.thumbnail-images img').forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const mainImage = document.querySelector('.main-image');
      mainImage.src = thumbnail.src;
    });
  });
  