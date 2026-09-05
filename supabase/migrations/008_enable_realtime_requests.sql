-- Migration: 008_enable_realtime_requests
-- Up — Enable Supabase Realtime replication on requests table for instant dashboard updates

ALTER PUBLICATION supabase_realtime ADD TABLE requests;

-- Enable REPLICA IDENTITY FULL on requests so updates broadcast complete row data
ALTER TABLE requests REPLICA IDENTITY FULL;
