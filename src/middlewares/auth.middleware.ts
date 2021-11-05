const jwt = require('jsonwebtoken');

export default function (req: any, res: any, next: any) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
      jwt.verify(bearerToken, process.env.TOKEN_KEY, (err: any, data: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = data;
        next();
    });
  } else {
    res.status(403).json({ error: 'No token available on authorization header' });
  }
}



