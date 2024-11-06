import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbConfig";
import PlantModel from "./schemas/plantsSchema";
import cors from "cors";

dotenv.config();

// Conectare la MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://green-bay-012cb1c03.5.azurestaticapps.net",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.patch("/plants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    const plant = await PlantModel.findByIdAndUpdate(
      id,
      { default_imageUrl: imageUrl },
      { new: true }
    );
    if (plant) {
      res.status(200).send(plant);
    } else {
      res.status(404).send("Plant not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating plant", error });
  }
});

app.post("/plants", async (req, res) => {
  try {
    const newPlant = req.body;
    if (!newPlant) res.status(400).send("Bad content");

    const plant = await PlantModel.create(newPlant);
    res.json(plant)
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
})

app.get("/plants", async (req, res) => {
  try {
    const { common_name, scientific_name } = req.query;
    const filter: any = {};
    if (common_name) {
      filter.common_name = new RegExp(common_name as string, "i");
    }

    if (scientific_name) {
      filter.scientific_name = new RegExp(scientific_name as string, "i");
    }

    const plants = await PlantModel.find(filter).limit(50);

    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:3000/plants`);
});
