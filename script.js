document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scrolling for Internal Links
    const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
    smoothScrollLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 60; // Ajuste conforme necessário
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  
    // Scroll Animation with Intersection Observer
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll(".animate-on-scroll").forEach(element => {
      observer.observe(element);
    });
  
    // Pré-carregar imagens
    const preloadImages = () => {
      const darkImage = new Image();
      const lightImage = new Image();
      darkImage.src = 'imagens/black-2398252.jpg';
      lightImage.src = 'imagens/r8.jpg';
    };

    preloadImages();
  
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Checar tema salvo ou preferência do sistema
    const currentTheme = localStorage.getItem('theme') || 
      (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Função para alternar tema
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    };
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Observar mudanças na preferência do sistema
    prefersDarkScheme.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute(
          'data-theme',
          e.matches ? 'dark' : 'light'
        );
      }
    });
  });
  