export const isController = (req, res, next) => {
    if (req.user && req.user.userRole === 'controller') {
        next();
    } else {
        res.status(403).json({ Error: "Access denied. Not a controller." });
    }
};
