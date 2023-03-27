// Librairies
import React from 'react';
import DisplayedArticle from './DisplayedArticle/DisplayedArticle';
import classes from './DisplayedArticles.module.css';

const DisplayedArticles = (props) => {
  // Ajout tableau articles dynamique
  let articles = props.articles.map((article) => (
    <DisplayedArticle key={article.id} article={article} />
  ));

  return (
    <section
      // CENTRER LES ARTICLES
      className={[classes.DisplayedArticles, 'container'].join(' ')}>
      {articles}
    </section>
  );
};

export default DisplayedArticles;
