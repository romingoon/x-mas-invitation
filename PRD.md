# Product Requirements Document (PRD)

## 1. Project Overview
- **Project Name**: 4 Church Joint Christmas Praise Festival Mobile Invitation
- **Goal**: Create a mobile-optimized web invitation for a joint Christmas praise festival hosted by 4 church youth choirs.
- **Target Audience**: Church members, friends, family, and potential attendees.
- **Platform**: Mobile Web (Responsive)

## 2. Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Library**: shadcn/ui
- **Maps**: Naver Map API (for location page)

## 3. Core Features & Pages

### Navigation
- **Bottom Navigation Bar**: Visible on all main pages (1-5).
- **Items**: Home, Intro, Choirs, Program, Location.

### Page Details

#### #1. Home (Landing)
- **Content**:
  - Festival Title (Placeholder: "2024 4-Church Joint Christmas Praise Festival")
  - Date & Time (Placeholder: "2024.12.25 14:00")
  - Location Name (Placeholder: "Main Church Hall")
  - Invitation Message (Short welcoming text)
- **Action**: "View Details" or scroll down prompt.

#### #2. Introduction
- **Content**:
  - Festival Introduction text.
  - Planning Intent/Background story.

#### #3. Choirs Introduction
- **Content**:
  - List of 4 participating church youth choirs.
  - Placeholder for photos and descriptions for each choir.

#### #4. Program
- **Content**:
  - Order of worship/performance.
  - Song list and performers.

#### #5. Location (Wayfinding)
- **Content**:
  - Embedded Naver Map showing the venue.
  - Buttons/Links to open in Naver Map App.
  - "Find Way" feature (link to Naver Map directions).
  - Text info: Public transport (Bus/Subway), Parking instructions.

#### #6. Share
- **Access**: Accessible via a "Share" button (floating or in header/home), not in Bottom Nav.
- **Features**:
  - KakaoTalk Share button.
  - Copy Link button.

## 4. Design Requirements
- **Mobile-First**: Layout optimized for mobile screens.
- **Theme**: Christmas/Winter theme (Red, Green, Gold, White).
- **UX**: Smooth transitions between pages.

## 5. Data Management
- **Content Strategy**: Hardcoded content for prototype, structured to be easily replaceable (e.g., in a separate data file or constants).
