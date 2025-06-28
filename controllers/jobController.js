const express = require("express");
const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const data = req.body;
    const newJob = new Job(data);
    const response = await newJob.save();

    console.log("Data save Successfulllt");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createJob };
