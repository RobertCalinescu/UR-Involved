const Club = require("../../database/models/Club");
const mongoose = require("mongoose");

exports.showHomePage = async (req, res) => {
  try {
    const clubs = await Club.find({ approved: true }).sort({ name: 1 });
    res.render("home", { clubs });
  } catch (error) {
    console.error("failure rendering home page", error);
    res.status(500).send("Error loading homepage.");
  }
};

exports.showClubDetails = async (req, res) => {
  try {
    const clubId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).send("Invalid club ID");
    }

    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).send("Club not found");
    }

    // ✅ TEMP events (since you don’t have events model yet)
    const upcoming = [];
    const past = [];

    res.render("clubDetail", {
      club,
      upcoming,
      past,
      joined: req.query.joined || null,   // for success message
      currentPage: "overview"             // ✅ FIXES YOUR ERROR
    });

  } catch (error) {
    console.error("Error loading club details:", error);
    res.status(500).send("Server error");
  }
};