import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

// Router

app.get('/', async (req, res) =>{

    res.send('Hello World!');
});

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001');
})