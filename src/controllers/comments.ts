import { Request, Response } from "express"
import prisma from "../lib/db";


// http://localhost:8080/api/comments?id=123456789 #id : idPost
export const getComment = async (req: Request, res: Response) => {
    const postId = req.query.id as string;
    try {
        const existePost = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
            }
        })

        if (!existePost) {
            return res.status(404).json({ ok: false, message: "Post not found" })
        }
        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
            include: {
                user: true,
            }
        })
        if (comments.length <= 0) {
            return res.status(404).json({ ok: false, message: "No comments found", comments: [] })
        }
        return res.status(200).json({ ok: true, comments, message: "Comments found" })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}
// http://localhost:8080/api/comments/this?id=123456789 #id : idComment
export const getThisComment = async (req: Request, res: Response) => {
    const commentId = req.query.id as string;
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })
        if (!comment) {
            return res.status(404).json({ ok: false, message: "Comment not found" })
        }
        return res.status(200).json({ ok: true, comment, message: "Comment found" })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}

// http://localhost:8080/api/comments/create?id=123456789 #id : idPost && body:{content, authorId}
export const createComment = async (req: Request, res: Response) => {
    const postId = req.query.id as string;
    const { content, authorId } = req.body;
    try {
        const existePost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!existePost) {
            return res.status(404).json({ ok: false, message: "Post not found" })
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId,
                postId,
            }
        })

        if (!comment) {
            return res.status(400).json({ ok: false, message: "Comment not created" })
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
            include: {
                user: true,
            }
        })
        return res.status(201).json({ ok: true, message: "Comment created", comments, numberOfComments: comments.length })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
// http://localhost:8080/api/comments/updete?id=123456789 #id : idComment && body:{content}
export const updeteComment = async (req: Request, res: Response) => {
    const commentId = req.query.id as string;
    const { content } = req.body;
    try {
        const existeComment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })

        if (!existeComment) {
            return res.status(404).json({ ok: false, message: "Comment not found" })
        }
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content
            }
        })
        if (!comment) {
            return res.status(400).json({ ok: false, message: "Comment not updated" })
        }
        const comments = await prisma.comment.findMany({
            where: {
                postId: comment.postId
            },
            include: {
                user: true,
            }
        })
        return res.status(200).json({ ok: true, message: "Comment updated", comments, numberOfComments: comments.length })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
// http://localhost:8080/api/comments/delete?id=123456789 #id : idComment
export const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.query.id as string;
    try {
        const existeComment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })

        if (!existeComment) {
            return res.status(404).json({ ok: false, message: "Comment not found" })
        }
        const commentDeleted = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        if (!commentDeleted) {

        }
        const comments = await prisma.comment.findMany({
            where: {
                postId: existeComment.postId
            },
            include: {
                user: true,
            }
        })
        return res.status(200).json({ ok: true, message: "Comment deleted", comments, numberOfComments: comments.length })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}



