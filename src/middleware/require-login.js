module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.json({ error: "You need to login first." });
}