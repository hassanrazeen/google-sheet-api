const { google } = require("googleapis");

async function getGoogleSheetsInstance() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheet = google.sheets({ version: "v4", auth: client });

  return googleSheet;
}

module.exports = { getGoogleSheetsInstance };
