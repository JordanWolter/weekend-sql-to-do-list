CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(50) NOT NULL,
    "notes" VARCHAR(150),
    "complete" BOOLEAN
);

INSERT INTO "tasks"
("task", "notes", "complete")
VALUES
('clean', 'bathroom', false),
('cook', 'lunch, dinner', false),
('mow lawn', 'cut in pattern', false);