const { Donner } = require("../model/user");
const { getObjectID } = require("../module/myMongoose/myMongoose");
const { convertToJSON } = require("../utils/jsonUtils");
const jwt = require("jsonwebtoken");

const getDoner = async (req, res) => {
  try {
    const data = await Donner.find({});
    res.send({ data });
  } catch (error) {
    console.error("Error:", error);
  }
};
const addDoner = async (req, res) => {
  const parseData = convertToJSON(req.body);
  const data = parseData;
  await Donner.insertOne(data);
  res.send({ message: "Data received successfully", data });
};

const updateDoner = async (req, res) => {
  // const itemId = req.params.id;
  const updatedData = convertToJSON(req.body);
  const { id, ...rest } = updatedData;
  // Perform update logic using itemId and updatedData
  const data = await Donner.updateOne({ _id: id }, rest);
  res.send({
    messag: `Data with ID updated successfully`,
    data,
  });
};
const deleteDoner = async (req, res) => {
  const updatedData = convertToJSON(req.body);

  const doner = await Donner.findOne({ _id: getObjectID(updatedData.id) });
  if (!doner) {
    return res.send({ message: "Doner Not Found" });
  }
  if (doner.postedBy === updatedData.deletedBy) {
    await Donner.deleteOne({ _id: updatedData.id });
  } else {
    return res.send({ message: "You are Not Authorized To Delete" });
  }
  res.send({ doner, message: "Delete data successfully" });
};
module.exports = { addDoner, deleteDoner, getDoner,updateDoner };
