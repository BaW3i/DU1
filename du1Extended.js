
const firstName = prompt("zadej jméno", "Jana");
const lastName = prompt("zadej příjmení", "Procházková");

const checkNames = (firstName, lastName) => {
    if (!firstName || !lastName || firstName.trim() === '' || lastName.trim() === '') {
        alert("Obě pole musí být vyplněna. Prosím, zadej své jméno i příjmení.");
        return null;
    }
/* takže toto je vlastně logika první části ifu v celé délce:

if ((firstName === "" || firstName === null) || (lastName === "" || lastName === null)) {
    alert("Obě pole musí být vyplněna. Prosím, zadej své jméno i příjmení.");
}
so: pokud (firstname je "" nebo null) NEBO (lastname je "" nebo null), vrať alert 

to je ale strašně dlouhé, stačí aby jedna hodnota byla TRUE a zbytek je vlastně nepodstatný, takže se tu podmínka místo toho opře o falsy values, kde
se zkrácený zápis ptá: is firstName OR lastName TRUE?
To se může stát jedině tehdy, pokud bude obsahovat 0, "",NaN, Undefined, false - the falsy values of JS
takže: pokud je input falsy, vykřičník obrácené hodnoty ho převrátí na TRUE a ukáže se alert
pokud je input TRUE (někdo zadá jméno), vykřičník ho převrátí na FALSE a alert se neukáže.

dále, jelikož později řeším délku jména a příjmení, sama si tvořím nešťastnou situaci, kdy mi najednou povoluje dolní kód nechat prázdný formulář, 
který on sám následně vyplní 'aaa' a 'bbbbb' a povolí vytvoření emailu, což já nechci. Takže do ifu přidávám .trim podmínku
.trim() odebírá prázdná místa u stringů. pokud ale metoda .trim() vrátí prázdný řetězec: (firstName.trim() === '') se vrátí jako TRUE, spustí
se alert a kód se zastaví, místo toho aby vygeneroval špatný email z prázdného formuláře.

kód se zastavuje díky return null povelu, který prostě ukončuje nebo zastavuje fce a díky tomu se neplatný email.

*/


    const updatedFirstName = firstName.length < 3 ? firstName + 'aaa' : firstName;
    const updatedLastName = lastName.length < 5 ? lastName + 'bbbbb' : lastName;

    return { updatedFirstName, updatedLastName }; 
};

const checkSymbols = (firstName, lastName) => {
    const specialCharPattern = /[0-9!@#$%^&*(),.?":{}|<>_]/; 
    if (specialCharPattern.test(firstName) || specialCharPattern.test(lastName)) {
        alert("Jméno nesmí obsahovat číslice nebo speciální znaky");
        return null; 
    }
    return true;
};

const updatedNames = checkNames(firstName, lastName); 

if (updatedNames && checkSymbols(updatedNames.updatedFirstName, updatedNames.updatedLastName)) { 
    const { updatedFirstName, updatedLastName } = updatedNames;
/* 
Tuhle nakonec kuchtím několik věcí najednou. Zaprvé  tady tvořím novou konstantu  pro ty případy, 
kdy je jméno a příjmení skutečně kratší 3 a 5 charakterů. a zároveň zapojuju je do kódu, aby s ními 
mohl dál pracovat včetně normálních dostatečně dlouhých, validních případů

dále tvořím podmínku, že jméno a příjmení nesmí obsahovat speciální znaky a číslice (ale povolí to 
háčky a čárky nad jmény, jinak by mi to zakazovalo všechna jména, jak jsem zjistila, proto regex /[0-9!@#$%^&*(),.?":{}|<>_]/)
pokud obsahuje, vyběhne alert "Jméno nesmí obsahovat číslice nebo speciální znaky", funkce se ukončí zas skrz "null" nebo běží dál skrz "true"

poslední část s const updatedNames a poslední podmínkou volají vytvořené funkce, a pokud je skutečně všechno správně, přes updatedLast/updatedFirstName 
pokračuje kód k tvoření emailové adresy 
*/


const removeAccents = str => 
    str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');

const users = [
    { firstName: updatedFirstName, lastName: updatedLastName }

    ] ;

/* pro vícero uživatelksých účtů je zde vytvořeno pole, kam se můžou zanášet a které mi zároveň umožní použít fce jako je .map */

const usersNoDiacritics = users.map(user => ({
    firstName: removeAccents(user.firstName),
    lastName: removeAccents(user.lastName)
}));

/* 
funkce .map 
 funguje přesně jen pro pole (což je pole users, proto jí můžu nacpat do vytváření objektu usersNoDiacritics)
.map přijímá jako argument callback funkci, která se provádí pro každý prvek v poli.
Tato funkce bere tři argumenty:
Aktuální prvek pole (povinné)
Index aktuálního prvku (volitelné)  (byl by číslem vyjádřen hned po user)
Původní pole, na kterém byla .map použita (volitelné) (bylo by vyjádřeno hned po indexu, tuhle ani jeden ale nepotřebujeme)
Vrací nové pole s hodnotami, které byly vráceny z callback funkce - takže tady je to vlastně pole se jmény bez diakritiky

*/

console.log(usersNoDiacritics);

const emails = usersNoDiacritics.map(user => {
    const firstName3Symbols = user.firstName.slice(0, 3); 
    const lastName5Symbols = user.lastName.slice(0, 5); 
     return `${firstName3Symbols}${lastName5Symbols}@fit.cvut.cz`});

console.log(emails)
document.body.innerHTML += "<p>Váš nový email je: "+ emails + "</p>" };
 /* konec zobáčkové závorky je tu celkem stěžejní, protože uzavírá horní else statement  na ř.7 -  tvoření emailu se totiž spou-
štělo předtím, i když user špatně vyplnil své údaje, což je blbost. Teď je vlastně zbytek kódu zahrnutý v "else" části, takže kód funguje stylem:
buď dostaneš alert, žes to blbě vyplnil, nebo ti poskytnu tvůj nový email. */