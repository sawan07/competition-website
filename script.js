let competitorData = [];
let currentChallenge = 0; // Initialize competitorData

function submitFinalAnswer() {
    const enterpriseId = document.getElementById('enterpriseId').value;
    const questionNumber = currentChallenge + 1; // Adjust for zero-based index
    const userAnswer = document.getElementById('answerInput').value;
    console.log("Enterprise ID:", enterpriseId);
    console.log("User Answer:", userAnswer);
    if (userAnswer === challenges[currentChallenge].answer) {
        alert('Correct answer!');
        competitorData.push({
            enterpriseId: enterpriseId,
            questionNumber: questionNumber,
            timeTaken: 120 * 60 - timeLeft // Assuming this is the time taken in seconds
        });
        currentChallenge++;
        if (currentChallenge < challenges.length) {
            loadChallenge();
        } else {
            document.getElementById('congratulations').style.display = 'block';
        }
    } else {
        alert('Incorrect answer, try again!');
    }
}
let challenges = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the capital of Germany?', answer: 'Berlin' }
];
let timeLeft = 120 * 60; // 2 hours in seconds

function startTimer() {
    const password = prompt('Enter password to start the timer:');
if (password !== '112233') {
    alert('Incorrect password!');
    return;
}
const timerElement = document.getElementById('time');
timerElement.textContent = '120:00'; // Update the timer display immediately

    document.getElementById('endTimerButton').style.display = 'block'; // Show the button
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            alert('Time is up!');
            generateCSV();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function showInputFields(answerIndex) {
    document.getElementById('inputFields').style.display = 'block';
    const submitButtons = document.querySelectorAll('button[onclick^="showInputFields"]');
    submitButtons.forEach(button => button.disabled = true); // Disable all submit answer buttons
}

function loadChallenge() {
    const challengeElement = document.getElementById('challengeQuestion');
    if (currentChallenge < challenges.length) {
        challengeElement.textContent = challenges[currentChallenge].question; // Display only the question
    } else {
        challengeElement.textContent = 'No more challenges';
    }
}

function generateCSV() {
    const csvContent = 'data:text/csv;charset=utf-8,' +
        competitorData.map(e => `${e.enterpriseId},${e.questionNumber},${(e.timeTaken / 60).toFixed(2)}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'competitor_data.csv');
    document.body.appendChild(link);
    link.click(); // Automatically click the link to trigger download
    document.body.removeChild(link); // Clean up
}

function endTimerAndGenerateCSV() {
    const passcode = prompt("Please enter the passcode to end the timer and generate the CSV:");
    if (passcode === "112233") {
        timeLeft = 0; // End the timer
        generateCSV(); // Generate the CSV file
        alert("Timer ended and CSV generated!");
    } else {
        alert("Incorrect passcode. Please try again.");
    }
}

window.onload = () => {
    loadChallenge();
};
