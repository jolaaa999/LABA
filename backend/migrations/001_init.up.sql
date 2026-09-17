-- 001_init.up.sql
-- Phase 8A schema — truth-bearing public content only.
-- No fake seed of published projects / events / members.

CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(64) PRIMARY KEY,
  applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
  id CHAR(36) NOT NULL,
  slug VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  year VARCHAR(16) NOT NULL,
  status VARCHAR(32) NOT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  published TINYINT(1) NOT NULL DEFAULT 0,
  placeholder TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_projects_slug (slug),
  KEY idx_projects_published_category (published, category),
  KEY idx_projects_sort (published, sort_order, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS community_events (
  id CHAR(36) NOT NULL,
  slug VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  format VARCHAR(32) NOT NULL,
  summary TEXT NOT NULL,
  starts_at DATETIME NULL,
  ends_at DATETIME NULL,
  location_text VARCHAR(255) NULL,
  published TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_community_events_slug (slug),
  KEY idx_community_events_published_starts (published, starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS community_members (
  id CHAR(36) NOT NULL,
  slug VARCHAR(128) NOT NULL,
  display_name VARCHAR(128) NOT NULL,
  headline VARCHAR(255) NULL,
  bio TEXT NULL,
  public_profile TINYINT(1) NOT NULL DEFAULT 0,
  placeholder TINYINT(1) NOT NULL DEFAULT 0,
  contribution_modes JSON NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_community_members_slug (slug),
  KEY idx_community_members_public (public_profile, placeholder, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS recruiting_status (
  id CHAR(36) NOT NULL,
  status VARCHAR(32) NOT NULL,
  headline VARCHAR(255) NULL,
  description TEXT NULL,
  contact_type VARCHAR(64) NULL,
  contact_value VARCHAR(255) NULL,
  published_at DATETIME NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
