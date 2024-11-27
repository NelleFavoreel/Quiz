import React, { useState } from "react";
import "../css/QuizMaster.css"; // CSS-bestand voor styling
import { useNavigate, useLocation } from "react-router-dom";

function QuizMaster() {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [sort, setSort] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validatie van correctAnswer
		if (!["a", "b", "c", "d"].includes(correctAnswer.toLowerCase())) {
			setMessage("Het correcte antwoord moet a, b, c of d zijn.");
			return;
		}

		// Maak een options object met de juiste waarden
		const formattedOptions = {
			a: options.a.trim(),
			b: options.b.trim(),
			c: options.c.trim(),
			d: options.d.trim(),
		};

		// Valideer of alle opties zijn ingevuld
		if (!formattedOptions.a || !formattedOptions.b || !formattedOptions.c || !formattedOptions.d) {
			setMessage("Vul alle opties in.");
			return;
		}

		const newQuestion = {
			question,
			options: formattedOptions,
			correct_answer: correctAnswer.toLowerCase(),
			sort,
		};

		setLoading(true); // Start de loader
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
		} finally {
			setLoading(false); // Stop de loader
		}
	};

	return (
		<div className="quiz-master">
			<h1>Quizmaster - Voeg een Vraag toe</h1>
			{message && <p className={`message ${message.includes("Fout") ? "error" : "success"}`}>{message}</p>}
			<form onSubmit={handleSubmit} className="quiz-master-form">
				<div className="form-group">
					<label>Vraag:</label>
					<textarea value={question} onChange={(e) => setQuestion(e.target.value)} required rows="4" placeholder="Voer de quizvraag hier in..." className="large-input"></textarea>
				</div>
				<div className="form-group">
					<label>Optie A:</label>
					<input type="text" value={options.a} onChange={(e) => setOptions({ ...options, a: e.target.value })} required placeholder="Antwoordoptie A" />
				</div>
				<div className="form-group">
					<label>Optie B:</label>
					<input type="text" value={options.b} onChange={(e) => setOptions({ ...options, b: e.target.value })} required placeholder="Antwoordoptie B" />
				</div>
				<div className="form-group">
					<label>Optie C:</label>
					<input type="text" value={options.c} onChange={(e) => setOptions({ ...options, c: e.target.value })} required placeholder="Antwoordoptie C" />
				</div>
				<div className="form-group">
					<label>Optie D:</label>
					<input type="text" value={options.d} onChange={(e) => setOptions({ ...options, d: e.target.value })} required placeholder="Antwoordoptie D" />
				</div>
				<div className="form-group">
					<label>Correct Antwoord (a, b, c, d):</label>
					<input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required placeholder="a, b, c of d" />
				</div>
				<div className="form-group">
					<label>Categorie:</label>
					<select value={sort} onChange={(e) => setSort(e.target.value)} required className="dropdown">
						<option value="">-- Kies een categorie --</option>
						<option value="History">Geschiedenis</option>
						<option value="Science">Wetenschap</option>
						<option value="Animal">Dieren</option>
					</select>
				</div>
				<button type="submit" disabled={loading} className="submit-button">
					{loading ? "Toevoegen..." : "Vraag Toevoegen"}
				</button>
			</form>
			<button className="home-button" onClick={() => navigate("/")}>
				Terug naar Home
			</button>
		</div>
	);
}

export default QuizMaster;
