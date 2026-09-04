-- Migration: 002_create_service_options
-- Up

CREATE TABLE service_options (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id       UUID NOT NULL REFERENCES services (id) ON DELETE CASCADE,
  label            TEXT NOT NULL,
  option_type      option_type NOT NULL,
  price_impact     NUMERIC(12, 2) NOT NULL DEFAULT 0,
  is_multiplier    BOOLEAN NOT NULL DEFAULT FALSE,
  multiplier_value NUMERIC(6, 4),
  helper_text      TEXT,
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_service_options_service_id ON service_options (service_id);
CREATE INDEX idx_service_options_type ON service_options (option_type);

CREATE TRIGGER service_options_updated_at
  BEFORE UPDATE ON service_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Down
-- DROP TABLE service_options;
