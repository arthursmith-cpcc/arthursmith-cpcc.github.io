document.addEventListener('DOMContentLoaded', () => {
    const overlay = createOverlay();

    function openOverlay(imageSrc, imageAlt, imageTitle) {
        overlay.image.src = imageSrc;
        overlay.image.alt = imageAlt;
        overlay.container.classList.add('open');
        overlay.container.style.display = 'flex';
        overlay.container.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeOverlay() {
        overlay.container.classList.remove('open');
        overlay.container.style.display = 'none';
        overlay.container.setAttribute('aria-hidden', 'true');
        overlay.image.src = '';
        document.body.style.overflow = '';
    }

    function onPageClick(event) {
        const target = event.target.closest('.card img');
        if (!target) return;

        const imageSrc = target.getAttribute('src');
        const imageAlt = target.getAttribute('alt') || '';
        const imageTitle = target.dataset.title || imageAlt;

        if (imageSrc) {
            openOverlay(imageSrc, imageAlt, imageTitle);
        }
    }

    document.body.addEventListener('click', onPageClick);
    overlay.close.addEventListener('click', closeOverlay);
    overlay.backdrop.addEventListener('click', closeOverlay);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.container.classList.contains('open')) {
            closeOverlay();
        }
    });

    function createOverlay() {
        const container = document.createElement('div');
        container.className = 'gallery-overlay';
        container.id = 'gallery-overlay';
        container.setAttribute('aria-hidden', 'true');
        container.style.display = 'none';
        container.innerHTML = `
            <div class="overlay-backdrop"></div>
            <div class="overlay-content" role="dialog" aria-modal="true">
                <button class="overlay-close" type="button" aria-label="Close overlay">×</button>
                <img class="overlay-image" src="" alt="" />
            </div>
        `;

        document.body.appendChild(container);

        return {
            container,
            backdrop: container.querySelector('.overlay-backdrop'),
            close: container.querySelector('.overlay-close'),
            image: container.querySelector('.overlay-image')
        };
    }
});
