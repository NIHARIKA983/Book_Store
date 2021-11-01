const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
    bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookModel' }],
    isPurchased: { type: Boolean, default: false },
}, {
    timestamps: true
});

const CartModel = mongoose.model('Cart', cartSchema);

class CartModels {

     /**
     * @description   : It adds book into the cart
     * @param {*} data
     */
    
    addToCart = async (data, callback) => {
      const user = await CartModel.findOne({ userId: data.userId });
      if (!user) {
          const cartDetails = new CartModel({
              bookId: data.bookId,
              userId: data.userId,
          });
          cartDetails.save()
          callback(null, 'book added to cart')
      } else {
          const result = await CartModel.findOneAndUpdate({ userId: data.userId },
              { $addToSet: { bookId: data.bookId } });
          callback(null, result);

      }
  }
}

module.exports = new CartModels();