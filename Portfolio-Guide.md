# Mission Control Portfolio - Project Rules & Constraints

## Overview

This portfolio is not a traditional personal website.

The goal is to present Bryan Encarnacion as a **Product-Focused Software Engineer** through a Mission Control Dashboard experience.

The portfolio should feel like a modern command center used to monitor systems, products, deployments, and engineering achievements.

All design, architecture, and implementation decisions must support this vision.

---

# Core Philosophy

## DO

- Think like a product engineer, not a freelance web designer.
- Focus on systems, products, architecture, and impact.
- Showcase engineering work through dashboards, metrics, timelines, and operational views.
- Make the experience feel like an internal SaaS platform.
- Prioritize readability and usability.
- Keep interactions purposeful.
- Build reusable and scalable components.

## DO NOT

- Create a generic portfolio template.
- Use excessive marketing language.
- Use unnecessary animations.
- Create flashy effects that reduce usability.
- Use progress bars for skills.
- Use percentage-based skill ratings.
- Treat projects as simple portfolio cards.

---

# Technology Stack

## Required Stack

### Framework

- Next.js (App Router)
- React
- TypeScript

### Styling

- Tailwind CSS

### Components

- shadcn/ui

### Icons

- Lucide React

### Animations

- Motion (Framer Motion)

### Charts

- Recharts

### Deployment

- Vercel

---

# Project Structure

Use the following structure whenever possible.

```txt
src/
│
├── app/
│   ├── page.tsx
│   ├── systems/
│   ├── timeline/
│   ├── experience/
│   ├── contact/
│   └── command-center/
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── systems/
│   ├── timeline/
│   ├── ui/
│   └── shared/
│
├── data/
│   ├── projects/
│   ├── experience/
│   ├── skills/
│   └── metrics/
│
├── lib/
│
├── types/
│
└── hooks/
```

---

# Design System

## Theme

Primary Theme:

Mission Control Dashboard

Inspiration:

- NASA Mission Control
- Vercel Dashboard
- Linear
- Stripe Dashboard
- Modern DevOps Platforms
- Terminal Interfaces
- AI Operations Centers

---

## Color Philosophy

Dark Mode First

Avoid:

- Bright rainbow gradients
- Neon cyberpunk overload
- Excessive glow effects

Preferred:

- Deep charcoal
- Slate
- Purple accents
- Blue accents
- White typography

Example palette:

```txt
Background: #09090B
Surface: #111827
Card: #1F2937

Primary: #8B5CF6
Secondary: #6366F1

Success: #22C55E
Warning: #EAB308
Danger: #EF4444

Text Primary: #FFFFFF
Text Secondary: #A1A1AA
```

---

# Navigation Rules

Navigation should feel like navigating a system.

Avoid:

```txt
Home
About
Skills
Projects
Contact
```

Preferred:

```txt
Command Center
Systems
Timeline
Experience
Operations
Contact
```

---

# Content Rules

## Personal Branding

Always position Bryan as:

```txt
Software Engineer
Full Stack Developer
Product Builder
```

Avoid:

```txt
Freelancer
Creative Designer
WordPress Developer
```

---

# Systems Section

Projects are referred to as Systems.

Examples:

```txt
RecruitAssistAI
ParentAssistAI
LunarLedger
```

Each system should contain:

### System Overview

- Purpose
- Problem Solved
- Technologies

### Contributions

- Features implemented
- Architecture work
- Database work
- AI integrations
- UI improvements

### Engineering Challenges

- Problem
- Investigation
- Solution
- Outcome

### System Status

Examples:

```txt
ACTIVE
PRODUCTION
PERSONAL PROJECT
ARCHIVED
```

---

# Dashboard Rules

Dashboard cards should represent meaningful information.

Good Examples:

```txt
Systems Built

Years of Development

Projects Delivered

Technologies Used

Current Focus

Recent Deployments
```

Bad Examples:

```txt
HTML 90%

CSS 95%

JavaScript 88%
```

---

# Skills Rules

Do not use:

- Progress bars
- Percentage ratings
- Stars
- Circular charts

Instead use:

```txt
Frontend
- React
- Next.js
- TypeScript

Backend
- Firebase
- Node.js

Tools
- GitHub
- Vercel
- VS Code
```

---

# Animation Rules

Animations should support usability.

Allowed:

- Fade In
- Slide In
- Dashboard Card Hover
- Tab Transitions
- Page Transitions

Avoid:

- Continuous floating
- Random movement
- Excessive parallax
- Excessive particle systems
- Autoplay animations

---

# Component Rules

## Reusability First

Before creating a new component:

1. Check if an existing component can be reused.
2. Check if the existing component can be extended.
3. Create a new component only if necessary.

Avoid duplication.

---

# Code Rules

## TypeScript

Use strict typing whenever possible.

Avoid:

```ts
any
```

Prefer:

```ts
interface
type
```

---

## Components

Prefer:

```tsx
Server Components
```

Use:

```tsx
"use client"
```

Only when necessary.

---

## State Management

Use:

```txt
React State
React Context
```

Avoid introducing external state libraries unless required.

No Redux.

---

# Data Rules

Initially use static data.

Store content inside:

```txt
src/data
```

Examples:

```txt
projects.ts
experience.ts
skills.ts
metrics.ts
```

Avoid databases unless required.

---

# Performance Rules

Optimize for:

- Lighthouse score
- Accessibility
- SEO
- Fast page load

Avoid:

- Large video backgrounds
- Heavy animation libraries
- Unoptimized assets

---

# Accessibility Rules

Every feature must support:

- Keyboard navigation
- Screen readers
- Proper contrast ratios
- Semantic HTML

---

# Naming Conventions

## Components

```txt
CommandCenterCard.tsx
SystemOverview.tsx
SystemStatusBadge.tsx
TimelineEvent.tsx
```

---

## Hooks

```txt
useSystems.ts
useMetrics.ts
useTimeline.ts
```

---

## Data Files

```txt
projects.ts
skills.ts
experience.ts
timeline.ts
```

---

# Future Expansion

Potential future modules:

- Live GitHub Activity
- GitHub Contributions
- Deployment History
- Blog Engine
- Admin Dashboard
- AI Assistant
- Terminal Interface
- Resume Viewer
- System Analytics

Design current architecture so these can be added later without major refactoring.

---

# Final Rule

Every page, component, animation, feature, and design decision must answer:

> Does this make the portfolio feel more like a professional engineering mission control system?

If the answer is no, do not implement it.