import { relations } from "drizzle-orm/relations";
import { turma, aula, sala, disponibilidade, periodoLectivo, aulaDia, dia, cv, cvModulo, modulo, usuario, credencial, curso, cursoCv, formador, departamento, log, usuarioPerfil, perfil } from "./schema";

export const aulaRelations = relations(aula, ({one, many}) => ({
	turma: one(turma, {
		fields: [aula.idTurma],
		references: [turma.id]
	}),
	sala: one(sala, {
		fields: [aula.idSala],
		references: [sala.id]
	}),
	disponibilidade: one(disponibilidade, {
		fields: [aula.idDisponibilidade],
		references: [disponibilidade.id]
	}),
	periodoLectivo: one(periodoLectivo, {
		fields: [aula.idPeriodoLectivo],
		references: [periodoLectivo.id]
	}),
	aulaDias: many(aulaDia),
}));

export const turmaRelations = relations(turma, ({one, many}) => ({
	aulas: many(aula),
	periodoLectivos: many(periodoLectivo),
	cursoCv: one(cursoCv, {
		fields: [turma.idCursoCv],
		references: [cursoCv.id]
	}),
}));

export const salaRelations = relations(sala, ({many}) => ({
	aulas: many(aula),
}));

export const disponibilidadeRelations = relations(disponibilidade, ({one, many}) => ({
	aulas: many(aula),
	formador: one(formador, {
		fields: [disponibilidade.idFormador],
		references: [formador.id]
	}),
	departamento: one(departamento, {
		fields: [disponibilidade.idDepartamento],
		references: [departamento.id]
	}),
}));

export const periodoLectivoRelations = relations(periodoLectivo, ({one, many}) => ({
	aulas: many(aula),
	modulo: one(modulo, {
		fields: [periodoLectivo.idModulo],
		references: [modulo.id]
	}),
	turma: one(turma, {
		fields: [periodoLectivo.idTurma],
		references: [turma.id]
	}),
}));

export const aulaDiaRelations = relations(aulaDia, ({one}) => ({
	aula: one(aula, {
		fields: [aulaDia.idAula],
		references: [aula.id]
	}),
	dia: one(dia, {
		fields: [aulaDia.idDia],
		references: [dia.id]
	}),
}));

export const diaRelations = relations(dia, ({many}) => ({
	aulaDias: many(aulaDia),
}));

export const cvModuloRelations = relations(cvModulo, ({one}) => ({
	cv: one(cv, {
		fields: [cvModulo.idCv],
		references: [cv.id]
	}),
	modulo: one(modulo, {
		fields: [cvModulo.idModulo],
		references: [modulo.id]
	}),
}));

export const cvRelations = relations(cv, ({many}) => ({
	cvModulos: many(cvModulo),
	cursoCvs: many(cursoCv),
}));

export const moduloRelations = relations(modulo, ({one, many}) => ({
	cvModulos: many(cvModulo),
	curso: one(curso, {
		fields: [modulo.idCurso],
		references: [curso.id]
	}),
	periodoLectivos: many(periodoLectivo),
}));

export const credencialRelations = relations(credencial, ({one}) => ({
	usuario: one(usuario, {
		fields: [credencial.idUsuario],
		references: [usuario.id]
	}),
}));

export const usuarioRelations = relations(usuario, ({many}) => ({
	credencials: many(credencial),
	formadors: many(formador),
	logs: many(log),
	usuarioPerfils: many(usuarioPerfil),
}));

export const cursoCvRelations = relations(cursoCv, ({one, many}) => ({
	curso: one(curso, {
		fields: [cursoCv.idCurso],
		references: [curso.id]
	}),
	cv: one(cv, {
		fields: [cursoCv.idCv],
		references: [cv.id]
	}),
	turmas: many(turma),
}));

export const cursoRelations = relations(curso, ({many}) => ({
	cursoCvs: many(cursoCv),
	modulos: many(modulo),
}));

export const formadorRelations = relations(formador, ({one, many}) => ({
	disponibilidades: many(disponibilidade),
	usuario: one(usuario, {
		fields: [formador.idUsuario],
		references: [usuario.id]
	}),
}));

export const departamentoRelations = relations(departamento, ({many}) => ({
	disponibilidades: many(disponibilidade),
}));

export const logRelations = relations(log, ({one}) => ({
	usuario: one(usuario, {
		fields: [log.idUsuario],
		references: [usuario.id]
	}),
}));

export const usuarioPerfilRelations = relations(usuarioPerfil, ({one}) => ({
	usuario: one(usuario, {
		fields: [usuarioPerfil.idUsuario],
		references: [usuario.id]
	}),
	perfil: one(perfil, {
		fields: [usuarioPerfil.idPerfil],
		references: [perfil.id]
	}),
}));

export const perfilRelations = relations(perfil, ({many}) => ({
	usuarioPerfils: many(usuarioPerfil),
}));