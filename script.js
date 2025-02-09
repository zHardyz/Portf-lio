document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de todas as funcionalidades
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initSkillsAnimation();
    initSmoothScroll();
    initProjectHovers();
    initParallaxEffect();
    initGlitchEffect();
    initMobileMenu();
});

// Gerenciamento de Tema com Transição Suave
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Recuperar tema salvo ou usar preferência do sistema
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' 
            ? 'dark' 
            : 'light';
        
        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 1000);
    });
}

// Efeito de Digitação Aprimorado
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const words = [
        'Programador',
        'Editor de Vídeos',
        'Designer Gráfico',
        'Game Developer'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        // Adiciona cursor piscante
        typingText.style.borderRight = 'solid 2px var(--accent-primary)';

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 2000;
            typingText.style.borderRight = 'none';
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    type();
}

// Animações de Scroll Aprimoradas
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                // Animações específicas para diferentes elementos
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillLevel(entry.target);
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.style.transitionDelay = `${entries.indexOf(entry) * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
        el.classList.add('animate-hidden');
    });
}

// Animação das Skills com Progresso
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        const level = card.querySelector('.skill-level');
        if (level) {
            const percentage = level.getAttribute('data-level');
            level.style.setProperty('--skill-level', `${percentage}%`);
        }
    });
}

function animateSkillLevel(card) {
    const level = card.querySelector('.skill-level');
    if (level) {
        level.style.width = level.getAttribute('data-level') + '%';
    }
}

// Efeito Glitch no Título
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    // Mantém o texto original sem duplicação
    glitchText.style.position = 'relative';
    glitchText.style.color = 'var(--text-primary)';
    
    // Adiciona efeito de glitch através de pseudo-elementos no CSS
    const style = document.createElement('style');
    style.textContent = `
        .glitch-text {
            animation: glitch 1s linear infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .glitch-text::before {
            left: 2px;
            text-shadow: -2px 0 var(--accent-primary);
            clip: rect(24px, 550px, 90px, 0);
            animation: glitch-anim 3s infinite linear alternate-reverse;
        }

        .glitch-text::after {
            left: -2px;
            text-shadow: -2px 0 var(--accent-secondary);
            clip: rect(85px, 550px, 140px, 0);
            animation: glitch-anim 2s infinite linear alternate-reverse;
        }
    `;
    
    document.head.appendChild(style);
    glitchText.setAttribute('data-text', glitchText.textContent);
}

// Efeito Parallax Suave
function initParallaxEffect() {
    const hero = document.querySelector('.hero-background');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Scroll Suave Aprimorado
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Atualiza URL sem recarregar a página
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

// Interatividade dos Projetos Aprimorada
function initProjectHovers() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const overlay = project.querySelector('.project-overlay');
        const image = project.querySelector('img');

        project.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            image.style.transform = 'scale(1.1)';
        });
        
        project.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            image.style.transform = 'scale(1)';
        });
    });
}

// Detectar quando a página está completamente carregada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.querySelector('.hero-content').classList.add('animate-visible');
});

// Preload de Imagens em Background
function preloadImages() {
    const images = [
        'imagens/black-2398252.jpg',
        'imagens/r8.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Adicionar listener para mudanças de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Adicionar ao início do arquivo, junto com as outras inicializações
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Adicionar aria-expanded para acessibilidade
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Fechar menu ao rolar a página
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        
        lastScroll = currentScroll;
    });
}
  
  