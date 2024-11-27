import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Master from "./pages/master.jsx";
import Player from "./pages/player.jsx";
import Questions from "../scripts/question.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/quizmaster" element={<Master />} />
				<Route path="/player" element={<Player />} />
				<Route path="/Questions" element={<Questions />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
