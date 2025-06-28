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

// create get method to get job

const getJob = async (req,res)=>{
    try {
        const data = await Job.find();
        console.log("Data fetch succesfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server error"});
    }
}

module.exports = { createJob , getJob};
