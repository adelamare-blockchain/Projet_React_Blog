// Librairies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkValidity } from '../../../shared/utility';
import classes from './Authentification.module.css';
import fire from '../../../Config/Firebase/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Components
import Input from '../../../Components/UI/Input/Input';
import routes from '../../../Config/Routes/Routes';
import { toast } from 'react-toastify';

const Authentification = () => {
  // Création de redirection Navigation
  const navigate = useNavigate();

  // Initialisation de l'authentification firebase
  const auth = getAuth(fire);

  // STATES
  // State 1 - Inputs
  const [inputs, setInputs] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'username', // Ajout de l'attribut autoComplete
      },
      value: '',
      label: 'Adresse email',
      valid: false,
      validation: {
        required: true,
        email: true,
      },
      touched: false,
      errorMessage: 'Adresse email invalide',
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Mot de passe',
        autoComplete: 'current-password', // Ajout de l'attribut autoComplete
      },
      value: '',
      label: 'Mot de passe',
      valid: false,
      validation: {
        required: true,
        minLength: 6,
      },
      touched: false,
      errorMessage:
        'Le mot de passe doit avoir au moins 6 caractères',
    },
  });
  // State 2 : Validité des inputs
  const [valid, setValid] = useState(false);

  // State 3 : Email en doublon
  const [emailError, setEmailError] = useState(false);

  // State 4 : Login valide/invalide
  const [loginError, setLoginError] = useState(false);

  // CYCLE DE VIE
  // ComponentDidUpdate
  useEffect(() => {
    document.title = 'Authentification';
  });

  // METHODES
  // Méthode 1 - inputChangedHandler (Modifier contenu inputs)
  const inputChangedHandler = (e, index) => {
    // Etape 1 : Change la valeur
    const newInputs = { ...inputs };
    newInputs[index].value = e.target.value;
    newInputs[index].touched = true;

    // Etape 2 : Vérification de la valeur
    newInputs[index].valid = checkValidity(
      e.target.value,
      newInputs[index].validation
    );
    setInputs(newInputs);

    // Etape 3 : Vérification du formulaire
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };

  // Méthode 2 - registerClickedHandler (Inscription)
  const registerClickedHandler = () => {
    // Variable utilisateur
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    // Inscription user vers Firebase
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        toast.success('Inscription réussie');
        // Renvoi vers page Home
        navigate(routes.HOME);
      })
      .catch((error) => {
        // Check adresse email doublon
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailError(true);
            break;
          default:
            throw new Error(
              'Une erreur est survenue, veuillez réessayer.'
            );
        }
      });
  };

  // Méthode 3 - loginClickedHandler (Connexion)
  const loginClickedHandler = () => {
    // Variable utilisateur
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    // Connexion user vers Firebase
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        toast.success('Vous revoici !');
        // Renvoi vers page Home
        navigate(routes.HOME);
      })
      .catch((error) => {
        // Check adresse email valide
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setLoginError(true);
            break;
          default:
            throw new Error(
              'Une erreur est survenue, veuillez réessayer.'
            );
        }
      });
  };

  // Méthode 4 - Empêcher envoi formulaire
  const formHandler = (e) => {
    e.preventDefault();
  };

  // VARIABLES
  // Variable - Convertir OBJET en TABLEAU
  const formElementsArray = [];
  for (let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key],
    });
  }
  // Variable - Ajout dynamique d'un formulaire (ajout de l'index de l'Array formElementsArray)
  let form = (
    <form onSubmit={(e) => formHandler(e)}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          id={formElement.id}
          value={formElement.config.value}
          label={formElement.config.label}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          errorMessage={formElement.config.errorMessage}
          changed={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <div className={classes.buttons}>
        <button
          onClick={registerClickedHandler}
          disabled={!valid}
          className={classes.button}>
          Inscription
        </button>
        <button
          onClick={loginClickedHandler}
          disabled={!valid}
          className={classes.button}>
          Connexion
        </button>
      </div>
    </form>
  );

  // JSX
  return (
    <>
      <h1>Authentification</h1>
      <div className={classes.form}>
        {loginError ? (
          <div className={classes.alert}>
            Authentification impossible : veuillez réessayer.
          </div>
        ) : null}
        {emailError ? (
          <div className={classes.alert}>
            Cette adresse email est déjà utilisée.
          </div>
        ) : null}
        {form}
      </div>
    </>
  );
};

export default Authentification;
