import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

    .get('/kot/:id',async (req,res) => {
        const ads = await AdRecord.getOne(req.params.id);
        res.json(ads)
    })
    .get('/all/', async (req, res)=>{
        const fff = await AdRecord.getAll();
        console.log(fff);
        res.json(fff);
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json(ad);
    })
