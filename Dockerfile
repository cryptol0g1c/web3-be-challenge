# Build stage
FROM node:18.9.0 as build_stage
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY artifacts ./artifacts
COPY tsconfig.json ./tsconfig.json
RUN yarn
RUN yarn build

# Production
FROM node:current-alpine3.15
WORKDIR /app
COPY --from=build_stage  /app/dist ./dist
COPY --from=build_stage  /app/artifacts ./artifacts
COPY --from=build_stage  /app/package.json ./
RUN yarn install --production

# Sample environment variables
ENV RPC_URL https://avalanche.public-rpc.com
ENV PORT 9650
ENV DB_URL mongodb://localhost:27017/avalanche2
ENV TRANSACTION_ADDRESS 0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443
ENV ABI_FILE_PATH=./artifacts/abi/

EXPOSE 9650

CMD [ "node", "dist/server.js" ]