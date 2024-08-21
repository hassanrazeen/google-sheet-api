# Google Sheets API Express Application

## Overview

This project provides a RESTful API built using Node.js and Express.js that allows interaction with Google Sheets through various operations such as creating spreadsheets, retrieving and updating cell values, batch operations, and appending data. The application is designed to work with a service account to manage Google Sheets.

## Features

- **Create Spreadsheet**: Create a new Google Spreadsheet.
- **Get Values**: Retrieve values from a specified range in a spreadsheet.
- **Update Values**: Update cell values in a specified range.
- **Batch Get Values**: Retrieve values from multiple ranges across one or more sheets.
- **Batch Update Values**: Update cell values across multiple ranges in one or more sheets.
- **Append Values**: Append rows of data to a spreadsheet.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building the REST API.
- **Google Sheets API**: Used to interact with Google Sheets.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Google Cloud Project**: Create a project in Google Cloud and enable the Google Sheets API and Google Drive API.
- **Service Account**: Create a service account in your Google Cloud project and download the credentials JSON file.
- **Google Sheets API Client Library**: Install the Google Sheets API client library for Node.js.
