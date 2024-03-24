# ベースイメージの指定
FROM node:20

# 作業ディレクトリの設定
WORKDIR /app/frontend

# フロントエンドの依存関係のインストール
COPY package*.json ./
RUN npm install

# ソースコードの追加
COPY . .

# ポートの公開
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "start"]
