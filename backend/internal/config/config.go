package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv   string
	Server   ServerConfig
	Database DatabaseConfig
	CORS     CORSConfig
	GitHub   GitHubConfig
	Session  SessionConfig
	Frontend FrontendConfig
}

type ServerConfig struct {
	Addr         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	IdleTimeout  time.Duration
}

type DatabaseConfig struct {
	Host            string
	Port            int
	User            string
	Password        string
	Name            string
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime time.Duration
}

type CORSConfig struct {
	AllowedOrigins []string
}

type GitHubConfig struct {
	ClientID        string
	ClientSecret    string
	RedirectURL     string
	Owner           string
	Repo            string
	RepoID          string
	QACategoryID    string
	Enabled         bool
}

type SessionConfig struct {
	Secret string
}

type FrontendConfig struct {
	Origin string
}

func (d DatabaseConfig) DSN() string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=UTC&multiStatements=true",
		d.User,
		d.Password,
		d.Host,
		d.Port,
		d.Name,
	)
}

func Load() (*Config, error) {
	_ = godotenv.Load()

	host := strings.TrimSpace(os.Getenv("DB_HOST"))
	user := strings.TrimSpace(os.Getenv("DB_USER"))
	name := strings.TrimSpace(os.Getenv("DB_NAME"))
	if host == "" || user == "" || name == "" {
		return nil, fmt.Errorf("DB_HOST, DB_USER, and DB_NAME are required")
	}

	cfg := &Config{
		AppEnv: getenv("APP_ENV", "development"),
		Server: ServerConfig{
			Addr:         getenv("SERVER_ADDR", ":8080"),
			ReadTimeout:  durationSeconds("SERVER_READ_TIMEOUT_SEC", 15),
			WriteTimeout: durationSeconds("SERVER_WRITE_TIMEOUT_SEC", 15),
			IdleTimeout:  durationSeconds("SERVER_IDLE_TIMEOUT_SEC", 60),
		},
		Database: DatabaseConfig{
			Host:            host,
			Port:            intEnv("DB_PORT", 3306),
			User:            user,
			Password:        getenv("DB_PASSWORD", ""),
			Name:            name,
			MaxOpenConns:    intEnv("DB_MAX_OPEN_CONNS", 20),
			MaxIdleConns:    intEnv("DB_MAX_IDLE_CONNS", 5),
			ConnMaxLifetime: durationSeconds("DB_CONN_MAX_LIFETIME_SEC", 1800),
		},
		CORS: CORSConfig{
			AllowedOrigins: splitCSV(getenv("CORS_ALLOWED_ORIGINS", "http://127.0.0.1:5173,http://localhost:5173")),
		},
		GitHub: GitHubConfig{
			ClientID:     getenv("GITHUB_CLIENT_ID", ""),
			ClientSecret: getenv("GITHUB_CLIENT_SECRET", ""),
			RedirectURL:  getenv("GITHUB_OAUTH_REDIRECT_URL", "http://localhost:8080/api/v1/auth/github/callback"),
			Owner:        getenv("GITHUB_OWNER", "jolaaa999"),
			Repo:         getenv("GITHUB_REPO", "LABA"),
			RepoID:       getenv("GITHUB_REPO_ID", ""),
			QACategoryID: getenv("GITHUB_QA_CATEGORY_ID", ""),
		},
		Session: SessionConfig{
			Secret: getenv("SESSION_SECRET", ""),
		},
		Frontend: FrontendConfig{
			Origin: getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
		},
	}
	cfg.GitHub.Enabled = cfg.GitHub.ClientID != "" && cfg.GitHub.ClientSecret != "" && cfg.Session.Secret != ""
	return cfg, nil
}

func (c *Config) IsDevelopment() bool {
	env := strings.ToLower(strings.TrimSpace(c.AppEnv))
	return env == "development" || env == "dev" || env == "local"
}

func getenv(key, fallback string) string {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v
	}
	return fallback
}

func intEnv(key string, fallback int) int {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return fallback
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return fallback
	}
	return n
}

func durationSeconds(key string, fallback int) time.Duration {
	return time.Duration(intEnv(key, fallback)) * time.Second
}

func splitCSV(v string) []string {
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			out = append(out, p)
		}
	}
	return out
}
