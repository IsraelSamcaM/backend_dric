export const isAdmin = (req, res, next) => {
    if (req.userRole !== 'ADMINISTRADOR') {
        return res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
    }
    next();
};