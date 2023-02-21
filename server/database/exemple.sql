-- Create TABLE
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL
);
-- Change the name and the status
UPDATE Todo SET name = ?, status = ? WHERE id = ?;
-- Check the values of a specific id
SELECT * FROM Todo WHERE id = ?;
-- Insert new Todo
INSERT INTO Todo (name, status) VALUES (?, ?);
-- Delete a Todo
DELETE FROM Todo WHERE id = ?;

