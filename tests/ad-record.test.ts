import {AdRecord} from "../records/ad.record";
import { pool } from "../utils/db";

afterAll(async () => {
   await pool.end();
});

const defaultObj = {
    id_contractor: '1',
    name_contractor: 'Ogórki',
    email_contractor: 'majcherrr87@gmail.com'
}

test('AdRecord returns data from database for one entry', async () => {
   const ad = await AdRecord.getOne('1');
   expect(ad).toBeDefined();
   expect(ad.id_contractor).toBe('1');
   expect(ad.name_contractor).toBe('Coca cola')
    console.log(ad);

});

test('AdRecord return null from database for unxeisting entry.', async () => {
    const ad = await AdRecord.getOne('---');
    expect(ad).toBeNull();
});
test('Dupa', async () => {
    const ad = await AdRecord.getAll();
    console.log(ad)
})



