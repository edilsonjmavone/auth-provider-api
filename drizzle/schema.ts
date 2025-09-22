import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, time, varchar, text, date, datetime, mysqlEnum, unique, timestamp, float } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const aula = mysqlTable("Aula", {
	id: int().autoincrement().notNull(),
	horaInicio: time("hora_inicio").notNull(),
	horaFim: time("hora_fim").notNull(),
	idTurma: int("id_turma").references(() => turma.id),
	idSala: int("id_sala").references(() => sala.id),
	idDisponibilidade: int("id_disponibilidade").references(() => disponibilidade.id),
	idPeriodoLectivo: int("id_periodoLectivo").references(() => periodoLectivo.id),
},
(table) => [
	index("id_disponibilidade").on(table.idDisponibilidade),
	index("id_periodoLectivo").on(table.idPeriodoLectivo),
	index("id_sala").on(table.idSala),
	index("id_turma").on(table.idTurma),
	primaryKey({ columns: [table.id], name: "Aula_id"}),
]);

export const aulaDia = mysqlTable("Aula_Dia", {
	id: int().autoincrement().notNull(),
	idAula: int("id_aula").references(() => aula.id),
	idDia: int("id_dia").references(() => dia.id),
},
(table) => [
	index("id_aula").on(table.idAula),
	index("id_dia").on(table.idDia),
	primaryKey({ columns: [table.id], name: "Aula_Dia_id"}),
]);

export const cv = mysqlTable("CV", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }).notNull(),
	descricao: text(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "CV_id"}),
]);

export const cvModulo = mysqlTable("CV_Modulo", {
	id: int().autoincrement().notNull(),
	idCv: int("id_cv").references(() => cv.id),
	idModulo: int("id_modulo").references(() => modulo.id),
},
(table) => [
	index("id_cv").on(table.idCv),
	index("id_modulo").on(table.idModulo),
	primaryKey({ columns: [table.id], name: "CV_Modulo_id"}),
]);

export const curso = mysqlTable("Curso", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }).notNull(),
	descricao: text(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Curso_id"}),
]);

export const cursoCv = mysqlTable("Curso_CV", {
	id: int().autoincrement().notNull(),
	idCurso: int("id_curso").references(() => curso.id),
	idCv: int("id_cv").references(() => cv.id),
},
(table) => [
	index("id_curso").on(table.idCurso),
	index("id_cv").on(table.idCv),
	primaryKey({ columns: [table.id], name: "Curso_CV_id"}),
]);

export const departamento = mysqlTable("Departamento", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Departamento_id"}),
]);

export const dia = mysqlTable("Dia", {
	id: int().autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	data: date({ mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Dia_id"}),
]);

export const disponibilidade = mysqlTable("Disponibilidade", {
	id: int().autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	data: date({ mode: 'string' }).notNull(),
	horaInicio: time("hora_inicio").notNull(),
	horaFim: time("hora_fim").notNull(),
	idFormador: int("id_formador").notNull().references(() => formador.id),
	idDepartamento: int("id_departamento").notNull().references(() => departamento.id),
},
(table) => [
	index("id_departamento").on(table.idDepartamento),
	index("id_formador").on(table.idFormador),
	primaryKey({ columns: [table.id], name: "Disponibilidade_id"}),
]);

export const formador = mysqlTable("Formador", {
	id: int().autoincrement().notNull(),
	idUsuario: int("id_usuario").notNull().references(() => usuario.id),
	especialidade: varchar({ length: 100 }),
},
(table) => [
	index("id_usuario").on(table.idUsuario),
	primaryKey({ columns: [table.id], name: "Formador_id"}),
]);

export const log = mysqlTable("Log", {
	id: int().autoincrement().notNull(),
	idUsuario: int("id_usuario").references(() => usuario.id),
	acao: varchar({ length: 100 }).notNull(),
	entidadeAfetada: varchar("entidade_afetada", { length: 100 }),
	detalhe: text(),
	dataHora: datetime("data_hora", { mode: 'string'}).default(sql`(now())`),
},
(table) => [
	index("id_usuario").on(table.idUsuario),
	primaryKey({ columns: [table.id], name: "Log_id"}),
]);

export const modulo = mysqlTable("Modulo", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }).notNull(),
	descricao: text(),
	idCurso: int("id_curso").references(() => curso.id),
	cargaHoraria: int("carga_horaria"),
	credito: int(),
	tipo: mysqlEnum(['vocacional','generico']),
	codigo: varchar({ length: 20 }),
},
(table) => [
	index("id_curso").on(table.idCurso),
	primaryKey({ columns: [table.id], name: "Modulo_id"}),
]);

export const perfil = mysqlTable("Perfil", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 50 }).notNull(),
	descricao: text(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Perfil_id"}),
]);

