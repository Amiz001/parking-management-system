
const Slot = require('../models/slots');

const getAllSlots = async (req, res) => {
  let slots;
  try {
    slots = await Slot.find();
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots", error: error.message });
  }
  //Display all slots
  return res.status(200).json({slots});
};

//data insert
const addSlots = async (req, res, next) => {
  const { slotId, type, status, zone, park, notice } = req.body;
  let slots;
  try {
    slots = new Slot({
      slotId,
      type,
      status,
      zone,
      park,
      notice
    });
    await slots.save();
  }catch (error) {
    console.log(error);
  }
  //not inser slots
  if(!slots){
    return res.status(500).json({message: "Unable to add"});
  }
  return res.status(201).json({slots});

}

//get by id
const getById = async (req, res ,next) => {
  const id = req.params.id;
  let slots;
  try {
    slots = await Slot.findById(id);
  }catch (error) {
    console.log(error);
  }
  //not found
  if(!slots){
    return res.status(404).json({message: "No slots found"});
  }
  return res.status(200).json({slots});
}


//data update
const updateSlot = async (req, res, next) => {
  const id = req.params.id;
  const { slotId, type, status, zone, park, notice } = req.body;
  let slots;
  try {
    slots = await Slot.findByIdAndUpdate(id, 
      { slotId: slotId, type: type, status: status, zone: zone, park: park, notice: notice });
      slots = await slots.save();
  }catch (error) {
    console.log(error);
  }
  //if not updated
  if(!slots){
    return res.status(404).json({message: "Unable to update"});
  }
  return res.status(200).json({slots});
 };


 /// data delete
const deleteSlot = async (req, res, next) => {
  const id = req.params.id;
  let slot;
  try {
    slot = await Slot.findById(id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    //checking the occupied slot stastus
    if (slot.status === "occupied") {
      return res.status(400).json({ message: "Cannot delete slot: currently occupied!" });
    }

    // Delete if the slot is not occupied
    await slot.deleteOne();

    return res.status(200).json({ message: "Slot successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Slot is occupieed, cannot delete" });
  }
};


exports.getAllSlots = getAllSlots;
exports.addSlots = addSlots;
exports.getById = getById;
exports.updateSlot = updateSlot;
exports.deleteSlot = deleteSlot;

