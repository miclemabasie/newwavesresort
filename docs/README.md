# New Waves Resort — Project Documentation Hub

This directory tracks the architecture, change log, engineering decisions, operations runbook, optional integration API specs, and roadmap for the **New Waves Resort (Ngeme, Limbe)** platform.

---

## Documentation Index

| Document | Purpose |
| :--- | :--- |
| [CHANGELOG.md](./CHANGELOG.md) | Chronological log of all changes completed and upcoming (`[Unreleased]` -> dated releases) |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture diagram, 13-table Supabase schema, RLS model, RPCs, storage buckets, and route map |
| [DECISIONS.md](./DECISIONS.md) | Architectural Decision Records (`ADR-001` to `ADR-007`) capturing design trade-offs |
| [OPERATIONS.md](./OPERATIONS.md) | Local development, verification scripts, Supabase provisioning checklist, and staff `/admin` guides |
| [ROADMAP.md](./ROADMAP.md) | Phased progress tracker: completed work, live launch prerequisites, and optional backlog |
| [pms-api-guide.md](./pms-api-guide.md) | Developer guide & `curl` examples for the optional loosely-coupled external PMS API (`x-api-key`) |
| [pms-api.openapi.yaml](./pms-api.openapi.yaml) | OpenAPI 3.0.3 specification for the `pms-api` Supabase Edge Function |

---

## Current Platform Status

| Component | State | Notes |
| :--- | :--- | :--- |
| **Frontend SPA & SEO Build Pipeline** | Complete & Verified | React 19 + Vite 7 + Tailwind v4 + i18next (EN/FR); `lint`, `build`, and `verify` passing |
| **Supabase SQL, Storage & Edge Functions** | Provisioned on Cloud | Schema, RLS, 3 buckets, seed data, and all 4 Edge Functions (`pms-api`, `notify-booking`, `youtube-channel-feed`, `staff-management`) deployed to `xuggbcfuvxvabatumtoj` |
| **Live Supabase Provisioning** | Provisioned & Live (`xuggbcfuvxvabatumtoj`, `eu-west-1`) | Connected to `frontend/.env` (`https://xuggbcfuvxvabatumtoj.supabase.co`); first-time Admin setup runs inside `/admin/login` |
| **External RMS / Facility Software** | Intentionally Decoupled | Optional sync supported via `pms-api` without altering website independence |

---

## How We Track Changes Going Forward

To keep this folder accurate as the project evolves, follow this update rhythm whenever new work lands:

1. **Log every change in [CHANGELOG.md](./CHANGELOG.md)** under `[Unreleased]` first (grouped by `Added`, `Changed`, `Fixed`, `Removed`, or `Database & API`), then move items under a dated heading when a milestone is verified.
2. **Update [ROADMAP.md](./ROADMAP.md)** checkboxes as live provisioning steps or backlog features are completed.
3. **Add an ADR entry in [DECISIONS.md](./DECISIONS.md)** whenever making a structural or integration trade-off (e.g., new payment flow, auth change, WhatsApp provider switch, or RMS sync contract).
4. **Keep [ARCHITECTURE.md](./ARCHITECTURE.md), [OPERATIONS.md](./OPERATIONS.md), and [pms-api.openapi.yaml](./pms-api.openapi.yaml) synced** whenever tables, RLS policies, routes, environment variables, or Edge Function endpoints change.
