// Librairies
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          isActive ? classes.active : undefined
        }
        end>
        {props.children}
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
};

export default NavigationItem;
