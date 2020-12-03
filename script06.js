let carre=String.fromCharCode(9724);
let a2=String.fromCharCode(9601); // remplacement de a dans chaine abc
let b2=String.fromCharCode(9602); // remplacement de b dans chaine abc
let c2=String.fromCharCode(9603); // remplacement de c dans chaine abc
let abc2=a2+b2+c2; // remplacement de a la chaine abc
let nord2=String.fromCharCode(5123); // fleche pour boutons 
let est2=String.fromCharCode(5125); // fleche pour boutons 
let sud2=String.fromCharCode(5121); // fleche pour boutons 
let ouest2=String.fromCharCode(5130); // fleche pour boutons 
let imgAgent=carre; // caracteres a utiliser pour l'agent
let grid=[]; // tableau grille
let nbrLignes=30; // nombre de lignes de grid
let longLigne=60; // nombre d'element dans une ligne
let carGrille='abc.'; // caracteres dans la grille
let seqAlgo='abc'; // sequence à former
let ite=0; // nombre iterations
let frequence=0; // frequence de seqAlgo
let nbrChange=0; // nombre d'echanges realises
let numEntree=0; // code pour identifier l'entree (input)
let texte2=''; // analyse et affichageInfo
let warning='none'; // affichage alternatif 
let xAgent=0; // position dans la ligne de l'agent
let yAgent=0; // ligne ou se situe l'agent
let dirAgent=0;// direction de l'agent 0 nord, 1 est, 2 sud, 3 ouest
let pileAgent=[]; // valeurs de grid deplacees par agent
let listeVitesse=[1,5,10,50,100,500,1000]; // liste vitesse de l'agent
let indexVitesse=1; //vitesse de l'agent


// let espace=String.fromCharCode(160); // definition de caracteres 
//let fleche=String.fromCharCode(8594);
//let retLigne=String.fromCharCode(10); // \n
//let nord=String.fromCharCode(9650); // fleche pour agent
//let est=String.fromCharCode(9658); // fleche pour agent
//let sud=String.fromCharCode(9660); // fleche pour agent
//let ouest=String.fromCharCode(9668); // fleche pour agent
//let transcript=['•','a','b','c']; // caracteres qui composent le grid
//let iteRot=0; // pour rotation
//let nbrElements=4; // nombre de types d'elements differents a, b, c, d...
//let enviAgent=[]; // valeurs sous et autour de l'agent
//let table=[]; // definit la structure cree pa l'agent

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


/*
function analyseGrid2(sequence){
  // calcul le nombre d'occurence d'une sequence dans la grille
  // retourne le nombre d'occurences
  let nbrTotal=0; // nbr occurrences sur toutes lignes
  for (let j=0; j< nbrLignes; j++){ // chaque ligne
    let count=0; // compteur d'occurence sur une ligne
    let texte=grid[j].join(''); // forme une string
    let pos = texteRep.indexOf(a2); // occurence 1
    while ( pos != -1 ) {
     count++;
     pos = texteRep.indexOf(a2 ,pos + 1 );
    }
    nbrTotal=nbrTotal+count; 
  }
  return nbrTotal;
}
*/

function analyse(){
  // analyse grille suivant la sequence seq a2
  // texte2 qui contient le resultat est mis a jour
  
  let nbrTotal=0; // nbr occurrences sur toutes lignes
  for (let j=0; j< nbrLignes; j++){ // chaque ligne
    let count=0; // compteur d'occurence sur une ligne
    let texte=grid[j].join(''); // forme une string
    let pos = texte.indexOf(a2); // occurence 1
    while ( pos != -1 ) {
     count++;
     pos = texte.indexOf(a2 ,pos + 1 );
    }
    nbrTotal=nbrTotal+count; 
  }
  texte3='iteration '+ite+','+nbrTotal+' '+abc2;
  texte2=texte3+'\n'+texte2;
}

function algo(x){
  // definit la structure cree par l'agent
  // le parametre x correspond a la valeur a l'ouest de l'agent
  // la valeur retounee correspond a la valeur qui doit etre sous l'agent
  // transcript et nbrElements ont ete definis dans geneGrid()
  // utilise seqAlgo
  pos = seqAlgo.indexOf(x); 
  switch (pos) {
    case -1: z='none'; break;;// x pas dans seqAlgo
    case nbrElements-1: z=transcript[0];break;
    default:z=transcript[pos+1];
  }
  return z;
}

function replaceSeq(){
  // recherche et remplace dans grid
  for (let j=0; j< nbrLignes; j++){ // chaque ligne
    let texte=grid[j].join(''); // forme une string
    //texteRep=replace2('abc',abc2,texte); 
    texteRep=texte.split('abc').join(abc2);// remplace abc par abc2
    grid[j]=texteRep.split(''); // met a jour
  }
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
  // remplace 'abc' par abc2
  // affiche egalement les information avec affichageInfo
  texteGrid='';
  for (let j=0; j< nbrLignes; j++){
    texteLigne=grid[j].join(''); // transforme grid[j] en une string
    
    texteRep=texteLigne.split('abc').join(abc2);// remplace abc par abc2
    grid[j]=texteRep.split(''); // met a jour grid
    
    texteGrid=texteGrid+texteRep+'\n';
  }
  texteGrid=texteGrid+'\n'+pileAgent[0]
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
  grid[yAgent][xAgent]=imgAgent; // mise en place agent
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
  grid[yAgent][xAgent]=imgAgent // affiche agent
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
  grid[yAgent][xAgent]=imgAgent // affiche agent
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
  grid[yAgent][xAgent]=imgAgent // affiche agent
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
  grid[yAgent][xAgent]=imgAgent // affiche agent
}

