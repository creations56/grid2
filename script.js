let espace=String.fromCharCode(160); //&nsp
let fleche=String.fromCharCode(8594);
let retLigne=String.fromCharCode(10);
let nord=String.fromCharCode(5123);
let est=String.fromCharCode(5125);
let sud=String.fromCharCode(5121);
let ouest=String.fromCharCode(5130);
let grid=[]; 
let nbrLignes=30; // nombre de lignes de grid
let longLigne=60; // nombre d'element dans une ligne
let nbrElements=4; // nombre de tyoe d'elements differents 0 1 2 3
let xAgent=0;
let yAgent=0;
let dirAgent=0;// nord
let imgAgent=[nord, est, sud, ouest]; // caracteres a utiliser pour agent
let point=0; // element sur lequel se situe l'agent
let pileAgent=[]; // valeurs de grid deplacees par agent


  
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


document.querySelectorAll('.bbleu').forEach(item => {
  item.addEventListener('click', event => {    
    const {target} = event;
	titreBouton=target.textContent;
	boutonBleu(titreBouton);
  })
});

/*
function geneLigne(){
  // genere une ligne de x valeurs aleatoires
  let ligne=[];
  for (let i = 0; i < longLigne; i++) {
    val=String(Math.floor(Math.random() * nbrElements));// string aleatoire de 0 à nbrElements
    ligne[i]=val;
  }
  return ligne;
}
*/

function geneGrid(){
  // genere grid 
  for (let j=0;j< nbrLignes; j++){
    let ligne=[];
    for (let i = 0; i < longLigne; i++) {
      val=String(Math.floor(Math.random() * nbrElements));// string aleatoire de 0 à nbrElements
      ligne[i]=val;
    }
    grid[j]=ligne;
  }
}

function affichGrid(){ 
  texteGrid='';
  for (let j=0; j< nbrLignes; j++){
    //texteLigne='';
    //ligne=grid[j]; // la ligne j
    texteLigne=grid[j].join(''); // transforme grid[j] en une string
    //for (let i=0; i<longLigne;i++){
      //texteLigne=texteLigne+ligne[i];
    //}
    texteGrid=texteGrid+texteLigne+'\n';
  }
  agrid.textContent=texteGrid;
  aInfo.textContent='x='+xAgent+' y='+yAgent+' dir='+dirAgent+' pileAgent='+pileAgent[0];
}

function defAgent(){
  // xAgent de 0 à longLigne-1 colonnes
  // yAgent de 0 à nbrLignes-1 lignes
  xAgent=Math.floor(Math.random() * longLigne); // x
  yAgent=Math.floor(Math.random() * nbrLignes); // y
  dirAgent=Math.floor(Math.random() * 4); // 0 nord 1 est 2 sud 3 ouest 
  // place agent ligne yAgent position xAgent
  pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  grid[yAgent][xAgent]=imgAgent[dirAgent]; // mise en place agent
}

function rotAgent(){
  // rotation de 90 degres dans sens horaire
  dirAgent=(dirAgent+1)%4;
  grid[yAgent][xAgent]=imgAgent[dirAgent];
  // detection bords
}

function goNord(){
  if (yAgent!==0){ // limite nord
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    yAgent=yAgent-1; // vers le nord
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
    grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
  }
  else {return}
}

function goSud(){
  if (yAgent!==nbrLignes-1){ // limite sud
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    yAgent=yAgent+1; // vers le nord
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
    grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
  }
  else {return}
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


function stop(){
  clearInterval(intervalID);
}

function myCallback()
{
  // geneGrid();
  defAgent();
  affichGrid();
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
  // gestion des touches blanches
  if (x==='ROT'){rotAgent();affichGrid()};// fEnter affiche deja results
  if (x===nord){goNord(); affichGrid()}
  if (x===sud){goSud(); affichGrid()}
} // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres
  
  if (x==='STOP'){stop()};// fEnter affiche deja results
  if (x==='GO'){intervalID = window.setInterval(myCallback, 1000);}
}// fin de boutonGris

function boutonBleu(x) {
  // gestion des touches blanches
  if (x==='ROT'){stop()};// fEnter affiche deja results
} // fin de boutonBlanc




//let intervalID = window.setInterval(myCallback, 1000);
geneGrid();
defAgent();
affichGrid();