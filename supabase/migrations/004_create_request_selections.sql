-- Migration: 004_create_request_selections
-- Up

CREATE TABLE request_selections (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id             UUID NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  service_option_id      UUID NOT NULL REFERENCES service_options (id),
  price_impact_at_time   NUMERIC(12, 2) NOT NULL,
  is_multiplier_at_time  BOOLEAN NOT NULL DEFAULT FALSE,
  multiplier_value_at_time NUMERIC(6, 4),
  label_at_time          TEXT NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_request_selections_request_id ON request_selections (request_id);

-- Down
-- DROP TABLE request_selections;
