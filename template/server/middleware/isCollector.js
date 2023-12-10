export const isCollector = (req, res, next) => {
    if (req.user && req.user.userRole === 'collector') {
        next();
    } else {
        res.status(403).json({ Error: "Access denied. Not a collector." });
    }
}
