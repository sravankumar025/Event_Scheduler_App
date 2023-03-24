const router = require("express").Router();
const Event = require("../models/eventSchema");

router.get("/event", async (req, res) => {
  try {
    const data = await Event.find();
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    res.json({
      status: "Failed",
      message: "e.message",
    });
  }
});

router.get("/event/:id", async (req, res) => {
  const data = await Event.findOne({ _id: req.params.id });
  if (data == null) {
    res.status(404).json({
      status: "Failed",
      error: "there is no event with this id",
    });
  } else {
    res.status(201).json({
      status: "success",
      data,
    });
  }
});

router.post("/event", async (req, res) => {
  try {
    const data = await Event.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    res.status(400).json({
      error: "Validation error, All fields are mandatory",
    });
  }
});

router.put("/event/:id", async (req, res) => {
  const [topic, description, location] = [
    req.body.topic,
    req.body.description,
    req.body.location,
  ];
  if (topic != "" && description != "" && location != "") {
    await Event.updateOne({ _id: req.params.id }, req.body);
    const data = await Event.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data,
    });
  }else{
    res.status(400).json({
        error: "Validation error, All fields are mandatory",
      });
  }
});

router.delete("/event/:id", async (req, res) => {
  try {
    const data = await Event.deleteOne({ _id: req.params.id });
    res.status(204).json({
      status: "delted",
      data,
    });
  } catch (e) {
    res.json({
      status: "No event with this id to delete",
      message: e.message,
    });
  }
});
module.exports = router;
