require("dotenv").config();

const express = require("express");
const {
  create,
  getValues,
  updateValues,
  batchGetValues,
  batchUpdateValues,
  appendValues,
} = require("./utils/apiMethods");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to for testing purposes
app.get("/", (req, res) => {
  res.send("hello Razeen!");
});

// Endpoint to create a spreadsheet
app.post("/create", async (req, res) => {
  const { title } = req.body;
  try {
    const spreadsheetId = await create(title);
    res.status(201).json({ spreadsheetId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get cell values
app.get("/values", async (req, res) => {
  const { spreadsheetId, range } = req.query;
  try {
    const result = await getValues(spreadsheetId, range);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update cell values
app.put("/values", async (req, res) => {
  const { spreadsheetId, range, valueInputOption, values } = req.body;
  try {
    const result = await updateValues(
      spreadsheetId,
      range,
      valueInputOption,
      values
    );
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to batch get cell values
app.get("/batchGetValues", async (req, res) => {
  const { spreadsheetId, ranges } = req.query;

  console.log(ranges.split(","));
  try {
    const result = await batchGetValues(spreadsheetId, ranges.split(",")); // Convert to array
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to batch update cell values
app.put("/batchUpdateValues", async (req, res) => {
  const { spreadsheetId, updates, valueInputOption } = req.body;
  try {
    const result = await batchUpdateValues(
      spreadsheetId,
      updates,
      valueInputOption
    );
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to append values
app.post("/appendValues", async (req, res) => {
  const { spreadsheetId, range, valueInputOption, values } = req.body;
  try {
    const result = await appendValues(
      spreadsheetId,
      range,
      valueInputOption,
      values
    );
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8000, (req, res) => console.log("running on 8000"));
