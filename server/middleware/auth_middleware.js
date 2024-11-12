import jwt from 'jsonwebtoken'


export const protect = async (req, res, next) => {

    try {
        const token = await req.headers["authorization"].split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

            if (err) {
                console.log(err);
                return res.status(200).json({ error: "invalid token!" })
            }

            else {
                req.body.userId = decode.id
                next()
            }

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Auth error!" })

    }

}