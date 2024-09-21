const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  externalId: { type: Number, required: true },
  indoor: { type: Boolean, required: true },
  common_name: { type: String, required: true },
  scientific_name: { type: String, required: true },
  origin: { type: [String], required: false },
  type: { type: String, required: false },
  dimension: { type: String, required: true },
  watering: { type: String, required: true },
  sunlight: { type: [String], required: true },
  seeds: { type: Number, required: false },
  maintenance: { type: String, default: null },
  care_guides: { type: String, required: false },
  growth_rate: { type: String, required: false },
  salt_tolerant: { type: Boolean, required: false },
  invasive: { type: Boolean, required: true },
  tropical: { type: Boolean, required: false },
  care_level: { type: String, required: true },
  flowers: { type: Boolean, required: false },
  flower_color: { type: String, required: false },
  fruits: { type: Boolean, required: false },
  fruit_nutritional_value: { type: String, required: false },
  fruit_color: { type: [String], required: false },
  harvest_season: { type: String, default: false },
  cuisine: { type: Boolean, required: false },
  medicinal: { type: Boolean, required: false },
  poisonous_to_pets: { type: Number, required: false },
  description: { type: String, required: false },
  default_imageUrl: { type: String, required: true },
});

const PlantModel = mongoose.model("plants", plantSchema);

export default PlantModel;
