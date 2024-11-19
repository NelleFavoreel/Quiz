import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Welkom bij de quiz!</h1>
			<Link to="master">
				<button>Quizmaster</button>
			</Link>
			<Link to="player">
				<button>Speler</button>
			</Link>
		</div>
	);
}

export default Home;
