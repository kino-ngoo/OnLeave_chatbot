## Domain Search

- #### [寫一隻聊天機器人(chatbot)，然後呢？](https://noob.tw/chatbot-and-then/)

- #### [聊天機器人(Chatbot)失敗了，七點告訴你為什麼](https://noob.tw/chatbot-fail/)

除非 chatbot 用了 NLP 技術，否則 chatbot 根本不知道你在說什麼。此外 chatbot 很難從上下文之間記住訊息，使用者還沒問完問題，chatbot 就已經跟丟了。

- [Why chatbots fail](https://chatbot.fail)

![img](https://static1.squarespace.com/static/58c58ddfb3db2b34dd08832e/t/58c96e5d1b10e3a1c3c73d42/1489596011039/?format=750w)

- #### [Chatbot 開發前的那兩三事(一)：你真的需要聊天機器人嗎？](https://noob.tw/chatbot-introduce-1/)

- #### [Chatbot 開發前的那兩三事(二)：挑選平台、功能設計](https://noob.tw/chatbot-introduce-2/)

功能設計：App 和 Chatbot 其實沒什麼不同

首推 Telegram 平台，能夠做到付款、Dialog 對話框、甚至在 inline keyboard 塞 gif 等等。

就 event 的部分，Messenger 可以做到 message_read、message_delivery 的 event；LINE 可以做到 follow、unfollow、join、leave、beacon 等 event；Telegram 則有一些比較特別的像是 edited_message、channel_post、shipping_query、pre_checkout_query 等等。

其中，Telegram 可以用 Polling 的方式，不需要特別找一個 HTTP 伺服器做 Webhook。

- #### [Chatbot 開發前的那兩三事(三)：中文語意分析、使用分析平台](https://noob.tw/chatbot-introduce-3/)

中文斷詞這東西可以用哪些工具來達成呢？中研院有一套斷詞系統叫 CKIP 可以使用，社群維護的版本也有一支叫 jieba （結巴）可以用。

如果想自己實作的話，可以參考一下 Mikolov 提出的 word2vec、sentence2vec 甚至是 doc2vec 方法，主要是把詞轉成向量，去推測相似詞、字的意思等等。或是最近的 Google Sling 好像也有點紅。

各大公司都有推自己的語意分析平台：

- [Dialogflow](https://dialogflow.com/) (以前叫 API.AI，by Google)
- [LUIS.ai](https://www.luis.ai/home) (by Microsoft)
- [Wit.ai](https://wit.ai/) (by Facebook)
- [Watson Conversation](https://www.ibm.com/watson/services/conversation/) (by IBM)