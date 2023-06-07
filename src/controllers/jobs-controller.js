import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  const { size, page } = req.params;
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;

  const data = await Job.find().limit(limit).skip(skip);

  return res.status(200).json(data);
};