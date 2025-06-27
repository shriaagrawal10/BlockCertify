import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/upload", async (req, res) => {
  console.log("Upload route hit!", req.body);
  try {
    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      req.body,
      {
        headers: {
          pinata_api_key: process.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: process.env.VITE_PINATA_API_SECRET,
        },
      }
    );
    console.log("Pinata response:", result.data);
    res.json({ IpfsHash: result.data.IpfsHash });
  } catch (e) {
    console.error("Pinata upload error:", e.response?.data || e.message);
    res.status(500).json({ error: e.message, details: e.response?.data });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
console.log("Server file started");
