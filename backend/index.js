const express = require("express")
const Connection = require("./configs/connection")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const ImageRouter = require("./routes/image")
const BlogRouter = require("./routes/blog/index")
const UserRouter = require("./routes/user/index")
require("dotenv").config()

/** ---------- Initiaization ---------- */
const App = express();
const PORT = process.env.PORT;

const connectionString = "mongodb://localhost:27017/blogging"

/** ---------- Connnection ------------ */
Connection(connectionString);

/** ---------- Middlewares ------------ */
App.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}))
App.use(cookieParser())
App.use(express.json());
App.use(express.urlencoded({extended: false}));


/** ---------- Routes ----------------- */
// App.use("/", (req, res)=> res.json({message: "you are not authorized"}))
App.use("/images", ImageRouter)
App.use("/blog", BlogRouter)
App.use("/user", UserRouter);

/** ---------- Stating App ------------ */
App.listen(PORT, (e)=> console.log(`server started at http://localhost:${PORT}`))