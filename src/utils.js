exports.loadEnv = function () {
  // See https://github.com/motdotla/dotenv
  const config = require("dotenv").config().parsed;
  // Overwrite env variables anyways
  for (const k in config) {
    process.env[k] = config[k];
  }
};

function toPrettfiedJSONString(json) {
  return JSON.stringify(json, null, 2);
}

exports.toPrettfiedJSONString = toPrettfiedJSONString;

exports.enableReqeustLogger = function (app) {
  app.use(async (args) => {
    const copiedArgs = JSON.parse(JSON.stringify(args));
    copiedArgs.context.botToken = 'xoxb-***';
    if (copiedArgs.context.userToken) {
      copiedArgs.context.userToken = 'xoxp-***';
    }
    copiedArgs.client = {};
    copiedArgs.logger = {};
    args.logger.info(
      "\n" +
      "---------------\n" +
      "   Context\n" +
      "---------------\n" +
      toPrettfiedJSONString(copiedArgs.context) +
      "\n"
    );
    args.logger.info(
      "\n" +
      "---------------\n" +
      "   Payload\n" +
      "---------------\n" +
      toPrettfiedJSONString(copiedArgs.body) +
      "\n"
    );
    const result = await args.next();
    return result;
  });
};

exports.sendNotification = async function (client, userIdOrChannelId, text) {
  if (typeof userIdOrChannelId !== "undefined") {
    if (userIdOrChannelId.startsWith("U") || userIdOrChannelId.startsWith("W")) {
      const userId = userIdOrChannelId;
      const botDm = await client.conversations.open({ users: userId })
      await client.chat.postMessage({
        channel: botDm.channel.id,
        text: text,
      });
    } else {
      const channelId = userIdOrChannelId;
      await client.chat.postMessage({
        channel: channelId,
        text: text,
      });
    }
  }
};


exports.buildInitialModalView = function (callbackId) {
  return {
    "title": {
      "type": "plain_text",
      "text": "Teams Bot",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit",
      "emoji": true
    },
    "type": "modal",
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "承認一覧 : 6件",
          "emoji": true
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "出張仮払申請書"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": " "
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "部長承認"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "寺崎啓一"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2023/11/02 22:36"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "稟議書"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": "会計システム新バージョン開発に伴う外注費の伺い"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "部長承認"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "榎本和代"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2016/10/13 12:37"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "契約審査依頼書（初回)"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": "株式会社MMCエージェント"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "申請部署部長"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "岸本好"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2023/10/19 17:08"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "稟議書"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": "パソコン購入の件"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "部長承認"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "岸本好"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2011/05/06 11:36"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "稟議書"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": "営業車両新規導入の件"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "部長承認"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "角田淑子"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2011/05/06 11:34"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム名*"
          },
          {
            "type": "mrkdwn",
            "text": "契約審査依頼書（初回)"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*フォーム詳細*"
          },
          {
            "type": "mrkdwn",
            "text": "ABC不動産販売"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*現在のステップ*"
          },
          {
            "type": "mrkdwn",
            "text": "申請部署部長"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請者名*"
          },
          {
            "type": "mrkdwn",
            "text": "北上歩"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*申請日時*"
          },
          {
            "type": "mrkdwn",
            "text": "2011/04/27 15:25"
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "承認する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "primary"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "却下する",
              "emoji": true
            },
            "value": "click_me_123",
            "style": "danger"
          }
        ]
      },
      {
        "type": "divider"
      }
    ]
  };
}

