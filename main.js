
let errors = [];
let betalingw = "";
console.log('array errors')
console.log(errors)

function validateForm(){
   // zet alles op nul
   document.getElementById("goedgedaandiv").style.display = 'none';
   document.getElementById("betalingsdiv").style.display = 'none';
   document.getElementById("errorlijstdiv").style.display = 'none';
   errors.length = 0;

   // contoleer of er niet leeg is 
   CheckEmptyField("voornaam", melding = 'het veld voornaam');
   CheckEmptyField("naam", melding = 'het veld naam');
   CheckEmptyField("gebruikersnaam", melding = 'het veld gebruikersnaam');
   CheckEmptyField("email", melding = 'het veld email');
   CheckEmptyField("wachtwoord", melding = 'het veld wachtwoord');
   CheckEmptyField("herhaalwachtwoord", melding =  'het veld herhaal wachtwoord');
   CheckEmptyField("adres", melding = 'adres');
   CheckEmptyField("land", melding = 'land');
   CheckEmptyField("provincie", melding ='provincie');
   CheckEmptyField("postcode", melding ='Het veld postcode');
   voorwaardenCheck("flexCheckChecked");

   // contoleer of alles corect is gegevult 
   if(errors.length == 0){
      validateEmail("email");
      validateWachtwoord("wachtwoord", "herhaalwachtwoord");
      validatePayment();
      postcodeCheck("postcode");
   }

   // print output
   output();
}


// ------------------------------------------------
// CheckEmptyField :
// Input Veld = ID
// Melding = Foutboodschap
// -----------------------------------------------
function CheckEmptyField(veld,melding ){

   let inhoud = document.getElementById(veld).value;
   melding = melding + ' is vereist.';

   let standaardTekst;
   // --- Ingeval van de velden voornaam, gebruiksnaam, email, wachtwoord, herhaalwachtwoord en adres ---- 
   if ( ["voornaam" ,"naam", "gebruikersnaam", "email", "wachtwoord", "herhaalwachtwoord", "postcode","adres"].includes(veld))
   {
      if(inhoud.length == 0)
      {
         errors.push(melding);
         console.log(melding)
      };
   };

   // -- Ingeval van de velden land  
   if (veld == "land")
   {
      standaardTekst = 'kies een Land';
      if(inhoud == standaardTekst)
      {
         errors.push(melding);
         console.log(melding)
      }
   };

   // -- Ingevak van Provincie
   if (veld == "provincie")
   { 
      standaardTekst = 'kies een provincie';
      if(inhoud == standaardTekst)
      {
         errors.push(melding);
         console.log(melding)
      }
   };
}


// ------------------------------------------------
// Validate email :
// Input emailadres
// 
// -----------------------------------------------
function validateEmail(emailadres){
   melding = 'E-mailadres is niet correct.';

   // -- Check some fields
   let inhoud = document.getElementById(emailadres).value;
   let bevatApenstaart = inhoud.includes('@')
   let substring = inhoud.split('@');
   let gebruikersnaam = substring[0];
   let domainnaam = substring[1];
   let emailCorrect = true

   // -- Check @ teken
   if (bevatApenstaart == true)
   {
      // --- deel 1
      // -- check lengte naam
      if(gebruikersnaam.length > 0){ 

         // -- controle karakter in naam
         for (let i = 0; i < gebruikersnaam.length; i++) {
            let karakter = gebruikersnaam.charAt(i);
            // -- eerste karakter controle    
            if (i == 0 ){
               if (!(/[a-zA-Z0-9_]/).test(karakter)){
                  emailCorrect = false
               }
            } else {
               // -- resterende karakters
               if (!(/[.a-zA-Z0-9_-]/).test(karakter)){
                  emailCorrect = false
               }
            }
         }
      } else {
         emailCorrect = false
      }
      // --- deel 2
      if(domainnaam.length > 0){ 
         // -- controle karakter in naam
         for (let i = 0; i < domainnaam.length; i++) {
            let karakter = domainnaam.charAt(i);
            // -- eerste karakter controle    
            if (i == 0 ){
               if (!(/[a-zA-Z0-9]/).test(karakter)){
                  emailCorrect = false
               }
            } else {
               // -- resterende karakters
               if (!(/[.a-zA-Z0-9-]/).test(karakter)){
                  emailCorrect = false
               }
            }
         }
      } else {
         emailCorrect = false
      }
   } else {
      // geen @ teken
      emailCorrect = false
   }

   if (emailCorrect == false){
      errors.push(melding)
      console.log(melding)
   }
}     


// ------------------------------------------------
// Validate wachtwoord :
// Input wachtwoord en herhaalwachtwoord
//
// -----------------------------------------------
function validateWachtwoord(wachtwoord, herhaalwachtwoord){
   let IW = document.getElementById(wachtwoord).value;
   let IHW = document.getElementById(herhaalwachtwoord).value;

   if (IW.length <= 7){
      melding = 'het wachtwoord moet minstens bestaan uit 8 tekens.'
      errors.push(melding)
      console.log(melding)
   }
   else if(IW != IHW){
      melding = 'je wachtwoord kommen niet overeen.'
      errors.push(melding)
      console.log(melding)
   }
}


// ------------------------------------------------
// Validate Payment :
// Input veld = 
//
// -----------------------------------------------
function validatePayment(veld) {
   let radios = document.getElementsByName('flexRadioDefault');
   for (var i = 0, length = radios.length; i <length; i++) {
      if (radios[i].checked ) {
         betalingw = "Je betalingswijze is " + radios[i].value + "."
      }  
   } 
}


// ------------------------------------------------
// Validate postcode :
// Input veld = 
//
// -----------------------------------------------
function postcodeCheck(veld){
   let postcodenummer = document.getElementById(veld).value;

   if (postcodenummer < 1000 && postcodenummer > 9999) {
      melding = 'De waarde van de postcode moet tussen 1000 en 9999 liggen.'
      errors.push(melding)
      console.log(melding)
   }
}


// ------------------------------------------------
// Validate Algemene voorwaarden :
// Input veld = 
//
// -----------------------------------------------
function voorwaardenCheck(veld){
   let voorwaarden = document.getElementById(veld);

   if (voorwaarden.checked == false) {
      melding = 'je moet de algemene voorwaarden accepteren.';
      errors.push(melding);
      console.log(melding);
   }
}


// ------------------------------------------------
// Validate Algemene voorwaarden :
// Input veld = 
//
// -----------------------------------------------
function output(){
   if (errors.length == 0) {
      document.getElementById("goedgedaandiv").style.display = 'inline-block';
      document.getElementById("Betalingswijze").innerHTML =  betalingw
      document.getElementById("betalingsdiv").style.display = 'inline-block';
   } else {
      let errorsPlusEnter = "";

      for (var i = 0; i < errors.length; i++) {
         errorsPlusEnter += errors[i] + "<br>"; // Voeg elk item van de array toe aan de HTML-string, met een <br> element tussen elk item
      }
      document.getElementById("errorlijst").innerHTML = errorsPlusEnter;
      document.getElementById("errorlijstdiv").style.display = 'inline-block';
   }
}


// EventListener button "click"
 document.querySelector("#button").addEventListener("click", validateForm);