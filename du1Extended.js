
const firstName = prompt("zadej jméno", "Jana");
const lastName = prompt("zadej příjmení", "Procházková");

const removeAccents = str =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');   

const user = {
    firstName: firstName,
    lastName: lastName
};

console.log(userNoDiacritics);

Object.keys(userNoDiacritics).forEach(k => userNoDiacritics[k] = userNoDiacritics[k].toLowerCase().trim().replace(/\s+/g, ''));

console.log(userNoDiacritics);

const firstName3Symbols = userNoDiacritics.firstName.slice(0, 3); 
const lastName5Symbols = userNoDiacritics.lastName.slice(0, 5); 

console.log(`${firstName3Symbols}${lastName5Symbols}@fit.cvut.cz`);