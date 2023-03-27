// Librairies
import React from 'react';
import classes from './Header.module.css';

// Components
import Navigation from './Navigation/Navigation';

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <div className={['container', classes.flex].join(' ')}>
        {/* Logo */}
        <div className={classes.logo}>BLOG</div>

        <nav>
          <Navigation user={props.user} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
