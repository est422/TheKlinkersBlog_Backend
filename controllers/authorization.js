const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/default.json');
const decode = require('jsonwebtoken/decode');

module.exports.verifyToken = async (req, res, next) => {

    const token = req.header('Authorization');
    if(!token) return res.status(401).send('unauthorized');

    try{
        const verifed = jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
            if(err) return res.status(401).send(err);
            // const user = await User.findOne({ _id: decoded._id });
            req.id = decoded.Id;
            next();
        });
        // req.user = verifed;
        
    }catch(err){
        res.status(400).send(err);
    }
}