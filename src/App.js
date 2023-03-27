// Librairies
import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './Config/Routes/Routes';
import fire from './Config/Firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Components
import Layout from './HOC/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import ManageArticle from './Containers/Admin/ManageArticles/ManageArticles/ManageArticle';
import Authentification from './Containers/Security/Authentification/Authentification';

function App() {
  // STATES
  // State 1 - User
  const [user, setUser] = useState('');

  // CYCLE DE VIE
  // ComponentDidMount
  useEffect(() => {
    authListener();
  }, []);

  // METHODES
  // Méthode 1 - Ecoute de l'authentification de l'user
  const authListener = () => {
    // Appel de l'user
    const auth = getAuth(fire);

    // Check de l'user enregistré
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  // JSX
  return (
    <div className='App'>
      <Layout user={user}>
        <Routes>
          <Route exact path={routes.HOME} element={<Home />} />
          <Route path={routes.CONTACT} element={<Contact />}>
            <Route
              exact
              path={routes.EMAIL}
              element={<p>exemple@exemple.com</p>}
            />
            <Route
              exact
              path={routes.TELEPHONE}
              element={<p>06 06 06 06 06</p>}
            />
          </Route>
          <Route
            exact
            path={routes.ARTICLES}
            element={<Articles />}
          />
          <Route
            path={routes.ARTICLES + '/:slug'}
            element={<Article user={user} />}
          />
          {user ? (
            <Route
              exact
              path={routes.MANAGE_ARTICLE}
              element={<ManageArticle />}
            />
          ) : null}
          {!user ? (
            <Route
              exact
              path={routes.AUTHENTIFICATION}
              element={<Authentification />}
            />
          ) : null}
          <Route path='*' element={<h1>Erreur 404</h1>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
