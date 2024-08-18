//Déclaration de toute les variables.
var pseudo;
var number_question = 0;
var question_RandomVb = 0;
let question_final = [];
let good_reponse = [];
let user_reponse = [];
var title = document.getElementsByTagName("title")[0].innerHTML;
let tableau = [ 
['become', 'became', 'become', 'devenir'],
['choose', 'chose', 'chosen', 'choisir'],
['come', 'came', 'come', 'venir'],
['cut', 'cut', 'cut', 'couper'],
['drink', 'drank', 'drunk', 'boire'],
['drive', 'drove', 'driven', 'conduire'],
['eat', 'ate', 'eaten', 'manger'],
['fall', 'fell', 'fallen', 'tomber'],
['feed', 'fed', 'fed', 'nourir'],
['find', 'found', 'found', 'trouver'],
['forget', 'forgot', 'forgotten', 'oublier'],
['get', 'got', 'got', 'obtenir'],
['lose', 'lost', 'lost', 'perdre'],
['meet', 'met', 'met', 'rencontrer'],
['make', 'made', 'made', 'fabriquer'],
['pay', 'paid', 'paid', 'payer'],
['slay', 'slew', 'slain', 'tuer'],
['sing', 'sang', 'sung', 'chanter'],
['slide', 'slid', 'slid', 'glisser'],
['win', 'won', 'won', 'gagner'],
['write', 'wrote', 'written', 'écrire'],
['sleep', 'slept', 'slept', 'dormir'],
['speek', 'spoke', 'spoken', 'parler'],
['speed', 'sped', 'sped', 'aller vite'],
['run', 'ran', 'run', 'courir'],
['have', 'had', 'had', 'avoir'],
['go', 'went', 'gone', 'aller'],
['hear', 'heard', 'heard', 'entendre'],
['hide', 'hid', 'had', 'cacher'],
['offset', 'offset', 'offset', 'compenser'],
['quit', 'quit', 'quit', 'quitter'],
['put', 'put', 'put', 'mettre'],
['read', 'read', 'read', 'lire'],
['see', 'saw', 'seen', 'voir'],
['send', 'sent', 'sent', 'envoyer'],
['set', 'set', 'set', 'fixer'],
['awake', 'awoke', 'awoken', 'se réveiller'],
['beat', 'beat', 'beaten', 'battre'],
['begin', 'began', 'begun', 'commencer'],
['bet', 'bet', 'bet', 'parier'],
['bite', 'bit', 'bitten', 'mordre'],
['lie','lay','lain','allonger']
];

//Fonction pour commencer le jeu.
function valider() {
	//Récupère le pseudo du joueur
	pseudo = document.forms["RegForm"]["Pseudo"];

	//Vérification voir la case Pseudo est vide ou non.
	if (pseudo.value == "") { 
		alert("Mettez votre Pseudo."); 
		pseudo.focus(); 
		return false; 
	}
	return true;
}


//Fonction pour passer à la question suivante
function next_question(){
	//Rajoute 1 et update la ligne pour le numéro de la question.
	number_question++;
	document.getElementById('num_question').innerHTML = number_question;


	//Choix des variables 
	question_RandomVb = getRandomIntVbVerbe();
	question_cache = getRandomIntCache();


	//Retrait du verbe qui ne doit pas être afficher.
	if(question_cache != 0){
		document.getElementById('infinitif').innerHTML = tableau[question_RandomVb][0];
	} else {
		good_reponse.push(tableau[question_RandomVb][0]);
		document.getElementById('infinitif').innerHTML = " ";
	}

	if(question_cache != 1){
		document.getElementById('preterit').innerHTML = tableau[question_RandomVb][1];
	} else {
		good_reponse.push(tableau[question_RandomVb][1]);
		document.getElementById('preterit').innerHTML = " ";
	}

	if(question_cache != 2){
		document.getElementById('participe').innerHTML = tableau[question_RandomVb][2];
	} else {
		good_reponse.push(tableau[question_RandomVb][2]);
		document.getElementById('participe').innerHTML = " ";
	}

	if(question_cache != 3){
		document.getElementById('traduction').innerHTML = tableau[question_RandomVb][3];
	} else {
		good_reponse.push(tableau[question_RandomVb][3]);
		document.getElementById('traduction').innerHTML = " ";
	}
}


