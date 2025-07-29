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

    const even_no = [];
    const odd_no = [];
    const alpha = [];
    const special_char = [];
    let sum = 0;

    input.forEach((item) => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_no.push(item);
        else odd_no.push(item);
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        alpha.push(item.toUpperCase());
      } else {
        special_char.push(item);
      }
    });

    const reverse_alt_caps = alpha
      .map((c, i, arr) => arr[arr.length - 1 - i])
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: "shubham_dhoni_29072005",
      email_id: "shubhdevv@gmail.com",
      college_roll_number: "2210992363",
      even_no,
      odd_no,
      uppercase_alpha: alpha,
      special_char,
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
