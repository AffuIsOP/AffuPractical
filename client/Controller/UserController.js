const { UsersCollection } = require("../Model/Users");

// @METHOD GET
// API http://localhost:4869/Users

async function GetUser(req, res) {
  const getAllUser = await UsersCollection.find();
  return res.status(200).send(getAllUser);
}

// @METHOD POST
// API http://localhost:4869/Users

async function PostUser(req, res) {
  try {
    const { username, useremail, userpassword } = req.body;

    const nameValidation = /^[A-Za-z]{4,}$/;

    if (!nameValidation.test(username)) {
      return res
        .status(400)
        .send({ error: "Username should be 4 letters long" });
    }

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValidation.test(useremail)) {
      return res.status(400).send({ error: "Invalid Email" });
    }

    const findIfExists = await UsersCollection.find({
      UserEmail: useremail.toLowerCase(),
    });

    if (findIfExists.length > 0) {
      return res.status(409).send({ error: "Useremail already exists" });
    }

    await UsersCollection.create({
      UserName: username,
      UserEmail: useremail,
      UserPass: userpassword,
    });

    return res.status(201).send(req.body);
  } catch (error) {
    console.log(error);
  }
}

// METHOD -- DELETE
// API    -- http://localhost:4869/Users/_id

async function deleteUser(req, res) {
  const urlUser_id = req.params.id;

  await UsersCollection.deleteOne({
    _id: urlUser_id,
  });

  return res.status(200).send({ message: "user deleted successfully" });
}

// METHOD -- UPDATE
// API    -- http://localhost:4869/Users/_id

async function updateUser(req, res) {
  const urlUser_id = req.params.id;

  const getOldRoleName = await UsersCollection.findOne({
    _id: urlUser_id,
  });

  if (getOldRoleName) {
    const { username, useremail, userpassword } = req.body;

    const nameValidation = /^[A-Za-z]{4,}$/;

    if (!nameValidation.test(username)) {
      return res
        .status(400)
        .send({ error: "Username should be 4 letters long" });
    }

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValidation.test(useremail)) {
      return res.status(400).send({ error: "Invalid Email" });
    }

    const findIfExists = await UsersCollection.find({
      UserEmail: useremail,
    });

    if (findIfExists.length > 0) {
      return res.status(409).send({ error: "Useremail already exists" });
    }

    await UsersCollection.updateOne(
      {
        _id: urlUser_id,
      },
      {
        $set: {
          UserName: username,
          UserEmail: useremail,
          UserPass: userpassword,
        },
      }
    );

    return res
      .status(200)
      .send({ message: "role updated successfully", data: req.body });
  } else {
    return res.status(400).send({ error: "role name not found" });
  }
}

module.exports = { GetUser, PostUser, deleteUser, updateUser };
