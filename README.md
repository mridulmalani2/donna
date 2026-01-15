# Client Intelligence File — Production Demo App

This repository contains a production-grade React application for a Private Wealth Management (PWM) internal tool called **Client Intelligence File**.

Although the current scope uses a single fully-fabricated client and mock data, this application is:
- Production-quality
- Intended to be deployed live on Vercel
- Built with future data ingestion in mind (PDF-based inputs)

This is NOT a video mockup or static prototype.
This is a live, navigable, multi-screen web application.

The demo represents a real internal enterprise tool and must be built accordingly.

## Key Principles
- Clean architecture
- Modern, premium UI
- No shortcuts that would block future extensibility
- Deterministic demo behavior (no hallucinating AI)

## Deployment
- Target platform: Vercel
- Framework: React (Next.js preferred)
- Styling: Tailwind CSS (or equivalent modern utility system)
- Fonts, layout, and spacing must feel premium and investment-banking-grade

This repo should be treated as a real product, not a hackathon demo.

# Application Architecture

## Frontend
- Framework: Next.js (App Router preferred)
- Language: TypeScript
- State: Local state + static JSON for now
- Routing:
  - `/` → Prioritisation Dashboard
  - `/client/[id]` → Client Intelligence File

## Data Layer (Phase 1)
- Static JSON files checked into repo
- One primary client with full depth
- 20–50 additional shallow clients for dashboard realism

## Data Layer (Phase 2 — Future)
- PDFs will be uploaded to the repo
- A data ingestion layer will later parse PDFs
- Components must be written assuming data will become dynamic

Do NOT hardcode logic into components that would prevent:
- Swapping JSON → parsed PDF data
- Adding more clients later
- Adding backend APIs later

## Non-Negotiables
- No deprecated packages
- Use current, well-maintained libraries only
- No experimental alpha features unless explicitly justified
- No emojis, novelty UI, or playful styling

# User Journey (Must Be Preserved)

This flow is non-negotiable.

1. PWM opens the app
2. First screen is a PRIORITISATION DASHBOARD
3. Clients are sorted by Priority Score
4. PWM clicks one client
5. Client Intelligence File opens
6. PWM reviews Snapshot
7. PWM optionally uses Chatbot
8. PWM exits to take action outside the system

Important:
- The app does NOT begin with client selection
- The app does NOT behave like a traditional CRM
- Prioritisation comes BEFORE exploration

If the app violates this flow, it is incorrect.

# UI / UX Design Guidelines

This application is used by Private Wealth Managers and investment professionals.
The UI must feel premium, restrained, and modern.

## Fonts
Use elegant, modern fonts such as:
- Montserrat (primary)
- Inter (secondary)
- No default system fonts unless explicitly styled
- No cursive novelty fonts
- No playful typography

## Color Palette
- Neutral, muted palette
- Whites, off-whites, greys
- One deep accent color (e.g. navy, charcoal, forest green)
- No bright colors
- No gradients unless extremely subtle

## Layout
- Generous whitespace
- Clear hierarchy
- Calm, low-cognitive-load screens
- Avoid visual clutter

## Prohibited
- Emojis
- Cartoon icons
- Overly rounded “consumer app” UI
- Loud colors
- Flashy animations

This should feel like a tool built for bankers, not creators.

# Client Snapshot Specification

The Snapshot is the core of the Client Intelligence File.

It must include the following sections, in this order:

1. Header
   - Client photo
   - Name
   - Age
   - Profession
   - Relationship duration
   - Priority Score (visual)
   - Panic indicator
   - Advisory disclaimer

2. Contact & Logistics
   - Email
   - Phone
   - Address
   - Preferred contact method

3. Priority Score Breakdown
   - Panic / sentiment explanation
   - Assets under management level
   - Portfolio movement
   - Overdue check-in

4. Assets Overview
   - Total AUM
   - Asset allocation (broad)
   - Recent change indicator
   - Dominant exposure

5. Red-Flag Asset Movements
   - Only shown if present
   - Severity, description, date

6. Recent Communications
   - Timeline style
   - Last 3–5 interactions shown
   - Full content exists in data layer

7. Open Topics
   - Manual list
   - Status indicators
   - PWM-owned

Each section must be modular and independently replaceable.

# Chatbot Specification

This chatbot is NOT free-form.

## Behavior
- Preset questions only
- Scripted answers only
- Answers reference client data
- No generative hallucination

## Purpose
- Explain context
- Summarise history
- Clarify priority
- Surface open topics

## Example Questions
- Why is this client high priority today?
- Summarise my last interaction
- What are the main open topics?
- Has sentiment changed recently?
- Is there any prospection opportunity?

The chatbot must feel intelligent, calm, and supportive.
Never authoritative.
Never decisive.

# Data Strategy

## Phase 1 — Static Demo Data
- Hardcoded JSON
- One fully detailed client
- 20–50 shallow clients for dashboard realism
- Deterministic behavior

## Phase 2 — PDF-Based Inputs
- PDFs will be uploaded to the repo later
- PDFs will contain:
  - Communications
  - Asset summaries
  - Client notes
  - Network context

Components must be written assuming:
- Data source will change
- Structure will remain consistent
- Parsing layer will be added later

Do NOT tightly couple components to mock data shape in a way that blocks this.

# Non-Goals

This application does NOT:
- Execute trades
- Contact clients
- Replace CRM
- Automate decisions
- Perform real AI inference

All intelligence is advisory.
All actions remain human.


