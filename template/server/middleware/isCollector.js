export function isCollector (req, res, next) {
    if (req.payload.isCollector){
        next();
    } else {
        return res.status(401).json({Error: "Not a collector"});
    }
}
