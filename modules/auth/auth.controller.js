import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Multiple IDs from same email address are not allowed",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const new_user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        const token = jwt.sign(
            {
                user_id: new_user.user_id,
                email: new_user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            token: token,
            user: {
                email: new_user.email,
                user_id: new_user.user_id,
                created_at: new_user.created_at,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                user_id: existingUser.user_id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            token: token,
            user: {
                email: existingUser.email,
                user_id: existingUser.user_id,
                created_at: existingUser.created_at,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const validate = async (req, res) => {
    try {
        const user = req.user;

        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (existingUser) {
            const token = jwt.sign(
                {
                    user_id: existingUser.user_id,
                    email: existingUser.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(200).json({
                success: true,
                token: token,
                user: {
                    email: existingUser.email,
                    user_id: existingUser.user_id,
                    created_at: existingUser.created_at,
                },
            });
        }
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};
