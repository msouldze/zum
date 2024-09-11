const { readFile, updateFile } = require('../management/article.api.cjs');
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
  const { idx: articleIdx, isFav, pathName } = req.body;
  const article = new Article();
  
  let updatedFavList, articleData, list;
  const favList = readFile('favs');

  try {
    articleData = await article.fetchArticle(articleIdx);
    list = await article.fetchData(pathName);
  } catch(error) {
    return new Error(error);
  }
  
  const updatedArticle = {
    ...articleData,
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
  updateFile(pathName, updatedList);

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