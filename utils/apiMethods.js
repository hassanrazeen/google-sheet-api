const { getGoogleSheetsInstance } = require("./googleApi");

/**
 * Create a google spreadsheet
 * @param {string} title Spreadsheets title
 * @return {string} Created spreadsheets ID
 */
async function create(title) {
  const service = await getGoogleSheetsInstance();

  const resource = {
    properties: {
      title,
    },
  };
  try {
    const spreadsheet = await service.spreadsheets.create({
      resource,
      fields: "spreadsheetId",
    });
    console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
    return spreadsheet.data.spreadsheetId;
  } catch (err) {
    throw err;
  }
}

/**
 * Gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @return {obj} spreadsheet information
 */
async function getValues(spreadsheetId, range) {
  const service = await getGoogleSheetsInstance();
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const numRows = result.data.values ? result.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Updates values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to update.
 * @param {object} valueInputOption Value update options.
 * @param {(string[])[]} _values A 2d array of values to update.
 * @return {obj} spreadsheet information
 */
async function updateValues(spreadsheetId, range, valueInputOption, values) {
  const service = await getGoogleSheetsInstance();
  // let values = [
  //   ["Name", "Age"], // Updates A1 and B1
  //   ["messi", "35"], // Updates A2 and B2
  //   ["ronaldo", "39"], // Updates A3 and B3
  //   ["neymar", "30"], // This row is not used as range is only A1:B3
  // ];
  const resource = {
    values,
  };
  try {
    const result = await service.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log("%d cells updated.", result.data.updatedCells);
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Batch gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} _ranges The mock sheet range.
 * @return {obj} spreadsheet information
 */
async function batchGetValues(spreadsheetId, ranges) {
  const service = await getGoogleSheetsInstance();
  //   Get Single Range on a Single Sheet
  //   let ranges = ["Sheet1!A1:B10"];

  //   Get Multiple Ranges on the Same Sheet
  //   let ranges = ['Sheet1!A1:B10', 'Sheet1!C1:C10'];

  //   Get Ranges on Different Sheets
  //   ranges = ['Sheet1!A1:B10', 'Sheet2!D1:D5'];

  //   Get Entire Column A on Sheet1
  //   let ranges = ["Sheet1!A:A"];

  //   Get Entire Row 1 on Sheet2
  //   let ranges = ['Sheet2!1:1'];

  //   All Cells in a Sheet
  // let ranges = ["Sheet1"];

  try {
    const result = await service.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });
    console.log(`${result.data.valueRanges.length} ranges retrieved.`);
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Batch Updates values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {object[]} updates An array of objects each containing a range and values to update.
 * @param {string} valueInputOption Value update options.
 * @return {obj} spreadsheet information
 */
async function batchUpdateValues(spreadsheetId, updates, valueInputOption) {
  const service = await getGoogleSheetsInstance();

  // Prepare data for batch update
  const data = updates.map((update) => ({
    range: update.range,
    values: update.values,
  }));

  const resource = {
    data,
    valueInputOption,
  };

  try {
    const result = await service.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource,
    });
    console.log("%d cells updated.", result.data.totalUpdatedCells);
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}

// Example usage
const updates = [
  {
    range: "Sheet1!A1:B2",
    values: [
      ["Name", "Age"],
      ["messi", "35"],
    ],
  },
  {
    range: "Sheet2!A1:B3",
    values: [
      ["Header1", "Header2"],
      ["Value1", "Value2"],
      ["Value3", "Value4"],
    ],
  },
];

/**
 * Appends values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to append.
 * @param {object} valueInputOption Value input options.
 * @param {(string[])[]} _values A 2d array of values to append.
 * @return {obj} spreadsheet information
 */
async function appendValues(spreadsheetId, range, valueInputOption, values) {
  const service = await getGoogleSheetsInstance();

  // let values = [
  //   ["Name", "Age"],
  //   ["messi", "35"],
  // ];
  
  const resource = {
    values,
  };
  try {
    const result = await service.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 
Just for my learning purpose ----------------------------------------------------------------

Write to a Single Range: 
Overwrites specific cells with new values. Use when you want to update a known block of cells.

Write Multiple Ranges: 
Updates multiple specified ranges in one request. Use when you need to update different sections or sheets simultaneously.

Append Values:
Adds new rows of data to the end of a sheet or range. Use when you want to keep existing data and add new rows.

-------------------------------------------------------------------------------------------------

 */

module.exports = {
  create,
  getValues,
  updateValues,
  batchGetValues,
  batchUpdateValues,
  appendValues,
};
