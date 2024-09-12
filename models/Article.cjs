class Article {  
  constructor() {
    this.categories = ['life', 'travel', 'food', 'culture']
  }

  async fetchData (filename) {
    let path;
    
    if(filename === 'best') {
      path = `http://localhost:3000/best`;
    } else {
      path = `http://localhost:3000/content/${filename}`;
    }
  
    try {
      const data = await fetch(path);
      const response = await data.json();
      return response;
    } catch(error) {
      console.log('Not being able to fetch the data');
    }
  }
  
  async fetchAllArticles () {
    let allData = [];
    let categoryData;

    try {
      categoryData = await Promise.all(this.categories.map(async (category) => {
        const data = await this.fetchData(category);
        return data.slice(0, 3);
      }));
    } catch (error) {
      return new Error(error);
    }

    for(const data of categoryData) {
      allData = [...allData, ...data];
    }
    
    return { categories: this.categories, allData };
  }

  async fetchArticle(idx) {
    try {
      const result = await Promise.all(this.categories.map(async (category) => {
      const data = await this.fetchData(category);
      const articleList = data.filter(item => item.idx === parseInt(idx));
      const [article] = articleList;
      if(articleList.length > 0) return { category, article };
      }))

      return result.find(element => element);
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = Article;
