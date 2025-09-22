import { relations } from "drizzle-orm/relations";
import { disponibilidade, aula, periodoLectivo, sala, turma, aulaDia, dia, cv, cvModulo, modulo, curso, cursoCv, departamento, formador, usuario, log, sessao, perfil, usuarioPerfil, pessoa, bilheteDeIdentidade, nuit, passaporte } from "./schema";

export const aulaRelations = relations(aula, ({one, many}) => ({
	disponibilidade: one(disponibilidade, {
		fields: [aula.idDisponibilidade],
		references: [disponibilidade.id]
	}),
	periodoLectivo: one(periodoLectivo, {
		fields: [aula.idPeriodoLectivo],
		references: [periodoLectivo.id]
	}),
	sala: one(sala, {
		fields: [aula.idSala],
		references: [sala.id]
	}),
	turma: one(turma, {
		fields: [aula.idTurma],
		references: [turma.id]
	}),
	aulaDias: many(aulaDia),
}));

export const disponibilidadeRelations = relations(disponibilidade, ({one, many}) => ({
	aulas: many(aula),
	departamento: one(departamento, {
		fields: [disponibilidade.idDepartamento],
		references: [departamento.id]
	}),
	formador: one(formador, {
		fields: [disponibilidade.idFormador],
		references: [formador.id]
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

export const salaRelations = relations(sala, ({many}) => ({
	aulas: many(aula),
}));

export const turmaRelations = relations(turma, ({one, many}) => ({
	aulas: many(aula),
	periodoLectivos: many(periodoLectivo),
	cursoCv: one(cursoCv, {
		fields: [turma.idCursoCv],
		references: [cursoCv.id]
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

export const departamentoRelations = relations(departamento, ({many}) => ({
	disponibilidades: many(disponibilidade),
}));

export const formadorRelations = relations(formador, ({one, many}) => ({
	disponibilidades: many(disponibilidade),
	usuario: one(usuario, {
		fields: [formador.idUsuario],
		references: [usuario.id]
	}),
}));

export const usuarioRelations = relations(usuario, ({many}) => ({
	formadors: many(formador),
	logs: many(log),
	sessaos: many(sessao),
	usuarioPerfils: many(usuarioPerfil),
}));

export const logRelations = relations(log, ({one}) => ({
	usuario: one(usuario, {
		fields: [log.idUsuario],
		references: [usuario.id]
	}),
}));

export const sessaoRelations = relations(sessao, ({one}) => ({
	usuario: one(usuario, {
		fields: [sessao.idUsuario],
		references: [usuario.id]
	}),
}));

export const usuarioPerfilRelations = relations(usuarioPerfil, ({one}) => ({
	perfil: one(perfil, {
		fields: [usuarioPerfil.idPerfil],
		references: [perfil.id]
	}),
	usuario: one(usuario, {
		fields: [usuarioPerfil.idUsuario],
		references: [usuario.id]
	}),
}));

export const perfilRelations = relations(perfil, ({many}) => ({
	usuarioPerfils: many(usuarioPerfil),
}));

export const bilheteDeIdentidadeRelations = relations(bilheteDeIdentidade, ({one}) => ({
	pessoa: one(pessoa, {
		fields: [bilheteDeIdentidade.pessoaId],
		references: [pessoa.id]
	}),
}));

export const pessoaRelations = relations(pessoa, ({many}) => ({
	bilheteDeIdentidades: many(bilheteDeIdentidade),
	nuits: many(nuit),
	passaportes: many(passaporte),
}));

export const nuitRelations = relations(nuit, ({one}) => ({
	pessoa: one(pessoa, {
		fields: [nuit.pessoaId],
		references: [pessoa.id]
	}),
}));

export const passaporteRelations = relations(passaporte, ({one}) => ({
	pessoa: one(pessoa, {
		fields: [passaporte.pessoaId],
		references: [pessoa.id]
	}),
}));