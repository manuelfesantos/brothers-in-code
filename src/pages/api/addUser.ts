import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel, { IUser } from '../../utils/mongo-db/Models/user_model';
 
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
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    mongoose.connect(String(process.env.MONGODB_URI)).then(async () => {
        console.log('Connected to the database');
        await UserModel.createUser(req.body).then((savedUser: IUser) => {
            console.log(savedUser);
            res.status(200).json(savedUser);
        }).catch((error: Error) => {
            console.log('Error saving user:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
    }).finally(() => {
        mongoose.disconnect();
    })
}

