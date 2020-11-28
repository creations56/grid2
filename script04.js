let espace=String.fromCharCode(160); // definition de caracteres 
let fleche=String.fromCharCode(8594);
let retLigne=String.fromCharCode(10); // \n
let nord2=String.fromCharCode(5123); // fleche pour boutons 
let est2=String.fromCharCode(5125); // fleche pour boutons 
let sud2=String.fromCharCode(5121); // fleche pour boutons 
let ouest2=String.fromCharCode(5130); // fleche pour boutons 
let nord=String.fromCharCode(9650);
let est=String.fromCharCode(9658);
let sud=String.fromCharCode(9660);
let ouest=String.fromCharCode(9668);
let grid=[]; // tableau grille
let nbrLignes=30; // nombre de lignes de grid
let longLigne=60; // nombre d'element dans une ligne
let nbrElements=4; // nombre de tyoe d'elements differents a, b, c, d...
let xAgent=0; // position dans la ligne de l'agent
let yAgent=0; // ligne ou se situe l'agent
let dirAgent=0;// direction de l'agent 0 nord, 1 est, 2 sud, 3 ouest
let imgAgent=[nord, est, sud, ouest]; // caracteres a utiliser pour l'agent

let pileAgent=[]; // valeurs de grid deplacees par agent
let enviAgent=[]; // valeurs sous et autour de l'agent
let table=[]; // definit la structure cree pa l'agent
let transcript=['•','a','b','c']; // caracteres qui composent le grid
let warning='';
let ite=0; // nombre iteration
let iteRot=0; // pour rotation
let nbrChange=0; // nombre d'echanges
let numEntree=0; // code pour identifier l'entree


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

/*
function analyseGrid() {
  // analyse les structures de la Grid
  valCourante='';
  flaga=false;
  indexa=0;
  struct=[0,0,0,0,0,0,0]; // struct[x] contint le nb de struct de longueur x
  for (let j=0; j< nbrLignes; j++){
    for (var i = 0; i < longLigne; i++) {
      valPrecedente=valCourante;
      valCourante=grid[j][i];
      if ((valCourante==='a')&&(valCourante===valPrecedente)){
        switch (flaga) {
          case false: indexa=2;flaga=true;break;
          case true:indexa +=1; break;
        }
      }
      else{ 
        switch (flaga) {
          case false:break;
          case true: struct[indexa]=struct[indexa]+1; flaga=false;indexa=0;break;
          
        }
      }
    }
  }
}
*/

function alea(x){
  // retourne un nombre aleatoire entier entre 0 et x compris
  y=Math.floor(Math.random() * (x+1));
  return y;
}


function analyseGrid2(sequence){
  // calcul le nombre d'occurence d'une sequence
  // retourne le nombre d'occurences
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
  }
  return nbrTotal;
}

function analyse(){
  // analyse grille suivant la liste de sequence listSequ
  // utilise la function analyseGrid2
  listSequ=['a','aa','aaa','aaaa','aaaaa','aaaaaa'];
  listFrequ=[0,0,0,0,0,0];
  for (let k=0; k<6;k++){
    listFrequ[k]=analyseGrid2(listSequ[k]);
  }
}

function algo(x){
  // definit la structure cree par l'agent
  // le parametre x correspond a la valeur derriere l'agent
  // la valeur retounee correspond a la valeur qui doit suivre
  if (x==='a') {return 'a'}
  //if (x==='b') {return 'b'}
  //if (x==='c') {return 'c'}
  else return 'none';
}



function geneGrid(){ // attention String
  // genere grid 
  for (let j=0;j< nbrLignes; j++){
    let ligne=[];
    for (let i = 0; i < longLigne; i++) {
      val=String(alea(nbrElements-1));// string aleatoire de 0 à nbrElements
      ligne[i]=transcript[val];
    }
    grid[j]=ligne;
  }
}

function affichGrid(){ 
  // affiche grid
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
  // positionne l'agent
  // xAgent de 0 à longLigne-1 colonnes
  // yAgent de 0 à nbrLignes-1 lignes
  // sauvegarde position sous agent
  xAgent=alea(longLigne-1); // x de 0 a longLigne-1
  yAgent=alea(nbrLignes-1); // y de 0 a nbrLignes-1
  dirAgent=alea(3); // 0 nord 1 est 2 sud 3 ouest 
  // place agent ligne yAgent position xAgent
  pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  grid[yAgent][xAgent]=imgAgent[dirAgent]; // mise en place agent
}

