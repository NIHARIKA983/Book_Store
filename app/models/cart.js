const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
    // bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookModel' }],
    // quantity: { type: Number, required: true },
    book:[{
        bookId :{
            type: mongoose.Schema.Types.ObjectId, ref: 'BookModel' 
        },
        qty:{
            type: Number
        }
    }],
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
    
      addToCart = (userInfo, callback) => {
        const data = new CartModel({
            userId: userInfo.userId,
            book: [{
                bookId: userInfo.itemId,
                qty: userInfo.qty
            }]
        })
        CartModel.findOne({userId: userInfo.userId}, (err, result)=>{
            if(err){
                return callback(err, null)
            }
            else{
                if(result == null){
                    data.save()
                    .then((data)=>{
                        console.log("empty")
                        return callback(null, data)
                    })
                    .catch((error)=>{
                        return callback(error, null)
                    })
                }
                else{
                    let updated = false;
                    const index = result.book.findIndex((item)=> item.bookId == userInfo.itemId);
                    console.log("index = ", index)
                        if(index >= 0){
                            updated = true;
                            const newBook= {
                                bookId: result.book[index].bookId,
                                qty: result.book[index].qty + userInfo.qty
                            }
                            console.log("Old Book", result.book[index])
                            console.log("newBook = ", newBook)
                            CartModel.updateOne({_id: result._id}, {$pull:{book: result.book[index]}},{new: true}, (err,res)=>{
                                console.log(err, res)
                            })
                            CartModel.updateOne({_id: result._id}, {$push:{book: newBook}},{new: true}, (err, res)=>{
                                if(err){
                                    return callback("Error in updating quantity", null)
                                }
                                else{
                                    return callback(null, "book updated")
                                }
                            })

                        }
                    if(updated == false){
                        const newBook= {
                            bookId: userInfo.itemId,
                            qty: userInfo.qty
                        }
                        console.log(result)
                        CartModel.findByIdAndUpdate(result._id, {$push:{book: newBook}},{new: true}, (err, res)=>{
                            if(err){
                                console.log(err)
                                return callback("Error in adding book", null)
                            }
                            else{
                                return callback(null, "book Pushed")
                            }
                        })
                    }
                    
                } 
            }
        })
        
    }
}

module.exports = new CartModels();