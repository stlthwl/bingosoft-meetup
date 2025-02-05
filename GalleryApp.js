const { createApp } = Vue;

const GalleryApp = {
    template: `
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <h2 class="row-title content-ct">Галерея</h2>
            <div class="carousel-indicators">
                <button
                    v-for="(image, index) in images"
                    :key="index"
                    type="button"
                    :data-bs-target="'#carouselExampleIndicators'"
                    :data-bs-slide-to="index"
                    :class="{ active: index === 0 }"
                    aria-current="index === 0"
                    :aria-label="'Слайд ' + (index + 1)"
                ></button>
            </div>
            <div class="carousel-inner">
                <div
                    v-for="(image, index) in images"
                    :key="index"
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                >
                    <img :src="image" class="d-block w-100" alt="Слайд">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Предыдущий</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Следующий</span>
            </button>
        </div>
    `,
    setup() {
        const images = Array.from({length: 13}, (_, i) => `img/carousel/${i + 1}.jpg`);
        return {images};
    },
};

createApp(GalleryApp).mount('#gallery')


