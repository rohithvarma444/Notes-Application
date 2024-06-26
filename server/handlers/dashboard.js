const mongoose = require("mongoose");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const csrf = require('csrf');
const tokens = new csrf();

const getSecret= async(id) => {
  try {
    return (await User.findById(id)).secret;
  } catch (error) {
    console.log('Error getting the secret: ',error)
  }
}

const getUsername = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return user.firstName;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting username:", error.message);
    throw error;
  }
};

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "This is dashboard page",
  };
  const perPage = 9;
  let page = parseInt(req.query.page) || 1;
  const userId = req.session.passport.user;
  try {
    const notes = await Note.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $sort: { updatedAt: -1, createdAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
          description: { $substr: ["$description", 0, 30] },
        },
      },
    ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    const count = await Note.countDocuments({
      user: mongoose.Types.ObjectId(userId),
    });
    const name = await getUsername(userId);
    res.render("dashboard", {
      ...locals,
      layout: "../views/layout/dashboard",
      username: name,
      notes: notes,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.fetchnote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).where({
      user: req.session.passport.user,
    });
    const secret = await getSecret(req.session.passport.user);
    console.log(secret);
    const locals = {
      title: "View-Notes",
      description: "This is the view notes page",
    };

    res.render("notes", {
      ...locals,
      layout: "../views/layout/dashboard",
      notes: note,
      token: tokens.create(secret) 
    });
  } catch (error) {
    console.error("Error fetching note:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const token = req.body._csrf;
    const secret = await getSecret(req.session.passport.user);
    if (!tokens.verify(secret, token)) {
      res.status(403).send("Heckor Alert");
      return;
    }
    const deleteNotes = await Note.deleteOne({ _id: req.params.id }).where({
      user: req.session.passport.user,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const token = req.body._csrf;
    const secret = await getSecret(req.session.passport.user);

    if (!tokens.verify(secret, token)) {
      res.status(403).send("Heckor Alert");
      return;
    }
    const update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        updatedAt: new Date(Date.now()),
      },
    };

    const updateNotes = await Note.updateOne(
      { _id: req.params.id, user: req.session.passport.user },
      update
    );

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


exports.createNote = async (req, res) => {
  const locals = {
    title: "Create Notes",
    description: "This is note create route",
  };
  const secret = await getSecret(req.session.passport.user);
  const name = await getUsername(req.session.passport.user);
  console.error(name);

  res.render("createNotes", {
    ...locals,
    layout: "../views/layout/dashboard",
    name,
    token: tokens.create(secret)
  });
};

exports.notes = async (req, res) => {
  const token = req.body._csrf;
    const secret = await getSecret(req.session.passport.user);
    if (!tokens.verify(secret, token)) {
      res.status(403).send("Heckor Alert");
      return;
    }
  const note = await Note.insertMany([
    {
      user: req.session.passport.user,
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      createdAt: new Date(Date.now()),
    },
  ]);
  res.redirect("/dashboard");
};
exports.dashboardSearch = async (req, res) => {
  const locals = {
    title: "View-Notes",
    description: "This is the view notes page",
  };
  try {
    res.render("search", {
      ...locals,
      searchResults: "",
      layout: "../views/layout/dashboard",
    });
  } catch (error) {}
};

exports.dashboardSearchSubmit = async (req, res) => {
  const locals = {
    title: "View-Notes",
    description: "This is the view notes page",
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.session.passport.user });
    console.log(searchResults);

    res.render("search", {
      ...locals,
      searchResults,
      layout: "../views/layout/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};