(function () {
  const { candidates, questions } = QUIZ_DATA;
  const candidateKeys = Object.keys(candidates);
  const answers = new Array(questions.length).fill(null);
  let currentIndex = 0;
  let advancing = false;

  const screens = {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result")
  };

  const optionsBox = document.getElementById("options");
  const progressBar = document.getElementById("progress-bar");
  const progressTrack = document.getElementById("progress");
  const backButton = document.getElementById("btn-back");

  // Pontuação máxima que cada candidato pode alcançar em cada pergunta,
  // usada para transformar os pontos em percentual de afinidade.
  const maxScores = candidateKeys.reduce((acc, key) => {
    acc[key] = questions.reduce((sum, question) => {
      const best = Math.max(
        0,
        ...question.options.map((option) => toWeight(option.weights, key))
      );
      return sum + best;
    }, 0);
    return acc;
  }, {});

  function toWeight(weights, key) {
    if (!weights) return 0;
    const value = Number(weights[key]);
    return Number.isFinite(value) ? value : 0;
  }

  function showScreen(name) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("active", key === name);
    });
  }

  function answeredCount() {
    return answers.filter((answer) => answer !== null).length;
  }

  function renderQuestion() {
    const question = questions[currentIndex];

    document.getElementById("counter").textContent =
      "Pergunta " + (currentIndex + 1) + " de " + questions.length;
    document.getElementById("question-text").textContent = question.text;

    const percent = Math.round((answeredCount() / questions.length) * 100);
    progressBar.style.width = percent + "%";
    progressTrack.setAttribute("aria-valuenow", String(percent));

    optionsBox.innerHTML = "";
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = option.text;
      if (answers[currentIndex] === optionIndex) {
        button.classList.add("selected");
      }
      button.addEventListener("click", () => selectOption(optionIndex));
      optionsBox.appendChild(button);
    });

    backButton.disabled = currentIndex === 0;
  }

  function selectOption(optionIndex) {
    answers[currentIndex] = optionIndex;

    Array.from(optionsBox.children).forEach((button, index) => {
      button.classList.toggle("selected", index === optionIndex);
    });

    if (advancing) return;
    advancing = true;
    window.setTimeout(() => {
      advancing = false;
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
      } else {
        showResult();
      }
    }, 260);
  }

  function computePercentages() {
    const scores = candidateKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    answers.forEach((answer, questionIndex) => {
      if (answer === null) return;
      const weights = questions[questionIndex].options[answer].weights;
      candidateKeys.forEach((key) => {
        scores[key] += toWeight(weights, key);
      });
    });

    return candidateKeys.reduce((acc, key) => {
      const max = maxScores[key];
      acc[key] = max > 0 ? Math.round((scores[key] / max) * 100) : 0;
      return acc;
    }, {});
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showResult() {
    const percentages = computePercentages();
    const ranked = candidateKeys
      .slice()
      .sort((a, b) => percentages[b] - percentages[a]);
    const [leader, runnerUp] = ranked;
    const isTie = percentages[leader] === percentages[runnerUp];

    document.getElementById("result-title").textContent = isTie
      ? "Seu perfil ficou dividido entre os dois"
      : "Seu perfil é mais próximo de " + candidates[leader].name;

    document.getElementById("result-message").textContent = isTie
      ? "As respostas deram o mesmo grau de afinidade para os dois candidatos."
      : "Você tem " + percentages[leader] + "% de afinidade com " +
        candidates[leader].name + " e " + percentages[runnerUp] + "% com " +
        candidates[runnerUp].name + ".";

    const scoresBox = document.getElementById("scores");
    scoresBox.innerHTML = "";
    ranked.forEach((key) => {
      const color = candidates[key].color || "#6c8cff";
      const row = document.createElement("div");
      row.className = "score";
      row.innerHTML =
        '<div class="score-head">' +
          '<span class="score-name">' + escapeHtml(candidates[key].name) + "</span>" +
          '<span class="score-value">' + percentages[key] + "%</span>" +
        "</div>" +
        '<div class="score-track">' +
          '<div class="score-fill" style="background:' + color + '"></div>' +
        "</div>";
      scoresBox.appendChild(row);

      const fill = row.querySelector(".score-fill");
      window.requestAnimationFrame(() => {
        fill.style.width = percentages[key] + "%";
      });
    });

    showScreen("result");
  }

  function startQuiz() {
    answers.fill(null);
    currentIndex = 0;
    renderQuestion();
    showScreen("quiz");
  }

  document.getElementById("start-meta").textContent =
    questions.length + " perguntas rápidas";
  document.getElementById("btn-start").addEventListener("click", startQuiz);
  document.getElementById("btn-restart").addEventListener("click", startQuiz);
  backButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  });
})();
