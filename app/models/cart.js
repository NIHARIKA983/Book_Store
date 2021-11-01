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
    addToCart = (data) => {
        return new Promise((resolve, reject) => {
          const cartDetails = new CartModel({
            bookId: data.bookId,
            userId: data.userId,
          });
          cartDetails.save().then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
}

module.exports = new CartModels();