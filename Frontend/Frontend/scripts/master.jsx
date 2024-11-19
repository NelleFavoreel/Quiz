import React, { useState, useEffect } from "react";

function Questions() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		// Fetch questions from the backend
		const fetchQuestions = async () => {
			try {
				const response = await fetch("http://localhost:3000/questions"); // Backend route
				const data = await response.json();
				setQuestions(data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	const handleAnswerClick = (questionId, selectedOption) => {
		// Find the question based on the ID
		const question = questions.find((q) => q._id === questionId);

		// Check if the selected answer is correct
		const isAnswerCorrect = selectedOption === question.correct_answer;

		setSelectedAnswer(selectedOption);
		setIsCorrect(isAnswerCorrect);
	};

	// Handle navigation to the next or previous question
	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null); // Reset selected answer when moving to next question
			setIsCorrect(false); // Reset correctness
		}
	};

	const prevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			setSelectedAnswer(null); // Reset selected answer when going to previous question
			setIsCorrect(false); // Reset correctness
		}
	};

	return (
		<div className="App">
			<h1>Quiz Questions</h1>
			{questions.length > 0 ? (
				<div>
					{/* Show the current question */}
					<div key={questions[currentQuestionIndex]._id}>
						<h3>{questions[currentQuestionIndex].question}</h3>
						<ul>
							{Object.entries(questions[currentQuestionIndex].options[0]).map(([key, value]) => (
								<li key={key}>
									<button onClick={() => handleAnswerClick(questions[currentQuestionIndex]._id, key)} className="answer-button">
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
						<button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
							Previous
						</button>
						<button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
							Next
						</button>
					</div>
				</div>
			) : (
				<p>Loading questions...</p>
			)}
		</div>
	);
}

export default Questions;
