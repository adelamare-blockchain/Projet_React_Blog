// Librairies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Config/axios-firebase';
import classes from './Home.module.css';

// Components
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';
import routes from '../../Config/Routes/Routes';
import Spinner from '../../Components/UI/Spinner/Spinner';

function Home() {
  // STATES
  // State 1 - Articles
  const [articles, setArticles] = useState([]);
  // State 2 - Spinner
  const [loading, setLoading] = useState(false);

  // CYCLE DE VIE
  // ComponentDidMount
  useEffect(() => {
    setLoading(true);
    axios
      .get('/articles.json') // Filtrer par "date" & "limité aux 3 derniers articles" = '?orderBy="date"&limitToLast=3'
      .then((response) => {
        // Création d'un tableau d'articles
        let articlesArray = [];

        // Boucle pour tableau d'articles
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
        articlesArray = articlesArray.slice(0, 3);

        setArticles(articlesArray);
        setLoading(false); // Arrêt Spinner
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Arrêt Spinner
      });
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    document.title = 'Accueil';
  });

  // JSX
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Accueil</h1>
          <DisplayedArticles articles={articles} />

          <div className='container'>
            <div className={classes.mainLink}>
              <Link to={routes.ARTICLES}>
                Voir les articles &nbsp;
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
