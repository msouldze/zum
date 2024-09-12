const starElements = document.querySelectorAll('.article-fav');

let toggle = false;

const handleFav = async (event) => {
  event.stopPropagation();
  
  const { target } = event;
  const article = target.closest('.article-item') || target.closest('.article');
  const articleImage = target.closest('.article-fav').querySelector('img');
  
  toggle = !toggle;

  articleImage.src = toggle ? '/img/star-full.svg' : '/img/star-empty.svg';

  try {
    const response = await fetch(`/content/category`, {
      method: 'PATCH',
      body: JSON.stringify({
        idx: article.dataset.idx,
        isFav: toggle
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = response.json();
    return data;
  } catch(error) {
    return new Error(error);
  }
}

const initFav = () => {
  starElements.forEach(starEl => {
    return starEl.addEventListener('click', handleFav);
  });
}

initFav();

export default initFav;