// src/controllers/contentController.ts
import { Request, Response } from "express";
import db from "../db";
import { curso, modulo, turma, sala } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const contentController = {
  async getContent(req: Request, res: Response) {
    try {
      const { conteudo, id } = req.query;

      let content = ""; // ✅ DECLARAR content FORA do switch

      // Conteúdo dinâmico baseado no parâmetro
      switch (conteudo) {
        // DASHBOARD - Estatísticas
        case "dashboard":
          try {
            const [cursosCount, modulosCount, turmasCount, salasCount] =
              await Promise.all([
                db.select({ count: sql<number>`count(*)` }).from(curso),
                db.select({ count: sql<number>`count(*)` }).from(modulo),
                db.select({ count: sql<number>`count(*)` }).from(turma),
                db.select({ count: sql<number>`count(*)` }).from(sala),
              ]);

            content = `
              <div class="space-y-6">
                <h1 class="text-2xl font-semibold">Painel Principal</h1>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-blue-50 p-4 rounded-lg border">
                    <h3 class="font-semibold text-blue-700">Cursos</h3>
                    <p class="text-2xl">${cursosCount[0]?.count || 0}</p>
                  </div>
                  <div class="bg-green-50 p-4 rounded-lg border">
                    <h3 class="font-semibold text-green-700">Módulos</h3>
                    <p class="text-2xl">${modulosCount[0]?.count || 0}</p>
                  </div>
                  <div class="bg-purple-50 p-4 rounded-lg border">
                    <h3 class="font-semibold text-purple-700">Turmas</h3>
                    <p class="text-2xl">${turmasCount[0]?.count || 0}</p>
                  </div>
                  <div class="bg-orange-50 p-4 rounded-lg border">
                    <h3 class="font-semibold text-orange-700">Salas</h3>
                    <p class="text-2xl">${salasCount[0]?.count || 0}</p>
                  </div>
                </div>
              </div>
            `;
          } catch (error) {
            content = `
              <div class="space-y-4">
                <h1 class="text-2xl font-semibold">Dashboard</h1>
                <p>Erro ao carregar estatísticas</p>
              </div>
            `;
          }
          break;

        // LISTAR CURSOS
        case "listar_cursos":
          try {
            const cursos = await db.select().from(curso);
            content = `
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <h1 class="text-2xl font-semibold">Lista de Cursos</h1>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded">Novo Curso</button>
                </div>
                
                <div class="bg-white rounded-lg border">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left">Nome</th>
                        <th class="px-4 py-2 text-left">Descrição</th>
                        <th class="px-4 py-2 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${cursos
                        .map(
                          (curso) => `
                        <tr class="border-t">
                          <td class="px-4 py-2">${curso.nome}</td>
                          <td class="px-4 py-2">${curso.descricao || "-"}</td>
                          <td class="px-4 py-2">
                            <button class="text-blue-500 hover:text-blue-700 mr-2">Editar</button>
                            <button class="text-red-500 hover:text-red-700">Eliminar</button>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `;
          } catch (error) {
            content = `
              <div class="space-y-4">
                <h1 class="text-2xl font-semibold">Listar Cursos</h1>
                <p>Erro ao carregar lista de cursos</p>
              </div>
            `;
          }
          break;

        // CONTEÚDO PADRÃO (fallback)
        default:
          content = `
            <div class="space-y-4">
              <h1 class="text-2xl font-semibold">${conteudo || "Dashboard"}</h1>
              <p>Conteúdo em desenvolvimento...</p>
            </div>
          `;
          break;
      }

      res.json({
        sucesso: true,
        conteudo: content,
      });
    } catch (error) {
      console.error("Erro no contentController:", error);
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor",
      });
    }
  },

  // Para ações POST (criar, editar, etc)
  async handleAction(req: Request, res: Response) {
    try {
      const { action, data } = req.body;

      switch (action) {
        case "create_curso":
          await db.insert(curso).values(data);
          break;

        case "update_curso":
          await db.update(curso).set(data).where(eq(curso.id, data.id));
          break;

        default:
          return res
            .status(400)
            .json({ sucesso: false, mensagem: "Ação não reconhecida" });
      }

      res.json({ sucesso: true, mensagem: "Ação realizada com sucesso" });
    } catch (error) {
      console.error("Erro na ação:", error);
      res.status(500).json({ sucesso: false, mensagem: "Erro na ação" });
    }
  },
};
