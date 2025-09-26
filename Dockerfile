FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy server package files
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy client package files and install client dependencies
COPY client/package.json ./client/
RUN cd client && bun install --frozen-lockfile

# Copy all source files
COPY . .

# Build both server and client
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 hono

# Copy built server
COPY --from=builder --chown=hono:bunjs /app/dist/server ./dist/server

# Copy built client
COPY --from=builder --chown=hono:bunjs /app/client/dist ./client/dist

# Copy only production dependencies
COPY --from=builder --chown=hono:bunjs /app/node_modules ./node_modules
COPY --from=builder --chown=hono:bunjs /app/package.json ./

USER hono
EXPOSE 3000
CMD ["bun", "run", "dist/server/index.js"]