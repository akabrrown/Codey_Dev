-- Migration: 001_create_enums_and_services
-- Up

CREATE TYPE request_status AS ENUM (
  'new', 'reviewed', 'quote_sent', 'accepted', 'declined', 'in_progress', 'completed'
);

CREATE TYPE option_type AS ENUM (
  'page', 'feature', 'integration', 'timeline', 'subtype'
);

CREATE TABLE services (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL,
  description      TEXT,
  base_price_min   NUMERIC(12, 2) NOT NULL,
  base_price_max   NUMERIC(12, 2) NOT NULL,
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_services_slug ON services (slug);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Down
-- DROP TABLE services;
-- DROP TYPE option_type;
-- DROP TYPE request_status;
