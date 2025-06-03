require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TimeLog = require('./models/TimeLog');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post('/log-time', async (req, res) => {
  try {
    const newLog = new TimeLog(req.body);
    await newLog.save();
    res.status(201).send("Time logged");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/stats/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const stats = await TimeLog.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$website",
          totalTime: { $sum: "$timeSpent" }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
