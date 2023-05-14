import asyncHandler from 'express-async-handler'
import Sales from '../models/salesModel.js'
import User from '../models/userModel.js'

// @desc Get Sales
// @route Get /api/sales
// @access Public
const getSales = asyncHandler(async (req, res) => {
    try {
        const sales = await Sales.find({});
        if (sales) {
            const topSales = sales.sort((a, b) => b.amount - a.amount).slice(0, 3);
            const userPromises = topSales.map(async (sale) => {
                const user = await User.findById(sale.seller);
                return {
                    user: user,
                    amount: sale.amount,
                    units: sale.unitsSold
                };
            });
            const users = await Promise.all(userPromises);
            res.json({
                sellers: users
            });
        } else {
            res.json({
                sellers: []
            });
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching Sales"
        });
    }
});

export { getSales }
