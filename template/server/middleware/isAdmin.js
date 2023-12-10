export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin === 'true') {
        next();
    } else {
        res.status(403).send({ Error: "Access denied. Not an admin." });
    }
}
