import mongoose, { Document, Schema } from 'mongoose';


export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  image_urls: string[];
}

/**
 * Schema for the Products collection in the MongoDB.
 *
 * @param {string} name - The name of the product
 * @param {number} price - The price of the product
 * @param {string} description - A brief description of the product
 * @param {number} quantity - The quantity of the product
 * @param {string} category - The category of the product
 * @param {string[]} image_urls - The URLs of the images for the product
 */
const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  description: String,
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books']
  },
  image_urls: [{
    type: String,
  }],

});

/**
 * Check if the item exists in the product schema.
 *
 * @param {string} productName - The name of the product to check for existence
 * @return {Promise<boolean>} A boolean indicating whether the item exists or not
 */
productSchema.statics.itemExists = async function (productName: string): Promise<boolean> {
  try {
    const product = await this.findOne({ name: productName });
    return !!product;
  } catch (error) {
    console.error('Error in itemExists:', error);
    return false;
  }
};

/**
 * Get the quantity of the product.
 *
 * @return {number} The quantity of the product, or null if an error occurs
 */
productSchema.methods.getQuantity = async function (): Promise<number | null> {
  try {
    return this.quantity ?? null;
  } catch (error) {
    console.error('Error in getQuantity:', error);
    return null;
  }
};


/**
   * Add items to the product quantity and save the changes if the product exists.
   *
   * @param {string} productName - the name of the product
   * @param {number} quantityToAdd - the quantity to add to the product
   * @return {Promise<boolean>} true if the items were successfully added, false if the product does not exist or an error occurred
   */
productSchema.methods.addItems = async function (this: IProduct, quantityToAdd: number): Promise<boolean> {
  try {
    if (quantityToAdd <= 0) {
      console.error('Quantity to add must be positive');
      return false;
    }
    this.quantity += quantityToAdd;
    await this.save();
    return true;
  } catch (error) {
    console.error('Error in addItems:', error);
    return false;
  }
};


/**
   * Remove a certain number of items from the product quantity and save the changes if the product exists.
   *
   * @param {string} productName - the name of the product
   * @param {number} quantityToRemove - the quantity to remove from the product
   * @return {Promise<boolean>} true if the items were successfully removed, false if the product does not exist or an error occurred
   */
productSchema.methods.removeItems = async function (quantityToRemove: number): Promise<boolean> {
  try {
    if (quantityToRemove <= 0) {
      console.error('Quantity to remove must be positive');
      return false;
    }
    if (this.quantity < quantityToRemove) {
      return false; // Not enough items in stock
    } else {
      this.quantity -= quantityToRemove;
      await this.save();
      return true;
    }
  } catch (error) {
    console.error('Error in removeItems:', error);
    return false;
  }
};


/**
   * Delete a product from the database.
   *
   * @param {string} productName - The name of the product to delete.
   * @return {Promise<boolean>} True if the product was deleted, false otherwise.
   */
productSchema.statics.deleteItem = async function (productName: string): Promise<boolean> {
  try {
    const result = await this.deleteOne({ name: productName });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error in deleteItem:', error);
    return false;
  }
};


/**
   * Create a new product in the database.
   *
   * @param {string} name - The name of the product to create.
   * @param {number} price - The price of the product to create.
   * @param {number} quantity - The quantity of the product to create.
   * @param {string} description - A description of the product to create.
   * @return {Promise<IProduct | null>} The created product, or null if an error occurred.
   */
productSchema.statics.createItem = async function (
  { name, price, quantity, description, category }: Omit<IProduct, '_id'>
): Promise<IProduct | object> {
  try {
    const itemExists = await this.itemExists(name);
    if (itemExists) {
      const error = new Error('Item already exists');
      (error as any).httpCode = 409;
      throw error;
    } else {
      return await this.create({
        name,
        price,
        quantity,
        description,
        category,
      });
    }
  } catch (error: any) {
    console.error('Error in createItem:', error);
    return { error: [error.httpCode, error.message] };
  }
};


/**
   * Change the price of a product in the database.
   *
   * @param {string} productName - The name of the product to change the price for.
   * @param {number} newPrice - The new price of the product.
   * @return {Promise<boolean>} True if the price was changed successfully, false if an error occurred.
   */
productSchema.methods.changePrice = async function (newPrice: number): Promise<boolean> {
  if (newPrice <= 0) {
    console.error('New price must be positive');
    return false;
  }
  try {
    this.price = newPrice;
    const result = await this.save();
    return !!result;
  } catch (error) {
    console.error('Error in changePrice:', error);
    return false;
  }
};


/**
 * Change the description of a product in the database.
 *
 * @param {string} productName - The name of the product to change the description for.
 * @param {string} newDescription - The new description of the product.
 * @return {Promise<boolean>} True if the description was changed successfully, false if an error occurred.
 */
productSchema.methods.changeDescription = async function (newDescription: string): Promise<boolean> {
  try {
    this.description = newDescription;
    const result = await this.save();
    return !!result;
  } catch (error) {
    console.error('Error in changeDescription:', error);
    return false;
  }
};



/**
 * Change the category of a product in the database.
 *
 * @param {string} productName - The name of the product to change the category for.
 * @param {string} newCategory - The new category of the product.
 * @return {Promise<boolean>} True if the category was changed successfully, false if an error occurred.
 */
productSchema.methods.changeCategory = async function (newCategory: string): Promise<boolean> {
  try {
    this.category = newCategory;
    const result = await this.save();
    return !!result;
  } catch (error) {
    console.error('Error in changeCategory:', error);
    return false;
  }
};


/**
 * Find a product by its name.
 *
 * @param {string} productName - The name of the product to find.
 * @return {Promise<IProduct | null>} The found product, or null if the product was not found.
 */
productSchema.statics.findByName = async function (productName: string): Promise<IProduct | null> {
  return await this.findOne({ name: productName });
};



/**
 * Find a product by its id.
 *
 * @param {string} productId - The id of the product to find.
 * @return {Promise<IProduct | null>} The found product, or null if the product was not found.
 */
productSchema.statics.findItembyId = async function (productId: string): Promise<IProduct | null> {
  if (typeof productId !== 'string') {
    throw new Error(`productId must be a string, got ${typeof productId}`);
  }
  return await this.findById({ _id: productId });
};





export default mongoose.model<IProduct>('Product', productSchema);