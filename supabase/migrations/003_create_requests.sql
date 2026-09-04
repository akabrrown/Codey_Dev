-- Migration: 003_create_requests
-- Up

CREATE TABLE requests (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_no             TEXT NOT NULL,
  service_id               UUID NOT NULL REFERENCES services (id),
  customer_name            TEXT NOT NULL,
  customer_phone           TEXT NOT NULL,
  customer_email           TEXT NOT NULL,
  business_name            TEXT,
  notes                    TEXT,
  estimated_min            NUMERIC(12, 2) NOT NULL,
  estimated_max            NUMERIC(12, 2) NOT NULL,
  final_price              NUMERIC(12, 2),
  price_adjustment_reason  TEXT,
  status                   request_status NOT NULL DEFAULT 'new',
  admin_notes              TEXT,
  terms_accepted           BOOLEAN NOT NULL DEFAULT FALSE,
  is_read                  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at               TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_requests_reference_no ON requests (reference_no);
CREATE INDEX idx_requests_status ON requests (status);
CREATE INDEX idx_requests_service_id ON requests (service_id);
CREATE INDEX idx_requests_created_at ON requests (created_at DESC);
CREATE INDEX idx_requests_customer_email ON requests (customer_email);
CREATE INDEX idx_requests_active ON requests (deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER requests_updated_at
  BEFORE UPDATE ON requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Down
-- DROP TABLE requests;
