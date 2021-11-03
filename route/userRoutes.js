import { Router } from "express";
import { check, param } from "express-validator";

import { getUsers, getUserByUsername, addUser, updateUser, deleteUser, deleteAllUsers } from "../controllers/userControllers.js";


const router = Router();

router.get("/", getUsers);
router.get("/:un", getUserByUsername);

router.post("/add", [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
], addUser);
router.post("/update/:un", [
    param('un', 'Username cannot be empty').not().isEmpty()
], updateUser);

router.delete("/delete/", [
    check('username', 'Username is required').not().isEmpty()
], deleteUser);
router.delete("/delete/all", deleteAllUsers);

export default router;