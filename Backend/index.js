const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

//database linking
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://nellefavoreel:eKVVoazRlRrQYtxL@web2.gaz0k0d.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} catch (err) {
		console.error("error connecting to mongoDB", err);
	}
}
run().catch(console.dir);

app.get("/questions", async (req, res) => {
	try {
		const database = client.db("Quiz");
		const Questions = database.collection("Questions");

		const { sort } = req.query;

		let filter = {};
		if (sort) {
			filter = { sort: sort };
		}

		// Log de ontvangen payload voor debugging
		console.log("Ontvangen query parameters:", req.query);

		// Haal de vragen op uit de database
		const questions = await Questions.find(filter).toArray();

		// Zorg ervoor dat je de response pas stuurt na het ophalen van de gegevens
		res.json(questions); // Deze regel stuurt de data pas terug als de query is uitgevoerd
	} catch (err) {
		console.error("Error fetching questions from MongoDB:", err);
		res.status(500).json({ error: "Er is een fout opgetreden bij het ophalen van de vragen" });
	}
});

app.post("/questions", async (req, res) => {
	try {
		const { question, options, correct_answer, sort } = req.body;

		// Zorg ervoor dat alle velden aanwezig zijn
		if (!question || !options || !correct_answer || !sort) {
			return res.status(400).send({ message: "Alle velden zijn verplicht!" });
		}

		// Het juiste formaat voor de opties
		const formattedOptions = {
			a: options.a,
			b: options.b,
			c: options.c,
			d: options.d,
		};

		// Sla de nieuwe vraag op in de database
		const database = client.db("Quiz");
		const questionsCollection = database.collection("Questions");

		// Insert de nieuwe vraag als document
		const result = await questionsCollection.insertOne({
			question,
			options: formattedOptions,
			correct_answer,
			sort,
		});

		// Gebruik het insertedId om de toegevoegde vraag op te halen
		res.status(201).send({
			message: "Vraag succesvol toegevoegd!",
			question: {
				_id: result.insertedId,
				question,
				options: formattedOptions,
				correct_answer,
				sort,
			},
		});
	} catch (error) {
		console.error("Fout bij het toevoegen van de vraag:", error);
		res.status(500).send({ message: "Fout bij het toevoegen van de vraag", error });
	}
});

app.post("/scores", async (req, res) => {
	const { name, sort, score } = req.body;
	try {
		const database = client.db("Quiz");
		const scoresCollection = database.collection("scores");
		console.log("ontvangen score:", score, "voor speler:", name);

		// Sla de score op in de 'scores' collectie
		await scoresCollection.insertOne({ name, sort, score, date: new Date() });
		res.status(200).send("Score saved!");
	} catch (err) {
		console.error("Error saving score:", err);
		res.status(500).send("Error saving score.");
	}
});

app.get("/scores/top", async (req, res) => {
	try {
		const database = client.db("Quiz");
		const scoresCollection = database.collection("scores");

		// Haal de top 5 scores op, gesorteerd van hoog naar laag
		const topScores = await scoresCollection
			.find() // Haal alle scores op
			.sort({ score: -1 }) // Sorteer op score in aflopende volgorde
			.limit(5) // Beperk de resultaten tot de top 5
			.toArray();

		res.status(200).json(topScores);
	} catch (err) {
		console.error("Error fetching top scores:", err);
		res.status(500).send("Error fetching top scores.");
	}
});
