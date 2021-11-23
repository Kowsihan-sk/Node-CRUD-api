import { Router } from "express";
import { check, param } from "express-validator";

import { getUsers, getUserByUsername, addUser, updateUser, deleteUser, deleteAllUsers } from "../controllers/userControllers.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - username
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: name set by user 
 *              username:
 *                  type: string
 *                  description: username set by user
 *              password:
 *                  type: string
 *                  description: password set by user
 *          example:
 *              name: Rahul
 *              username: rauleya
 *              password: 101_rahul
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The User managing API
 */


const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Returns the list of all the users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: The list of the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);


/**
 * @swagger
 * /users/{un}:
 *  get:
 *      summary: Get the user by username
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: un 
 *            schema:
 *              type: string
 *            required: true
 *            description: The username 
 *      responses:
 *          200:
 *              description: The user description by username
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: The user not found
 */
router.get("/:un", getUserByUsername);

/**
 * @swagger
 * /users/add:
 *  post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: The user already exists, try a different username
 */
router.post("/add", [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
], addUser);

/**
 * @swagger
 * /users/update/{un}:
 *  post:
 *      summary: Update the user's detail
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: un 
 *            schema:
 *              type: string
 *            required: true
 *            description: The username 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: The user doesn't exist, try a different username
 *          401:
 *              description: Invalid username/ password
 */
router.post("/update/:un", [
    param('un', 'Username cannot be empty').not().isEmpty()
], updateUser);

/**
 * @swagger
 * /users/delete/:
 *  delete:
 *      summary: Remove the user by username and password
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     required:
 *                         - username
 *                         - password
 *                     properties:
 *                         username:
 *                             type: string
 *                             description: username set by user 
 *                         password:
 *                             type: string
 *                             description: password set by user
 *                     example:
 *                         username: rauleya
 *                         password: 101_rahul
 *                  
 *      responses:
 *          200:
 *              description: user deleted successfully
 *          401:
 *              description: Invalid username/ password
 *          404:
 *              description: The user doesn't exist, try a different username
 */
router.delete("/delete/", [
    check('username', 'Username is required').not().isEmpty()
], deleteUser);
router.delete("/delete/all", deleteAllUsers);

export default router;