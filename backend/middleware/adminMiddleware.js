export const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Admin access denied" });
  }
};
