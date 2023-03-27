// Librairies
import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  // VARIABLES
  // Variable - Réception des données de l'element AJOUTER
  let inputElement;

  // Variable - Ajout dynamique de classes
  const inputClasses = [];
  if (!props.valid && props.touched) {
    inputClasses.push(classes.invalid);
  }

  switch (props.type) {
    case 'input':
      inputElement = (
        <input
          {...props.config}
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          id={props.id}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          id={props.id}></textarea>
      );
      break;

    case 'select':
      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          id={props.id}>
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      throw new Error('Une erreur est survenue, veuillez réessayer.');
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!props.valid && props.touched ? (
        <span>{props.errorMessage}</span>
      ) : null}
    </div>
  );
};

export default Input;
