document.addEventListener('DOMContentLoaded', function() {
    // Configurações de acessibilidade
    const body = document.body;
    const baseFontSize = 16; // Tamanho base em pixels
    let currentFontSize = baseFontSize;
    const minFontSize = 12;
    const maxFontSize = 24;
    let isHighContrast = false;
    
    // Elementos para ajustar acessibilidade
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const highContrastBtn = document.getElementById('high-contrast');
    
    // Função para atualizar o tamanho da fonte
    function updateFontSize() {
        document.documentElement.style.fontSize = currentFontSize + 'px';
        
        // Desabilitar/abilitar botões conforme os limites
        fontDecreaseBtn.disabled = (currentFontSize <= minFontSize);
        fontIncreaseBtn.disabled = (currentFontSize >= maxFontSize);
    }
    
    // Aumentar fonte
    fontIncreaseBtn.addEventListener('click', function() {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            updateFontSize();
        }
    });
    
    // Diminuir fonte
    fontDecreaseBtn.addEventListener('click', function() {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            updateFontSize();
        }
    });
    
    // Alternar alto contraste
    highContrastBtn.addEventListener('click', function() {
        isHighContrast = !isHighContrast;
        if (isHighContrast) {
            body.classList.add('high-contrast');
            highContrastBtn.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('high-contrast');
            highContrastBtn.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Código para a galeria
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.gallery-indicators button');
    
    let currentIndex = 0;
    let itemWidth = galleryItems[0].offsetWidth + 20; // Largura do item + margem
    
    // Função para atualizar a galeria
    function updateGallery() {
        galleryTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Event listeners para os botões
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallery();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < galleryItems.length - getVisibleItems()) {
                currentIndex++;
                updateGallery();
            }
        });
    }
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
    });
    
    // Função para calcular quantos itens são visíveis
    function getVisibleItems() {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 3;
    }
    
    // Atualizar na redimensionamento da janela
    window.addEventListener('resize', () => {
        itemWidth = galleryItems[0].offsetWidth + 20;
        updateGallery();
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Basic validation
            if (nome && email && mensagem) {
                // Aqui você normalmente enviaria os dados para um servidor
                alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
