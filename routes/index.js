const express = require("express");
const router = express.Router();
const db = require("../db/mongoConnection");

/* GET home page. */
router.get("/get_data", async function (req, res, next) {
  const p = await db.getData("posting", "posts", {});
  res.json(p);
});

router.post("/get_data_query", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("posting", "posts", req.body);
  res.json(p);
  console.log(res.json(p));
});

router.post("/insert_data", async function (req, res, next) {
  console.log(req.body);
  const p = await db.insertData("posting", "posts", newpost);
  res.json(p);
});

router.get("/delete_data", async function (req, res, next) {
  const p = await db.deleteData("posting", "posts", { name: "alex" });
  res.json(p);
});

router.post("/insert_newpost", async function (req, res, next) {
  console.log(req.body);
  await db.insertData("posting", "posts", req.body); 
  res.send("Success");
});

/*relate to user*/

router.post("/insert_user", async function (req, res, next) {
  console.log(req.body);
  await db.insertData("posting", "users", req.body); // we struggled with handling responses in our project. I am curious as to the effects of not handling res

});

router.post("/get_user", async function (req, res, next) {
  console.log(req.body);
  const p =await db.getData("posting", "users", req.body); 
  res.json(p);
});

router.post("/insert_appointment",async function (req, res, next) {
  console.log(req.body);
  const p =await db.insertData("posting", "appointment", req.body); // the organization of data processing is very good! easy to follow with how you guys structured
  res.json(p);                                                      // the queries and requests
});




const newpost = {
  author: "Fanny Teng",
  text: "write something",
};

module.exports = router;
