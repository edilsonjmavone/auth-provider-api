import { Router } from "express"
import db from "./../db";
import { formador, sessao, turma, usuario } from "../../drizzle/schema";
import { eq, and, or } from "drizzle-orm";
import { compareHash, genPawHash } from "../utils/pwdUtil";
import { getRefreshToken, getToken, verifyRefresh } from "../utils/authUtils";
import { verify } from "../utils/authUtils";
import { handleError } from "../utils/errorHandler";


export const routes = Router()

routes.get("/me", verify, async (req, res) => {
    const id = res.locals.tokenData.userId;
    try {
        const user = await db.select({
            id: usuario.id,
            email: usuario.email,
            userName: usuario.username,
            nome: usuario.nome,
        }).from(usuario).where(and(eq(usuario.id, id), eq(usuario.estado, "activo")))

        res.json(user[0]).status(200)
    } catch (error) {
        handleError(error, req, res);
    }
})

routes.post("/login", async (req, res) => {
    try {
        const { email, pwd } = req.body
        if (!email || !pwd) {
            throw Error("invalid_cred")
        }
        const user = await db.select({
            id: usuario.id,
            email: usuario.email,
            pwdHash: usuario.passwordHash,
            userName: usuario.username,
            nome: usuario.nome,
        })
            .from(usuario)
            .where(and(eq(usuario.email, email), eq(usuario.estado, "activo")))

        if (!(user.length > 0)) throw Error("invalid_cred")
        const userExists = user[0]
        compareHash(pwd, userExists.pwdHash)

        function seila() {
            const d = new Date()
            d.setHours(d.getHours() + 5)
            return d;
        }
        const tokens = {
            auth: getToken({
                email: userExists.email,
                id: userExists.id,
                name: userExists.nome,
            }),
            refresh: getRefreshToken({
                email: userExists.email,
                id: userExists.id,
                name: userExists.nome,
            })
        }
        res.cookie("AuthToken", tokens.auth, {
            expires: seila(),
            httpOnly: true
        })

        res.cookie("RefreshToken", tokens.refresh, {
            httpOnly: true,

        })
        // atualizar as os tokens de sessao na DB  
        await db.insert(sessao).values({
            accessToken: tokens.auth,
            refreshToken: tokens.refresh,
            idUsuario: userExists.id,
            userAgent: req.headers["user-agent"]
        })
        res.json({ message: "success" }).status(200)
        console.log("feito")
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: "invalid credentials" });
    }
})

routes.post("/add", async (req, res) => {
    const { email, name, username, pwd } = req.body
    try {
        if (!email || !pwd) {
            throw Error("missing_data")
        }
        // chechk if user exist
        const userExists = await db.select({ email: usuario.email, }).from(usuario).where(
            or(eq(usuario.email, email), eq(usuario.username, username))
        ).limit(1)

        if (userExists.length > 0) {
            throw Error("duplicate_cred")
        }
        await db.transaction(async (tx) => {
            const user = await db.insert(usuario).values({
                email,
                nome: name,
                username,
                passwordHash: genPawHash(pwd)
            })
            console.log(user[0].insertId)
        })
        res.status(201)
    } catch (error) {
        handleError(error, req, res)
    }
})

routes.get("/refresh", verifyRefresh, async (req, res) => {
    try {
        const userdData = await db
            .select({ id: usuario.id, name: usuario.nome, email: usuario.email, })
            .from(usuario).where(and(eq(usuario.estado, "activo"), eq(usuario.id, res.locals.userId)))

        if (!(userdData.length > 0)) throw Error("invalid_cred")
        const userExists = userdData[0]

        const auth = getToken({
            email: userExists.email,
            id: userExists.id,
            name: userExists.name,
        })
        function seila() {
            const d = new Date()
            d.setHours(d.getHours() + 5)
            return d;
        }
        res.cookie("AuthToken", auth, {
            expires: seila(),
            httpOnly: true,
            sameSite: "strict"
        });

        await db.update(sessao)
            .set({ accessToken: auth, })
            .where(eq(sessao.idUsuario, userExists.id))

        res.json({ message: "success" }).status(200)
    } catch (error) {
        handleError(error, req, res)
    }
})

routes.get("/logout", verifyRefresh, async (req, res) => {
    try {
        await db.update(sessao)
            .set({ encerradoEm: Date.now().toLocaleString() })
            .where(eq(sessao.idUsuario, res.locals.refreshTokenData.userId))

        res.clearCookie("AuthToken")
        res.clearCookie("RefreshToken")

        res.json({ msg: "success" }).status(201)
    } catch (error) {
        handleError(error, req, res)
    }
})

// vamos assumir que ja tens tudo feito como dever ser
// npm install - done
// credenciais da db estao feitas - 

export default routes