const express = require("express");
const router = express.Router();

//insert model
const MembershipPlan = require("../models/MembershipModel");

//insert controller
const MembershipController = require("../controllers/MembershipController");

router.get("/",MembershipController.getAllPlans);
router.post("/",MembershipController.addPlans);
router.get("/:id",MembershipController.getById);
router.put("/:id",MembershipController.updatePlans);
router.delete("/:id",MembershipController.deletePlans);


// Stats endpoint
router.get('/membership-stats', async (req, res) => {
  try {
    // Total members (count of all user memberships)
    const totalMembers = await UserMembership.countDocuments();

    // Active plans (count of membership plans)
    const activePlans = await Membership.countDocuments();

    // Revenue (sum of membership prices for active user memberships)
    const userMemberships = await UserMembership.find({ status: 'successful' }).populate('membershipId');
    const revenue = userMemberships.reduce((sum, u) => sum + (u.membershipId?.price || 0), 0);

    // New subscriptions in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newSubscriptions = await UserMembership.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    res.json({
      totalMembers,
      activePlans,
      revenue,
      newSubscriptions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});


//export
module.exports=router;