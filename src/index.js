const {
  loadEnv,
  enableReqeustLogger,
  sendNotification,
  buildInitialModalView,
  buildSecondModalView,
  toPrettfiedJSONString,
  ModalViewBlocks,
} = require("./utils");

// ------------------------------------------------------
// *** Slask アプリの設定 ***

// OAuth & Permissions
//  - ブラウザで Slack ワークスペースにログインした状態 https://slack.com/signin で https://api.slack.com/apps にアクセスしてください
//  - OAuth & Permissions のページに移動します
//  - Bot token scopes で commands, chat:write, chat:write.public, im:write を追加してください
//  - ワークスペースにこの Slack アプリをインストールします

// 以下の設定を .env.sample をコピーしてつくった .env に設定します
//   - SLACK_BOT_TOKEN (Settings > Install App で確認できます)
//   - SLACK_SIGNING_SECRET (Settings > Basic Information > App Credentials > Signing Secret で確認できます)
loadEnv();

const { App } = require("@slack/bolt");

// App は Slack アプリを抽象化したクラスです。この App のインスタンスは、
// ミドルウェア（共通処理）やリスナー関数を登録したり、ローカルで Web サーバープロセスを立ち上げるために使われます。
const app = new App({

  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: 'debug',
});
enableReqeustLogger(app);

// npm run local (nodemon がファイルの変更を検知してくれます)
(async () => {
  await app.start(process.env.PORT || 4040); // POST http://localhost:3000/slack/events
  console.log("⚡️ Bolt app is running!");
})();



















// ------------------------------------------------------
// *** グローバルショートカットとモーダル ***

// https://api.slack.com/apps で Interactivity & Shortcuts へ移動します
//  - この機能を有効にして　Request URL に https://{あなたのドメイン}/slack/events) を設定します
//  - Callback ID に new-helpdesk-request を指定したグローバルショートカットを作成して保存します

// ------------------------------------------------------
// ここではグローバルショートカットの実行時に呼び出されるリスナー関数を定義します
app.shortcut("leave-call", async ({ logger, client, body, ack }) => {

  // -------------------------------
  // ここで Slack からのリクエストを受け付けて 200 OK をさっさと返してしまいます
  // https://api.slack.com/interactivity/handling#acknowledgment_response
  await ack();

  // -------------------------------
  // 最初のステップであるカテゴリ選択のモーダルを開きます
  // https://api.slack.com/methods/views.open
  // https://api.slack.com/block-kit-builder
  // ./modals/step1.json
  const step1ModalView = buildInitialModalView("helpdesk-request-modal");
  logger.info(toPrettfiedJSONString(step1ModalView));

  const res = await client.views.open({
    "trigger_id": body.trigger_id,
    "view": step1ModalView,
  });
  logger.info("views.open response:\n\n" + toPrettfiedJSONString(res) + "\n");

});

// -------------------------------
// カテゴリが選択されたときに呼び出されるリスナー関数を定義します



// -------------------------------
// 「カテゴリ選択に戻る」ボタンを押したときに実行されるリスナー関数を定義します
app.action("helpdesk-request-modal-reset", async ({ ack, body, logger, client }) => {

  // -------------------------------
  // Slack からのリクエストを受け付けて 200 OK をさっさと返してしまいます
  // https://api.slack.com/interactivity/handling#acknowledgment_response
  await ack();

  // -------------------------------
  // 入力フォームを表示していたモーダルを書き換えて、カテゴリ選択画面に戻します
  // https://api.slack.com/methods/views.update
  // https://api.slack.com/block-kit-builder
  // ./modals/step1.json
  const step1ModalView = buildInitialModalView("helpdesk-request-modal");
  logger.info(toPrettfiedJSONString(step1ModalView));

  const res = await client.views.update({
    view_id: body.view.id,
    hash: body.view.hash,
    view: step1ModalView,
  });
  logger.info("views.open response:\n\n" + toPrettfiedJSONString(res) + "\n");
});


  