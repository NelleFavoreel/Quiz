import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const [selectedSort, setSelectedSort] = useState(""); // Voor het kiezen van een categorie
	const [isPlayer, setIsPlayer] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const navigate = useNavigate();

	// Functie om de quiz te starten
	const startQuiz = () => {
		if (!playerName) {
			alert("Voer je naam in!");

			return;
		}

		if (selectedSort) {
			navigate(`/questions?sort=${selectedSort}&name=${playerName}`);
		} else {
			alert("Kies een soort vragen!");
		}
	};

	return (
		<div className="home-container">
			<h1 className="home-title">Welkom bij de Quiz</h1>
			<div className="role-selection">
				<h2 className="home-subtitle">Wil je quizmaster of speler zijn?</h2>
				<div className="button-group">
					<button className="role-button" onClick={() => setIsPlayer(false)}>
						Quizmaster
					</button>
					<button className="role-button" onClick={() => setIsPlayer(true)}>
						Speler
					</button>
				</div>
			</div>

			{/* Toon selectievak en knop alleen als 'Speler' is geselecteerd */}
			{isPlayer && (
				<div className="card">
					<h3>Vul je naam in:</h3>
					<input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Je naam" />
					<h3 className="card-title">Kies een vraagsoort:</h3>
					<select className="dropdown" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
						<option value="">-- Kies een soort --</option>
						<option value="Animal">Dieren</option>
						<option value="Science">Fysica</option>
						<option value="History">Geschiedenis</option>
					</select>
					<button className="start-button" onClick={startQuiz}>
						Start Quiz
					</button>
				</div>
			)}
		</div>
	);
}

export default Home;
