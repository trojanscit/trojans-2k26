const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "18Hf1NoLBuVGnmWH7aZ0q3nU38AW3OIKk4yYc-Eo-hio";
const SHEET_NAME = "new"; // tab name

async function appendRegistrationRow(user) {
  const row = [
    user.name || "",
    user.gender || "",
    user.college_name || "",
    user.year || "",
    user.department || "",
    user.phone_number || "",
    user.referral_code || "",
    user.events?.[0] || "",
    user.events?.[1] || "",
    user.events?.[2] || "",
    user.events?.[3] || "",
    user.events?.[4] || "",
    user.team_name || "",
    user.team_members || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}

module.exports = { appendRegistrationRow };
