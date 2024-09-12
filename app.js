const path = require('path');
const express = require('express');

const baseRoutes = require('./routes/base.routes.cjs');
const articleRoutes = require('./routes/article.routes.cjs');
const categoryRoutes = require('./routes/category.routes.cjs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(articleRoutes);
app.use(baseRoutes);
app.use(categoryRoutes);

// app.use((error, req, res, next) => {
//   res.status(500).render('500');
// });

app.listen(3000);