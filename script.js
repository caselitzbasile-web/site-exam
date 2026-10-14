"use strict";

// ANALYSEUR D’URL
// Aucun appel réseau : on décompose seulement le texte saisi.

const urlForm = document.querySelector("#url-form");
const urlInput = document.querySelector("#url-input");
const urlMessage = document.querySelector("#url-message");
const urlResult = document.querySelector("#url-result");

urlForm.addEventListener("submit", (event) => {
  event.preventDefault();

  urlResult.replaceChildren();
  urlMessage.textContent = "";

  try {
    const address = new URL(urlInput.value.trim());

    // Cet atelier est consacré aux adresses de sites web.
    if (!["http:", "https:"].includes(address.protocol)) {
      throw new Error("Protocole non pris en charge");
    }

    const parts = [
      ["Protocole", address.protocol.replace(":", "")],
      ["Nom d’hôte", address.hostname],
      ["Port explicite", address.port || "Aucun port non standard indiqué"],
      ["Chemin", address.pathname],
      ["Paramètres", address.search || "Aucun"],
      ["Fragment", address.hash || "Aucun"],
    ];

    for (const [name, value] of parts) {
      const term = document.createElement("dt");
      const description = document.createElement("dd");

      term.textContent = name;
      description.textContent = value;

      urlResult.append(term, description);
    }

    urlMessage.textContent =
      "Adresse décomposée. Cela ne vérifie ni l’existence ni la fiabilité du site.";
  } catch {
    urlMessage.textContent =
      "Entre une URL complète commençant par https:// ou http://, " +
      "par exemple https://example.org/cours.";
  }
});

// QUIZ
const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");

const corrections = [
  {
    name: "q1",
    answer: "0",
    explanation: "Tim Berners-Lee a inventé le Web au CERN en 1989.",
  },
  {
    name: "q2",
    answer: "1",
    explanation:
      "Le fragment #quiz peut identifier une partie de la page. " +
      "Il n’est pas envoyé au serveur dans la requête HTTP.",
  },
  {
    name: "q3",
    answer: "2",
    explanation:
      "Le DNS permet notamment de retrouver les adresses IP " +
      "associées à un nom de domaine.",
  },
  {
    name: "q4",
    answer: "0",
    explanation:
      "CSS définit principalement la présentation. " +
      "HTML structure le contenu et JavaScript permet des interactions.",
  },
  {
    name: "q5",
    answer: "1",
    explanation:
      "HTTPS protège la connexion, mais un site frauduleux " +
      "peut aussi utiliser HTTPS.",
  },
];

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = new FormData(quizForm);
  let score = 0;
  const list = document.createElement("ol");

  for (const correction of corrections) {
    const correct = answers.get(correction.name) === correction.answer;

    if (correct) {
      score += 1;
    }

    const item = document.createElement("li");
    const verdict = document.createElement("strong");

    verdict.textContent = correct ? "Bonne réponse. " : "À revoir. ";

    item.append(verdict, document.createTextNode(correction.explanation));
    list.append(item);
  }

  const title = document.createElement("h3");
  title.textContent = `Ton résultat : ${score} / ${corrections.length}`;

  const message = document.createElement("p");

  if (score === corrections.length) {
    message.textContent = "Bravo, tu as retenu les notions essentielles !";
  } else if (score >= 3) {
    message.textContent =
      "Bien joué ! Les explications ci-dessous t’aideront à progresser.";
  } else {
    message.textContent =
      "Relis les rubriques, puis retente le quiz à ton rythme.";
  }

  quizResult.replaceChildren(title, message, list);
});

quizForm.addEventListener("reset", () => {
  quizResult.replaceChildren();
});
