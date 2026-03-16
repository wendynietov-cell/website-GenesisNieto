# Genesis Nieto Portfolio

Monorepo containing the portfolio website and related applications for Genesis Nieto.

## 📁 Structure

This is a pnpm workspace monorepo with the following structure:

```
├── artifacts/           # Final applications
│   ├── genesis-portfolio/    # Main portfolio website
│   ├── api-server/          # Backend API
│   └── mockup-sandbox/      # Design mockup tool
├── lib/                # Shared libraries
│   ├── api-client-react/   # React API client
│   ├── api-spec/           # OpenAPI specification
│   ├── api-zod/            # Zod schemas
│   └── db/                 # Database utilities
├── scripts/            # Utility scripts
└── package.json       # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js
- pnpm

### Installation
```bash
pnpm install
```

### Development
```bash
# Start portfolio website
pnpm --filter @workspace/genesis-portfolio dev

# Start API server
pnpm --filter @workspace/api-server dev

# Start mockup sandbox
pnpm --filter @workspace/mockup-sandbox dev
```

### Building
```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @workspace/genesis-portfolio build
```

## 🛠️ Technologies

- **Frontend**: React, Vite, TailwindCSS, Radix UI
- **Backend**: Express, TypeScript
- **Database**: Drizzle ORM
- **Tooling**: pnpm workspaces, TypeScript

## 📦 Packages

### Applications
- `@workspace/genesis-portfolio` - Main portfolio website
- `@workspace/api-server` - Express API server
- `@workspace/mockup-sandbox` - Design mockup tool

### Libraries
- `@workspace/api-client-react` - React API client
- `@workspace/api-spec` - OpenAPI specification
- `@workspace/api-zod` - Zod validation schemas
- `@workspace/db` - Database utilities and schemas

## 📜 Scripts

- `pnpm build` - Build all packages
- `pnpm typecheck` - Type check all packages
- `pnpm typecheck:libs` - Type check libraries only
