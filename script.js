const questions = [
    { question: "Alternately ceasing and beginning again. (Adj.)", options: ["A. Intermitent", "B. Intermmitent", "C. Intermittent", "D. Intermmittent"], correct: "C. Intermittent" },
    { question: "Unable to be mixed together. (Adj.)", options: ["A. Incommicible", "B. Incomiscible", "C. Incommissible", "D. Incommiscible"], correct: "D. Incommiscible" },
    { question: "To stain (something, especially one's hands or sword (Verb)", options: ["A. Imbreu", "B. Imbrue", "C. Inbrue", "D. Immbreu"], correct: "B. Imbrue" },
    { question: "Discharge of blood from a ruptured or wounded blood-vessel. (Noun)", options: ["A. Haemorrhage", "B. Hemoarrhage", "C. Haemorhage", "D. Heamorrhage"], correct: "A. Haemorrhage" },
    { question: "The military force stationed in a fort, town, or other place for its defence. (Noun)", options: ["A. Garison", "B. Garisson", "C. Garrisson", "D. Garrison"], correct: "D. Garrison" },
    { question: "Excessive talkativeness in a rambling, roundabout manner. (Adjective)", options: ["A. Garrulous", "B. Garulous", "C. Garruluous", "D. Garullous"], correct: "A. Garrulous" },
    { question: "To execute by strangling; kill (someone) by strangulation, especially with a length of wire or cord. (V./N)", options: ["A. Garrotte", "B. Garottee", "C. Garrottee", "D. Gharrotte"], correct: "A. Garrotte" },
    { question: "A temporary absence of a soldier or sailor by permission of the commanding officer. (Noun)", options: ["A. Forlough", "B. Furlogh", "C. Furlough", "D. Furluogh"], correct: "C. Furlough" },
    { question: "Happening by chance, especially a lucky chance that brings a good result (Adjective)", options: ["A. Furtoitous", "B. Fortuitous", "C. Fotutous", "D. Fortuitus"], correct: "B. Fortuitous" },
    { question: "Protest against official policy ", options: ["A. Dissedence", "B. Dessidence", "C. Dissidence", "D. Desidence"], correct: "C. Dissidence" },
    { question: "To make weak or feeble (Noun)", options: ["A. Debilitate", "B. Dibilitate", "C. Debbilitate", "D. Debillitate"], correct: "A. Debilitate" },
    { question: "One who steers a rowboat, or one who has charge of a ship's boat and its crew under an officer.(Noun)", options: ["A. Cockswain", "B. Coxswaean", "C. Coxswain", "D. Coxwain"], correct: "C. Coxswain" },
    { question: "One of a class of arthropods having crust-like shells, and generally aquatic.(Noun)", options: ["A. Crustacean", "B. Crustecean", "C. Crustacaen", "D. Crustasian"], correct: "A. Crustacean" },
    { question: "A scientist who studies human history by digging up and analyzing human remains and artifacts  (Noun)", options: ["A. Archoelogist", "B. Acheologist", "C. Archeaologist", "D. Archaeologist"], correct: "D. Archaeologist" },
    { question: "Shapeless. (Adjective)", options: ["A. Armophous", "B. Amorphous", "C. Amorphos", "D. Amourphos"], correct: "B. Amorphous" },
    { question: "Debatable or open to disagreement  (Adjective)", options: ["A. Arguable", "B. Argueable", "C. Argguable", "D. Agueable"], correct: "A. Arguable" },
    { question: "Inflammation of the voice box (Noun)", options: ["A. Larryngitis", "B. Laryngitis", "C. Laringitis", "D. Larringytis"], correct: "B. Laryngitis" },
    { question: "To lead astray morally; corrupt; deprave . (Verb)", options: ["A. Debaouch", "B. Debauch", "C. Dibauch", "D. Debuach"], correct: "B. Debauch" },
    { question: "The omission of a word or words necessary for complete grammatical construction but understood in the context. (Noun)", options: ["A. Elipssis", "B. Ellippsis", "C. Elipsis", "D. Ellipsis"], correct: "D. Ellipsis" },
    { question: "The branch of medicine or social science dealing with the health and care of old people. (Noun)", options: ["A. Geriatrics", "B. Garietrics", "C. Gerietrics", "D. Gariatrics"], correct: "A. Geriatrics" },
];

let currentQuestion = 0, score = 0, timer, timeLeft = 25;
let userAnswers = [];

function startTimer() {
    clearInterval(timer);
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time").textContent = timeLeft;
        } else {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    timeLeft = 25;
    startTimer();
    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("options").innerHTML = q.options.map(option =>
        `<button class="option-btn" onclick="selectAnswer('${option}', this)">${option}</button>`
    ).join("");
}

function selectAnswer(selected, button) {
    clearInterval(timer);
    let correctAnswer = questions[currentQuestion].correct;
    userAnswers.push(selected);
    if (selected === correctAnswer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() { 
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `${score} / 20`;

    let answersHTML = questions.map((q, i) => `
        <p><strong>Q${i + 1}:</strong> ${q.question}<br>
        <span class="correct-answer">Correct Answer: ${q.correct}</span><br>
        <span class="user-answer">Your Answer: ${userAnswers[i] || "No answer"}</span></p>
    `).join("");

    document.getElementById("answers").innerHTML = answersHTML;
}

function restartQuiz() { 
    currentQuestion = score = 0, userAnswers = [], document.getElementById("result-container").style.display = "none", document.getElementById("quiz-container").style.display = "block", loadQuestion();
}

loadQuestion();
