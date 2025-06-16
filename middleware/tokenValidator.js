import jwt from "jsonwebtoken";

const tokenValidator = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }

    try {
        // console.log("hello");
        const token = authHeader.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    }
};

export default tokenValidator;
