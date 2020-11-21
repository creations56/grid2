let espace=String.fromCharCode(160), //&nsp
  fleche=String.fromCharCode(8594),
  retLigne=String.fromCharCode(10),
  listWarning=['large number, SCI mode set','operation is undefined','calculation not possible'];
let ligne=[]; 
let nbrLignes=20; // nombre de lignes
let longLigne=50; // nombre d'element dans une ligne
let typeElement=4; // nombre d'elements differents
  

aInput = document.getElementById('ainput'); 
aInfo = document.getElementById('ainfo'); 
agrid=document.getElementById('aresults');


document.querySelectorAll('.bblanc').forEach(item => {
  item.addEventListener('click', event => {    
    const {target} = event;
	titreBouton=target.textContent;
	boutonBlanc(titreBouton);
  })
});

document.querySelectorAll('.bgris').forEach(item => {
  item.addEventListener('click', event => {    
    const {target} = event;
	titreBouton=target.textContent;
	boutonGris(titreBouton);
  })
});


function geneLigne(){
  // genere une ligne de x valeurs aleatoires
for (let i = 0; i < longLigne; i++) {
  val=String(Math.floor(Math.random() * typeElement));// string aleatoire de 0 à 4
  ligne.push(val)}
}

function affichLigne(){
  // affiche la ligne dans agrid
  texte='';
  for (let i=0; i<longLigne;i++){
    texte=texte+ligne[i]
  }
  agrid.textContent=texte;
}

function affichageInfo(){
  // mise a jour affichage info
  if (warning===''){aInfo.textContent=degrad+' , '+fixsci+' , '+decimales;}
  else {aInfo.textContent=warning;warning=''}
}

function affichageResults(x){
  if (fixsci==='FIX'){valPile=pile0.toFixed(decimales)}
  else {valPile=pile0.toExponential(decimales)}
  ope=[x,valPile];
  long=listOpe.length;
  if (long>14){listOpe.pop()} // reduire liste
  listOpe.unshift(ope); 
  long=listOpe.length;
  aResults.textContent='';
  for (let i = 0; i < long; i++) {
    results=listOpe[i][0].padEnd(10,espace)+fleche+listOpe[i][1].padStart(18,espace);
    aResults.textContent=aResults.textContent+'\u000A'+results;
  }
}

function affichageInput(z){
  // affichage de input, calcul de position, dern et avDern
  // position = 1 partie entiere, 2 partie decimale, 3 partie exposant, 4 exposant complet  
  dern=z.substr(-1,1); // dernier caractere
  avDern=z.substr(-2,1); // avant dernier caractere
  if (z.includes('E')===true){position=3}
  else if (z.includes('.')===true) {position=2}
  else {position=1}
  if ((position===3)&& (numerique.includes(dern)===true) && (numerique.includes(avDern)===true)) {position=4} // 2 digits apres E
  if (z.length===0){aInput.textContent='?';entreeEnCours=false}
  else {aInput.textContent=z}
}

function boutonBlanc(x) {
  // gestion des touches blanches , entree d'un nombre
  y=aInput.textContent; // y comme raccourci
  z=''; // nouvelle valeur pour entree 
  affichageInfo(); // mise a jour des messages si touche appuyee
  if (entreeEnCours===true) {
	  if (x==='AC') {z=''}
	  else if (x==='C') {z=y.substr(0,y.length-1)}
	  else if (y.length>11) {return}// nombre de caracteres max
    else if (position===4) {return}// deja 2 digits apres E
    else if (x==='.') {if (position===1){z=y+x} else {return}}
    else if (x==='-'){if ((position===3)&&(dern==='E')){z=y+x} else {return}}
    else if (x==='E'){if (position<3){z=y+x} else {return}}
	  else {z=y+x}
	affichageInput(z);// affichage de input
  } 
  else { // nouvelle entree  
	  if (x==='C'){return}
	  else if (x==='AC') {return }
	  else if (x==='.'){z='0.'}
	  else if (x==='E'){z='1.0E'}
	  else {z=x}
  entreeEnCours=true;
	affichageInput(z);
  } // fin de nouvelle entree
 } // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres
  let flagR=true; // affichageResults
  let r=0;
  if (x==='ENTER'){fEnter();flagR=false};// fEnter affiche deja results
  if (x==='PI'){affichageInput('');fUp();pile0=Math.PI}
  if (x==='DROP'){fDown()}
  if (x==='DUP'){fUp();pile0=pile1}
  if (x==='STO'){fEnter();mem=pile0}
  if (x==='RCL'){affichageInput('');fUp();pile0=mem}
  if (x==='SWAP'){r=pile0;pile0=pile1;pile1=r}
  if (x==='CSTK'){pile0=0;pile1=0;pile2=0;mem=0} 
  if (x==='DEG'){degrad='DEG'} 
  if (x==='RAD'){degrad='RAD'} 
  if (x==='FIX'){fixsci='FIX';flagR=false} 
  if (x==='SCI'){fixsci='SCI';flagR=false} 
  if (x==='D+'){if (decimales<8){decimales +=1};flagR=false} 
  if (x==='D-'){if (decimales>0){decimales -=1};flagR=false} 
  if (x==='CRST'){listOpe=[]} 
  affichagePile(); // attention affichage doit etre avant fResults cause fixsci
  if (flagR===true){affichageResults(x);}
}// fin de 

geneLigne();
affichLigne();
