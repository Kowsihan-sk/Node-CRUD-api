import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name username');

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const getUserByUsername = async (req, res) => {
    try {

        const user = await User.findOne({ username: req.params.un }, 'name username');

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist, use a different username" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const addUser = async (req, res) => {
    try {
        validationResult(req).throw();

        const { name: name, username: username, password: plain_password } = req.body;

        const checkUser = await User.findOne({ username: username });
        if (checkUser) {
            return res.status(400).json({ message: "user already exists, use a different username" });
        }

        const password = await bcrypt.hash(plain_password, 10);

        const new_user = await User({ name: name, username: username, password: password });
        new_user.save();

        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const updateUser = async (req, res) => {
    try {
        validationResult(req).throw();

        const { name: new_name, username: new_username, password: password } = req.body;
        const user_name = req.params.un;

        const user = await User.findOne({ username: user_name }).lean();

        if (!user) {
            return res.status(404).json({ message: "user doesn't exist, use a different username" });
        }

        if (await bcrypt.compare(password, user.password)) {

            if (new_name) {
                await User.findOneAndUpdate({ username: user.username }, { $set: { name: new_name } });
            }
            if (new_username) {
                await User.findOneAndUpdate({ username: user.username }, { $set: { username: new_username } });
            }

            return res.status(200).json({ message: "user updated successfully" });
        }

        res.status(401).json({ error: "Invalid username/ password" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        validationResult(req).throw();

        const { username: username, password: password } = req.body;

        const user = await User.findOne({ username: username }).lean();

        if (!user) {
            return res.status(404).json({ message: "user doesn't exist, use a different username" });
        }

        if (await bcrypt.compare(password, user.password)) {
            await User.deleteOne({ username: username });

            return res.status(200).json({ message: "user deleted successfully" });
        }

        res.status(401).json({ error: "Invalid username/ password" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});

        res.status(200).json({ message: "items deleted if/any successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}