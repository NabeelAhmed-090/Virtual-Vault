import mongoose from 'mongoose';

const salesSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      required: true
    },
    unitsSold: {
      type: Number,
      default: null,
      required: true
    },
    amount: {
      type: Number,
      default: null,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Sales = mongoose.model('Sales', salesSchema);

export default Sales;
