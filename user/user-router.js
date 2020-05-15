const express = require("express")

const userModel = require("./user-model")

const router = express.Router()


router.get("/", async (req, res, next) => {

    try {
          const users = await userModel.getUsers()
          res.json(users)
    } catch(err) {
          next(err)
    }

})

router.post("/", async (req, res, next) => {

    try {
         
          if(req.body.constructor === Object && Object.keys(req.body).length ===0) {
              res.status(404).json({message:"Missing data"})
          } else {
        
                    const {username, email, address} = req.body
                    
                    if(!username || !email) {

                        res.status(404).json({message: "missing name and email fields"})
                    
                    } else {

                        let user = await userModel.find({username}).first()
                       // console.log(user)
                        if(user) {

                            res.status(404).json({message: "Username already taken"})

                        } else {

                            user = await userModel.find({email}).first()
                            if(user) {

                                res.status(404).json({message: "Email already taken"})

                            } else {

                                const payload = {
                                    username: username,
                                    email: email,
                                    address: address
                                }
            
                                const [id] = await userModel.create(payload)
                                const user = await userModel.find({id}).first()
                                res.status(201).json(user)

                            }
                        }

                    }

                    
            }

    } catch(err) {
          next(err)
    }

})

router.delete("/:id", async (req, res, next) => {

    try {
        const id = req.params.id
        user = await userModel.find({id}).first() 
        if(user) {
            await userModel.remove(id)
            res.status(204).end()
        } else {
            res.status(404).json({message: "Invalid User ID"})
        } 

    } catch(err) {
          next(err)
    }

})

module.exports = router