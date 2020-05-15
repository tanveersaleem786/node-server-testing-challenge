const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

describe("User integration tests", () => {

    beforeEach( async () => {
        await db.seed.run()
    })

    afterAll( async () => {
        await db.destroy()
    })
    
    it("GET /api/users" , async () => {
        const res = await supertest(server).get("/api/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[0]).not.toBe("")
    })

    it("POST /api/users", async () => {
       const payload = {
           username: "kashif",
           email: "kashif@gmail.com",
           address: "kashif address"
       }
       const res = await supertest(server).post("/api/users").send(payload)
       expect(res.statusCode).toBe(201)
       expect(res.type).toBe("application/json")
       expect(res.body.username).toBe("kashif")

    })

    it("POST Already Exist /api/users", async () => {
        const payload = {
            username: "tanveer",
            email: "tanveer@gmail.com",
            address: "xyz address"
        }
        const res = await supertest(server).post("/api/users").send(payload)        
        expect(res.statusCode).toBe(404)        
 
     })

    it("Delete /api/users/:id", async () => {
        
        const res = await supertest(server).delete("/api/users/3")
        expect(res.statusCode).toBe(204)        
 
     })

     it("Delete NotFound /api/users/:id", async () => {
        
        const res = await supertest(server).delete("/api/users/7")
        expect(res.statusCode).toBe(404)        
 
     })
})