CREATE TABLE "progress_snapshots" (
	"sync_id" varchar(64) PRIMARY KEY NOT NULL,
	"ciphertext" text NOT NULL,
	"iv" varchar(64) NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"client_timestamp" varchar(64) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
