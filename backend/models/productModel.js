import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        name: {type: String, required: false},
        comment: {type: String, required: false},
        rating: {type: Number, required: false}
    },
    {
        timestamps: true
    }
);

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        seller: {type:mongoose.Schema.Types.ObjectID, ref: 'User'},
        category: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        brand: {type: String, required: true},
        rating: {type: Number, required: true},
        numReviews: {type: Number, required: true},
        description: {type: String, required: true},
        reviews : [reviewSchema]
    }, 
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;