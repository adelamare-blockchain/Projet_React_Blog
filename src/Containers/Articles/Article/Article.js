// Librairies
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import classes from './Article.module.css';
import moment from 'moment';
import 'moment/locale/fr';

// Components
import routes from '../../../Config/Routes/Routes';
import axios from '../../../Config/axios-firebase';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { toast } from 'react-toastify';

const Article = (props) => {
  // STATES
  // State 1 : Article
  const [article, setArticle] = useState({});
  // State 2 : Spinner
  const [loading, setLoading] = useState(false);

  // VARIABLES
  // Variable 1 - slug de l'article
  const { slug } = useParams();

  // Variable 2 - Retour sur page Accueil après suppression article
  const navigate = useNavigate();

  // Variable 3 - Transformation date locale du pays
  // let date = new Date(article.date).toLocaleDateString('fr-FR');
  moment.locale('fr');
  let date = moment.unix(article.date / 1000).calendar();

  // CYCLE DE VIE
  // ComponentDidMount
  useEffect(() => {
    setLoading(true); // Spinner ON
    // Challenge : récupération du titre de l'article depuis Firebase
    // ?orderBy='slug'&equalTo='{slug}'
    axios
      .get('/articles.json/?orderBy="slug"&equalTo="' + slug + '"')
      .then((response) => {
        // Envoi sur HOME si page inconnue
        if (Object.keys(response.data).length === 0) {
          toast.error("Cet article n'existe pas");
          navigate(routes.HOME);
        }
        // Boucle pour récupération du titre
        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            id: key,
          });
        }
        setLoading(false); // Arrêt Spinner
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Arrêt Spinner
      });
    document.title = article.titre;
  }, [navigate, slug, article.titre]); // Ajout de navigate et slug à l'array de dépendances

  // ComponentDidUpdate
  useEffect(() => {
    document.title = article.titre;
  }); // Ajout de article.titre à l'array de dépendances

  // FONCTIONS
  // Fonction 1 - Supprimer article}
  const deleteClickedHandler = () => {
    // Récuperation du token de l'user via Firebase
    props.user
      .getIdToken()
      .then((token) => {
        // Supprimer data depuis Firebase
        axios
          .delete('/articles/' + article.id + '.json?auth=' + token)
          .then((response) => {
            toast.success('Article supprimé avec succès');
            navigate(routes.HOME);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Rendu JSX
  return (
    <div className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{article.titre}</h1>

          {/* {props.location.state && props.location.state.fromHome ? (
        <p>Cliqué depuis accueil</p> 
      ) : null}*/}

          <div className={classes.content}>
            <div className={classes.lead}>{article.accroche}</div>
            {article.contenu}
          </div>

          {props.user ? (
            <div className={classes.button}>
              <Link
                to={routes.MANAGE_ARTICLE}
                state={{ article: article }}>
                <button>Modifier</button>
              </Link>
              <button onClick={deleteClickedHandler}>
                Supprimer
              </button>
            </div>
          ) : null}

          <div className={classes.author}>
            <b>{article.auteur}</b>
            <span>Publié {date}.</span>
            {article.brouillon === 'true' ? (
              <span className={classes.badge}>Brouillon</span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
