const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const input = req.body.data;

    if (!Array.isArray(input)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    input.forEach((item) => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const reverse_alt_caps = alphabets
      .map((c, i, arr) => arr[arr.length - 1 - i])
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: "shubham_dhoni_29072005",
      email_id: "shubhdevv@gmail.com",
      college_roll_number: "2210992363",
      even_numbers,
      odd_numbers,
      uppercase_alphabets: alphabets,
      special_characters,
      sum_of_numbers: sum,
      reverse_alternating_caps: reverse_alt_caps,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
