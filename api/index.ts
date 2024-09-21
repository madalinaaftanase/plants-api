import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbConfig";
import PlantModel from "./schemas/plantsSchema";

dotenv.config();

// Conectare la MongoDB
connectDB();

const app = express();
app.use(express.json());

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

    const plants = await PlantModel.find(filter);

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
