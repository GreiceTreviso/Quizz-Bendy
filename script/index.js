import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
 app.get('/rota1', (req, res) => {
    res.send('oiiii')
 })

 app.use(cors(  {
   origin:"*"
 })); 

 app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
 })