function rotAgent(x){
  // rotation de l'agent de x fois 90 degres dans sens horaire
  dirAgent=(dirAgent+x)%4;
  //grid[yAgent][xAgent]=imgAgent;
}

function avance(){
  // avance et tourne aleatoirement tous les 5 cas
  // arrete et analyse tous les 1000 cas
  // affiche nouvelle valeurs de la grille
  ite=ite+1;
  if (ite%1000===0) { // tous les 1000 cas analyse
    analyse();
    }
  if (ite%5===0){// rotation aleatoire tous les 5 
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
  // definit les cases a echanger et avance
  // si case direction ouest = 'x' case dessous doit etre algo('x')
  // valReference est la valeur qui doit etre sous l'agent
  try{valOuest=grid[yAgent][xAgent-1]} catch (e) {valEst=undefined} // valeur Ouest
  
  if (valOuest===undefined) {avance();return} // pas d'echange a faire
  valReference=algo(valOuest); // none si pas dans seqAlgo
  //if (valOuest!==undefined) {valReference=algo(valOuest)}
  //else {avance();return} // pas d'echange a faire
  if (pileAgent[0]===valReference) {avance();return} // val dessous est la bonne
  if ((pileAgent[0]===a2)||(pileAgent[0]===b2)||(pileAgent[0]===c2)){avance();return} // pas d'echange possible
  
  // sinon on fait le tour de la position
  vecteur=[[1,1],[1,0],[1,-1],[0,1],[-1,1],[-1,0],[-1,-1]]; // vecteur y,x
  for (var i = 0; i < 7; i++) { // 7 vecteurs possibles de 0 a 6
    try{valVecteur=grid[yAgent+vecteur[i][0]] [xAgent+vecteur[i][1]]} catch (e) {valVecteur=undefined} 
    if (valVecteur===valReference){ // valeur trouvee
      temp=pileAgent[0]; // echange dessous et position valVecteur
      pileAgent[0]=valVecteur;
      grid[yAgent+vecteur[i][0]] [xAgent+vecteur[i][1]]=temp;
        nbrChange +=1;
      i=7; // arret boucle
    }
    /*
    switch (valVecteur) {
      case undefined: break; // cas des bords
      //case '*':break;
      case valReference:
        temp=pileAgent[0]; // echange dessous et position valVecteur
        pileAgent[0]=valVecteur;
        grid[yAgent+vecteur[i][0]] [xAgent+vecteur[i][1]]=temp;
        nbrChange +=1;
        i=7; break;// arret de la boucle
      default:break;
    }
    */
  }
  avance();
}

function affichageInfo(){
  // mise a jour affichage info
  if (warning==='none') {aInfo.textContent='itera='+ ite+' echanges='+ nbrChange+'\n'+texte2;}
  else {aInfo.textContent=warning; warning='none'}
}

function go(){
  // demarrage de l'exploration automatique
  intervalID = window.setInterval(mouvAgent, listeVitesse[indexVitesse]);
}

function stop(){
  // arret processus exploration automatique
  // try car erreur si setInterval non lance
  try {clearInterval(intervalID);}
  catch (e) {}
}

function initialisation() {
  // initialisation ou reinitialisation du programle
  geneGrid();
  replaceSeq()
  analyse();
  defAgent();
  texte2=''; // analyse et affichageInfo
  warning='none'; // affichage alternatif 
  indexVitesse=1; //vitesse de l'agent
  ite=0; // nombre iterations
  nbrChange=0; // nombre d'echanges realises
  aInter.textContent='vitesse '+(7-indexVitesse)+' /7';
  aInput.textContent='appuyer sur GO pour lancer le process auto, \n sur MOVE pour avancer pas à pas';
  affichGrid();
}

function boutonBlanc(x) {
  // gestion des touches blanches
  //if (x==='ROT'){rotAgent(1);affichGrid()};// fEnter affiche deja results
  if (x===nord2){goNord(); affichGrid()}
  if (x===est2){goEst(); affichGrid()}
  if (x===sud2){goSud(); affichGrid()}
  if (x===ouest2){goOuest(); affichGrid()}
} // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres 
  if (x==='MOVE'){mouvAgent()}
  //if (x==='ANA'){
    //codeEntree=0; // entree 0 = sequence pour analyse
    //aInter.textContent='entrer chaine pour analyse :'
    //aInput.disabled=false;}   
  if (x==='CLEAR'){
    stop(); // eventuel arret processus exploration automatique
    initialisation();
  }
  if (x==='ENTER'){}
}// fin de boutonGris

function boutonBleu(x) {
  // gestion des touches bleues
  if (x==='STOP'){stop()};// fEnter affiche deja results
  if (x==='GO'){go()}
  if (x==='VIT+') {
    stop();
    indexVitesse=indexVitesse-1;
    if(indexVitesse<0){indexVitesse=0};
    aInter.textContent='vitesse '+(7-indexVitesse)+' /7';
  }
  if (x==='VIT-') {
    stop();
    indexVitesse=indexVitesse+1;
    if(indexVitesse>6){indexVitesse=6};
    aInter.textContent='vitesse '+(7-indexVitesse)+' /7';
  }
} // fin de boutonBleu

function updateValue(e) { 
  // fonction ecoute de aInput 
  stop(); // eventuel arret processus exploration automatique
  sequence = e.target.value; // string entree
  aInput.disabled=true;
  aInput.value='';
  aInter.textContent='';
  
  if (codeEntree===1){ // entree d'une vitesse
    try{v=Number(sequence)} catch (e) {v=undefined}
    if (v===undefined){return}
    if (v<1){v=1}
    if (v>1000){v=1000}
    vitesse=v;
  }
}

initialisation();