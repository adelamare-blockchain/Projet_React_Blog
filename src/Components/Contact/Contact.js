// Librairies
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Contact.module.css';
import routes from '../../Config/Routes/Routes';

function Contact() {
  // CYCLE DE VIE
  // ComponentDidUpdate
  useEffect(() => {
    document.title = 'Contact';
  });

  return (
    <>
      <h1>Contact</h1>
      <p>Par quel moyen de contact souhaitez-vous échanger ?</p>
      <Link
        to={routes.CONTACT + routes.EMAIL}
        className={classes.button}>
        Email
      </Link>
      <Link
        to={routes.CONTACT + routes.TELEPHONE}
        className={classes.button}>
        Téléphone
      </Link>
      <Outlet />
    </>
  );
}

export default Contact;
