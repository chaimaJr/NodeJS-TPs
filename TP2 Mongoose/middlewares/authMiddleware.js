const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    
    const token = req.header("Authorization");
    if(!token){
        res.status(401).send({message: "Not authorized"});
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
    req.user = decoded;
    
    next();
}

module.exports = auth