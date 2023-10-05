import express from "express";
import axios from "axios";
import bodyParser from "body-parser"; // recording data entered by user

const app = express();
const port = 3000;
const baseUrl = "https://reqres.in/api";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Response Area" });
});

// get request
app.get("/listOfUsers", async (req, res) => {
  try {
    const result = await axios.get(baseUrl + "/unknown");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// post request to create a new user
app.post("/post-user-details", async (req, res) => {
  try {
    // using data entered by user to post user details
    const userData = {
      name: req.body.name,
      job: req.body.job,
    };

    const result = await axios.post(baseUrl + "/users", userData);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// put request
app.post("/put-update-user-details", async (req, res) => {
  const userData = {
    name: req.body.name,
    job: req.body.job,
  };
  try {
    const result = await axios.put(baseUrl + "/users/2" + userData, req.body);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// patch request
app.post("/patch-update-user-details", async (req, res) => {
  const userData = {
    name: req.body.name,
    job: req.body.job,
  };
  try {
    const result = await axios.patch(baseUrl + "/users/2" + userData, req.body);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// delete request
app.post("/delete-user-details", async (req, res) => {
  try {
    const result = await axios.delete(baseUrl + "/users/2");
    res.render("index.ejs", { content: "User Details Deleted" }); // manually typing response data as api returns a blank response
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
