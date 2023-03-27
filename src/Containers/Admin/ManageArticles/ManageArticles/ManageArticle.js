// Librairies
import React, { useState, useEffect } from 'react';
import classes from './ManageArticle.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../../Config/axios-firebase';
import { checkValidity } from '../../../../shared/utility';
import fire from '../../../../Config/Firebase/firebase';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

// Components
import Input from '../../../../Components/UI/Input/Input';
import routes from '../../../../Config/Routes/Routes';

const ManageArticle = () => {
  // Création de redirection Navigation
  const navigate = useNavigate();

  // Initialisation de l'authentification firebase
  const auth = getAuth(fire);

  // Accès au State
  const location = useLocation();
  // STATES
  // State 1 : inputs
  const [inputs, setInputs] = useState({
    titre: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: "Titre de l'article",
      },
      value:
        location.state && location.state.article
          ? location.state.article.titre
          : '',
      label: 'Titre',
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 85,
      },
      touched: false,
      errorMessage:
        'Le titre doit contenir au minimum 5 caractères et maximum 85 caractères',
    },
    accroche: {
      elementType: 'textarea',
      elementConfig: {},
      value:
        location.state && location.state.article
          ? location.state.article.accroche
          : '',
      label: "Accroche de l'article",
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 140,
      },
      touched: false,
      errorMessage:
        "L'accroche de l'article ne doit pas être vide et doit être comprise entre 10 et 140 caractères",
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {},
      value:
        location.state && location.state.article
          ? location.state.article.contenu
          : '',
      label: "Contenu de l'article",
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: "Le contenu de l'article ne doit pas être vide",
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        type: 'textarea',
        placeholder: "Auteur de l'article",
      },
      value:
        location.state && location.state.article
          ? location.state.article.auteur
          : '',
      label: 'Auteur',
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'Il doit y avoir un auteur pour cet article.',
    },
    brouillon: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: true, displayValue: 'Brouillon' },
          { value: false, displayValue: 'Publié' },
        ],
      },
      value:
        location.state && location.state.article
          ? location.state.article.brouillon
          : '',
      label: 'Etat',
      valid: location.state && location.state.article ? true : false,
      validation: {},
    },
  });
  // State 2 : Validité des inputs
  const [valid, setValid] = useState(
    location.state && location.state.article ? true : false
  );

  // CYCLE DE VIE
  // ComponentDidUpdate
  useEffect(() => {
    document.title = 'Gérer un article';
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

  // Méthode 3 - Création SLUG
  const generateSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuunc------';

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(
        new RegExp(from.charAt(i), 'g'),
        to.charAt(i)
      );
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  // Méthode 2 - formHandler (Eviter d'envoyer le formulaire)
  const formHandler = (e) => {
    e.preventDefault();

    // Récupération du slug
    const slug = generateSlug(inputs.titre.value);

    // Création d'un article
    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      accroche: inputs.accroche.value,
      date: Date.now(),
      slug: slug,
    };

    // Variable (Firebase) - Token (Authentification pour Modification)
    auth.currentUser
      .getIdToken()
      .then((token) => {
        // Condition 'Modifier article' ou 'Ajouter article'
        if (location.state && location.state.article) {
          // Mofifier des données vers Firebase
          axios
            .put(
              '/articles/' +
                location.state.article.id +
                '.json?auth=' +
                token,
              article
            )
            .then((response) => {
              console.log(response);
              toast.success('Article modifié avec succès');
              navigate(routes.ARTICLES + '/' + article.slug);
            })
            .catch((error) => console.log(error));
        } else {
          // Post des données vers Firebase
          axios
            .post('/articles.json?auth=' + token, article)
            .then((response) => {
              console.log(response);
              toast.success('Article ajouté avec succès');
              navigate(routes.ARTICLES);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    <form
      className={classes.Ajouter}
      onSubmit={(e) => formHandler(e)}>
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
      <div className={classes.submit}>
        <input
          type='submit'
          value={
            location.state && location.state.article
              ? 'Modifier un article'
              : 'Ajouter un article'
          }
          disabled={!valid}
        />
      </div>
    </form>
  );

  // JSX
  return (
    <div className='container'>
      {location.state && location.state.article ? (
        <h1>Modifier</h1>
      ) : (
        <h1>Ajouter</h1>
      )}

      {form}
    </div>
  );
};

export default ManageArticle;
