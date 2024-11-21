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
	const [topScores, setTopScores] = useState([]); // Nieuw: om de top 5 scores weer te geven
	const [sort, setSort] = useState("");
	const [playerName, setPlayerName] = useState(""); // Nieuw: naam van de speler
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const sortFilter = queryParams.get("sort");
		const name = queryParams.get("name"); // Haal naam op uit de URL

		setSort(sortFilter);
		setPlayerName(name); // Sla de naam op in de state

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

	const handleAnswerClick = (selectedOption) => {
		if (hasAnswered) return;

		const currentQuestion = questions[currentQuestionIndex];
		const isAnswerCorrect = selectedOption === currentQuestion.correct_answer;

		setSelectedAnswer(selectedOption);
		setIsCorrect(isAnswerCorrect);
		setHasAnswered(true);

		if (isAnswerCorrect) {
			setScore((prevScore) => prevScore + 1);
		}
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			resetQuestionState();
		} else {
			finishQuiz(); // Eindig de quiz
		}
	};

	const finishQuiz = async () => {
		setQuizFinished(true);

		try {
			// Stuur de score naar de database
			await fetch("http://localhost:3000/scores", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: playerName,
					sort,
					score,
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
							<h3>Top 5 in categorie {sort}:</h3>
							<ol className="pointsEnd">
								{topScores.map((entry, index) => (
									<li key={index}>
										{entry.name} - {entry.score} punten
									</li>
								))}
							</ol>
						</div>
					</div>
					<button className="home-button" onClick={() => navigate("/")}>
						Terug naar Home
					</button>
				</div>
			) : (
				<>
					<h1>{sort} Quiz</h1>
					<h2>Speler: {playerName}</h2>
					<h2>Score: {score}</h2>
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
							<h3>{questions[currentQuestionIndex].question}</h3>
							<ul>
								{Object.entries(questions[currentQuestionIndex].options[0]).map(([key, value]) => (
									<li key={key}>
										<button className="answer-button" onClick={() => handleAnswerClick(key)} disabled={hasAnswered}>
											<strong>{key.toUpperCase()}:</strong> {value}
										</button>
									</li>
								))}
							</ul>
							{selectedAnswer && (
								<p
									style={{
										color: isCorrect ? "green" : "red",
										fontWeight: "bold",
										marginTop: "10px",
									}}
								>
									{isCorrect ? "Correct!" : "Incorrect!"}
								</p>
							)}
							<button className="nextButton" onClick={nextQuestion} disabled={!hasAnswered}>
								{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
							</button>
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
