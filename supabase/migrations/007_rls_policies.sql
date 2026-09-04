-- Migration: 007_rls_policies
-- Up — Row-Level Security

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_log ENABLE ROW LEVEL SECURITY;

-- ── services: public can read active services; admin can do anything ──────────
CREATE POLICY "public_read_active_services"
  ON services FOR SELECT
  TO anon
  USING (is_active = TRUE);

CREATE POLICY "admin_all_services"
  ON services FOR ALL
  TO authenticated
  USING (TRUE);

-- ── service_options: public read active; admin all ────────────────────────────
CREATE POLICY "public_read_active_options"
  ON service_options FOR SELECT
  TO anon
  USING (is_active = TRUE);

CREATE POLICY "admin_all_service_options"
  ON service_options FOR ALL
  TO authenticated
  USING (TRUE);

-- ── requests: public insert only (cannot read back); admin all ────────────────
CREATE POLICY "public_insert_requests"
  ON requests FOR INSERT
  TO anon
  WITH CHECK (TRUE);

CREATE POLICY "admin_all_requests"
  ON requests FOR ALL
  TO authenticated
  USING (deleted_at IS NULL);

-- ── request_selections: public insert only; admin all ────────────────────────
CREATE POLICY "public_insert_request_selections"
  ON request_selections FOR INSERT
  TO anon
  WITH CHECK (TRUE);

CREATE POLICY "admin_all_request_selections"
  ON request_selections FOR ALL
  TO authenticated
  USING (TRUE);

-- ── request_files: public insert only; admin all ─────────────────────────────
CREATE POLICY "public_insert_request_files"
  ON request_files FOR INSERT
  TO anon
  WITH CHECK (TRUE);

CREATE POLICY "admin_all_request_files"
  ON request_files FOR ALL
  TO authenticated
  USING (TRUE);

-- ── status_log: admin read/insert only (append-only enforced by app) ─────────
CREATE POLICY "admin_all_status_log"
  ON status_log FOR ALL
  TO authenticated
  USING (TRUE);

-- Down
-- ALTER TABLE services DISABLE ROW LEVEL SECURITY;
-- ... (drop all policies)
