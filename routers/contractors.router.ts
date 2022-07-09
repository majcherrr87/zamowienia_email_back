import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const contractorsRouter = Router()

    .get('/one/:id',async (req,res) => {
        const oneContractor = await AdRecord.getOne(req.params.id);
        res.json(oneContractor)
    })
    .get('/all/', async (req, res)=>{
        const allContractor = await AdRecord.getAll();
        res.json(allContractor);
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json(ad);
    })
