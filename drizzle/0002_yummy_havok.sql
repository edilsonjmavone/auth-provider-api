DROP TABLE `Credencial`;--> statement-breakpoint
ALTER TABLE `Sessao` MODIFY COLUMN `refresh_token` text NOT NULL;--> statement-breakpoint
ALTER TABLE `Usuario` ADD `password_hash` varchar(255) NOT NULL;