const articleElements = document.querySelectorAll('.article-item');

const handleLazyLoading = () => {
  const options = {
      rootMargin: '100px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('show', entry.isIntersecting);
            if (entry.isIntersecting) {
              observer.unobserve(entry.target)
            }
        })
    }, options)

    articleElements.forEach(element => {
        observer.observe(element)
    })
}

const handleActive = () => {
  const headerElements = document.querySelectorAll('.header-category a');
  const path = document.location.pathname.slice(1);
  const linkElement = Array.from(headerElements).find(el => {
    return el.dataset.path === path || (el.dataset.path === 'best' && path.length === 0);
  });

  linkElement.style.backgroundColor = 'black';
  linkElement.style.color = 'white';
}

const initLazyLoading = () => {
  window.addEventListener('load', handleLazyLoading);
  window.addEventListener('load', handleActive);
}

export { initLazyLoading };