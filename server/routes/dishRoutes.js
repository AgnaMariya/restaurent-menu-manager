
const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

// GET: View all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: View one dish
router.get("/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: "Invalid dish ID" });
  }
});

// POST: Add a dish
router.post("/", async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update a dish
router.put("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH: Toggle dish availability
router.patch("/:id/availability", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    dish.available = !dish.available;
    await dish.save();

    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: "Invalid dish ID" });
  }
});

// DELETE: Remove a dish
router.delete("/:id", async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid dish ID" });
  }
});

module.exports = router;
