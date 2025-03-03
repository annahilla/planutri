# Planutri

## Table of contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Deployment](#deployment)

## Description

Planutri is a smart meal planning full-stack application built with Next.js. It helps users organize their meals effortlessly while automatically generating a shopping list. With Planutri, you can manage recipes, adjust portion sizes, and plan your meals efficiently — all in one place.

## Features

- **Meal Planning**: Assign meals to specific days with full flexibility.
- **Recipe Management**: Create, edit, and store recipes in a database. Mark recipes as favorites and filter them using tags.
- **Automatic Shopping List**: Generates a shopping list based on planned meals.
- **Customizable Portions**: Adjust recipe quantities based on the number of servings.
- **User-Friendly Interface**: Simple and intuitive design for easy meal planning.
- **Testing**: Includes three types of tests:
  - Snapshot tests
  - Unit tests
  - Integration tests

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js with MongoDB
- **State Management**: Context API & TanStack Query
- **Authentication**: Firebase
- **Styling**: Tailwind CSS
- **API**: Custom-built endpoints for CRUD operations
- **Images**: Cloudinary
- **Testing**: Jest

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/annahilla/planutri
   cd planutri
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a .env.local file and add the environment variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at http://localhost:3000

## Usage

- Add and manage recipes from the dashboard.
- Assign meals to specific days.
- Adjust serving sizes.
- Generate the shopping list.

## Testing

To run tests, use:

```bash
npm run test
```

## Future improvements

- Enable saving multiple meal plans.
- Add AI-powered meal suggestions.
- Implement user preferences for dietary restrictions.
- Add inernationalization with i18n.
- Implement drag & drop on meal planner.
- Allow users to post public recipes.
- Enable a voting system for public recipes.
- Support multi-week meal planning.
- Categorize shopping list.

## Deployment

Planutri is deployed with **Vercel** and accessible at: **[Planutri Live Demo](https://planutri.vercel.app)**
