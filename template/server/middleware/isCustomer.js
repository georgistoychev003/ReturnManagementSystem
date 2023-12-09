export function isCollector (req, res, next) {
    if (req.payload.isCustomer){
        next();
    }else{
        return res.status(401).json({Error: "Not a customer"});
    }
}
