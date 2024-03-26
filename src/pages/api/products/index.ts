import ProductModel, { IProduct } from '@/utils/mongo-db/Models/product_model';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

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
    //TODO: validate input data
    mongoose.connect(String(process.env.MONGODB_URI)).then(async () => {
        await ProductModel.find({}).then((products: IProduct[]) => {
            console.log(products);
            res.status(200).json(products);
        }).catch((error: Error) => {
            console.log('Error saving product:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
    }).finally(() => {
        mongoose.disconnect();
    })
}

