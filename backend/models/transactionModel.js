import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      required: true,
    },
    game: {
      type: [mongoose.Schema.Types.ObjectId],
      default: null,
      required: true,
    },
    price: {
      type: [Number],
      default: null,
      required: true,
    },
    units: {
      type: [Number],
      default: null,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
