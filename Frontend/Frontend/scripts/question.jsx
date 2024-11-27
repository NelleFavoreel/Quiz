import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Questions() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isCorrect, setIsCorrect] = useState(false);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [score, setScore] = useState(0);
	const [quizFinished, setQuizFinished] = useState(false);
	const [topScores, setTopScores] = useState([]);
	const [sort, setSort] = useState("");
	const [playerName, setPlayerName] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const [timer, setTimer] = useState(15);
	const [correctAnswer, setCorrectAnswer] = useState(null);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const sortFilter = queryParams.get("sort");
		const name = queryParams.get("name");

		setSort(sortFilter);
		setPlayerName(name);

		const fetchQuestions = async () => {
			try {
				const response = await fetch(`http://localhost:3000/questions?sort=${sortFilter}`);
				const data = await response.json();
				setQuestions(data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, [location.search]);
	useEffect(() => {
		if (!quizFinished && timer > 0 && !hasAnswered) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval); // Opruimen van het interval
		} else if (timer === 0) {
			goToNextQuestion();
		}
	}, [timer, hasAnswered, quizFinished]);
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Volgende vraag
			resetQuestionState();
			setTimer(15); // Herstart de timer
		} else {
			finishQuiz(); // Eindig de quiz
		}
	};
	const handleAnswerClick = (selectedOption) => {
		if (hasAnswered) return;

		const currentQuestion = questions[currentQuestionIndex];
		const isAnswerCorrect = selectedOption === currentQuestion.correct_answer;

		setSelectedAnswer(selectedOption);
		setIsCorrect(isAnswerCorrect);
		setHasAnswered(true);

		if (isAnswerCorrect) {
			setScore((prevScore) => prevScore + 1);
			console.log("Bijgewerkte score:", score);
		}

		// Ga automatisch naar de volgende vraag na 1 seconde
		setTimeout(() => {
			if (currentQuestionIndex < questions.length - 1) {
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Volgende vraag
				resetQuestionState();
				setTimer(15); // Herstart de timer
			} else {
				finishQuiz(); // Quiz is afgelopen
			}
		}, 1000); // 1 seconde vertraging
	};

	const finishQuiz = async () => {
		console.log("Final score bij afsluiten quiz:", score); // Debugging
		setQuizFinished(true);

		const finalScore = score + 1; // Gebruik de score die we al hebben
		try {
			await fetch("http://localhost:3000/scores", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: playerName,
					sort,
					score: finalScore, // Gebruik de vastgelegde score
				}),
			});

			// Haal de top 5 scores op
			const response = await fetch("http://localhost:3000/scores/top");
			const data = await response.json();
			setTopScores(data);
		} catch (error) {
			console.error("Error saving score or fetching top scores:", error);
		}
	};

	const resetQuestionState = () => {
		setSelectedAnswer(null);
		setIsCorrect(false);
		setHasAnswered(false);
	};

	return (
		<div className="App">
			{quizFinished ? (
				<div className="quiz-finished">
					<div>
						<div>
							<h2>Quiz Voltooid!</h2>
							<p>
								Score: <strong>{score}</strong> / <strong>{questions.length}</strong>
							</p>
						</div>
						<div>
							<h3>Top 5 beste:</h3>
							<ol className="pointsEnd">
								{topScores.map((entry, index) => (
									<li key={index}>
										{entry.name} - {entry.score} punten
									</li>
								))}
							</ol>
						</div>
					</div>
					<button className="home-button1" onClick={() => navigate("/")}>
						Terug naar Home
					</button>
				</div>
			) : (
				<>
					<h1 className="titelHead">{sort} Quiz</h1>
					<div className="card-player">
						<h2>Speler: {playerName}</h2>
						<h2>Score: {score}</h2>
					</div>
					<div className="timer">
						<h3
							style={{
								color: timer <= 5 ? "red" : "white",
								fontWeight: "bold",
							}}
						>
							Tijd over: {timer} seconden
						</h3>
					</div>
					<div className="progress-bar">
						<div
							className="progress"
							style={{
								width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
							}}
						></div>
					</div>
					{questions.length > 0 ? (
						<div>
							<div className="questions">
								<h3>{questions[currentQuestionIndex]?.question}</h3>
								<ul>
									{Object.entries(questions[currentQuestionIndex]?.options[0] || {}).map(([key, value]) => (
										<li key={key}>
											<button
												className={`answer-button 
                    ${hasAnswered && key === questions[currentQuestionIndex]?.correct_answer ? "correct-answer" : ""} 
                    ${hasAnswered && key === selectedAnswer && key !== questions[currentQuestionIndex]?.correct_answer ? "wrong-answer" : ""}`}
												onClick={() => handleAnswerClick(key)}
												disabled={hasAnswered}
											>
												<strong>{key.toUpperCase()}:</strong> {value}
											</button>
										</li>
									))}
								</ul>
							</div>
							<div className="feedback">
								<p
									style={{
										color: isCorrect ? "green" : "red",
										fontWeight: "bold",
										visibility: selectedAnswer ? "visible" : "hidden",
										height: "20px",
									}}
								>
									{isCorrect ? "Correct!" : "Incorrect!"}
								</p>
							</div>
						</div>
					) : (
						<p>Loading questions...</p>
					)}
				</>
			)}
		</div>
	);
}

export default Questions;
