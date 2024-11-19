const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

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

// Review showing
app.get("/questions", async (req, res) => {
	try {
		const database = client.db("Quiz");
		const Questions = database.collection("Questions");

		const review = await Questions.find({}).toArray();
		res.json(review);
	} catch (err) {
		console.error("error inserting in mongoDB", err);
		return res.status(500).json({ error: "nee toch niet" });
	}
});
