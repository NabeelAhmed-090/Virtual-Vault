import mongoose from 'mongoose';

const deliverySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      required: true
    },
    address: {
      type: String,
      default: '',
      required: true
    },
    additionalInfo: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
