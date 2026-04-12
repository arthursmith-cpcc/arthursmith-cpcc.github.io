const galleryImages = [
    {
        src: './images/gallery/blue_hammock.jpg',
        alt: 'Beachside hammock with sand and sky',
        title: 'Blue Hammock'
    },
    {
        src: './images/gallery/grass_and_pier.jpg',
        alt: 'Wooden pier and palm tree at the shoreline',
        title: 'Palm and Pier'
    },
    {
        src: './images/gallery/old_stable.jpg',
        alt: 'Old barn beside oak trees',
        title: 'Old Stable'
    },
    {
        src: './images/gallery/palm_and_pier.jpg',
        alt: 'Boardwalk leading toward the ocean',
        title: 'Boardwalk View'
    },
    {
        src: './images/gallery/river_run.jpg',
        alt: 'River flowing under a distant bridge',
        title: 'River Run'
    },
    {
        src: './images/gallery/rock_wall.jpg',
        alt: 'Coastal rock wall on a sandy beach',
        title: 'Rock Wall'
    },
    {
        src: './images/gallery/shoreside.jpg',
        alt: 'Waves crashing on a shell-covered shoreline',
        title: 'Seashell Shore'
    },
    {
        src: './images/gallery/shore_and_bridge.jpg',
        alt: 'Peaceful bay with a bridge in the distance',
        title: 'Shore and Bridge'
    },
    {
        src: './images/gallery/shore_and_pier.jpg',
        alt: 'Pier over the ocean at sunrise',
        title: 'Pier Sunrise'
    },
    {
        src: './images/gallery/shore_and_shells.jpg',
        alt: 'Shells along a sandy beach with gentle surf',
        title: 'Shell Beach'
    }
];

let cardContainer;
let galleryView;
let prevButton;
let nextButton;
let refreshButton;

function createCards() {
    cardContainer.innerHTML = '';
    galleryImages.forEach((image) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy" data-title="${image.title}" />
        `;
        cardContainer.appendChild(card);
    });
}

function scrollGallery(amount) {
    galleryView.scrollBy({
        left: amount,
        behavior: 'smooth'
    });
}

function updateButtons() {
    const maxScroll = galleryView.scrollWidth - galleryView.clientWidth;
    prevButton.disabled = galleryView.scrollLeft <= 0;
    nextButton.disabled = galleryView.scrollLeft >= maxScroll - 1;
}

function shuffleGallery() {
    for (let i = galleryImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
    }
    createCards();
    updateButtons();
}

function initGallery() {
    cardContainer = document.querySelector('.cards');
    galleryView = document.querySelector('.gallery-view');
    prevButton = document.querySelector('.prev');
    nextButton = document.querySelector('.next');
    refreshButton = document.querySelector('.refresh-btn');

    if (!cardContainer || !galleryView || !prevButton || !nextButton || !refreshButton) {
        return;
    }

    createCards();
    updateButtons();

    nextButton.addEventListener('click', () => scrollGallery(galleryView.clientWidth * 0.85));
    prevButton.addEventListener('click', () => scrollGallery(-galleryView.clientWidth * 0.85));
    refreshButton.addEventListener('click', () => {
        shuffleGallery();
        galleryView.scrollTo({ left: 0, behavior: 'smooth' });
    });

    galleryView.addEventListener('scroll', updateButtons);
    galleryView.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            galleryView.scrollBy({ left: event.deltaY, behavior: 'auto' });
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextButton.click();
        } else if (event.key === 'ArrowLeft') {
            prevButton.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', initGallery);
