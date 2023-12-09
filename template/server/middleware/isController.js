export function isCollector (req, res, next) {
    if (req.payload.isController){
        next();
    }else{
        return res.status(401).json({Error: "Not a controller"});
    }
}
