let espace=String.fromCharCode(160); // definition de caracteres 
//let fleche=String.fromCharCode(8594);
let retLigne=String.fromCharCode(10); // \n
let nord2=String.fromCharCode(5123); // fleche pour boutons 
let est2=String.fromCharCode(5125); // fleche pour boutons 
let sud2=String.fromCharCode(5121); // fleche pour boutons 
let ouest2=String.fromCharCode(5130); // fleche pour boutons 
let nord=String.fromCharCode(9650); // fleche pour agent
let est=String.fromCharCode(9658); // fleche pour agent
let sud=String.fromCharCode(9660); // fleche pour agent
let ouest=String.fromCharCode(9668); // fleche pour agent
let grid=[]; // tableau grille
let nbrLignes=30; // nombre de lignes de grid
let longLigne=60; // nombre d'element dans une ligne
//let nbrElements=4; // nombre de types d'elements differents a, b, c, d...
let xAgent=0; // position dans la ligne de l'agent
let yAgent=0; // ligne ou se situe l'agent
let dirAgent=0;// direction de l'agent 0 nord, 1 est, 2 sud, 3 ouest
let imgAgent=[nord, est, sud, ouest]; // caracteres a utiliser pour l'agent

let pileAgent=[]; // valeurs de grid deplacees par agent
//let enviAgent=[]; // valeurs sous et autour de l'agent
//let table=[]; // definit la structure cree pa l'agent
let carGrille='abc'+espace; // formation de la grille
let seqAlgo='abc'+espace; // sequence a former
let frequence=0; // frequence de seqAlgo
//let transcript=['•','a','b','c']; // caracteres qui composent le grid
let warning='none';
let ite=0; // nombre iterations
//let iteRot=0; // pour rotation
let nbrChange=0; // nombre d'echanges
let numEntree=0; // code pour identifier l'entree (input)
let texte2=''; // analyse et affichageInfo


// association des elements pour gestion des evenements
aInput = document.getElementById('ainput'); 
aInfo = document.getElementById('ainfo'); 
agrid=document.getElementById('aresults');
aInter=document.getElementById('ainter');

aInput.addEventListener('change', updateValue); // ecoute aInput
aInput.disabled=true; // input desactive par defaut

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


function alea(x){
  // retourne un nombre aleatoire entier entre 0 et x compris
  y=Math.floor(Math.random() * (x+1));
  return y;
}

function replace2(recherche, remplacement, chaineAModifier)
{
return chaineAModifier.split(recherche).join(remplacement);
}

function analyseGrid2(sequence){
  // calcul le nombre d'occurence d'une sequence dans la grille
  // retourne le nombre d'occurences
  sequence=seqAlgo;
  let nbrTotal=0; // nbr occurrences sur toutes lignes
  for (let j=0; j< nbrLignes; j++){ // chaque ligne
    let count=0; // compteur d'occurence sur une ligne
    let texte=grid[j].join(''); // forme une string
    let pos = texte.indexOf(sequence); // occurence 1
    while ( pos != -1 ) {
     count++;
     pos = texte.indexOf(sequence ,pos + 1 );
    }
    nbrTotal=nbrTotal+count; 
    //texte=replace2('abc','ABC',texte);
    //grid[j]=texte.split('');
  }
  return nbrTotal;
}

function analyse(){
  // analyse grille suivant la liste de sequence listSequ
  // utilise la function analyseGrid2
  // texte2 qui contient le resultat est mis a jour
  frequence=analyseGrid2(seqAlgo);
  texte3=ite+' '+seqAlgo+' frequence '+frequence;
  texte2=texte2+texte3+'\n';
}

