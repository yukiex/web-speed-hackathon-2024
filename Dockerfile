# ビルドステージ
FROM node:20.11.1-alpine as builder

WORKDIR /usr/src/app

# tzdataの設定（この段階では削除しない）
RUN apk --no-cache add tzdata
COPY . .

# 依存関係のインストール
RUN corepack enable pnpm && \
    pnpm install

# アプリケーションのビルド
RUN pnpm build

# 実行ステージ
FROM node:20.11.1-alpine

# タイムゾーン設定
COPY --from=builder /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# jemallocの設定
RUN apk --no-cache add jemalloc
ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2

WORKDIR /usr/src/app

# ビルドされたファイルと本番依存関係のみをコピー
COPY --from=builder /usr/src/app .

# 実行ステージで pnpm をインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PORT 8000
EXPOSE 8000

ENTRYPOINT ["pnpm"]
CMD ["start"]
