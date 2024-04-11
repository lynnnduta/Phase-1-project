const statusCodeInput = document.getElementById('status-code');
const clearBtn = document.getElementById('clear-btn');
const catImageContainer = document.getElementById('cat-image-container');

const catImages = [
    { statusCode: 200, image: 'https://http.cat/200.jpg' },
    { statusCode: 404, image: 'https://http.cat/404.jpg' },
    { statusCode: 500, image: 'https://http.cat/500.jpg' },
    { statusCode: 403, image: 'https://http.cat/403.jpg' },
    { statusCode: 401, image: 'https://http.cat/401.jpg' },
    { statusCode: 302, image: 'https://http.cat/302.jpg' },
    { statusCode: 301, image: 'https://http.cat/301.jpg' },
    { statusCode: 307, image: 'https://http.cat/307.jpg' },
    { statusCode: 308, image: 'https://http.cat/308.jpg' },
    { statusCode: 400, image: 'https://http.cat/400.jpg' },
    { statusCode: 405, image: 'https://http.cat/405.jpg' },
    { statusCode: 408, image: 'https://http.cat/408.jpg' },
    { statusCode: 509, image: 'https://http.cat/509.jpg' },
];

// Function to get cat image based on status code
function getCatImage(statusCode) {
    return catImages.find((image) => image.statusCode === parseInt(statusCode));
}

// Function to display cat image
function displayCatImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    catImageContainer.innerHTML = '';
    catImageContainer.appendChild(img);
}

// Input event listener on status code input field
statusCodeInput.addEventListener('input', (event) => {
    const statusCode = event.target.value;

    // Check if the status code is valid before making the API call
    if (statusCode.length > 0 && !isNaN(statusCode) && statusCode >= 200 && statusCode <= 599) {
        // Display cat image
        const catImage = getCatImage(statusCode);
        if (catImage) {
            displayCatImage(catImage.image);
        } else {
            catImageContainer.innerHTML = 'No cat image found for this status code.';
        }
    } else {
        catImageContainer.innerHTML = '';
    }
});

// Click event listener on "Clear" button
clearBtn.addEventListener('click', () => {
    statusCodeInput.value = '';
    catImageContainer.innerHTML = '';
});

// Event listener for Enter key press
statusCodeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const statusCode = statusCodeInput.value;
        if (statusCode.length > 0 && !isNaN(statusCode)) {
            const catImage = getCatImage(statusCode);
            if (catImage) {
                displayCatImage(catImage.image);
            } else {
                catImageContainer.innerHTML = 'No cat image found for this status code.';
            }
        }
    }
});

document.addEventListener('click', (event) => {
    if (!statusCodeInput.contains(event.target)) {
        const statusCode = statusCodeInput.value;
        if (statusCode.length > 0 && !isNaN(statusCode)) {
            const catImage = getCatImage(statusCode);
            if (catImage) {
                displayCatImage(catImage.image);
            } else {
                catImageContainer.innerHTML = 'No cat image found for this status code.';
            }
        }
    }
});