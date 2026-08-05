# DESAFIO — Docker Multi-stage Build
#
# O Dockerfile abaixo builda e roda uma app Node em UM ÚNICO estágio — a
# imagem final fica maior que o necessário (carrega devDependencies,
# código TypeScript fonte, cache do npm etc) e roda como root.
#
# Reescreva-o usando MULTI-STAGE BUILD, com os requisitos:
#   1. Estágio "build": instala TODAS as dependências (npm ci) e roda
#      `npm run build` (gera a pasta dist/).
#   2. Estágio "production": copia SOMENTE package.json/package-lock.json,
#      instala com `npm ci --omit=dev`, e copia APENAS a pasta dist/ do
#      estágio anterior (nada de código-fonte TS ou devDependencies).
#   3. Adicione um HEALTHCHECK que faz uma requisição para
#      http://localhost:3000/health e falha se o status não for 200.
#   4. Rode o processo final como usuário não-root (USER node).
#
# Rode com: docker build -t desafio-multistage -f desafio.Dockerfile .
# (crie um projeto Node mínimo com package.json + script "build" na mesma
# pasta para testar de verdade, ou revise a estrutura comparando com
# exemplo.Dockerfile)

FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]

# TODO: reescreva o Dockerfile acima seguindo os 4 requisitos do enunciado.