//Fonction pour Valider la réponse de la question
function questionValidation() {

	//Récupération des variables.
	var reponse_user = document.getElementById('form_reponse');

	//Voir si la case est remplie ou non.
	if (reponse_user.value == "") { 
		alert("Vous devez remplir la case réponse."); 
		reponse_user.focus(); 
		return false; 
	}

	//Mettre le variable en minuscule pour forcément faire corresponde à la bonne réponse.
	reponse_user.value = reponse_user.value.toLowerCase();


	//Vérification des 10 questions.
	if(number_question < 10){
		//Si la question est en-dessous de 10 alors on récupère la réponse et on passe à la prochaine.
		user_reponse.push(reponse_user.value);
		next_question();
		return false;
	} else {
		//Si c'était la dernière question, récupèration de la question + stock des variables dans la mémoire interne en JSON.
		user_reponse.push(reponse_user.value);

		var jsonReponseUser = JSON.stringify(user_reponse);
		sessionStorage.setItem("jsonReponseUser", jsonReponseUser);

		var jsonGoodReponse=JSON.stringify(good_reponse);
		sessionStorage.setItem("jsonGoodReponse", jsonGoodReponse);

		return true;
	}
	return false;
}


//Fonction pour avoir un nombre aléatoire selon la taille du tableau.
//Et donc choisir un verbe parmis la list.
function getRandomIntVbVerbe() {
	let boolean = true;
	while(boolean){
		console.log("try");
		var randomIntVb = Math.floor(Math.random() * tableau.length);
		if(!question_final.includes(randomIntVb) && randomIntVb != null){
			question_final.push(randomIntVb);
			boolean = false;
			console.log(randomIntVb);
			return randomIntVb;
		}
	}
}



//Fonction pour avoir un nombre entre 0 et 3. Pour savoir quel verbe sera caché.
function getRandomIntCache() {
	return randomIntCache = Math.floor(Math.random() * 4);
}


//Fonction pour afficher le page du bilan.
function affiEndPage() {
	//Récupération de toute les variables.
	var reponse_validation = 0;
	var jsonReponseUser = sessionStorage.getItem("jsonReponseUser");
	var user_reponse = JSON.parse(jsonReponseUser);

	var jsonGoodReponse = sessionStorage.getItem("jsonGoodReponse");
	var good_reponse = JSON.parse(jsonGoodReponse);


	//Boucle pour afficher les réponses des questions et celle des utilisateur.
	//Et calcul du score en même temps.
	for (let i = 0; i < 10; i++) {
		document.getElementById('good_reponse' + i).innerHTML = good_reponse[i];
		document.getElementById('user_reponse' + i).innerHTML = user_reponse[i];
		if(good_reponse[i] == user_reponse[i]){
			reponse_validation++;
			document.getElementById('good_reponse' + i).style.background = 'green';
			document.getElementById('user_reponse' + i).style.background = 'green';
		} else {
			document.getElementById('good_reponse' + i).style.background = 'red';
			document.getElementById('user_reponse' + i).style.background = 'red';
		}
	}


	//Mettre une image selon le score de l'utilisateur.

	var img = document.createElement("img");

	if(reponse_validation != null){
		document.getElementById('note').innerHTML = reponse_validation;
		img.src = "score_" + reponse_validation + ".gif";
	} else {
		img.src = "score_0.gif";
		document.getElementById('note').innerHTML = "0";
	}

	document.getElementById("image").appendChild(img);
	document.getElementById("image").setAttribute("style", "text-align:center");



}


//Execute la fonction seulement si lapage est celle du en jeu.
if(title == "Verbe Irrégulier IN GAME"){
	next_question();
}


//Execute la fonction seulement si la page est celle du bilan.
if(title == "Verbe Irrégulier End"){
	affiEndPage();
}