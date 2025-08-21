import { Router } from "express"
import db from "./../db";
import { formador, sessao, turma, usuario, perfil, usuarioPerfil } from "../../drizzle/schema";
import { eq, and, or, sql } from "drizzle-orm";
import { compareHash, genPawHash } from "../utils/pwdUtil";
import { getRefreshToken, getToken, jwtPayloadType, verifyRefresh } from "../utils/authUtils";
import { verify } from "../utils/authUtils";
import { handleError } from "../utils/errorHandler";


export const routes = Router()

routes.get("/me", verify, async (req, res) => {
    const { id }: jwtPayloadType = res.locals.tokenData;
    console.log(id)
    try {
        const user = await db.select({
            id: usuario.id,
            email: usuario.email,
            userName: usuario.username,
            nome: usuario.nome,
            role: perfil.nome,  // fetch the user's profile name
        })
            .from(usuario)
            .innerJoin(usuarioPerfil, eq(usuarioPerfil.idUsuario, usuario.id))
            .innerJoin(perfil, eq(perfil.id, usuarioPerfil.idPerfil))
            .where(and(eq(usuario.id, id), eq(usuario.estado, "activo")))
            .limit(1);

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

        if (!compareHash(pwd, userExists.pwdHash)) throw Error("invalid_cred")
            
        // creating a session

        //check if there is an existing session
        function seila() {
            const d = new Date()
            d.setHours(d.getHours() + 24)
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
            userAgent: req.headers["user-agent"],
            expiraEm: sql`DATE_ADD(NOW(), INTERVAL 24 HOUR)`
        })

        res.json({ message: "success" }).status(200)
        console.log("feito")
    } catch (error) {
        handleError(error, req, res)
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
            return
        })
        res.json({ message: "success" }).status(201)
        console.log("done")
    } catch (error) {
        handleError(error, req, res)
    }
})

routes.get("/refresh", verifyRefresh, async (req, res) => {
    try {
        const decodedData: jwtPayloadType = res.locals.refreshTokenData
        const userdData = await db
            .select({ id: usuario.id, name: usuario.nome, email: usuario.email, })
            .from(usuario).where(and(eq(usuario.estado, "activo"), eq(usuario.id, decodedData.id))).limit(1)

        if (!(userdData.length > 0)) throw Error("invalid_cred")
        const userExists = userdData[0]

        const auth = getToken({
            email: userExists.email,
            id: userExists.id,
            name: userExists.name,
        })
        function seila() {
            const d = new Date()
            d.setHours(d.getHours() + 24)
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
            .set({ encerradoEm: sql`NOW()` })
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