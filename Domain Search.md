# Domain Search

### Chatbot

#### [寫一隻聊天機器人(chatbot)，然後呢？](https://noob.tw/chatbot-and-then/)

#### [聊天機器人(Chatbot)失敗了，七點告訴你為什麼](https://noob.tw/chatbot-fail/)

除非 chatbot 用了 NLP 技術，否則 chatbot 根本不知道你在說什麼。此外 chatbot 很難從上下文之間記住訊息，使用者還沒問完問題，chatbot 就已經跟丟了。

#### [Why chatbots fail](https://chatbot.fail)

![img](https://static1.squarespace.com/static/58c58ddfb3db2b34dd08832e/t/58c96e5d1b10e3a1c3c73d42/1489596011039/?format=750w)

#### [Chatbot 開發前的那兩三事(一)：你真的需要聊天機器人嗎？](https://noob.tw/chatbot-introduce-1/)

#### [Chatbot 開發前的那兩三事(二)：挑選平台、功能設計](https://noob.tw/chatbot-introduce-2/)

功能設計：App 和 Chatbot 其實沒什麼不同

首推 Telegram 平台，能夠做到付款、Dialog 對話框、甚至在 inline keyboard 塞 gif 等等。

就 event 的部分，Messenger 可以做到 message_read、message_delivery 的 event；LINE 可以做到 follow、unfollow、join、leave、beacon 等 event；Telegram 則有一些比較特別的像是 edited_message、channel_post、shipping_query、pre_checkout_query 等等。

其中，Telegram 可以用 Polling 的方式，不需要特別找一個 HTTP 伺服器做 Webhook。

#### [Chatbot 開發前的那兩三事(三)：中文語意分析、使用分析平台](https://noob.tw/chatbot-introduce-3/)

中文斷詞這東西可以用哪些工具來達成呢？中研院有一套斷詞系統叫 CKIP 可以使用，社群維護的版本也有一支叫 jieba （結巴）可以用。

如果想自己實作的話，可以參考一下 Mikolov 提出的 word2vec、sentence2vec 甚至是 doc2vec 方法，主要是把詞轉成向量，去推測相似詞、字的意思等等。或是最近的 Google Sling 好像也有點紅。

各大公司都有推自己的語意分析平台：

- [Dialogflow](https://dialogflow.com/) (以前叫 API.AI，by Google)
- [LUIS.ai](https://www.luis.ai/home) (by Microsoft)
- [Wit.ai](https://wit.ai/) (by Facebook)
- [Watson Conversation](https://www.ibm.com/watson/services/conversation/) (by IBM)

中文的情感分析比較少，大多都是英文的，但我發現把句子翻成英文再去做分析其實不會差太多，除非像是「幫QQ」這種特殊字眼，或是翻譯不到味的可能會差很多。

Google 最近有開放一個分析平台叫 Chatbase，開發者可以在上面分析聊天對象、整體趨勢和狀況，藉此提高 Chatbot 的準確性、提升使用者體驗等等，有點像是 Chatbot 版本的 Google Analytics。

#### [以客戶端優先的角度來思考 Bot](https://hackmd.io/c/mopcon-2017/https%3A%2F%2Fhackmd.io%2FGwRgzAnAJgxg7CAtDMAjATIgLFgHEgQxADMpFUSBWMEYABhlSmCA)

四個一定要考慮到的問題

1. State v.s Data
2. 點到之前的訊息會發生什麼事情
3. 不同的 provider，API 會完全不一樣
4. AI/NLP
   - 有無地方跟 NLP 組合
   - 有無地方收集資料

#### ngrok

[測試 webhook 不再煩惱：ngrok | TechBridge 技術共筆部落格](https://blog.techbridge.cc/2018/05/24/ngrok/)

[怎麼將內網的 localhost 讓外面的人都看得到呢？用用 ngrok 吧！ - 転転: Brand & Marketing Consultancy](https://tenten.co/blog/how-to-use-ngrok-to-connect-your-localhost/)

[Ngrok – 讓本機也可以開發 webhook 免部署環境的神器 – 碼人日誌](https://coder.tw/?p=7211)

### Skype for Business Chatbot

#### [Azure Bot 服務 - Bot Service | Microsoft Docs](https://docs.microsoft.com/zh-tw/azure/bot-service/?view=azure-bot-service-4.0)

#### [Enterprise Chatbots on Skype for Business – Chatbots Magazine](https://chatbotsmagazine.com/enterprise-chatbots-on-skype-for-business-af635f346f5c)

**Skype for Business bot connector**. By leveraging **UCWA**(Unified Communications Web API) and using Bot Framework Direct Line API, we developed an enterprise ready connector for Skype for Business.

- This connector can be **deployed in Azure** and enables a secure bot communication channel on Skype for Business.
- We support both, **Skype for Business online** (Office 365) and **on-premise** as well.
- We are currently working to support clients that use **Skype for Business 2015 on-premise** and older Lync versions.

#### [Skype for Business Bot Framework (Preview) | Microsoft Docs](https://docs.microsoft.com/en-us/skype-sdk/skype-for-business-bot-framework/docs/overview#create-a-skype-for-business-bot)

- 

#### []['][與「視訊機器人」對談？Skype為何這麼做 | 匯流新聞網](https://cnews.com.tw/與「視訊機器人」對談？skype為何這麼做/)

開發者可以在Github上使用BotBuilder RealTimeMediaCalling，讓Skype機器人可以進行視訊對話。

#### [Office 365 机器人（Bot）开发入门指南 · Office 365 开发入门指南](https://chenxizhang.gitbooks.io/office365devguide/content/docs/botframeworkguide.html)

