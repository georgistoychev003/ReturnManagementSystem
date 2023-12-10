export const isCustomer = (req, res, next) => {
    if (req.user && req.user.userRole === 'customer') {
        next();
    } else {
        res.status(403).send({ Error: "Access denied. Not a customer." });
    }
}
