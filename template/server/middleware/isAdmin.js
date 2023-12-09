export function isAdmin (req, res, next) {
    if (req.payload.isAdmin){
        next();
    }else{
        return res.status(401).json({Error: "Not admin"});
    }
}
