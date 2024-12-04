document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scrolling for Internal Links
    const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
    smoothScrollLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  
    // Scroll Animation with Intersection Observer
    const animatedElements = document.querySelectorAll(".animate-on-scroll, #about");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    animatedElements.forEach(element => observer.observe(element));
  });
  