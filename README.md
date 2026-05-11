# 🌱 TraceGreen – Sustainability Assessment Tool

TraceGreen is a web-based application designed to help small and medium-sized businesses evaluate their environmental impact based on key operational inputs such as electricity usage, water consumption, waste generation, and transportation.

The system provides a simple assessment workflow and generates a sustainability score along with actionable recommendations.


## Key Features

- Interactive assessment form with structured input fields
- Real-time sustainability score calculation
- Impact breakdown (electricity, water, waste, transport)
- Data visualization using charts
- Recommendation engine based on impact analysis
- Report history stored in Supabase database
- Edit and update existing reports
- Responsive UI (mobile & desktop friendly)


##  System Logic Overview

The application follows a simple but structured flow:
1. User submits assessment form
2. System calculates sustainability score and impact
3. Data is stored in Supabase (INSERT)
4. If editing an existing report → system performs UPDATE instead of creating duplicates
5. Dashboard displays summary and insights
6. History page allows retrieval and modification of past records


##  Tech Stack

- **Frontend:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Backend-as-a-Service:** Supabase (PostgreSQL + API)
- **Charting:** Recharts
- **State Handling:** localStorage + Supabase integration


##  Key Implementation Highlights

- Implemented conditional logic to switch between INSERT and UPDATE operations
- Prevented duplicate database records during edit flow
- Managed client-side state persistence using localStorage
- Designed clean UI with reusable layout structure
- Integrated Supabase with proper row-level security handling


##  Future Improvements

- Export report to PDF
- Add user authentication
- Implement report version history
- Add delete functionality (full CRUD)
- Improve analytics and benchmarking


##  Project Purpose

This project was developed as part of a learning initiative to strengthen full-stack development skills, particularly in building structured web applications with real-world data flow and database interaction.

