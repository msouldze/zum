const Article = require('../models/Article.cjs');

const article = new Article();

const getCategory = async (req, res) => {
  const path = req.params.category;
  let articles;

  try {
    articles = await article.fetchData(path);
  } catch (error) {
    return new Error(error);
  }

  const pageTitle = path[0].toUpperCase() + path.slice(1);

  const data = {
    title: pageTitle,
    category: path,
    articles: articles
  }

  return res.render('category', data);
}

const getArticle = async (req, res) => {
  const category = req.params.category;
  const idx = req.params.idx;
  let data;
  try {
    data = await article.fetchArticle(idx);
  } catch (error) {
    return new Error(error);
  }
  
  const articleData = data.article;
  return res.render('article', { title: articleData.title, article: articleData, category });
}

module.exports = {
  getCategory: getCategory,
  getArticle: getArticle
}