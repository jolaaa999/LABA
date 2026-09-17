-- 002_seed_recruiting.up.sql
-- Safe default: PUBLIC ENTRY = NOT_PUBLISHED. No fake contacts.

INSERT INTO recruiting_status (
  id, status, headline, description, contact_type, contact_value, published_at
) VALUES (
  '00000000-0000-4000-8000-000000000001',
  'NOT_PUBLISHED',
  'Public recruiting details are not published yet.',
  'Formal recruiting details will appear when they are ready to be public.',
  NULL,
  NULL,
  NULL
)
ON DUPLICATE KEY UPDATE
  status = VALUES(status),
  headline = VALUES(headline),
  description = VALUES(description),
  contact_type = NULL,
  contact_value = NULL,
  published_at = NULL;
