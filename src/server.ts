import express from "express";
import USERS from "../users.json";

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

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.get("/users/:id", (req, res) => {
  const individual = req.params.id;
  const user = USERS.find((userInfo) => userInfo.id.toString() === individual);
  res.json(user);
});

app.post("/users", (req, res) => {});

app.put("/users/:id", (req, res) => {});

app.delete<{ id: string }>("/users/:id", (req, res) => {
  const individual = req.params.id;
  const userIndex = USERS.findIndex(
    (userInfo) => userInfo.id.toString() === individual
  );

  if (userIndex !== -1) {
    const user = USERS.splice(userIndex, 1)[0]; // Remove the element and store it in 'user'
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
