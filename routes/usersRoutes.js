const router = require("express").Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());
const { verifyToken } = require("../controllers/authorization");

//Import users controller
const usersController = require("../controllers/usersControllers");

//Get all users
router.get("/", usersController.getAllUsers);

//Get user by id
router.get("/:id", usersController.getUser);

//Post user
router.post("/create", usersController.createUser);

//Login user
router.post("/login", usersController.loginUser);

//Put user
router.put("/update/:id", usersController.editUser);

//Delete user
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
