FROM node:18

COPY ./packages/api/package.json .
COPY ./yarn.lock .
COPY tsconfig.base.json .

RUN yarn install --frozen-lockfile --non-interactive

COPY ./packages/api .

ENV PORT 80

RUN yarn build

RUN yarn install --production --frozen-lockfile --non-interactive --prefer-offline

EXPOSE 80

# HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/health || exit 1

CMD [ "yarn", "start" ]