export const periodoLectivo = mysqlTable("Periodo_Lectivo", {
	id: int().autoincrement().notNull(),
	idModulo: int("id_modulo").references(() => modulo.id),
	idTurma: int("id_turma").references(() => turma.id),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dataInicio: date("data_inicio", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dataFim: date("data_fim", { mode: 'string' }),
},
(table) => [
	index("id_modulo").on(table.idModulo),
	index("id_turma").on(table.idTurma),
	primaryKey({ columns: [table.id], name: "Periodo_Lectivo_id"}),
]);

export const sala = mysqlTable("Sala", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }),
	tipo: mysqlEnum(['lab_rede','lab_info','lab_elec','comum']),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Sala_id"}),
]);

export const sessao = mysqlTable("Sessao", {
	id: int().autoincrement().notNull(),
	idUsuario: int("id_usuario").notNull().references(() => usuario.id, { onDelete: "cascade" } ),
	accessToken: text("access_token").notNull(),
	refreshToken: text("refresh_token").notNull(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	criadoEm: datetime("criado_em", { mode: 'string'}).default(sql`(now())`),
	expiraEm: datetime("expira_em", { mode: 'string'}),
	encerradoEm: datetime("encerrado_em", { mode: 'string'}),
},
(table) => [
	index("id_usuario").on(table.idUsuario),
	primaryKey({ columns: [table.id], name: "Sessao_id"}),
]);

export const turma = mysqlTable("Turma", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }),
	idCursoCv: int("id_CursoCV").references(() => cursoCv.id),
},
(table) => [
	index("id_CursoCV").on(table.idCursoCv),
	primaryKey({ columns: [table.id], name: "Turma_id"}),
]);

export const usuario = mysqlTable("Usuario", {
	id: int().autoincrement().notNull(),
	nome: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	username: varchar({ length: 50 }).notNull(),
	estado: mysqlEnum(['activo','inactivo']).default('activo'),
	dataCriacao: datetime("data_criacao", { mode: 'string'}).default(sql`(now())`),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "Usuario_id"}),
	unique("email").on(table.email),
	unique("username").on(table.username),
]);

export const usuarioPerfil = mysqlTable("Usuario_Perfil", {
	id: int().autoincrement().notNull(),
	idUsuario: int("id_usuario").references(() => usuario.id),
	idPerfil: int("id_perfil").references(() => perfil.id),
},
(table) => [
	index("id_perfil").on(table.idPerfil),
	index("id_usuario").on(table.idUsuario),
	primaryKey({ columns: [table.id], name: "Usuario_Perfil_id"}),
]);

export const bilheteDeIdentidade = mysqlTable("bilhete_de_identidade", {
	id: int().autoincrement().notNull(),
	pessoaId: int("pessoa_id").notNull().references(() => pessoa.id, { onDelete: "cascade" } ),
	numero: varchar({ length: 20 }).notNull(),
	estadoCivil: mysqlEnum("estado_civil", ['casado','solteiro','viuvo']),
	emitidoEm: varchar("emitido_em", { length: 50 }).notNull(),
	expiraEm: timestamp("expira_em", { mode: 'string' }),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("pessoa_id").on(table.pessoaId),
	primaryKey({ columns: [table.id], name: "bilhete_de_identidade_id"}),
	unique("numero").on(table.numero),
]);

export const nuit = mysqlTable("nuit", {
	id: int().autoincrement().notNull(),
	pessoaId: int("pessoa_id").notNull().references(() => pessoa.id, { onDelete: "cascade" } ),
	numero: varchar({ length: 9 }).notNull(),
	emitidoEm: varchar("emitido_em", { length: 50 }).notNull(),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("pessoa_id").on(table.pessoaId),
	primaryKey({ columns: [table.id], name: "nuit_id"}),
	unique("numero").on(table.numero),
]);

export const passaporte = mysqlTable("passaporte", {
	id: int().autoincrement().notNull(),
	pessoaId: int("pessoa_id").notNull().references(() => pessoa.id, { onDelete: "cascade" } ),
	numero: int().notNull(),
	tipo: mysqlEnum(['individual','diplomatico']).notNull(),
	emitidoEm: varchar("emitido_em", { length: 50 }).notNull(),
	validade: timestamp({ mode: 'string' }).notNull(),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("pessoa_id").on(table.pessoaId),
	primaryKey({ columns: [table.id], name: "passaporte_id"}),
	unique("numero").on(table.numero),
]);

export const pessoa = mysqlTable("pessoa", {
	id: int().autoincrement().notNull(),
	nomeCompleto: varchar("nome_completo", { length: 150 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dataNascimento: date("data_nascimento", { mode: 'string' }).notNull(),
	sexo: mysqlEnum(['M','F']).notNull(),
	nomePai: varchar("nome_pai", { length: 100 }),
	nomeMae: varchar("nome_mae", { length: 100 }),
	altura: float(),
	nacionalidade: varchar({ length: 100 }),
	corOlhos: varchar("cor_olhos", { length: 150 }),
	morada: varchar({ length: 150 }),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "pessoa_id"}),
]);
