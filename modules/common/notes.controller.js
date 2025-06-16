import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user = req.user;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required field",
            });
        }

        const new_note = await prisma.notes.create({
            data: {
                title,
                content,
                user_id: user.user_id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Successfully saved in DB",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const fetch_all = async (req, res) => {
    try {
        const user = req.user;

        const notes = await prisma.notes.findMany({
            where: { user_id: user.user_id },
        });

        return res.status(200).json({
            success: true,
            notes: notes,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const fetch_one = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing note ID",
            });
        }

        const notes = await prisma.notes.findUnique({
            where: { note_id: parseInt(id) },
        });

        return res.status(200).json({
            success: true,
            notes: notes,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const update_one = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing note ID",
            });
        }

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required field",
            });
        }

        const notes = await prisma.notes.update({
            where: { note_id: parseInt(id) },
            data: {
                title,
                content,
            },
        });

        return res.status(200).json({
            success: true,
            notes: notes,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};

export const delete_one = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing note ID",
            });
        }

        const notes = await prisma.notes.delete({
            where: { note_id: parseInt(id) },
        });

        return res.status(200).json({
            success: true,
            message: "Note deleted",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Our server ran into same trouble. Please try again later",
        });
    }
};
