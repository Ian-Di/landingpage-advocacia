document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.main-4 .card');
    const buttonsContainer = document.querySelector('.main-4 .carrosel-bottons');

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayInterval; // Variável para armazenar o ID do intervalo do autoplay

    // Função para criar os botões (bolinhas) de navegação
    const createButtons = () => {
        buttonsContainer.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.index = i;
            button.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoplay(); // Ao clicar, reinicia o autoplay
            });
            buttonsContainer.appendChild(button);
        }
    };

    // Função para atualizar a exibição do carrossel
    const updateCarousel = () => {
        if (currentIndex < 0) {
            currentIndex = totalCards - 1;
        } else if (currentIndex >= totalCards) {
            currentIndex = 0;
        }

        cards.forEach(card => {
            card.style.display = 'none';
        });

        cards[currentIndex].style.display = 'flex'; // Usamos 'flex' porque seu CSS define flex-direction: column para .card

        document.querySelectorAll('.main-4 .carrosel-bottons button').forEach((button, index) => {
            if (index === currentIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    };

    // Função para iniciar o autoplay
    const startAutoplay = () => {
        // MUITO IMPORTANTE: Limpa qualquer autoplay anterior antes de iniciar um novo
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 5000); // Intervalo de 5 segundos
    };

    // Função para parar e reiniciar o autoplay
    const resetAutoplay = () => {
        // Apenas chamar startAutoplay() já faz o trabalho, pois ela já limpa o anterior
        startAutoplay();
    };

    // --- Inicialização do Carrossel ---
    createButtons();
    updateCarousel();
    startAutoplay(); // Inicia o autoplay na carga da página

    // Opcional: Pausar autoplay ao passar o mouse sobre o contêiner principal do carrossel
    const carouselContainer = document.querySelector('.main-4 .cards-carrosel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval); // Pausa o autoplay
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoplay(); // Reinicia o autoplay
        });
    }

    // Opcional: Navegação por teclado (setas esquerda/direita)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            updateCarousel();
            resetAutoplay(); // Reinicia o autoplay após navegação manual
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            updateCarousel();
            resetAutoplay(); // Reinicia o autoplay após navegação manual
        }
    });
});