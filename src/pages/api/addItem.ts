import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ProductModel, { IProduct } from '../../utils/mongo-db/Models/product_model';
 
// Replace the following with your Atlas connection string



/**
 * An asynchronous function that handles a POST request and response, saves a product to the database, and sends a response back.
 *
 * @param {NextApiRequest} req - the request object
 * @param {NextApiResponse} res - the response object
 * @return {Promise<void>} a Promise that resolves when the function completes
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    console.log(req.body)
    mongoose.connect(String(process.env.MONGODB_URI)).then(async () => {
        console.log('Connected to the database');
        await ProductModel.createItem(req.body).then((savedProduct: IProduct) => {
            console.log(savedProduct);
            res.status(200).json(savedProduct);
        }).catch((error: Error) => {
            console.log('Error saving product:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
    }).finally(() => {
        mongoose.disconnect();
    })
}

