
      
const multer = require ('multer')
const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();
    

const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, '../public/uploads');
        },
        filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
        },
    })
});

router.post('/:barber_id', upload.single('image'), (req, res) => {
    const { filename, path } = req.file;
    const barberId = req.params.barber_id;
    
    // Salve a informação do diretório da imagem no banco de dados
    const sql = 'UPDATE barbeiros SET imagem = ? WHERE id = ?';
    db.query(sql, [filename, barberId], (err, result) => {
        if (err) {
        console.error('Erro ao salvar a imagem no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao salvar a imagem' });
        return;
        }
    
        console.log('Imagem salva no banco de dados');
        res.json({ success: true });
    });
});

module.exports = router;
