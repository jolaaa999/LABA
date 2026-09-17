package model

import "time"

type Project struct {
	ID          string    `gorm:"column:id;type:char(36);primaryKey"`
	Slug        string    `gorm:"column:slug;size:128;uniqueIndex;not null"`
	Title       string    `gorm:"column:title;size:255;not null"`
	Summary     string    `gorm:"column:summary;type:text;not null"`
	Category    string    `gorm:"column:category;size:64;not null"`
	Year        string    `gorm:"column:year;size:16;not null"`
	Status      string    `gorm:"column:status;size:32;not null"`
	Featured    bool      `gorm:"column:featured;not null;default:false"`
	Published   bool      `gorm:"column:published;not null;default:false"`
	Placeholder bool      `gorm:"column:placeholder;not null;default:false"`
	SortOrder   int       `gorm:"column:sort_order;not null;default:0"`
	CreatedAt   time.Time `gorm:"column:created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (Project) TableName() string { return "projects" }

type CommunityEvent struct {
	ID           string     `gorm:"column:id;type:char(36);primaryKey"`
	Slug         string     `gorm:"column:slug;size:128;uniqueIndex;not null"`
	Title        string     `gorm:"column:title;size:255;not null"`
	Format       string     `gorm:"column:format;size:32;not null"`
	Summary      string     `gorm:"column:summary;type:text;not null"`
	StartsAt     *time.Time `gorm:"column:starts_at"`
	EndsAt       *time.Time `gorm:"column:ends_at"`
	LocationText *string    `gorm:"column:location_text;size:255"`
	Published    bool       `gorm:"column:published;not null;default:false"`
	CreatedAt    time.Time  `gorm:"column:created_at"`
	UpdatedAt    time.Time  `gorm:"column:updated_at"`
}

func (CommunityEvent) TableName() string { return "community_events" }

// CommunityMember is a public content entity — NOT an Auth User.
type CommunityMember struct {
	ID                string    `gorm:"column:id;type:char(36);primaryKey"`
	Slug              string    `gorm:"column:slug;size:128;uniqueIndex;not null"`
	DisplayName       string    `gorm:"column:display_name;size:128;not null"`
	Headline          *string   `gorm:"column:headline;size:255"`
	Bio               *string   `gorm:"column:bio;type:text"`
	PublicProfile     bool      `gorm:"column:public_profile;not null;default:false"`
	Placeholder       bool      `gorm:"column:placeholder;not null;default:false"`
	ContributionModes *string   `gorm:"column:contribution_modes;type:json"`
	SortOrder         int       `gorm:"column:sort_order;not null;default:0"`
	CreatedAt         time.Time `gorm:"column:created_at"`
	UpdatedAt         time.Time `gorm:"column:updated_at"`
}

func (CommunityMember) TableName() string { return "community_members" }

type RecruitingStatus struct {
	ID           string     `gorm:"column:id;type:char(36);primaryKey"`
	Status       string     `gorm:"column:status;size:32;not null"`
	Headline     *string    `gorm:"column:headline;size:255"`
	Description  *string    `gorm:"column:description;type:text"`
	ContactType  *string    `gorm:"column:contact_type;size:64"`
	ContactValue *string    `gorm:"column:contact_value;size:255"`
	PublishedAt  *time.Time `gorm:"column:published_at"`
	UpdatedAt    time.Time  `gorm:"column:updated_at"`
}

func (RecruitingStatus) TableName() string { return "recruiting_status" }