function algo(x){
  // definit la structure cree par l'agent
  // le parametre x correspond a la valeur a l'est de l'agent
  // la valeur retounee correspond a la valeur qui doit suivre
  // transcript et nbrElements ont ete definis dans geneGrid()
  /*
  for (var i = 0; i < nbrElements; i++) { // quel indice caractere x ?
    if (x==transcript[i]) {y=i}
  }
  
  switch (y) {
    case 0 : z=transcript[nbrElements-1];break; // dernier caractere de transcript
    default: z=transcript[y-1];break;
  }
  //
  warning='x:'+x+' z:'+z+' '+transcript;
  return z;
  */
  
  pos = seqAlgo.indexOf(x); 
  if (pos===nbrElements-1) {z=transcript[0]}
  else {z=transcript[pos+1]}
  return z;
  
  /*
  switch (x) {
    case transcript[0]:return transcript[1];
    case transcript[1]:return transcript[2];
    case transcript[2]:return transcript[3];
    case transcript[3]:return transcript[0];
  }
  */
}

function geneGrid(){ 
  // genere grid qui est une liste de liste de string
  // utilise transcript[]
  transcript=Array.from(carGrille);
  nbrElements=transcript.length; // combien de lettres differentes
  for (let j=0;j< nbrLignes; j++){
    let ligne=[];
    for (let i = 0; i < longLigne; i++) {
      val=String(alea(nbrElements-1));// string nombre aleatoire de 0 à nbrElements
      ligne[i]=transcript[val];
    }
    grid[j]=ligne;
  }
}

function affichGrid(){ 
  // affiche grid
  // affiche egalement les information avec affichageInfo
  texteGrid='';
  for (let j=0; j< nbrLignes; j++){
    texteLigne=grid[j].join(''); // transforme grid[j] en une string
    texteGrid=texteGrid+texteLigne+'\n';
  }
  agrid.textContent=texteGrid;
  //analyseGrid();
  affichageInfo();
}

function defAgent(){
  // positionne l'agent sur la grille
  // xAgent de 0 à longLigne-1 colonnes
  // yAgent de 0 à nbrLignes-1 lignes
  // sauvegarde position sous agent
  xAgent=alea(longLigne-1); // x de 0 a longLigne-1
  yAgent=alea(nbrLignes-1); // y de 0 a nbrLignes-1
  dirAgent=alea(3); // 0 nord 1 est 2 sud 3 ouest 
  // place agent ligne yAgent position xAgent
  pileAgent[0]=grid[yAgent][xAgent]; // sauvegarde point ou se situe l'agent
  grid[yAgent][xAgent]=imgAgent[dirAgent]; // mise en place agent
}

function rotAgent(x){
  // rotation de l'agent de x fois 90 degres dans sens horaire
  // modification de l'apparence de l'agent
  dirAgent=(dirAgent+x)%4;
  grid[yAgent][xAgent]=imgAgent[dirAgent];
}

