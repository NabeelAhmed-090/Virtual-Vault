import bcrypt from 'bcryptjs'
const users = [
    {
        firstName: "admin",
        lastName: "user",
        userName: "admin_user",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        city: "lahore"
    },
    {
        firstName: "nabeel",
        lastName: "ahmed",
        userName: "ahmednabeel",
        email: "nabeel@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        city: "lahore"
    },
    {
        firstName: "laiba",
        lastName: "arshad",
        userName: "laiba_la",
        email: "laiba@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        city: "sahiwal"
    }
]

export default users