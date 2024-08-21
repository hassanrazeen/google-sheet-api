# Google Sheets API Express Application

## Overview

This project provides a RESTful API built with Node.js and Express.js to perform CRUD operations on Google Sheets. It leverages the Google Sheets API using a service account for authentication. The application supports creating spreadsheets, retrieving, updating, batch processing, and appending data to Google Sheets.

## Features

- **Create Spreadsheet**: Create a new Google Spreadsheet.
- **Get Values**: Retrieve values from a specified range in a spreadsheet.
- **Update Values**: Update cell values within a specified range.
- **Batch Get Values**: Retrieve values from multiple ranges across one or more sheets.
- **Batch Update Values**: Update cell values across multiple ranges in one or more sheets.
- **Append Values**: Append rows of data to a spreadsheet.

## Technologies Used

- **Node.js**
- **Express.js**
- **Google Sheets API**

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hassanrazeen/google-sheet-api.git
   cd google-sheet-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Add Credentials File**:

   - Download the `credentials.json` file from your Google Cloud Console.
   - Place it in the root directory of this project.

4. **Run the Application**:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST `/create`

Create a new spreadsheet.

- **Request Body**:

  ```json
  {
    "title": "My Spreadsheet"
  }
  ```

- **Response**:
  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
  }
  ```

### Example:

```bash
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"title": "My Spreadsheet"}'
```

### GET `/values`

Get values from a range in a spreadsheet.

- **Query Parameters**:

  - `spreadsheetId`: The ID of the spreadsheet.
  - `range`: The range of cells to retrieve, e.g., `Sheet1!A1:B2`.

- **Response**:
  ```json
  {
    "range": "Sheet1!A1:B2",
    "majorDimension": "ROWS",
    "values": [
      ["Name", "Age"],
      ["messi", "35"]
    ]
  }
  ```

### Example:

```bash
curl "http://localhost:3000/values?spreadsheetId=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms&range=Sheet1!A1:B2"
```

### PUT `/values`

Update values in a spreadsheet.

- **Request Body**:

  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "range": "Sheet1!A1:B2",
    "valueInputOption": "RAW",
    "values": [
      ["Name", "Age"],
      ["messi", "35"]
    ]
  }
  ```

- **Response**:
  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "updatedRange": "Sheet1!A1:B2",
    "updatedRows": 1,
    "updatedColumns": 2,
    "updatedCells": 2
  }
  ```

### Example:

```bash
curl -X PUT http://localhost:3000/values -H "Content-Type: application/json" -d '{"spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "range": "Sheet1!A1:B2", "valueInputOption": "RAW", "values": [["Name", "Age"], ["messi", "35"]]}'
```

### GET `/batchGetValues`

Batch get values from multiple ranges.

- **Query Parameters**:

  - `spreadsheetId`: The ID of the spreadsheet.
  - `ranges`: Comma-separated list of ranges, e.g., `Sheet1!A1:B2,Sheet1!C1:C10`.

- **Response**:
  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "valueRanges": [
      {
        "range": "Sheet1!A1:B2",
        "values": [
          ["Name", "Age"],
          ["messi", "35"]
        ]
      },
      {
        "range": "Sheet1!C1:C10",
        "values": [["Name"], ["Messi"], ["Ronaldo"]]
      }
    ]
  }
  ```

### Example:

```bash
curl "http://localhost:3000/batchGetValues?spreadsheetId=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms&ranges=Sheet1!A1:B2,Sheet1!C1:C10"
```

### PUT `/batchUpdateValues`

Batch update values across multiple ranges.

- **Request Body**:

  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "valueInputOption": "RAW",
    "data": [
      {
        "range": "Sheet1!A1:B2",
        "values": [
          ["Name", "Age"],
          ["ronaldo", "39"]
        ]
      },
      {
        "range": "Sheet1!C1:C10",
        "values": [["Name"], ["neymar"], ["ronaldinho"]]
      }
    ]
  }
  ```

- **Response**:
  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "totalUpdatedRows": 3,
    "totalUpdatedColumns": 2,
    "totalUpdatedCells": 6
  }
  ```

### Example:

```bash
curl -X PUT http://localhost:3000/batchUpdateValues -H "Content-Type: application/json" -d '{"spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "valueInputOption": "RAW", "data": [{"range": "Sheet1!A1:B2", "values": [["Name", "Age"], ["ronaldo", "39"]]}, {"range": "Sheet1!C1:C10", "values": [["Name"], ["neymar"], ["ronaldinho"]]}]}'
```

### POST `/appendValues`

Append values to a spreadsheet.

- **Request Body**:

  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "range": "Sheet1!A1:B2",
    "valueInputOption": "RAW",
    "values": [
      ["Name", "Age"],
      ["neymar", "30"]
    ]
  }
  ```

- **Response**:

  ```json
  {
    "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    "tableRange": "Sheet1!A1:B2",
    "updates": {
      "updatedRange": "Sheet1!A1:B2",
      "updatedRows": 1,
      "updatedColumns": 2,
      "updatedCells": 2
    }
  }
  ```

  ### Example:

```bash
curl -X POST http://localhost:3000/appendValues -H "Content-Type: application/json" -d '{"spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "range": "Sheet1!A1:B2", "valueInputOption": "RAW", "values": [["Name", "Age"], ["neymar", "30"]]}'
```


## Thank You

This `README.md` covers the setup, usage, and API endpoints with instructions on where to place the `credentials.json` file, ensuring users can get the project running smoothly.
