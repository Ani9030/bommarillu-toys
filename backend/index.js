const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Endpoint to upload Excel and return product data
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // Expected columns: id, name, price, quantity
    res.json({ products: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process Excel file' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Toy Collection Backend Running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
