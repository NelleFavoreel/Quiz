import React, { useState } from "react";

function QuizMaster() {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [sort, setSort] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newQuestion = {
			question,
			options: [options],
			correct_answer: correctAnswer,
			sort,
		};

		try {
			const response = await fetch("http://localhost:3000/questions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newQuestion),
			});

			if (response.ok) {
				setMessage("Vraag succesvol toegevoegd!");
				setQuestion("");
				setOptions({ a: "", b: "", c: "", d: "" });
				setCorrectAnswer("");
				setSort("");
			} else {
				setMessage("Er is een fout opgetreden bij het toevoegen van de vraag.");
			}
		} catch (error) {
			setMessage("Fout: Kan de vraag niet opslaan.");
		}
	};

	return (
		<div className="quiz-master">
			<h1>Quizmaster - Voeg een Vraag toe</h1>
			{message && <p>{message}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Vraag:
					<input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
				</label>
				<label>
					Optie A:
					<input type="text" value={options.a} onChange={(e) => setOptions({ ...options, a: e.target.value })} required />
				</label>
				<label>
					Optie B:
					<input type="text" value={options.b} onChange={(e) => setOptions({ ...options, b: e.target.value })} required />
				</label>
				<label>
					Optie C:
					<input type="text" value={options.c} onChange={(e) => setOptions({ ...options, c: e.target.value })} required />
				</label>
				<label>
					Optie D:
					<input type="text" value={options.d} onChange={(e) => setOptions({ ...options, d: e.target.value })} required />
				</label>
				<label>
					Correct Antwoord (a, b, c, d):
					<input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />
				</label>
				<label>
					Categorie:
					<input type="text" value={sort} onChange={(e) => setSort(e.target.value)} required />
				</label>
				<button type="submit">Vraag Toevoegen</button>
			</form>
		</div>
	);
}

export default QuizMaster;
