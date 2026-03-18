const jwt = require ("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"authorized header is missing or nvalid"});

        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message:"invalid or expired token"});
    }
}

module.exports = authMiddleware;