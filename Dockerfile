FROM node:20-alpine AS base
WORKDIR /app

FROM base AS builder
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile
COPY packages ./packages
RUN pnpm --filter @aura/ui run typecheck || true
RUN pnpm --filter template build

FROM base AS production
ENV NODE_ENV=production
RUN npm i -g pnpm
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/template/package.json ./package.json
COPY --from=builder /app/packages/template/.next ./.next
COPY --from=builder /app/packages/template/public ./public
COPY --from=builder /app/packages/ui/src ./packages/ui/src
WORKDIR /app
EXPOSE 1015
CMD ["npx", "next", "start", "-p", "1015"]
