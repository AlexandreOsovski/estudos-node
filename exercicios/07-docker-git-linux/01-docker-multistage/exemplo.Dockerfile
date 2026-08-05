# EXEMPLO — Docker Multi-stage build para app Node.js
# Rode com: docker build -t minha-api -f exemplo.Dockerfile .
#           docker run -p 3000:3000 minha-api

# --- ESTÁGIO 1: build ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build   # gera a pasta dist/ com o JS compilado

# --- ESTÁGIO 2: produção ---
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

USER node

EXPOSE 3000
CMD ["node", "dist/main.js"]
