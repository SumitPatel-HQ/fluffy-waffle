# AGENTS.md - Developer Guidelines

## Project Overview

This is a full-stack TypeScript application with:
- **Frontend**: React + Vite + Tailwind CSS + Radix UI components
- **Backend**: Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Validation**: Zod
- **Routing**: wouter for client, Express for server
- **Package Manager**: npm (ESM modules)

## Build & Development Commands

### Development
```bash
npm run dev          # Start development server (runs both client & server with hot reload)
```

### Building
```bash
npm run build        # Build client + server for production (uses script/build.ts)
npm run start        # Start production server (runs dist/index.cjs)
```

### Type Checking
```bash
npm run check        # Run TypeScript compiler check (tsc --noEmit)
```

### Database
```bash
npm run db:push      # Push schema changes to database (drizzle-kit push)
```

### Single Test Execution
No test framework is currently configured. If tests are added:
- **Vitest**: `npx vitest run --testNamePattern="test name"`
- **Jest**: `npm test -- --testNamePattern="test name"`

## Code Style Guidelines

### TypeScript Configuration
- Strict mode is enabled (`"strict": true`)
- Module resolution: `bundler`
- No emit on check (`"noEmit": true`)
- All source files must be typed

### Path Aliases
Use these aliases instead of relative paths:
- `@/*` - Client source files (e.g., `@/components/ui/button`)
- `@shared/*` - Shared code between client/server
- `@assets/*` - Static assets in attached_assets folder

### Imports

**Order (recommended):**
1. External libraries (React, Radix, etc.)
2. Path aliases (@/, @shared/)
3. Relative imports (./, ../)

**Example:**
```typescript
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@shared/routes";
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (components) | PascalCase | `Button.tsx`, `Handbook.tsx` |
| Files (utilities) | kebab-case | `query-client.ts`, `use-toast.ts` |
| React Components | PascalCase | `function Button() {}` |
| Functions | camelCase | `function getRules()` |
| Constants | PascalCase | `const buttonVariants = ...` |
| Database Tables | snake_case | `rules`, `user_sessions` |
| CSS Classes | kebab-case | `inline-flex`, `rounded-md` |

### Component Patterns

**Functional Components with Props Interface:**
```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"
```

### Database Schemas (Drizzle ORM)

**Pattern:**
```typescript
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rules = pgTable("rules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const insertRuleSchema = createInsertSchema(rules).omit({ id: true });
export type InsertRule = z.infer<typeof insertRuleSchema>;
export type Rule = typeof rules.$inferSelect;
```

### Zod Schemas & API Routes

**API Route Definition Pattern:**
```typescript
import { z } from 'zod';
import { insertRuleSchema, rules } from './schema';

export const api = {
  rules: {
    list: {
      method: 'GET' as const,
      path: '/api/rules' as const,
      responses: {
        200: z.array(z.custom<typeof rules.$inferSelect>()),
      },
    },
  },
};
```

**Express Route Handler:**
```typescript
app.get(api.rules.list.path, async (req, res) => {
  const rulesList = await storage.getRules();
  res.json(rulesList);
});
```

### Error Handling

**Server-side Error Middleware:**
```typescript
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Internal Server Error:", err);
  
  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json({ message });
});
```

### CSS & Styling

- Use Tailwind CSS utility classes
- Use `cn()` utility from `@/lib/utils` for conditional class merging
- Use cva (class-variance-authority) for component variants
- Follow existing color tokens from tailwind.config.ts

### Form Handling

- Use react-hook-form with Zod resolvers
- Follow pattern: `@hookform/resolvers` + `zod`

## Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/        # Radix UI based components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities
│   │   └── pages/         # Page components
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite dev server setup
├── shared/                # Shared code
│   ├── schema.ts          # Drizzle schemas
│   └── routes.ts          # API route definitions
├── script/                # Build scripts
│   └── build.ts           # Production build script
└── migrations/            # Database migrations
```

## Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Common Tasks

### Adding a New Database Table
1. Add schema to `shared/schema.ts`
2. Run `npm run db:push`
3. Create storage function in `server/storage.ts`
4. Add API route in `server/routes.ts`
5. Add route definition in `shared/routes.ts`

### Adding a New UI Component
1. Create file in `client/src/components/ui/`
2. Use cva for variants
3. Use React.forwardRef for ref forwarding
4. Export both component and variants

### Adding a New API Route
1. Define route in `shared/routes.ts`
2. Implement handler in `server/routes.ts`
3. Add storage function if needed in `server/storage.ts`