function goNord(){
  // une case vers le nord, si bord rotation +-90 deg aleatoire
  if (yAgent!==0){ // limite nord
    grid[yAgent][xAgent]=pileAgent[0]; // remise en place de la valeur sous agent
    yAgent=yAgent-1; // vers le nord
    pileAgent[0]=grid[yAgent][xAgent]; // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=1} // alea est ou ouest
    else {dirAgent=3}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goEst(){
  // une case vers l'est, si bord, rotation +-90 deg aleatoire
  if (xAgent!==longLigne-1){ // limite est
    grid[yAgent][xAgent]=pileAgent[0];  // remise en place de la valeur sous agent
    xAgent=xAgent+1; // vers l'est
    pileAgent[0]=grid[yAgent][xAgent];  // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=0} // alea nord ou sud
    else {dirAgent=2}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goSud(){
  // une case vers le sud, si bord rotation +-90 deg aleatoire
  if (yAgent!==nbrLignes-1){ // limite sud
    grid[yAgent][xAgent]=pileAgent[0]; // remise en place de la valeur sous agent
    yAgent=yAgent+1; // vers le nord
    pileAgent[0]=grid[yAgent][xAgent];  // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=1} // alea est ou ouest
    else {dirAgent=3}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goOuest(){
  // une case vers l'ouest, si bord rotation +-90 deg aleatoire
  // utiliser rotAgent ?
  if (xAgent!==0){ // limite ouest
    grid[yAgent][xAgent]=pileAgent[0];  // remise en place de la valeur sous agent
    xAgent=xAgent-1; // vers l'ouest
    pileAgent[0]=grid[yAgent][xAgent];  // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=0} // alea nord ou sud
    else {dirAgent=2}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

/*
function echange(x){
  // echange dessous et x 0 nord 1 est 2 sud 3 ouest
  // suppose que echange possible, pas au bord
  // position agent xAgent yAgent
  if ((dirAgent===0)||(dirAgent===2)) {return} // pas d'echange si dir nord ou sud
  if (x===0){ // nord
    temp=pileAgent[0]; // valeur dessous
    pileAgent[0]=grid[yAgent-1][xAgent];
    grid[yAgent-1][xAgent]=temp;
    nbrChange +=1;
  }
  if (x===1){
    temp=pileAgent[0]; // valeur dessous
    pileAgent[0]=grid[yAgent][xAgent+1];
    grid[yAgent][xAgent+1]=temp;
    nbrChange +=1;
  }
  if (x===2){
    temp=pileAgent[0];// valeur dessous
    pileAgent[0]=grid[yAgent+1][xAgent];
    grid[yAgent+1][xAgent]=temp;
    nbrChange +=1;
  }
  if (x===3){
    temp=pileAgent[0]; // valeur dessous
    pileAgent[0]=grid[yAgent][xAgent-1];
    grid[yAgent][xAgent-1]=temp;
    nbrChange +=1;
  }
}
*/

function avance(){
  // avance et tourne aleatoirement tous les 5 cas
  // arrete et analyse tous les 1000 cas
  // affiche nouvelle valeurs de la grille
  ite=ite+1;
  // iteRot=iteRot+1;
  if (ite%1000===0) { // tous les 1000 cas arret et analyse
    analyse();
    //stop()
    }
  if (ite%5===0){// rotation aleatoire tous les 5 
    //iteRot=0;
    x=alea(2);
    switch (x) {
      case 0: rotAgent(1); break;
      case 2: rotAgent(3); break;
    }
  }
  if (dirAgent===0){goNord()}
  else if (dirAgent===1) {goEst()}
  else if (dirAgent===2) {goSud()}
  else {goOuest()}
  affichGrid();
}

/*
function mouvAgent(){
  // options possibles :
  //  1 interverti devant dessous et avance
  //  2 interverti droite dessous tourne a droite et avance
  //  3 interverti gauche dessous tourne a gauche et avance
  //  4 avance sans rien changer 
  // definit environnement nord sud est ouest dessous de l'agent
  enviAgent[4]=pileAgent[0]; // dessous
  try{enviAgent[0]=grid[yAgent-1][xAgent]} catch (e) {enviAgent[0]=undefined}
  try{enviAgent[3]=grid[yAgent][xAgent-1]} catch (e) {enviAgent[3]=undefined}
  try{enviAgent[1]=grid[yAgent][xAgent+1]} catch (e) {enviAgent[1]=undefined}
  try{enviAgent[2]=grid[yAgent+1][xAgent]} catch (e) {enviAgent[2]=undefined}
  
  // definit les directions par rapport a l'agent 
  // 0 nord 1 est 2 sud 3 ouest
  arriere=(dirAgent+2)%4; // la direction arriere
  devant=dirAgent;
  droite =(dirAgent+1)%4;
  gauche=(dirAgent+3)%4;
  
  valReference=algo(enviAgent[arriere]); // la valeur recherchee 
  
  if (enviAgent[4]===valReference){ // bonne valeur est dessous
    avance();
    return;
  }
  if (enviAgent[devant]===valReference){
    echange(devant);
    avance();
    return;
  }
  else if (enviAgent[droite]===valReference) {
    echange(droite);
    avance();
    return;
  }
  else if (enviAgent[gauche]===valReference){
    echange(gauche);
    avance();
    return;
  }
  else {
    avance()
  }
}
*/


function mouvAgent2(){
  // definit les cases a echanger et avance
  //
  // si case direction Est = 'x' case dessous doit etre algo('x')
  //try{valEst=grid[yAgent][xAgent+1]} catch (e) {valEst=undefined} // valeur Est
  //if (valEst!==undefined) {valReference=algo(valEst)}
  
  try{valOuest=grid[yAgent][xAgent-1]} catch (e) {valEst=undefined} // valeur Ouest
  if (valOuest!==undefined) {valReference=algo(valOuest)}
  
  else {avance();return} // pas d'echange a faire
  
  if (pileAgent[0]===valReference) {avance();return} // val dessous est la bonne
  
  // sinon on fait le tour de la position
  vecteur=[[1,1],[1,0],[1,-1],[0,1],[-1,1],[-1,0],[-1,-1]]; // vecteur y,x
  for (var i = 0; i < 7; i++) { // 7 vecteurs possibles de 0 a 6
    try{valVecteur=grid[yAgent+vecteur[i][0]] [xAgent+vecteur[i][1]]} catch (e) {valVecteur=undefined}
    
    switch (valVecteur) {
      case undefined: break;
      case valReference:
        temp=pileAgent[0]; // echange dessous et position valVecteur
        //warning='pileAgent[0]='+pileAgent[0]+' vecteur='+vecteur[i];
        pileAgent[0]=valVecteur;
        grid[yAgent+vecteur[i][0]] [xAgent+vecteur[i][1]]=temp;
        nbrChange +=1;
        i=7; break;// arret de la boucle
      default:break;
    }
  }
  avance();
}



function affichageInfo(){
  // mise a jour affichage info
  if (warning==='none') {aInfo.textContent='itera='+ ite+' echanges='+ nbrChange+'\n'+texte2;}
  else {aInfo.textContent=warning; warning='none'}
}

/*
function affichageResults(x){
}
*/

function stop(){
  // try car erreur si setInterval non lance
  try {clearInterval(intervalID);}
  catch (e) {}
}

/*
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
*/

function initialisation() {
  geneGrid();
  analyse();
  defAgent();
  affichGrid();
}

function boutonBlanc(x) {
  // gestion des touches blanches
  if (x==='ROT'){rotAgent(1);affichGrid()};// fEnter affiche deja results
  if (x===nord2){goNord(); affichGrid()}
  if (x===est2){goEst(); affichGrid()}
  if (x===sud2){goSud(); affichGrid()}
  if (x===ouest2){goOuest(); affichGrid()}
} // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres 
  if (x==='MOVE'){mouvAgent2()}
  if (x==='ANA'){
    codeEntree=0; // entree 0 = sequence pour analyse
    aInter.textContent='entrer chaine pour analyse :'
    aInput.disabled=false;}   
  if (x==='INIT'){
    codeEntree=1; // entree 1 = definition de carGrille
    aInter.textContent='entrer chaine pour initilisation :'
    aInput.disabled=false;}   
  if (x==='ENTER'){}
}// fin de boutonGris

function boutonBleu(x) {
  // gestion des touches bleues
  if (x==='STOP'){stop()};// fEnter affiche deja results
  if (x==='GO'){intervalID = window.setInterval(mouvAgent2, 5);}
} // fin de boutonBleu

function updateValue(e) { // fonction ecoute de aInput 
  sequence = e.target.value; // string entreee
  aInput.disabled=true;
  aInput.value='';
  aInter.textContent='';
  switch (codeEntree) {
    case 0:  aInfo.textContent='sequence :'+sequence+'\n' +'resultat :'+analyseGrid2(sequence); break;// analyse et affichage
    case 1: carGrille=sequence ; initialisation();break;// initialisation
  }
}

initialisation();