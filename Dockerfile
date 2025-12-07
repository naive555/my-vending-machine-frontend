FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY . .

RUN bun install

RUN bun run next build

FROM oven/bun:1-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

RUN bun install --production

CMD ["bun", "run", "next", "start"]
