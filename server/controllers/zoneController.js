const Zone = require('../models/zones');

// get next available zone letter
const getNextZoneLetter = (existingZones, prefix) => {
  const letters = existingZones
    .map(z => z.zoneId.replace(prefix, ''))
    .filter(l => l.match(/^[A-Z]$/))
    .sort();

  let nextCharCode = 65; // 'A'
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].charCodeAt(0) !== nextCharCode) break;
    nextCharCode++;
  }
  return String.fromCharCode(nextCharCode);
};

// Get all zones
const getAllZones = async (req, res) => {
  let zones;
  try {
    zones = await Zone.find();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching zones", error: error.message });
  }
  return res.status(200).json({ zones });
};

// Add a new zone
const addZone = async (req, res) => {
  let { zoneId, zoneName, totalSlots, parkType, status } = req.body;

  try {
    // Get all existing zones for this park type
    const existingZones = await Zone.find({ parkType });

    // Auto-generate zoneId
    const prefix = parkType === '4wheel' ? '4W' : parkType === '3wheel' ? '3W' : '2W';
    if (!zoneId || !zoneId.trim()) {
      const nextLetter = getNextZoneLetter(existingZones, prefix);
      zoneId = `${prefix}${nextLetter}`;
    }

    // Auto-generate zoneName
    if (!zoneName || !zoneName.trim()) {
      zoneName = `Zone ${zoneId.slice(-1)}`; // '4WA' -> 'Zone A'
    }

    // checking duplicate zoneids
    const duplicate = existingZones.find(z => z.zoneId === zoneId);
    if (duplicate) {
      return res.status(400).json({ message: `Zone ID "${zoneId}" already exists in ${parkType} park` });
    }

    // Save new zone
    const newZone = new Zone({ zoneId, zoneName, totalSlots, parkType, status });
    await newZone.save();

    return res.status(201).json({ zone: newZone });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to add zone", error: error.message });
  }
};

// Get zone by ID
const getZoneById = async (req, res) => {
  const id = req.params.id;
  let zones;
  try {
    zones = await Zone.findById(id);
  } catch (error) {
    console.log(error);
  }

  if (!zones) {
    return res.status(404).json({ message: "Zone not found" });
  }
  return res.status(200).json({ zones });
};

// Update zone
const updateZone = async (req, res) => {
  const id = req.params.id;
  const { zoneId, zoneName, totalSlots, parkType, status } = req.body;
  let zones;
  try {
    zones = await Zone.findByIdAndUpdate(
      id,
      { zoneId, zoneName, totalSlots, parkType, status },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }

  if (!zones) {
    return res.status(404).json({ message: "Unable to update zone" });
  }
  return res.status(200).json({ zones });
};

// Delete zone
const deleteZone = async (req, res) => {
  const id = req.params.id;
  let zones;
  try {
    zones = await Zone.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }

  if (!zones) {
    return res.status(404).json({ message: "Unable to delete zone" });
  }
  return res.status(200).json({ message: "Zone successfully deleted" });
};

// Get next available zoneId and zoneName
const getNextZoneDetails = async (req, res) => {
  const { parkType } = req.params; //

  try {
    const existingZones = await Zone.find({ parkType });

    const prefix = parkType === '4wheel' ? '4W' : parkType === '3wheel' ? '3W' : '2W';
    const nextLetter = getNextZoneLetter(existingZones, prefix);

    const zoneId = `${prefix}${nextLetter}`;
    const zoneName = `Zone ${nextLetter}`;

    return res.status(200).json({ zoneId, zoneName });
  } catch (error) {
    return res.status(500).json({ message: "Error generating next zone", error: error.message });
  }
};




exports.getAllZones = getAllZones;
exports.addZone = addZone;
exports.getZoneById = getZoneById;
exports.updateZone = updateZone;
exports.deleteZone = deleteZone;
exports.getNextZoneDetails = getNextZoneDetails;



