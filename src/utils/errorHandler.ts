import { Request, Response, NextFunction } from "express"

export function handleError(err: Error | any, req: Request, res: Response, next?: NextFunction) {
    if (!(err instanceof Error)) {
        console.error("Unknown error type:", err)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

    const message = err.message.toLowerCase()

    if (message.includes("invalid_cred")) {
        return res.status(401).json({ msg: "Invalid credentials" })
    }

    if (message.includes("missing_data")) {
        return res.status(400).json({ msg: "Missing required data" })
    }

    if (message.includes("not_authorized")) {
        return res.status(401).json({ msg: "Authentication required" })
    }

    if (message.includes("forbidden")) {
        return res.status(403).json({ msg: "Access denied" })
    }

    console.error("Unhandled error:", err)
    return res.status(500).json({ msg: "Something went wrong" })
}
