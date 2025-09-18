# ON3 Studio Website

## Overview

ON3 Studio is a full-stack web application for a creative lounge in Melbourne. The website showcases various creative spaces including recording studio, podcast studio, photography studio, and event space. Built as a modern React application with a Node.js/Express backend, it features a multi-page responsive design with contact form functionality and dark theme aesthetics that align with the creative studio brand.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Styling**: Tailwind CSS with CSS custom properties for theming, configured for dark theme with orange/amber accent colors
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ESM modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured through Neon serverless database
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Middleware**: Express middleware for JSON parsing, CORS, and request logging

### Design System
- **Theme**: Dark mode with warm orange primary colors (hsl(16, 100%, 60%)) and neutral grays
- **Typography**: Inter font family for clean, modern text
- **Components**: Consistent component library based on Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Icons**: Lucide React for consistent iconography

### Data Layer
- **Schema**: Shared schema definitions between client and server using Zod
- **Database Schema**: PostgreSQL tables for users and contact submissions with UUID primary keys
- **Type Safety**: End-to-end type safety from database to UI components
- **Migrations**: Drizzle Kit for database schema migrations

### API Architecture
- **RESTful Design**: Standard HTTP methods for CRUD operations
- **Contact Endpoint**: POST /api/contact for form submissions with validation
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Request Logging**: Custom middleware for API request logging and performance monitoring

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connection**: @neondatabase/serverless driver for database connectivity

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for server-side code
- **Drizzle Kit**: Database migration and introspection tool

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **@hookform/resolvers**: Zod resolver integration for form validation

### Development Environment
- **Replit Integration**: Specialized plugins for Replit development environment
- **Runtime Error Overlay**: Development error display and debugging
- **Hot Reload**: Development server with instant updates