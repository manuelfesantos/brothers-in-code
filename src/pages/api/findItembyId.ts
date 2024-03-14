import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ProductModel, { IProduct } from '../../utils/mongo-db/Models/product_model';


/**
 * An asynchronous function that handles a POST request and response, saves a product to the database, and sends a response back.
 *
 * @param {NextApiRequest} req - the request object
 * @param {NextApiResponse} res - the response object
 * @return {Promise<void>} a Promise that resolves when the function completes
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    console.log(req.body)
    if (!req.body.itemId) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    mongoose.connect(String(process.env.MONGODB_URI)).then(async () => {
        console.log('Connected to the database');
        await ProductModel.findItembyId(req.body.itemId).then((product: IProduct | null) => {
            console.log(product);
            res.status(200).json(product);
        }).catch((error: Error) => {
            console.log('Error finding product:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
    }).finally(() => {
        mongoose.disconnect();
    })
}

