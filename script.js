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
    initAccessibility();
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
        
        // Atualiza o aria-label para acessibilidade
        themeToggle.setAttribute('aria-label', 
            newTheme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
        
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
                } else if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transitionDelay = `${entries.indexOf(entry) * 0.15}s`;
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
        el.classList.add('animate-hidden');
    });
    
    // Observador separado para seções com efeito de entrada mais suave
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-10px'
    });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-hidden');
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
        setTimeout(() => {
            level.style.width = level.getAttribute('data-level') + '%';
        }, 300); // Pequeno atraso para melhor efeito visual
    }
}

// Efeito Glitch no Título
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    // Usa o atributo data-text para o efeito de glitch
    const text = glitchText.textContent;
    glitchText.setAttribute('data-text', text);
    
    // Adiciona classe para ativar animação
    glitchText.classList.add('glitch-active');
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
                    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
                    hero.style.opacity = Math.max(0.05, 0.2 - (scrolled * 0.0005));
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Parallax para outros elementos
    const parallaxItems = document.querySelectorAll('.section-title, .hero-content');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxItems.forEach(item => {
                    const scrolled = window.pageYOffset;
                    const parent = item.closest('section');
                    if (parent) {
                        const parentTop = parent.offsetTop;
                        const parentHeight = parent.offsetHeight;
                        const viewportHeight = window.innerHeight;
                        
                        if (scrolled + viewportHeight > parentTop && scrolled < parentTop + parentHeight) {
                            const distance = (scrolled + viewportHeight - parentTop) * 0.1;
                            if (item.classList.contains('section-title')) {
                                item.style.transform = `translateY(${distance * 0.2}px)`;
                            } else {
                                item.style.transform = `translateY(${distance * 0.1}px)`;
                            }
                        }
                    }
                });
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
                
                // Fecha o menu mobile se estiver aberto
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Atualiza o estado de "current" para acessibilidade
                document.querySelectorAll('.nav-links a').forEach(link => {
                    if (link === this) {
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
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
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        project.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            if (image) image.style.transform = 'scale(1)';
        });
        
        // Adiciona suporte para navegação por teclado
        project.addEventListener('focusin', () => {
            overlay.style.opacity = '1';
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        project.addEventListener('focusout', (e) => {
            // Verifica se o foco saiu completamente do card
            if (!project.contains(e.relatedTarget)) {
                overlay.style.opacity = '0';
                if (image) image.style.transform = 'scale(1)';
            }
        });
    });
}

// Detectar quando a página está completamente carregada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Adiciona animação de entrada para o hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-visible');
    }, 300);
    
    // Inicia animação de scroll para elementos visíveis na tela
    const visibleElements = document.querySelectorAll('.animate-on-scroll');
    visibleElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('animate-visible');
            
            if (el.classList.contains('skill-card')) {
                animateSkillLevel(el);
            }
        }
    });
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

// Menu Mobile Aprimorado
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o clique se propague para o documento
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Adicionar aria-expanded para acessibilidade
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Impedir rolagem do body quando o menu está aberto
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Atualizar o estado "current" para acessibilidade
            navLinks.querySelectorAll('a').forEach(navLink => {
                navLink.removeAttribute('aria-current');
            });
            link.setAttribute('aria-current', 'page');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao rolar a página
    let lastScroll = 0;
    const scrollThreshold = 50; // Quantidade de rolagem necessária para fechar o menu
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll + scrollThreshold && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // Adiciona suporte para navegação por teclado
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
    
    // Ajustar menu ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Melhorias de Acessibilidade
function initAccessibility() {
    // Adiciona roles e atributos ARIA para melhor acessibilidade
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.setAttribute('tabindex', '0');
    });
    
    // Adiciona suporte para navegação por teclado nos cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.add('keyboard-focus');
                
                // Simula hover
                const icon = card.querySelector('.service-icon');
                if (icon) icon.style.background = 'rgba(255, 255, 255, 0.2)';
                
                // Remove após um tempo
                setTimeout(() => {
                    card.classList.remove('keyboard-focus');
                    if (icon) icon.style.background = '';
                }, 1000);
            }
        });
    });
    
    // Adiciona indicadores de foco visíveis
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
                outline: 2px solid var(--accent-primary);
                outline-offset: 3px;
            }
        </style>
    `);
    
    // Verifica a posição atual da página e atualiza o estado "current" dos links
    function updateCurrentNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = 80;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            }
        });
    }
    
    // Atualiza o link atual ao carregar e ao rolar
    window.addEventListener('load', updateCurrentNavLink);
    window.addEventListener('scroll', updateCurrentNavLink);
}

// Adiciona animação de scroll para o header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
  
  