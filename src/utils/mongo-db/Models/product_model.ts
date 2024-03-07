import mongoose, { Document, Schema } from 'mongoose';

/**
 * Model for a Product in the MongoDB database.
 *
 * The Product model is a schema for a document that contains information about a product,
 * such as its name, price, description, and quantity in stock.
 *
 */
interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
}

/**
 * Mongoose schema for a Product document.
 *
 * @param {string} name - The name of the product.
 * @param {number} price - The price of the product.
 * @param {string} description - A brief description of the product.
 * @param {number} quantity - The quantity of the product in stock.
 */
const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
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
 * Retrieves the quantity of a product with the given name.
 *
 * @param {string} productName - The name of the product to retrieve the quantity for.
 * @return {Promise<number | null>} The quantity of the product, or null if an error occurs.
 */
productSchema.statics.getQuantity = async function (productName: string): Promise<number | null> {
  try {
    const product = await this.findOne({ name: productName });
    return product?.quantity ?? null;
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
productSchema.statics.addItems = async function (productName: string, quantityToAdd: number): Promise<boolean> {
  try {
    if (quantityToAdd <= 0) {
      console.error('Quantity to add must be positive');
      return false;
    }
    const product = await this.findOne({ name: productName });
    if (product) {
      product.quantity += quantityToAdd;
      await product.save();
      return true;
    } else {
      return false; // Product not found
    }
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
productSchema.statics.removeItems = async function (productName: string, quantityToRemove: number): Promise<boolean> {
  try {
    if (quantityToRemove <= 0) {
      console.error('Quantity to remove must be positive');
      return false;
    }
    const product = await this.findOne({ name: productName });
    if (product) {
      if (product.quantity < quantityToRemove) {
        return false; // Not enough items in stock
      } else {
        product.quantity -= quantityToRemove;
        await product.save();
        return true;
      }
    } else {
      return false; // Product not found
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
  name: string,
  price: number,
  quantity: number,
  description: string,
  category: string
): Promise<IProduct | null> {
  try {
    return await this.create({
      name,
      price,
      quantity,
      description,
      category,
    });
  } catch (error) {
    console.error('Error in createItem:', error);
    return null;
  }
};


/**
   * Change the price of a product in the database.
   *
   * @param {string} productName - The name of the product to change the price for.
   * @param {number} newPrice - The new price of the product.
   * @return {Promise<boolean>} True if the price was changed successfully, false if an error occurred.
   */
productSchema.statics.changePrice = async function (productName: string, newPrice: number): Promise<boolean> {
  if (newPrice <= 0) {
    console.error('New price must be positive');
    return false;
  }
  try {
    const result = await this.updateOne({ name: productName }, { price: newPrice });
    return result.modifiedCount > 0;
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
productSchema.statics.changeDescription = async function (productName: string, newDescription: string): Promise<boolean> {
  try {
    const result = await this.updateOne({ name: productName }, { description: newDescription });
    return result.modifiedCount > 0;
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
productSchema.statics.changeCategory = async function (productName: string, newCategory: string): Promise<boolean> {
  try {
    const result = await this.updateOne({ name: productName }, { category: newCategory });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error in changeCategory:', error);
    return false;
  }
};


export default mongoose.model<IProduct>('Product', productSchema);