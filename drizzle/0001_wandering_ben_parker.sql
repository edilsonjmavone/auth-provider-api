CREATE TABLE `Sessao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_usuario` int NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`ip_address` varchar(45),
	`user_agent` text,
	`criado_em` datetime DEFAULT (CURRENT_TIMESTAMP),
	`expira_em` datetime,
	`encerrado_em` datetime,
	CONSTRAINT `Sessao_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Aula` DROP FOREIGN KEY `Aula_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Aula` DROP FOREIGN KEY `Aula_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Aula` DROP FOREIGN KEY `Aula_ibfk_3`;
--> statement-breakpoint
ALTER TABLE `Aula` DROP FOREIGN KEY `Aula_ibfk_4`;
--> statement-breakpoint
ALTER TABLE `Aula_Dia` DROP FOREIGN KEY `Aula_Dia_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Aula_Dia` DROP FOREIGN KEY `Aula_Dia_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `CV_Modulo` DROP FOREIGN KEY `CV_Modulo_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `CV_Modulo` DROP FOREIGN KEY `CV_Modulo_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Credencial` DROP FOREIGN KEY `Credencial_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Curso_CV` DROP FOREIGN KEY `Curso_CV_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Curso_CV` DROP FOREIGN KEY `Curso_CV_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Disponibilidade` DROP FOREIGN KEY `Disponibilidade_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Disponibilidade` DROP FOREIGN KEY `Disponibilidade_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Formador` DROP FOREIGN KEY `Formador_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Log` DROP FOREIGN KEY `Log_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Modulo` DROP FOREIGN KEY `Modulo_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` DROP FOREIGN KEY `Periodo_Lectivo_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` DROP FOREIGN KEY `Periodo_Lectivo_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Turma` DROP FOREIGN KEY `Turma_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` DROP FOREIGN KEY `Usuario_Perfil_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` DROP FOREIGN KEY `Usuario_Perfil_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_id_usuario_Usuario_id_fk` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `id_usuario` ON `Sessao` (`id_usuario`);--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_id_turma_Turma_id_fk` FOREIGN KEY (`id_turma`) REFERENCES `Turma`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_id_sala_Sala_id_fk` FOREIGN KEY (`id_sala`) REFERENCES `Sala`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_id_disponibilidade_Disponibilidade_id_fk` FOREIGN KEY (`id_disponibilidade`) REFERENCES `Disponibilidade`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_id_periodoLectivo_Periodo_Lectivo_id_fk` FOREIGN KEY (`id_periodoLectivo`) REFERENCES `Periodo_Lectivo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula_Dia` ADD CONSTRAINT `Aula_Dia_id_aula_Aula_id_fk` FOREIGN KEY (`id_aula`) REFERENCES `Aula`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Aula_Dia` ADD CONSTRAINT `Aula_Dia_id_dia_Dia_id_fk` FOREIGN KEY (`id_dia`) REFERENCES `Dia`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CV_Modulo` ADD CONSTRAINT `CV_Modulo_id_cv_CV_id_fk` FOREIGN KEY (`id_cv`) REFERENCES `CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CV_Modulo` ADD CONSTRAINT `CV_Modulo_id_modulo_Modulo_id_fk` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Credencial` ADD CONSTRAINT `Credencial_id_usuario_Usuario_id_fk` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Curso_CV` ADD CONSTRAINT `Curso_CV_id_curso_Curso_id_fk` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Curso_CV` ADD CONSTRAINT `Curso_CV_id_cv_CV_id_fk` FOREIGN KEY (`id_cv`) REFERENCES `CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_id_formador_Formador_id_fk` FOREIGN KEY (`id_formador`) REFERENCES `Formador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_id_departamento_Departamento_id_fk` FOREIGN KEY (`id_departamento`) REFERENCES `Departamento`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Formador` ADD CONSTRAINT `Formador_id_usuario_Usuario_id_fk` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Log` ADD CONSTRAINT `Log_id_usuario_Usuario_id_fk` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Modulo` ADD CONSTRAINT `Modulo_id_curso_Curso_id_fk` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` ADD CONSTRAINT `Periodo_Lectivo_id_modulo_Modulo_id_fk` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Periodo_Lectivo` ADD CONSTRAINT `Periodo_Lectivo_id_turma_Turma_id_fk` FOREIGN KEY (`id_turma`) REFERENCES `Turma`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_id_CursoCV_Curso_CV_id_fk` FOREIGN KEY (`id_CursoCV`) REFERENCES `Curso_CV`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` ADD CONSTRAINT `Usuario_Perfil_id_usuario_Usuario_id_fk` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario_Perfil` ADD CONSTRAINT `Usuario_Perfil_id_perfil_Perfil_id_fk` FOREIGN KEY (`id_perfil`) REFERENCES `Perfil`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario` DROP COLUMN `password_hash`;