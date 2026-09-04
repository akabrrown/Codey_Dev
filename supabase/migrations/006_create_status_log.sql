-- Migration: 006_create_status_log
-- Up

CREATE TABLE status_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id  UUID NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  from_status TEXT,
  to_status   TEXT NOT NULL,
  note        TEXT,
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_status_log_request_id ON status_log (request_id);
CREATE INDEX idx_status_log_changed_at ON status_log (changed_at DESC);

-- Down
-- DROP TABLE status_log;
