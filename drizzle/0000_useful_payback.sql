-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Aula` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hora_inicio` time NOT NULL,
	`hora_fim` time NOT NULL,
	`id_turma` int,
	`id_sala` int,
	`id_disponibilidade` int,
	`id_periodoLectivo` int,
	CONSTRAINT `Aula_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Aula_Dia` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_aula` int,
	`id_dia` int,
	CONSTRAINT `Aula_Dia_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CV` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` text,
	CONSTRAINT `CV_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CV_Modulo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_cv` int,
	`id_modulo` int,
	CONSTRAINT `CV_Modulo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Credencial` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_usuario` int NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`criado_em` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `Credencial_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_usuario` UNIQUE(`id_usuario`)
);
--> statement-breakpoint
CREATE TABLE `Curso` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` text,
	CONSTRAINT `Curso_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Curso_CV` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_curso` int,
	`id_cv` int,
	CONSTRAINT `Curso_CV_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Departamento` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	CONSTRAINT `Departamento_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Dia` (
	`id` int AUTO_INCREMENT NOT NULL,
	`data` date,
	CONSTRAINT `Dia_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Disponibilidade` (
	`id` int AUTO_INCREMENT NOT NULL,
	`data` date NOT NULL,
	`hora_inicio` time NOT NULL,
	`hora_fim` time NOT NULL,
	`id_formador` int NOT NULL,
	`id_departamento` int NOT NULL,
	CONSTRAINT `Disponibilidade_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Formador` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_usuario` int NOT NULL,
	`especialidade` varchar(100),
	CONSTRAINT `Formador_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_usuario` int,
	`acao` varchar(100) NOT NULL,
	`entidade_afetada` varchar(100),
	`detalhe` text,
	`data_hora` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `Log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Modulo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` text,
	`id_curso` int,
	`carga_horaria` int,
	`credito` int,
	`tipo` enum('vocacional','generico'),
	`codigo` varchar(20),
	CONSTRAINT `Modulo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Perfil` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`descricao` text,
	CONSTRAINT `Perfil_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Periodo_Lectivo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_modulo` int,
	`id_turma` int,
	`data_inicio` date,
	`data_fim` date,
	CONSTRAINT `Periodo_Lectivo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Sala` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100),
	`tipo` enum('lab_rede','lab_info','lab_elec','comum'),
	CONSTRAINT `Sala_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Turma` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100),
	`id_CursoCV` int,
	CONSTRAINT `Turma_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Usuario` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`estado` enum('activo','inactivo') DEFAULT 'activo',
	`data_criacao` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `Usuario_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`),
	CONSTRAINT `username` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `Usuario_Perfil` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_usuario` int,
	`id_perfil` int,
	CONSTRAINT `Usuario_Perfil_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `Turma`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_ibfk_2` FOREIGN KEY (`id_sala`) REFERENCES `Sala`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_ibfk_3` FOREIGN KEY (`id_disponibilidade`) REFERENCES `Disponibilidade`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_ibfk_4` FOREIGN KEY (`id_periodoLectivo`) REFERENCES `Periodo_Lectivo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula_Dia` ADD CONSTRAINT `Aula_Dia_ibfk_1` FOREIGN KEY (`id_aula`) REFERENCES `Aula`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula_Dia` ADD CONSTRAINT `Aula_Dia_ibfk_2` FOREIGN KEY (`id_dia`) REFERENCES `Dia`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CV_Modulo` ADD CONSTRAINT `CV_Modulo_ibfk_1` FOREIGN KEY (`id_cv`) REFERENCES `CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CV_Modulo` ADD CONSTRAINT `CV_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Credencial` ADD CONSTRAINT `Credencial_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Curso_CV` ADD CONSTRAINT `Curso_CV_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Curso_CV` ADD CONSTRAINT `Curso_CV_ibfk_2` FOREIGN KEY (`id_cv`) REFERENCES `CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_ibfk_1` FOREIGN KEY (`id_formador`) REFERENCES `Formador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `Departamento`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Formador` ADD CONSTRAINT `Formador_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Log` ADD CONSTRAINT `Log_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Modulo` ADD CONSTRAINT `Modulo_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` ADD CONSTRAINT `Periodo_Lectivo_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` ADD CONSTRAINT `Periodo_Lectivo_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `Turma`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_ibfk_1` FOREIGN KEY (`id_CursoCV`) REFERENCES `Curso_CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` ADD CONSTRAINT `Usuario_Perfil_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` ADD CONSTRAINT `Usuario_Perfil_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `Perfil`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `id_disponibilidade` ON `Aula` (`id_disponibilidade`);--> statement-breakpoint
CREATE INDEX `id_periodoLectivo` ON `Aula` (`id_periodoLectivo`);--> statement-breakpoint
CREATE INDEX `id_sala` ON `Aula` (`id_sala`);--> statement-breakpoint
CREATE INDEX `id_turma` ON `Aula` (`id_turma`);--> statement-breakpoint
CREATE INDEX `id_aula` ON `Aula_Dia` (`id_aula`);--> statement-breakpoint
CREATE INDEX `id_dia` ON `Aula_Dia` (`id_dia`);--> statement-breakpoint
CREATE INDEX `id_cv` ON `CV_Modulo` (`id_cv`);--> statement-breakpoint
CREATE INDEX `id_modulo` ON `CV_Modulo` (`id_modulo`);--> statement-breakpoint
CREATE INDEX `id_curso` ON `Curso_CV` (`id_curso`);--> statement-breakpoint
CREATE INDEX `id_cv` ON `Curso_CV` (`id_cv`);--> statement-breakpoint
CREATE INDEX `id_departamento` ON `Disponibilidade` (`id_departamento`);--> statement-breakpoint
CREATE INDEX `id_formador` ON `Disponibilidade` (`id_formador`);--> statement-breakpoint
CREATE INDEX `id_usuario` ON `Formador` (`id_usuario`);--> statement-breakpoint
CREATE INDEX `id_usuario` ON `Log` (`id_usuario`);--> statement-breakpoint
CREATE INDEX `id_curso` ON `Modulo` (`id_curso`);--> statement-breakpoint
CREATE INDEX `id_modulo` ON `Periodo_Lectivo` (`id_modulo`);--> statement-breakpoint
CREATE INDEX `id_turma` ON `Periodo_Lectivo` (`id_turma`);--> statement-breakpoint
CREATE INDEX `id_CursoCV` ON `Turma` (`id_CursoCV`);--> statement-breakpoint
CREATE INDEX `id_perfil` ON `Usuario_Perfil` (`id_perfil`);--> statement-breakpoint
CREATE INDEX `id_usuario` ON `Usuario_Perfil` (`id_usuario`);
*/