const statusCodeInput = document.getElementById('status-code');
const clearBtn = document.getElementById('clear-btn');
const catImageContainer = document.getElementById('cat-image-container');

// Function to display cat image
function displayCatImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    catImageContainer.innerHTML = '';
    catImageContainer.appendChild(img);
}

// Function to fetch cat images from the JSON server
function fetchCatImages() {
    return fetch('http://localhost:3000/catImages')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching cat images');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            catImageContainer.innerHTML = 'Error fetching cat images';
        });
}

// Function to get cat image based on status code
function getCatImage(catImages, statusCode) {
    return catImages.find((image) => image.statusCode === parseInt(statusCode));
}

// Function to fetch cat image data and display based on status code
function fetchAndDisplayCatImage(statusCode) {
    fetchCatImages()
        .then(catImages => {
            if (statusCode.length > 0 && !isNaN(statusCode) && statusCode >= 200 && statusCode <= 599) {
                const catImage = getCatImage(catImages, statusCode);
                if (catImage) {
                    displayCatImage(catImage.image);
                } else {
                    catImageContainer.innerHTML = 'No cat image found for this status code.';
                }
            } else {
                catImageContainer.innerHTML = '';
            }
        });
}

// Input event listener on status code input field
statusCodeInput.addEventListener('input', (event) => {
    const statusCode = event.target.value;
    fetchAndDisplayCatImage(statusCode);
});

// Click event listener on "Clear" button
clearBtn.addEventListener('click', () => {
    statusCodeInput.value = '';
    catImageContainer.innerHTML = '';
});

// Event listener for Enter key press
statusCodeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const statusCode = statusCodeInput.value;
        fetchAndDisplayCatImage(statusCode);
    }
});
  
           
      
