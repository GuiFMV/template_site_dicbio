const carouselImages = document.querySelector('.carousel-images');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

function moveToSlide(index) {
    currentIndex = index;
    const offset = -index * 100; // Move 100% para cada imagem
    carouselImages.style.transform = `translateX(${offset}%)`;

    // Atualizar os indicadores (bolinhas)
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Adicionar evento para cada indicador
indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => moveToSlide(i));
});

// Auto play opcional
setInterval(() => {
    let nextIndex = (currentIndex + 1) % indicators.length;
    moveToSlide(nextIndex);
}, 3000);
