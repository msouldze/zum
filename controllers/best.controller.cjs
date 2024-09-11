const Article = require('../models/Article.cjs');

const article = new Article();

const getHome = async (req, res) => {
  let bestArticles, data;
  try {
    bestArticles = await article.fetchData('best');
    data = await article.fetchAllArticles();
  } catch(error) {
    return new Error(error);
  }

  const { categories, allData: articles } = data;
  
  const responseData = {
    title: 'ZUM',
    categories: categories,
    articles: articles,
    bestArticles : bestArticles
  }

  return res.render('index', responseData);
}

module.exports = {
  getHome: getHome
}