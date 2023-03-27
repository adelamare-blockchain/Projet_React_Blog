// Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../Config/Routes/Routes';
import { useNavigate } from 'react-router-dom';
import fire from '../../../Config/Firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';

// Components
import NavigationItem from './NavigationItem/NavigationItem';
import { toast } from 'react-toastify';

const Navigation = (props) => {
  // Création retour navigation
  let navigate = useNavigate();

  // Firebase
  const auth = getAuth(fire);

  // METHODES
  // Méthode 1 - logoutClickedHandler
  const logoutClickedHandler = () => {
    signOut(auth);
    toast.success('À bientôt !');
    navigate(routes.HOME);
  };

  // JSX
  return (
    <ul className={classes.Navigation}>
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
      {props.user ? (
        <NavigationItem to={routes.MANAGE_ARTICLE}>
          Ajouter
        </NavigationItem>
      ) : null}
      {!props.user ? (
        <NavigationItem to={routes.AUTHENTIFICATION}>
          Connexion
        </NavigationItem>
      ) : null}
      {props.user ? (
        <button
          onClick={logoutClickedHandler}
          className={classes.logout}>
          Déconnexion
        </button>
      ) : null}
    </ul>
  );
};

export default Navigation;
