// Librairies
import React from 'react';
import classes from './DisplayedArticle.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Componentes
import routes from '../../../Config/Routes/Routes';

const DisplayedArticle = (props) => {
  return (
    <Link
      className={classes.link}
      to={routes.ARTICLES + '/' + props.article.slug}>
      <div className={classes.DisplayedArticle}>
        <h2>{props.article.titre}</h2>
        <p>{props.article.accroche}</p>
        <small>{props.article.auteur}</small>
      </div>
    </Link>
  );
};

DisplayedArticle.propTypes = {
  article: PropTypes.object,
};

export default DisplayedArticle;
