/* =====================================================
   QG.JS — toute la logique de la page principale
   Organisé en sections indépendantes : tu peux modifier
   chacune sans toucher aux autres.
   ===================================================== */


/* ---------------------------------------------------
   1. HORLOGE EN DIRECT
   --------------------------------------------------- */
function mettreAJourHorloge() {
  const maintenant = new Date();
  document.getElementById('horloge').textContent =
    maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(mettreAJourHorloge, 1000);
mettreAJourHorloge();


/* ---------------------------------------------------
   2. MÉTÉO DE BRISTOL (API gratuite Open-Meteo, sans clé)
   --------------------------------------------------- */
const LATITUDE_BRISTOL = 51.4545;
const LONGITUDE_BRISTOL = -2.5879;

const CODES_METEO = {
  0: "Ciel dégagé ☀️", 1: "Plutôt clair 🌤️", 2: "Nuages épars ⛅", 3: "Couvert ☁️",
  45: "Brouillard 🌫️", 48: "Brouillard givrant 🌫️",
  51: "Bruine légère 🌦️", 53: "Bruine 🌦️", 55: "Bruine forte 🌧️",
  61: "Pluie légère 🌧️", 63: "Pluie 🌧️", 65: "Pluie forte 🌧️",
  71: "Neige légère 🌨️", 73: "Neige 🌨️", 75: "Neige forte 🌨️",
  80: "Averses 🌦️", 81: "Averses fortes 🌧️", 82: "Averses violentes ⛈️",
  95: "Orage ⛈️"
};

async function chargerMeteoBristol() {
  const affichage = document.getElementById('meteo-affichage');
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE_BRISTOL}&longitude=${LONGITUDE_BRISTOL}&current_weather=true`;
    const reponse = await fetch(url);
    const donnees = await reponse.json();
    const temperature = Math.round(donnees.current_weather.temperature);
    const code = donnees.current_weather.weathercode;
    const description = CODES_METEO[code] || "Temps anglais imprévisible 🌦️";
    affichage.textContent = `Bristol : ${temperature}°C, ${description}`;
  } catch (erreur) {
    affichage.textContent = "Météo indisponible pour l'instant";
  }
}
chargerMeteoBristol();
setInterval(chargerMeteoBristol, 15 * 60 * 1000); // rafraîchi toutes les 15 min


/* ---------------------------------------------------
   3. PETITS FAITS SUR BRISTOL
   Un fait différent est tiré au hasard à chaque visite.
   Ajoute-en autant que tu veux dans le tableau.
   --------------------------------------------------- */
const FAITS_BRISTOL = [
  "Bristol est le berceau du street art moderne, la ville où Banksy a fait ses débuts. 🎨",
  "Le pont suspendu de Clifton domine les gorges de l'Avon depuis 1864. 🌉",
  "Bristol a été élue ville la plus verte d'Europe en 2015. 🌳",
  "Le port flottant permet aux bateaux de rester à flot même à marée basse. ⛵",
  "Le quartier de Clifton Village a des airs de petit village dans la ville.",
  "L'ingénieur Isambard Kingdom Brunel a laissé son empreinte un peu partout dans la ville.",
  "Bristol Harbourside regorge de petits cafés parfaits pour un dimanche pluvieux. ☕",
  "La ville est connue pour son fameux verre bleu, le 'Bristol Blue Glass'."
];

function afficherFaitBristol() {
  const indexAleatoire = Math.floor(Math.random() * FAITS_BRISTOL.length);
  document.getElementById('fait-bristol').textContent = FAITS_BRISTOL[indexAleatoire];
}
afficherFaitBristol();


/* ---------------------------------------------------
   4. BOÎTE AUX LETTRES DEPUIS LA NORMANDIE
   Ajoute une lettre = ajoute un objet dans ce tableau,
   avec la même structure. La plus récente en premier.
   --------------------------------------------------- */
const LETTRES = [
  {
    date: "11 septembre 2026",
    titre: "Pour le grand départ",
    contenu: "Remplace ce texte par ton premier petit mot pour elle.\n\nTu peux écrire plusieurs paragraphes, les retours à la ligne sont respectés automatiquement."
  }
  // Ajoute tes prochaines lettres ici, séparées par une virgule :
  // {
  //   date: "20 septembre 2026",
  //   titre: "Un petit coucou",
  //   contenu: "..."
  // },
];

function afficherListeLettres() {
  const conteneur = document.getElementById('liste-lettres');
  conteneur.innerHTML = '';

  if (LETTRES.length === 0) {
    conteneur.innerHTML = '<p>Ta boîte aux lettres est vide pour l\'instant...</p>';
    return;
  }

  LETTRES.forEach((lettre, index) => {
    const item = document.createElement('div');
    item.className = 'lettre-item';
    item.innerHTML = `
      <span class="lettre-titre">✉️ ${lettre.titre}</span>
      <span class="lettre-date">${lettre.date}</span>
    `;
    item.addEventListener('click', () => ouvrirLettre(index));
    conteneur.appendChild(item);
  });
}

function ouvrirLettre(index) {
  const lettre = LETTRES[index];
  document.getElementById('modal-lettre-titre').textContent = lettre.titre;
  document.getElementById('modal-lettre-date').textContent = lettre.date;
  document.getElementById('modal-lettre-contenu').textContent = lettre.contenu;
  document.getElementById('modal-lettre').classList.add('visible');
}

function fermerLettre() {
  document.getElementById('modal-lettre').classList.remove('visible');
}

afficherListeLettres();


/* ---------------------------------------------------
   5. COIN "MÉDIATRICE DE PAIX"
   Remplace les entrées ci-dessous par ses vraies
   ressources (liens, contacts, notes importantes...).
   --------------------------------------------------- */
const RESSOURCES_MEDIATRICE = [
  {
    titre: "Exemple de ressource",
    description: "Remplace ceci par une vraie ressource utile pour son projet, avec une courte description.",
    url: "https://exemple.com"
  }
  // Ajoute ses vrais liens ici, même structure :
  // {
  //   titre: "Nom de la ressource",
  //   description: "Pourquoi c'est utile",
  //   url: "https://..."
  // },
];

function afficherRessources() {
  const conteneur = document.getElementById('liste-ressources');
  conteneur.innerHTML = '';

  RESSOURCES_MEDIATRICE.forEach(ressource => {
    const lien = document.createElement('a');
    lien.className = 'ressource-item';
    lien.href = ressource.url;
    lien.target = '_blank';
    lien.rel = 'noopener noreferrer';
    lien.innerHTML = `<strong>${ressource.titre}</strong><p>${ressource.description}</p>`;
    conteneur.appendChild(lien);
  });
}
afficherRessources();


/* ---------------------------------------------------
   6. COMPTE À REBOURS MYSTÈRE
   S'arrête le 30 novembre 2026 à minuit, puis débloque
   le lien vers avent.html (à créer plus tard).
   --------------------------------------------------- */
const DATE_CIBLE = new Date('2026-11-30T00:00:00');

function mettreAJourCountdown() {
  const maintenant = new Date();
  const difference = DATE_CIBLE - maintenant;
  const affichage = document.getElementById('countdown-affichage');
  const lienAvent = document.getElementById('lien-avent');

  if (difference <= 0) {
    affichage.textContent = "C'est l'heure ✨";
    lienAvent.classList.remove('verrouille');
    lienAvent.href = 'avent.html';
    lienAvent.textContent = 'Découvrir la suite →';
    clearInterval(intervalCountdown);
    return;
  }

  const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
  const heures = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const secondes = Math.floor((difference / 1000) % 60);

  affichage.textContent = `${jours}j ${heures}h ${minutes}m ${secondes}s`;
}

const intervalCountdown = setInterval(mettreAJourCountdown, 1000);
mettreAJourCountdown();


/* ---------------------------------------------------
   7. LA BLAGUE DU JOUR (spécial Anglais)
   Change automatiquement chaque jour, jusqu'au 31 août 2027.
   Ajoute autant de blagues que tu veux dans le tableau.
   --------------------------------------------------- */
const BLAGUES_ANGLAIS = [
  "Un Anglais ne dit jamais qu'il pleut : il dit qu'il fait 'un temps assez typique'. ☔",
  "En Angleterre, la file d'attente est un sport national. Doubler quelqu'un est un crime d'État.",
  "Le thé résout tout, même une invasion extraterrestre : 'Fancy a cuppa?' 🍵",
  "Un Anglais qui dit 'not bad' vient probablement de vivre le plus beau jour de sa vie.",
  "En Angleterre, on met de la sauce à la menthe sur l'agneau. On ne juge pas, on observe. 🐑",
  "Le vrai courage anglais : porter un t-shirt en terrasse par 12°C.",
  "'Sorry' est la ponctuation officielle de toute phrase anglaise.",
  "Le bus à impériale existe pour une seule raison : voir la pluie tomber de plus haut. 🚌",
  "Un petit-déjeuner anglais est un repas complet qu'on peut prendre à n'importe quelle heure.",
  "En Angleterre, on conduit à gauche. La logique, elle, roule où elle veut.",
  "Le Marmite : soit tu adores, soit tu fuis le pays en courant.",
  "Les Anglais ont un mot poli pour tout, sauf pour dire clairement ce qu'ils pensent.",
  "Une bière tiède, c'est une tradition, pas un oubli de frigo. 🍺",
  "Le cricket a des règles. Personne ne les connaît toutes, même pas les Anglais.",
  "'We'll see' veut souvent dire 'non', mais dit très poliment.",
  "Un parapluie anglais ne sert pas à se protéger de la pluie, juste à faire semblant d'y croire encore. ☂️",
  "Chez eux, parler de la météo est déjà une conversation entière.",
  "Les baked beans au petit-déjeuner : so British, so mystérieux.",
  "Un Anglais dira 'quite good' pour un feu d'artifice comme pour la fin du monde.",
  "Le 'Keep Calm' a été inventé avant même qu'il y ait une vraie raison de paniquer.",
  "Boire son thé avec du lait, c'est une religion, pas une option.",
  "Les distances se mesurent en 'pas très loin', ce qui peut vouloir dire 3 minutes ou 3 heures.",
  "Un taxi noir londonien connaît toutes les rues, sauf celle où tu vas.",
  "Chips + vinaigre : so British, so improbable, so bon en vrai.",
  "En Angleterre, le soleil est un événement qu'on commente pendant trois jours. ☀️",
  "'I'm fine, thanks' peut vouloir dire n'importe quoi entre 'super' et 'appelez les secours'.",
  "Un dimanche anglais sans rôti et sans Yorkshire pudding, ça n'existe pas.",
  "Les Anglais s'excusent même quand c'est toi qui leur marches sur le pied.",
  "Faire la queue avec le sourire, même sous la pluie : le vrai esprit britannique. ☔",
  "Dire 'brilliant' pour absolument tout, du café au chaos généralisé."
];

// Après cette date, la blague du jour s'arrête gentiment.
const FIN_DES_BLAGUES = new Date('2027-08-31T23:59:59');

function afficherBlagueDuJour() {
  const maintenant = new Date();
  const affichage = document.getElementById('blague-du-jour');

  if (maintenant > FIN_DES_BLAGUES) {
    affichage.textContent = "Les blagues sur les Anglais sont en pause... pour l'instant 😉";
    return;
  }

  // On calcule le numéro du jour dans l'année pour choisir une blague différente chaque jour
  const debutAnnee = new Date(maintenant.getFullYear(), 0, 0);
  const diffEnMillisecondes = maintenant - debutAnnee;
  const jourDeLAnnee = Math.floor(diffEnMillisecondes / (1000 * 60 * 60 * 24));
  const indexBlague = jourDeLAnnee % BLAGUES_ANGLAIS.length;

  affichage.textContent = BLAGUES_ANGLAIS[indexBlague];
}
afficherBlagueDuJour();


/* ---------------------------------------------------
   8. TAMAGOTCHI ESCARGOT 🐌
   Ses stats diminuent doucement avec le temps réel
   écoulé depuis la dernière visite, et se mémorisent
   dans le navigateur (localStorage).
   --------------------------------------------------- */
function chargerEscargot() {
  let donnees = JSON.parse(localStorage.getItem('escargotData') || 'null');
  const maintenant = Date.now();

  if (!donnees) {
    donnees = { faim: 80, bonheur: 80, derniereMaj: maintenant };
  } else {
    const heuresEcoulees = (maintenant - donnees.derniereMaj) / (1000 * 60 * 60);
    donnees.faim = Math.max(0, donnees.faim - heuresEcoulees * 2);
    donnees.bonheur = Math.max(0, donnees.bonheur - heuresEcoulees * 1.5);
    donnees.derniereMaj = maintenant;
  }

  localStorage.setItem('escargotData', JSON.stringify(donnees));
  afficherEscargot(donnees);
}

function afficherEscargot(donnees) {
  document.getElementById('barre-faim').style.width = donnees.faim + '%';
  document.getElementById('barre-bonheur').style.width = donnees.bonheur + '%';

  const visage = document.getElementById('escargot-visage');
  if (donnees.faim < 30 || donnees.bonheur < 30) {
    visage.textContent = '🐌 (un peu triste...)';
  } else if (donnees.faim > 70 && donnees.bonheur > 70) {
    visage.textContent = '🐌 (aux anges !)';
  } else {
    visage.textContent = '🐌';
  }
}

function nourrirEscargot() {
  const donnees = JSON.parse(localStorage.getItem('escargotData'));
  donnees.faim = Math.min(100, donnees.faim + 20);
  donnees.derniereMaj = Date.now();
  localStorage.setItem('escargotData', JSON.stringify(donnees));
  afficherEscargot(donnees);
}

function caresserEscargot() {
  const donnees = JSON.parse(localStorage.getItem('escargotData'));
  donnees.bonheur = Math.min(100, donnees.bonheur + 20);
  donnees.derniereMaj = Date.now();
  localStorage.setItem('escargotData', JSON.stringify(donnees));
  afficherEscargot(donnees);
}

chargerEscargot();
