export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin === 'true') {
        next();
    } else {
        res.status(403).json({ Error: "Access denied. Not an admin." });
    }
}
