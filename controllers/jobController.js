const express = require("express");
const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
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
};

// create  PUT method to Update jobs

const updateJob =async (req, res)=>{
    try {
        const jobId = req.params.id;
        const updateData = req.body;
        const response =  await Job.findByIdAndUpdate(jobId, updateData, {
            new : true,
            runValidators : true
        });

        if(!response){
            return res.status(400).json({message : "Job NOT found"});
        };
        console.log("Job Update Successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Internal Server Err" });
    }
}

module.exports = { createJob , getJob};
