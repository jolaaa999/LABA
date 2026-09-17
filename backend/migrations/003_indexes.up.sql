-- 003_indexes.up.sql
-- Query-path indexes for public list filters (idempotent where supported).

ALTER TABLE projects
  ADD INDEX idx_projects_public_list (published, placeholder, featured, sort_order, year, title);

ALTER TABLE community_events
  ADD INDEX idx_community_events_public_upcoming (published, ends_at, starts_at);
