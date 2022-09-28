const express = require('express');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log('filename');
    cb(null, `recording_${Date.now()}.mp3`);
  },
  destination: function (req, file, cb) {
    console.log('storage');
    cb(null, './uploads');
  },
});

const upload = multer({ storage });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/upload_sound', upload.single('soundBlob'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: 'Successfully uploaded files' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
