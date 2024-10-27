/* Ahoj, toto je můj kód. Musím se přiznat, používala jsem stackOverFlow a ptala se Chatu, doufám ale, že skrze můj kód a hlavně poznámky uvidíte, 
že jsem je používala k tomu, abych si zkusila věci, na které bych jinak nenarazila. */

const firstName = prompt("zadej jméno", "Jana");
const lastName = prompt("zadej příjmení", "Procházková");

const removeAccents = str =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');   

const user = {
    firstName: firstName,
    lastName: lastName
};

/* funkce str.normalize('NFD') převede text do unicode normalizovaného textu (část normalize) a oddělí složené znaky - "á" se stane "a" a "´" (to dělá to NFD)
krom NFD existuje ještě NFC, které dělá opak (ze dvou symbolů tvoří zpět jeden) a jejích komplexnější podoby NFKC, NFKD, na které jsem zatím moc blond */

/* U+0300 až U+036F jsou sborníky diakritických symbolů, takže nemusím vypisovat všechny znaky ze všech myslitelných jazyků ručně
funkce tedy: vezme a rozloží složené znaky a diakritické znaky popsané vyjmenovanými sborníky nahradí prázdným místem*/


const userNoDiacritics = {
    firstName: removeAccents(user.firstName),
    lastName: removeAccents(user.lastName)
};

/* zde se použije volání funkce v objektu - volám fci postavenou o řád výš pro pomoc na nižší úrovni, takže to jde - fce vytvořená jen v objektu zavolaná
zavolaná o řád výš by nereagovala*/

console.log(userNoDiacritics);




Object.keys(userNoDiacritics).forEach(k => userNoDiacritics[k] = userNoDiacritics[k].toLowerCase().trim().replace(/\s+/g, ''));

/* s .trim vezmu všechna bílá místa na začátku a konci každého str v objektu, kdybych ale chtěla odstranit všechny možné mezery, musím použít .replace:
replace(/\s+/g, '' ) - naštěstí se metody dají použít za sebou.

/\s/g =  // is the syntax for a regular expression, everything in between the / will be evaluated on the input and anything that matches the expression 
will then be passed to whatever function you are using.
\s matches a space, a tab, a carriage return, a line feed, or a form feed
The g at the end of the // means "global", that means do the search on the entire input instead of just the first match it comes across. 
https://www.regular-expressions.info/shorthand.html

teda humpolácky: dvěma lomítky oznámím, že následující věc je regex výraz a vše, co se rovná výrazu vevnitř má moje fce vzít, \s řekne, že to v tomhle případě
bereme prázdná místa a /g řekne, že to nemá být jen první instance prázdných míst, ale každá instance prázdných míst.

"+" zde znamená, že: each contiguous string of space characters is being replaced with the empty string because of the +
teda: kdybych chtěla prázdná místa nahradit smajlem, pro /\s/g by v případě dvou prázdných míst VEDLE SEBE byly dva smajly
ve stejné situaci /\s+/g nahradí dvě prázdná místa vedle sebe jen jedním smajlem.
*/

/* object.keys je metoda, která říká, že máme projet všechny "string-keyed property names" s parametrem objektu (zde userNoDiacritics), 
u kterého se toto má stát,
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
k = proměnná představující aktuální key v objektu 

ne-shorthand verze kódu by vypadala:

Object.keys(userNoDiacritics).forEach(function(key) {
    const value = userNoDiacritics[key];
    let trimmedAndReplacedValue = value.trim().replace(/\s+/g, '');
    userNoDiacritics[key] = trimmedAndReplacedValue;
});

posledně jsem si taky všimla, že mám první písmena capslockem, takže jsem přidala metodu .toLowerCase, protože řádek 52 už stejně vypadá uberhnusně :D 
*/
console.log(userNoDiacritics);

const firstName3Symbols = userNoDiacritics.firstName.slice(0, 3); 
const lastName5Symbols = userNoDiacritics.lastName.slice(0, 5); 

console.log(`${firstName3Symbols}${lastName5Symbols}@fit.cvut.cz`)


/* ChatGPT mi vyčetl, že: 

1.Kód nepředpokládá možnost, že uživatel zadá prázdný řetězec nebo vstup obsahující pouze mezery. 
Pokud se uživatel rozhodne nezadat žádné jméno nebo příjmení, výsledný e-mail bude neplatný.
2. Kód bere pevně 3 znaky z firstName a 5 znaků z lastName. Pokud je jméno nebo příjmení kratší než požadovaný počet znaků, 
může dojít k neočekávanému výsledku. Například pokud by uživatel zadal jen dvoupísmenné jméno, vznikl by kratší výstup.
3.I když je odstraněna diakritika, 
nejsou zkontrolovány speciální znaky, čísla nebo jiné nepovolené znaky v jménech. Ty by mohly negativně ovlivnit generovaný e-mail.
4. Kód provádí více úprav na hodnotách firstName a lastName, než je opravdu potřeba 
(odstranění diakritiky, konverze na malá písmena, trimování mezer). To vše by mohlo být provedeno najednou, což by zjednodušilo strukturu kódu.

+ v půlce kódu mi došlo, že samotný objekt asi není úplně nejlepší řešení pro větší množství uživatelů vyplňující formulář. Má to tedy být
nejlépe pole, ve kterém budou zanesené objekty. 

nejdřív předělám na pole
pak zefektivním úpravy na hodnotách (4)
pak dodám zastavení pro vyplnění prázdného formuláře (1)
a jako poslední dodám edge cases (2,3)

*/