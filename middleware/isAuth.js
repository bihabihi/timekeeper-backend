import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({message: "Unauthorised bc of no bearer token"})
    }
    
    // used to extract the actual token value from the Authorization header which typically contains a bearer token
    const token = bearerToken.split(" ")[1];
    // to check if token is provided
    if (!token) {
        return res.status(401).json({message: "Unauthorized"})
    }

    // to check if token is valid
    const secretKey = "fullstackdeveloperletsgoer";
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Invalid token"})
        }
        
        // nak tengok apa dalam decoded ni, boleh c.log decoded

        // dah settle segala check, kita akan pass user id and email to the next middleware or controller
        req.user_id = decoded.id;
        req.userEmail = decoded.email;

        next();
    })
}

export default isAuth;