import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema<IUser>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


/**
 * Hashes the user's password before saving it into the database.
 *
 * @this {IUser} - the user document
 * @param {Function} next - the callback function to call after hashing the password
 */
userSchema.pre<Document>('save', function (this: IUser, next: Function) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS), (err: Error, hash: string) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    }
})

/**
 * Compares the provided password with the stored password using bcrypt.
 *
 * @param {string} password - the password to compare
 * @return {Promise<boolean>} a promise that resolves to a boolean indicating whether the passwords match
 */
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    if (!password) {
        throw new Error('Não existe password');
    }
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error: any) {
        console.log('Erro a comparar passwords: ', error.message);
        return false
    }
};


/**
 * Verifies if the email is valid.
 *
 * @return {boolean} whether the email is valid
 */
userSchema.statics.isValidEmail = function (email: string): boolean {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};


/**
 * Checks if an email address is already registered.
 *
 * @param {string} email - the email address to check
 * @return {Promise<boolean>} a promise that resolves to a boolean indicating whether the email is already registered
 */
userSchema.statics.emailExists = async function (email: string): Promise<boolean> {
    try {
        const user = await this.findOne({ email });
        return !!user;
    } catch (error) {
        console.error('Error in emailExists:', error);
        return false;
    }
};


/**
 * Checks if a username is already registered.
 *
 * @param {string} username - the username to check
 * @return {Promise<boolean>} a promise that resolves to a boolean indicating whether the username is already registered
 */
userSchema.statics.usernameExists = async function (username: string): Promise<boolean> {
    try {
        const user = await this.findOne({ username });
        return !!user;
    } catch (error) {
        console.error('Error in usernameExists:', error);
        return false;
    }
};


/**
 * Changes the first and/or last name of the user document.
 *
 * @param {string} firstName - the new first name (if null or empty string is provided, it will not be changed)
 * @param {string} lastName - the new last name (if null or empty string is provided, it will not be changed)
 * @return {Promise<IUser>} a promise that resolves to the updated user document
 */
userSchema.methods.changeName = function (firstName: string, lastName: string): Promise<IUser> {
    if (!firstName && !lastName) throw new Error('Nothing to change');

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    return this.model('User').findByIdAndUpdate(this._id, updateData, { new: true });
};


/**
 * Changes the password of the user document.
 *
 * @param {string} newPassword - the new password
 * @return {Promise<IUser>} a promise that resolves to the updated user document
 */
userSchema.methods.changePassword = function (newPassword: string): Promise<IUser> {
    if (!this.verifyPassword(newPassword)) {
        throw new Error('The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character');
    }
    return this.model('User').findByIdAndUpdate(this._id, { password: newPassword }, { new: true });
};



/**
 * Creates a new user.
 *
 * @param {string} username - the username of the new user
 * @param {string} email - the email of the new user
 * @param {string} password - the password of the new user
 * @param {string} [firstName] - the first name of the new user (optional)
 * @param {string} [lastName] - the last name of the new user (optional)
 * @return {Promise<IUser>} a promise that resolves to the new user document
 */
userSchema.statics.createUser = async function (userInfo: IUser): Promise<IUser> {
    try {
        const { username, email, password, firstName, lastName } = userInfo;
        if (!this.isValidEmail(email)) throw new Error('Invalid email');
        const userExists = await this.usernameExists(username) || await this.emailExists(email);
        if (userExists) throw new Error('Username and/or email already exists');

        if (!this.verifyPassword(password)) {
            throw new Error('The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character');
        }

        const newUser = new this({
            username,
            email,
            password,
            firstName,
            lastName,
        });
        return newUser.save();
    } catch (error: any) {
        console.error('Error in createUser:', error);
    }
};

/**
 * Verify the password of the user.
 * 
 * @param {string} password - the password of the user
 * @return {Promise<boolean>} a promise that resolves to a boolean indicating whether the password is strong enough
 */
userSchema.statics.verifyPassword = async function (password: string): Promise<boolean> {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/).test(password)
}



/**
 * Deletes a user.
 *
 * @param {string} userId - the id of the user to delete
 * @return {Promise<IUser>} a promise that resolves to the deleted user document
 */
userSchema.statics.deleteUser = function (userId: string): Promise<IUser> {
    return this.findByIdAndDelete({ userId });
};



/**
 * Matches the email and password of a user.
 *
 * @param {string} email - the email of the user
 * @param {string} password - the password of the user
 * @return {Promise<IUser|null>} a promise that resolves to the user document if the email and password match, or null if they don't
 */
userSchema.statics.matchEmailAndPassword = async function (email: string, password: string): Promise<IUser | null> {
    const user = await this.findOne({ email });
    if (!user) return null;

    const doesPasswordMatch = await user.comparePassword(password);
    return doesPasswordMatch ? user : null;
};



export default mongoose.model<IUser>('User', userSchema);