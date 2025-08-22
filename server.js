const path = require("path");
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;


// Allow FCC test suite to reach your API
app.use(cors({ optionsSuccessStatus: 200 }));


// Serve static demo page
app.use(express.static(path.join(__dirname, "public")));


// Home page (optional but nice for manual testing)
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Helper: build JSON for a Date instance
function buildResponse(date) {
    return {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }
  


// "Empty" date param — return current time
app.get("/api", (req, res) => {
const now = new Date();
res.json(buildResponse(now));
});

app.get("/api/", (req, res) => {
    const now = new Date();
    res.json(buildResponse(now));
  });
  

// /api/:date? — handle either a unix ms timestamp or a date string
app.get("/api/:date", (req, res) => {
const { date: dateParam } = req.params;


let date;


// If param is all digits, treat as Unix milliseconds
if (/^\d+$/.test(dateParam)) {
    // Handle both seconds (10 digits) and milliseconds (13 digits)
    if (dateParam.length === 13) {
      date = new Date(Number(dateParam));       
    } else {
      date = new Date(Number(dateParam) * 1000); 
    }
  } else {
    date = new Date(dateParam);
  }

  
if (isNaN(date.getTime())) {
return res.json({ error: "Invalid Date" });
}


return res.json(buildResponse(date));
});


app.listen(PORT, () => {
console.log(`\nTimestamp Microservice listening on http://localhost:${PORT}`);
});