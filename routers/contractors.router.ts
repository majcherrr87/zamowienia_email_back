import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const contractorsRouter = Router()

    .get('/one/:id',async (req,res) => {
        const oneContractor = await AdRecord.getOne(req.params.id);
        res.json(oneContractor)
    })

    .get('/allProduct/:id', async (req, res)=>{
        const allProducts = await AdRecord.getAllProduct(req.params.id);
        res.json(allProducts);
    })
    .get('/all', async (req, res)=>{
        const allContractor = await AdRecord.getAll();
        res.json(allContractor);
    })

    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json(ad);
    })
    .post('/product', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insertProduct();
        res.json(ad);
    })
    .delete('/one/:id',async (req,res) => {
        const deleteOneContractor = await AdRecord.delete(req.params.id);
        res.json(deleteOneContractor)
    })
    .delete('/product/:id',async (req,res) => {
        const deleteOneContractor = await AdRecord.deleteProduct(req.params.id);
        res.json(deleteOneContractor)
    })
    .put('/one/',async (req,res) => {
        const put = new AdRecord(req.body);
        await put.update();
        res.json(put);
    })
