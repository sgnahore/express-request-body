import express from "express";

const app = express();
app.use(express.json()); // to parse data

app.get("/", (req, res) => {
  res.json({
    message: "Ugh, what a boring GET request",
  });
});

app.post("/", (req, res) => {
  const keyCount = Object.keys(req.body).length;
  if (keyCount > 0) {
    res.json({
      message: `A much more exciting POST request - you posted me some data which had ${keyCount} key${
        keyCount > 1 ? "s" : ""
      }`,
    });
  } else {
    res.json({
      message:
        "This is a promising POST request - maybe attach some data, too?",
    });
  }
});

app.post<{}, {}, { numbers: number[] }>("/sum", (req, res) => {
  let total = 0;
  for (const n of req.body.numbers) {
    total += n;
  }
  res.json({
    original: `${req.body.numbers.join(" + ")}`,
    result: total,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
