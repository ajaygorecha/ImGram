const ACCESS_KEY = '9UN9DJd6EHRXWQmrR960ftHJARjL4bxiARdSN2BiDns';
const API_URL = 'https://api.unsplash.com/photos';
const IMAGES_PER_PAGE = 30;
const IMAGES_PER_ITEM = 10; // Number of images per loop-item

let currentPage = 1;

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Fetch images from Unsplash API
async function fetchImages(page = 1) {
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = 'Loading...';

  try {
    const response = await fetch(`${API_URL}?client_id=${ACCESS_KEY}&page=${page}&per_page=${IMAGES_PER_PAGE}`);
    const images = await response.json();
    displayImages(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    alert('Failed to load images. Please try again.');
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Load More';
  }
}

// Display images in the gallery
function displayImages(images) {
  for (let i = 0; i < images.length; i += IMAGES_PER_ITEM) {
    const loopItem = document.createElement('div');
    loopItem.className = 'loop-item';

    const imageSet = images.slice(i, i + IMAGES_PER_ITEM);
    imageSet.forEach(image => {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      // Create img element
      const img = document.createElement('img');
      img.src = image.urls.small;
      img.alt = image.alt_description || 'Unsplash Image';

      // Create details container
      const details = document.createElement('div');
      details.className = 'image-details';

      // Create and append author
      const author = document.createElement('p');
      author.textContent = `Author: ${image.user.name}`;
      details.appendChild(author);

      // Create and append Big Image URL as a link
      const bigImageContainer = document.createElement('p');
      const bigImageLink = document.createElement('a');
      bigImageLink.href = image.urls.full;
      bigImageLink.download = 'true';
      bigImageLink.textContent = 'Download';
      bigImageLink.innerHTML = '<i class="ri-download-line"></i>';
      bigImageContainer.appendChild(bigImageLink);
      details.appendChild(bigImageContainer);

      // Create and append location
      const location = document.createElement('p');
      location.innerHTML = `<i class="ri-map-pin-line"></i> ${image.user.location || 'Unknown'}`;
      details.appendChild(location);

      // Append img and details to the container
      imageContainer.appendChild(img);
      imageContainer.appendChild(details);
      loopItem.appendChild(imageContainer);
    });

    gallery.appendChild(loopItem);
  }
}


// Load initial images
fetchImages(currentPage);

// Add click event listener to the "Load More" button
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchImages(currentPage);
});