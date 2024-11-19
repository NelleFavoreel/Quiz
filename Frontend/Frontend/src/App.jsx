import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/master";
import Player from "./pages/player";

function App() {
	return (
		// BrowserRouter omgeeft de Routes component
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					{/* Specifieke routes voor Quizmaster en Speler */}
					<Route path="master" element={<Master />} />
					<Route path="player" element={<Player />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
