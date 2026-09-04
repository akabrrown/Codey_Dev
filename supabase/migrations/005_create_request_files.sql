-- Migration: 005_create_request_files
-- Up

CREATE TABLE request_files (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id           UUID NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  file_name            TEXT NOT NULL,
  file_type            TEXT NOT NULL,
  file_size_bytes      INTEGER NOT NULL,
  uploaded_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_request_files_request_id ON request_files (request_id);

-- Down
-- DROP TABLE request_files;
