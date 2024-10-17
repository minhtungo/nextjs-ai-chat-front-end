# FROM node:22-alpine AS base

# FROM base AS builder

# WORKDIR /app

# COPY package.json yarn.lock* ./
# COPY prisma ./prisma
# RUN yarn install --frozen-lockfile
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npx prisma generate
# RUN yarn run build

# FROM base AS runner
# WORKDIR /app

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# USER nextjs

# EXPOSE 9000

# CMD ["node", "server.js"]

FROM oven/bun:alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

EXPOSE 9000
CMD ["bun","run", "start"]