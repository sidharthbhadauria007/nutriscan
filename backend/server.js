import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/detect', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    try {
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        const formData = new FormData();
        formData.append('image', blob, req.file.originalname || 'upload.jpg');

        const pythonRes = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            body: formData
        });

        const data = await pythonRes.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'AI Microservice offline' });
    }
});

app.listen(5000, () => console.log('🚀 Node Backend running on port 5000'));