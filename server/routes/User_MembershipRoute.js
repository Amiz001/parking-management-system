const express = require("express");
const router = express.Router();
const userMembershipController = require("../controllers/User_membershipController");

router.post("/", userMembershipController.addUserMembership);
router.get("/", userMembershipController.getAllUserMemberships);
router.get("/:id", userMembershipController.getUserMembershipById);
router.put("/:id", userMembershipController.updateUserMembership);
router.delete("/:id", userMembershipController.deleteUserMembership);

module.exports = router;
