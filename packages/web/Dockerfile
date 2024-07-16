FROM node:18

COPY ./packages/web/package.json .
COPY ./yarn.lock .
COPY tsconfig.base.json .

RUN yarn install --frozen-lockfile --non-interactive

COPY ./packages/web .

ARG API_ROUTE=http://localhost:3000
ARG GITHUB_ID=0

ENV NEXT_PUBLIC_API_ROUTE=${API_ROUTE}
ENV NEXT_PUBLIC_GITHUB_ID=${GITHUB_ID}
ENV PORT=80
RUN yarn build
RUN yarn install --production --frozen-lockfile --non-interactive --prefer-offline

EXPOSE 80

CMD [ "yarn", "start" ]
