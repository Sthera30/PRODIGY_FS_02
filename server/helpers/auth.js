import bcrypt from 'bcrypt'


export const hashPassword = (password) => {

    return new Promise((resolve, reject) => {

        //increase security

        bcrypt.genSalt(12, (err, salt) => {

            if (err) {
                reject(err)
            }

            bcrypt.hash(password, salt, (err, hash) => {

                if (err) {
                    reject(err)
                }

                resolve(hash)

            })

        })


    })

}

//confirm password security

export const hashconfirmPassword = (confifrmPassword) => {

    return new Promise((resolve, reject) => {

        //increase security

        bcrypt.genSalt(12, (err, salt) => {

            if (err) {
                reject(err)
            }

            bcrypt.hash(confifrmPassword, salt, (err, hash) => {

                if (err) {
                    reject(err)
                }

                resolve(hash)

            })

        })

    })

}

export const hashOtp = (otp) => {

    return new Promise((resolve, reject) => {

        //increase security

        bcrypt.genSalt(12, (err, salt) => {

            if (err) {
                reject(err)
            }

            bcrypt.hash(otp, salt, (err, hash) => {

                if (err) {
                    reject(err)
                }

                resolve(hash)

            })

        })

    })
}

export const hashingOtp = (otp) => {

    return new Promise((resolve, reject) => {

        //increase security
        
        bcrypt.genSalt(12, (err, salt) => {

            if (err) {
                reject(err)
            }

            bcrypt.hash(otp, salt, (err, hash) => {

                if (err) {
                    reject(err)
                }

                resolve(hash)

            })

        })

    })

}

export function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

export function compareOtp(otp, hashedOtp) {
    return bcrypt.compare(otp, hashedOtp)
}