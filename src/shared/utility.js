// Méthode 0 - checkValidity();
export const checkValidity = (value, rules) => {
  let isValid = true;

  // Vérification des règles de validité dans l'input
  if (rules.required) {
    // trim() = suppression espaces avant et apres la valeur
    isValid = value.trim() !== '' && isValid;

    // isValid = ?
    // Si Value = '   ftre   ' ==> 'ftre'
    // Si Value !== '' ==> true
    // Si isValid = true ==> tous les tests sont true
  }

  // minLength : taille minimum des caractères d'un input
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  // maxLength : taille maximum des caractères d'un input
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  // email
  if (rules.email) {
    // Variable pattern pourcheck email
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
