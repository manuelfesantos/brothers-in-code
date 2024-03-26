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
    mongoose.connect(String(process.env.MONGODB_URI)).then(async () => {
        await ProductModel.findById(req.query.id).then((product: IProduct | null) => {
            console.log(product);
            res.status(200).json(product);
        }).catch((error: Error) => {
            console.log('Error finding product:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
    }).catch(e => {
        console.error('Error connecting to MongoDB:', e)
        res.status(500).json({ error: 'Internal server error' });
    }).finally(() => {
        mongoose.disconnect();
    })
}

