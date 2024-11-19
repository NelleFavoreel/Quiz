import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importeer useNavigate voor navigatie

function Questions() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
	const [selectedAnswer, setSelectedAnswer] = useState(null); // Keep track of the selected answer
	const [isCorrect, setIsCorrect] = useState(false); // Whether the selected answer is correct
	const [hasAnswered, setHasAnswered] = useState(false); // Prevent multiple answers
	const [score, setScore] = useState(0); // Keep track of the score
	const [quizFinished, setQuizFinished] = useState(false); // To track if quiz is finished
	const location = useLocation(); // To read the query parameters
	const navigate = useNavigate(); // Navigeren naar andere pagina's

	// Fetch questions from the server when the component is mounted or filter changes
	useEffect(() => {
		const fetchQuestions = async () => {
			const queryParams = new URLSearchParams(location.search);
			const sortFilter = queryParams.get("sort"); // Get the filter from the URL

			try {
				const response = await fetch(`http://localhost:3000/questions?sort=${sortFilter}`); // Pass the sort parameter
				const data = await response.json();
				setQuestions(data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, [location.search]); // Run again when location.search (filter) changes

	// Handle when an answer is clicked
	const handleAnswerClick = (selectedOption) => {
		if (hasAnswered) return; // Prevent answering again

		const currentQuestion = questions[currentQuestionIndex];

		// Check if the selected answer is correct
		const isAnswerCorrect = selectedOption === currentQuestion.correct_answer;

		setSelectedAnswer(selectedOption);
		setIsCorrect(isAnswerCorrect);
		setHasAnswered(true); // Mark question as answered

		// Update the score if correct
		if (isAnswerCorrect) {
			setScore((prevScore) => prevScore + 1);
		}
	};

	// Move to the next question
	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			resetQuestionState();
		} else {
			setQuizFinished(true); // End the quiz when last question is reached
			// Optional: Add a delay before navigating
			setTimeout(() => {
				navigate("/"); // Navigate back to the home page after 2 seconds
			}, 2000); // 2 seconds delay
		}
	};

	// Reset the question state for the next question
	const resetQuestionState = () => {
		setSelectedAnswer(null); // Reset selected answer
		setIsCorrect(false); // Reset correctness
		setHasAnswered(false); // Allow answering the next question
	};

	return (
		<div className="App">
			<h1>Quiz Questions</h1>
			{quizFinished ? (
				<div>
					<h2>Quiz Finished!</h2>
					<p>
						Your final score is: {score} out of {questions.length}
					</p>
					<button onClick={() => navigate("/")}>Go to Home</button> {/* Navigatieknop naar de homepagina */}
				</div>
			) : (
				<>
					<h2>Score: {score}</h2> {/* Display the score */}
					{questions.length > 0 ? (
						<div>
							{/* Show the current question */}
							<div key={questions[currentQuestionIndex]._id}>
								<h3>{questions[currentQuestionIndex].question}</h3>
								<ul>
									{Object.entries(questions[currentQuestionIndex].options[0]).map(([key, value]) => (
										<li key={key}>
											<button
												onClick={() => handleAnswerClick(key)}
												className="answer-button"
												disabled={hasAnswered} // Disable button if already answered
											>
												<strong>{key.toUpperCase()}:</strong> {value}
											</button>
										</li>
									))}
								</ul>

								{/* Show "Correct" or "Incorrect" message */}
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
							</div>

							{/* Navigation buttons */}
							<div>
								<button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
									Next
								</button>
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
