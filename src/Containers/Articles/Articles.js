// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../Config/axios-firebase';

// Components
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';
import Spinner from '../../Components/UI/Spinner/Spinner';

function Articles() {
  // STATES
  // State 1 - Articles
  const [articles, setArticles] = useState([]);
  // State 2 - Spinner
  const [loading, setLoading] = useState(false);

  // CYCLE DE VIE
  // ComponentDidMount
  useEffect(() => {
    setLoading(true); // Spinner ON
    axios
      .get('/articles.json')
      .then((response) => {
        // Création d'un tableau d'articles
        let articlesArray = [];

        // Boucle pour tableau
        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key,
          });
        }

        // Ordre inversé des 3 derniers articles
        articlesArray.reverse();

        // Filtre des articles brouillon avec valeur FALSE
        articlesArray = articlesArray.filter(
          (article) => article.brouillon === 'false'
        );

        // Limitation à 3 articles via JavaScript
        // slice() => retourne un morceau de tableau
        // articlesArray = articlesArray.slice(0, 3);

        setArticles(articlesArray);
        setLoading(false); // Spinner OFF
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Spinner OFF
      });
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    document.title = 'Articles';
  });

  // DisplayedArticles (affichage articles)
  // <section>...</section>

  // DisplayedArticle

  /* - Push : ajouter une page dans l'historique ('/')
      - /
      - articles
      - /
    - replace : remplacer la page actuelle ('/')
      - /
  */

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Articles</h1>
          {/* <Redirect to='/' /> */}
          <DisplayedArticles articles={articles} />
        </>
      )}
    </>
  );
}

export default Articles;
