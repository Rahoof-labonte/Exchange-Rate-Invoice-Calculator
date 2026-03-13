# Exchange Rate Invoice Calculator

A full-stack application to convert **USD → JPY** using an exchange rate and store conversion history.

## Tech Stack

**Backend**

* Python 3.11
* FastAPI
* SQLAlchemy
* PostgreSQL
* pytest

**Frontend**

* React
* Redux Toolkit
* Axios

**Testing**

* pytest (backend)
* Jest (frontend unit test)
* Playwright (end-to-end test)

---

# Project Structure

```
Exchange-Rate-Invoice-Calculator
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── db.py
│   │
│   ├── tests
│   │   └── test_api.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ConverterForm.js
│   │   │   ├── HistoryList.js
|   |   |   |__ PageNotFound.js
│   │   │   └── ConverterForm.test.js
│   │   │
│   │   ├── redux
│   │   │   └── conversionSlice.js
│   │   │
│   │   └── api
│   │       └── api.js
│   │
│   ├── package.json
│   └── playwright.config.js
│
├── screenshots
│   ├── frontend
│   ├── playwright
│   ├── pytest
|   |__ swagger
│   └── unit-test
│
├── README.md
```

---

# Setup Instructions

## 1. Download Project

Download the repository ZIP from GitHub and extract it.

Place the project folder for example in:

```
C:\Exchange-Rate-Invoice-Calculator
```

---

# Database Setup (PostgreSQL)

Install **PostgreSQL v18**.

During installation:

* Set port (default **5432**)
* Set database password
* Add PostgreSQL to **environment variables**

Create a database for the project.

Example:

```
exchange_rate_db
```

Create `.env` file inside **backend**:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/exchange_rate_db
```

---

# Backend Setup

Open terminal and navigate to backend:

```
cd Exchange-Rate-Invoice-Calculator/backend
```

Install **Python 3.11** (if not installed):

```
winget install --id Python.Python.3.11 -e
```

Create virtual environment:
py -3.11 -m venv venv

If Python 3.11 is already the default Python version on your system, you can use:
python -m venv venv
```
```

Activate environment:

```
venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run backend server:

```
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

Swagger API documentation:

```
http://localhost:8000/docs
```

---

# Frontend Setup

Install **Node.js**.

Open another terminal:

```
cd Exchange-Rate-Invoice-Calculator/frontend
```

Install node modules:

```
npm install
```

Run React application:

```
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# Playwright Setup

Install browsers (first time only):

```
npx playwright install
```

This downloads:

* Chromium
* Firefox
* WebKit

Run Playwright tests:

```
npx playwright test
```

---

# Backend Tests

Run pytest:

```
pytest
```

---

# Frontend Unit Test

Run Jest test:

```
npm test
```

---

# API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | /convert          | Convert USD to JPY      |
| GET    | /conversions      | List conversion history |
| GET    | /conversions/{id} | Get conversion by ID    |
| DELETE | /conversions/{id} | Delete conversion       |

---

# Manual Test Checklist

1. Convert USD with valid rate
2. Enter negative USD → validation error
3. Enter negative rate → validation error
4. Submit empty form → required validation
5. Select BOJ rate source
6. Select Mizuho TTM rate source
7. Select Manual rate source
8. Verify JPY rounding works correctly
9. Verify record appears in history
10. Verify pagination works
11. Verify date filter works
12. Delete conversion record
13. Verify success message after conversion
14. Verify backend validation errors
15. Verify API response using Swagger

---

# Evidence

All required outputs and screenshots are placed inside:

```
Exchange-Rate-Invoice-Calculator/screenshots
```

Includes:

* Swagger API documentation
* pytest passing output
* Playwright test output
* Application UI screenshots

---

# Notes

Playwright browsers are **not included in node_modules**, so after cloning the project run:

```
npx playwright install
```

to download required browser binaries.