function rotAgent(x){
  // rotation de l'agent de 90 degres dans sens horaire
  dirAgent=(dirAgent+x)%4;
  grid[yAgent][xAgent]=imgAgent[dirAgent];
}

function goNord(){
  // une case vers le nord si bord rotation +-90 deg aleatoire
  if (yAgent!==0){ // limite nord
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    yAgent=yAgent-1; // vers le nord
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=1} // alea est ou ouest
    else {dirAgent=3}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goEst(){
  // une case vers l'est si bord rotation +-90 deg aleatoire
  if (xAgent!==longLigne-1){ // limite est
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    xAgent=xAgent+1; // vers l'est
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=0} // alea nord ou sud
    else {dirAgent=2}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goSud(){
  // une case vers le sud si bord rotation +-90 deg aleatoire
  if (yAgent!==nbrLignes-1){ // limite sud
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    yAgent=yAgent+1; // vers le nord
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=1} // alea est ou ouest
    else {dirAgent=3}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function goOuest(){
  // une case vers l'ouest si bord rotation +-90 deg aleatoire
  if (xAgent!==0){ // limite ouest
    grid[yAgent][xAgent]=pileAgent.shift(); // remise en place de la valeur sous agent
    xAgent=xAgent-1; // vers l'ouest
    pileAgent.unshift(grid[yAgent][xAgent]); // sauvegarde point ou se situe l'agent
  }
  else { // tourner
    if (alea(1)===0){dirAgent=0} // alea nord ou sud
    else {dirAgent=2}
  }
  grid[yAgent][xAgent]=imgAgent[dirAgent] // affiche agent
}

function echange(x){
  // echange dessous et x nord est sud ouest
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

function avance(){
  //  avance et tourne aleatoirement tous les x cas
  ite=ite+1;
  iteRot=iteRot+1;
  if (ite%1000===0) { // tous les 1000 cas arret et analyse
    analyse();
    stop()}

  if (iteRot===6){// rotation aleatoire tous les 5 
    iteRot=0;
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
  
  if (enviAgent[4]===valReference){
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


function affichageInfo(){
  // mise a jour affichage info
  //texte2='';
  texte3='';
  //for (var i = 0; i < 7; i++) {texte2=texte2+struct[i]+','}
  for (var j = 0; j < 6; j++) {texte3=texte3+listSequ[j]+" "+listFrequ[j]+'\n'}
  if (warning===''){aInfo.textContent='itera='+ite+' echanges='+nbrChange+'\n'+texte3}
}

function affichageResults(x){
}

function stop(){
  // try car erreur si setInterval non lance
  try {clearInterval(intervalID);}
  catch (e) {}
}

/*
function myCallback()
{
  mouvAgent();
}
*/



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
  if (x==='ROT'){rotAgent(1);affichGrid()};// fEnter affiche deja results
  if (x===nord2){goNord(); affichGrid()}
  if (x===est2){goEst(); affichGrid()}
  if (x===sud2){goSud(); affichGrid()}
  if (x===ouest2){goOuest(); affichGrid()}
} // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres
  
  if (x==='STOP'){stop()};// fEnter affiche deja results
  if (x==='GO'){intervalID = window.setInterval(mouvAgent, 10);}
  if (x==='MOVE'){mouvAgent()}
  if (x==='ANA'){
    codeEntree=0; // entree 0 = sequence pour analyse
    aInter.textContent='entrer chaine pour analyse :'
    aInput.disabled=false;}
    
  if (x==='ENTER'){}
}// fin de boutonGris

function boutonBleu(x) {
  // gestion des touches blanches
} // fin de boutonBleu

function updateValue(e) { // fonction ecoute de aInput 
  sequence = e.target.value; // string entreee
  aInput.disabled=true;
  aInput.value='';
  aInter.textContent='';
  if (codeEntree===0){ // entree est une sequence pour analyse
    aInfo.textContent='sequence :'+sequence+'\n' +'resultat :'+analyseGrid2(sequence);
  }
}

geneGrid();
//analyseGrid();
analyse();
defAgent();
affichGrid();