import jwt from "jsonwebtoken"
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  export default authenticate