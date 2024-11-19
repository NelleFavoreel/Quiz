import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const [selectedSort, setSelectedSort] = useState(""); // Voor het kiezen van een categorie
	const [isPlayer, setIsPlayer] = useState(false); // Voor bijhouden of de gebruiker speler is
	const navigate = useNavigate();

	// Functie om de quiz te starten
	const startQuiz = () => {
		if (selectedSort) {
			// Navigeer naar de quizpagina met de geselecteerde vraagsoort als queryparameter
			navigate(`/questions?sort=${selectedSort}`);
		} else {
			alert("Kies een soort vragen!");
		}
	};

	return (
		<div>
			<h1>Welkom bij de Quiz</h1>
			<div>
				<h2>wil je quizmaster of speler zijn?</h2>
				<button onClick={() => setIsPlayer(false)}>Quizmaster</button>
				<button onClick={() => setIsPlayer(true)}>Speler</button>
			</div>

			{/* Toon selectievak en knop alleen als 'Speler' is geselecteerd */}
			{isPlayer && (
				<div>
					<h3>Kies een vraagsoort:</h3>
					<select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
						<option value="">-- Kies een soort --</option>
						<option value="Animal">Animal</option>
						<option value="Science">Science</option>
						<option value="History">History</option>
					</select>
					<button onClick={startQuiz}>Start Quiz</button>
				</div>
			)}
		</div>
	);
}

export default Home;
