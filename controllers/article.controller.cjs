const { readFile, updateFile } = require('../management/article.management.cjs');
const Article = require('../models/Article.cjs');

const getArticles = (req, res) => {
  const path = req.path.split('/');
  const filename = path[path.length - 1];
  const articles = readFile(filename);
  res.json(articles);
}

const getContent = (req, res) => {
  const filename = req.params.category;
  const articles = readFile(filename);
  res.json(articles);
}

const getContentDetails = (req, res) => {
  const articleId = parseInt(req.params.idx);
  const filename = req.params.category;
  const article = readFile(filename).find(article => article.idx === articleId);
  res.json(article);
}

const updateContent = async (req, res) => {
  const { idx: articleIdx, isFav } = req.body;
  const article = new Article();
  
  let updatedFavList, data, list;
  const favList = readFile('favs');

  try {
    data = await article.fetchArticle(articleIdx);
    list = await article.fetchData(data.category);
  } catch(error) {
    return new Error(error);
  }
  
  const updatedArticle = {
    ...data.article,
    isFav: isFav
  }

  const index = list.findIndex(item => item.idx === parseInt(articleIdx));
  const updatedList = [...list.slice(0, index), updatedArticle, ...list.slice(index + 1)];
  
  if(isFav) {
    if(favList.find(item => item.idx === parseInt(articleIdx))) return;
    updatedFavList = [...favList, updatedArticle];
  } else {
    updatedFavList = favList.filter(item => item.idx !== parseInt(articleIdx));
  }

  updateFile('favs', updatedFavList);
  updateFile(data.category, updatedList);

  res.json({
    message: 'List updated!',
    updatedList: updatedList
  });
}

module.exports = {
  getArticles: getArticles,
  getContent: getContent,
  getContentDetails: getContentDetails,
  updateContent: updateContent
}