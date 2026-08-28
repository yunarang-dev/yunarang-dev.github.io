---
shortTitle: "VX"
title:
  ja: "Project VX"
  ko: "Project VX"
tagline:
  ja: "Virtual Developer Transformation――その可能性を試す。"
  ko: "Virtual Developer Transformation――그 가능성을 시험하다."
overview:
  ja: "『Project VX』は、AIを活用することで、人のアイデアをどこまで実現できるのかを試す実験プロジェクトです。バーチャル開発者（AI Developer）を構築し、テストし、実際の開発へと活用していくその過程を記録しています。AIを単なる補助ツールとして使うのではなく、人間がアイデアを定義し、AIをディレクションすることで、どこまで開発を進められるのかを検証します。"
  ko: "『Project VX』는 AI를 활용해 사람의 아이디어를 어디까지 실현할 수 있는지 시험하는 실험 프로젝트입니다. 버추얼 개발자(AI Developer)를 구축하고 검증하며 실제 개발에 활용해 가는 과정을 기록합니다. AI를 단순 보조 도구로 쓰는 대신, 사람이 아이디어를 정의하고 AI를 디렉션할 때 개발을 어디까지 진행할 수 있는지 검증합니다."
status: "active"
role: "AI Workflow · Yuri · Loop Story · Reasoning · Death Game"
technologies:
  - Unity
  - C#
  - AI Agents(GPT 5.6 Luna, Sol, Codex)
focus:
  - title:
      ja: "Virtual Developer"
      ko: "Virtual Developer"
    description:
      ja: "人間が目的とアイデアを示し、AIが現在の開発状態を読み取り、次の実装方法を考える協働形態を試します。"
      ko: "사람이 목적과 아이디어를 제시하고, AI가 현재 개발 상태를 읽어 다음 구현 방법을 판단하는 협업 형태를 실험합니다."
  - title:
      ja: "AI Orchestration"
      ko: "AI Orchestration"
    description:
      ja: "ルミ、Coding Agent、複数モデル、Unity、Git、Reviewをつなぎ、必要な担当へ仕事を分配します。"
      ko: "루미, 코딩 에이전트, 여러 모델, Unity, Git, Review를 연결해 필요한 담당에게 작업을 분배합니다."
  - title:
      ja: "Harnessing"
      ko: "Harnessing"
    description:
      ja: "AIに答えだけを渡すのではなく、計画、検証、復旧、停止条件まで含む仕事環境を設計します。"
      ko: "AI에게 답만 전달하는 것이 아니라 기획, 검증, 복구, 중단 조건까지 포함한 작업 환경을 설계합니다."
  - title:
      ja: "Human in the Loop"
      ko: "Human in the Loop"
    description:
      ja: "人間の意図と判断を中心に置きながら、AIの実装と検証を次の開発サイクルへ戻します。"
      ko: "사람의 의도와 판단을 중심에 두면서, AI의 구현과 검증을 다음 개발 사이클로 되돌립니다."
featured: true
order: 2
heroImage: "../../assets/projects/project-vx-workflow.png"
heroAlt: "開発者がコード、レベル設計、レビュー工程を重ねながらゲーム世界を構築しているスタジオ"
---

:::locale ja


> 「Virtual Developer Transformation――その可能性を試す。」

**『Project VX』**は、AIをゲーム開発の中へ深く組み込み、人間が持つアイデアをどこまで実際のゲームとして形にできるのかを検証する実験プロジェクトである。

ただAIにCodeを書かせるだけのProjectではない。

企画を読み、現在の開発状態を把握する。
次に必要な作業を判断し、必要であればTaskへ分解する。
実装後はUnity上で実際に動作を確認し、問題があれば原因を調査して修正する。
そして検証を終えた変更をGitとDevelopment Stateへ反映し、次の作業へ進む。

私がProject VXで確かめたいのは、こうした**一連のゲーム開発Cycleそのものを、AIが継続して担うことができるのか**ということである。

そして、もしそれが可能になったとき、**人間はゲーム開発の中で何を担当するべきなのか。**

Project VXでは、実際にゲームを作りながら、その可能性を一つずつ確かめていく。

---

## 🌙 『Project VX』とは？

近年、生成AIは急速に発展し、Programmingの分野でもCode生成だけでなく、修正、Review、Debugなど、さまざまな作業を行えるようになった。

しかし、実際のゲーム開発は「Codeを書く」だけでは成立しない。

一つの機能を実装するだけでも、

* 企画や仕様を理解する
* 既存Systemとの依存関係を確認する
* 実装方法を判断する
* Unity上で実際に動作させる
* 他の機能を壊していないか確認する
* 問題があれば原因を調査する
* 変更内容を記録する
* 次の作業を判断する

といった工程が必要になる。

さらに長期間の開発では、

「今どこまで完成しているのか」

「なぜ以前この設計を選んだのか」

「現在の機能は何に依存しているのか」

「次に何を実装するべきなのか」

といった、**開発状態そのものを維持する能力**も必要になる。

一度のPromptに対して、それらしいCodeを生成できるだけでは足りない。

Project VXで検証したいのは、AIがどれほど大量のContentを生成できるかではなく、**AIが一つの継続したゲーム開発Workflowの中で、実際の開発主体として働き続けることができるのか。**という点である。

つまりProject VXで作っているものは、ゲームだけではない。

**「AIがゲームを開発するための開発環境」そのものも、Project VXにおける成果物の一つである。**

---

## 🚀 Virtual Developer Transformation

VXは、**Virtual Developer Transformation**を意味している。
ここで「Automation」ではなく「Transformation」としているのには理由がある。

Project VXが目指しているのは、人間がこれまで行ってきた作業を、そのままAIへ置き換えることではない。

従来の、**Human Developer**という開発形態を、**Human + Virtual Developer**という形へ変えていくことを試している。

### 🤖 「AIを使う」から「AIを開発主体にする」へ

現在でもAIに、

「このCodeを書いてほしい」

「このErrorを直してほしい」

「この機能を実装してほしい」

と依頼することは簡単にできる。私自身も、これまでそのような形でAIを何度も開発へ利用してきた。

しかしこの方法では、人間が毎回、

* 作業内容を考える
* 必要な情報を集める
* 実装範囲を決める
* AIへ細かな指示を与える

必要がある。

つまりAI自身が開発を進めているというより、**人間が非常に高性能な開発Toolを操作している状態**に近い。

Project VXでは、そこからさらに一歩先へ進む。

人間がゲームの企画や目的を提示すれば、AI側が現在のProject Stateを確認し、

「次に何をするべきか」

「どこまで実装するべきか」

「作業を始める前に何を確認するべきか」

を判断できる環境を構築する。

人間は**「何を作りたいのか」**を考える。

Virtual Developerは**「それをどう実現するのか」**を考える。

これが、Project VXで試しているVirtual Developer Transformationである。

---

## 🎼 バーチャル開発者「ルミ」

Project VXの中心にいるのが、AI Orchestrator **「ルミ」**である。

ただし、ルミ自身がすべてのCodeを書き、すべてのToolを直接操作するわけではない。

ルミは、

* 企画
* 現在の開発状態
* 利用可能なTool
* 作業のRisk
* 過去の検証結果

などを確認し、その時点で必要な担当やToolへ作業を分配する。

人間の開発Teamに例えるなら、一人のProgrammerというよりも、**Project全体の状態を把握しながら必要な担当者へ仕事を振り分けるOrchestrator**に近い。

### 🎻 AI Orchestration

Project VXでは、一つのAI Modelだけですべてを処理する構成にはしていない。

ルミを中心として、

* Project VX Planning
* Coding Agent「Codex」
* 複数のAI Model
* Unity CLI
* Unity MCP
* Unity Editor
* Independent Reviewer
* Git

などを接続し、必要に応じて利用する。

最初にこの構造を整理したときは、おおよそ次のような形で考えていた。

![Project VX 開発構造の初期ラフスケッチ](/assets/img/posts/2026-08-18/1.jpg){: .w-75 .rounded-10 }
_Project VX 開発構造の初期ラフスケッチ_

ルミは「一人ですべてを行うAI」ではない。必要な作業をAgentやToolへ渡し、その結果を確認し、再びProject Stateへ反映する。
複数のAIとToolを組み合わせ、それら全体を一つのVirtual Developerとして動かす。

Project VXでは、この考え方を**AI Orchestration**として扱っている。

---

## 🪢 Virtual Developerを支える「Harnessing」

Project VXを進める中で、特に重要だと分かったものが**Harnessing（ハーネシング）**である。

Projectを始める前であれば、「より高性能なAI Modelを使えば、そのままより優秀な開発者になるのではないか」とも考えられる。

しかし実際にAIへ長時間の開発を任せてみると、それだけでは解決できない問題が次々と現れた。

例えば、

* 必要以上に内部実装を調べ続ける
* 既存仕様を勝手に変更する
* 必要のない機能まで追加する
* 一つの修正によって別の機能を壊す
* 十分なTestを行わず「完了」と判断する
* Tool Timeout後に完了済みの作業まで最初からやり直す
* 長いSessionの中で現在のMilestoneを見失う

といった問題である。

そこでProject VXでは、単純にAIへ作業を任せるのではなく、**AIがどのように働くべきなのか、その仕事環境そのものを設計している。**

Harnessingでは、例えば次のような内容を定義する。

* 作業開始前に確認する情報
* 企画資料とDevelopment Stateの優先順位
* 現在のMilestoneを判断する方法
* Codexへ作業を委任する条件
* Unity上での検証方法
* Integration / Regression Testの条件
* Gitの運用方法
* Tool TimeoutやRate Limit発生時の復旧方法
* 再試行する条件
* PARTIAL / BLOCKEDとして停止する条件
* 上位Modelへ判断を引き上げる条件
* Independent Reviewを行う条件

要するに、**AIへ毎回答えを教えるのではなく、AI自身がより正しい答えへ近づける仕事環境を作る。**という考え方である。

そのためProject VXでは、ゲーム本体のCodeだけでなく、Harnessingそのものも継続して開発している。
AIが失敗したときも、「AIが間違えた」だけでは終わらせない。

**「なぜ現在のHarnessingでは、この失敗を防げなかったのか」**まで遡り、必要であればRuleそのものを修正する。

ゲームを改善すると同時に、Virtual Developer自身も改善していく。

---

### 🔀 Model Routing

Harnessingの中でも重要な要素の一つが、**Model Routing**である。

すべての作業に、最も高性能で最もCostの高いAI Modelを使う必要はない。
単純なFile確認と、複数Systemへ影響するArchitecture変更では、必要になる推論能力が異なるからだ。

そこでProject VXでは、

* 作業の難易度
* 曖昧さ
* 失敗した場合の影響
* Regression Risk
* 必要な検証強度

などに応じて利用するModelを変更する。

基本方針は、**「必要十分なModelから始め、本当に必要な場合だけ上位Modelへ引き上げる」**というものだ。

通常の作業は比較的軽いModelへ任せる一方、

* 高Riskな変更
* 複雑なIntegration
* Architecture判断
* 不確実性の高いDebug
* 繰り返し失敗したTask
* 最終検証
* Independent Review

などでは、より高い推論能力を持つModelを利用する。

現在はOpenAIのLuna系・Sol系のModelを中心に、実際の開発結果を見ながらRouting Ruleを調整している。

重要なのは、最も強いModelを使い続けることではない。

**必要な場所へ、必要な能力を配置すること。**

それもVirtual Developerを現実的に運用するために必要な設計である。

---

### 📚 Design SourceとDevelopment State

長期間AIと開発を続けるうえでは、情報の管理も重要になる。

ゲームに関するすべての情報を、一つの巨大なPromptへ詰め込むことは現実的ではない。

そこでProject VXでは、**Design SourceとDevelopment Stateを分離して管理している。**　
ゲームそのものの企画や設計については、Obsidian上の**『Project VX Planning』**をSource of Truthとして扱う。

一方で、

* 現在どのMilestoneにいるのか
* 何が完了したのか
* 次に何をするのか
* 何がまだ検証されていないのか
* どこで作業が中断されたのか

といった実際の進行状態については、Development Plan側で管理する。

これによって、**「ゲームとして何が正しいのか」**と、**「そのうち現在どこまで実装されているのか」**を分離して考えることができる。

長期間の開発になればなるほど、この違いは重要になる。

---

### 🧯 Execution State Persistence and Recovery

Project VXでは、AIが一度も失敗しないことを前提にはしていない。

実際の開発中にも、

* Tool Timeout
* Rate Limit
* 実装ミス
* 状態認識のずれ

など、さまざまな問題が発生した。

特にTest Game 02では、Codexによる作業が途中で停止した際、単純に同じTaskを最初から実行し直すことが必ずしも正しくないと分かった。

すでに一部のCodeが実装されているかもしれない。

Unity側には変更が反映されているかもしれない。

Codex側には途中まで作業したSessionが残っているかもしれない。

その状態を確認せず最初からやり直せば、重複した実装や新しいBugを生む可能性がある。

そこで導入した考え方が、**Execution State Persistence and Recovery**である。

作業が中断した場合は、

1. 現在のProject Stateを確認する
2. 既存のCodex Sessionを確認する
3. Unity側の状態を確認する
4. 完了済みと未完了の作業を分離する
5. 必要な部分だけを再開する

それでも復旧できない場合は、無限に再試行するのではなく、PARTIALまたはBLOCKEDとして現在の状態を残す。

Project VXでは、**「失敗しないAI」ではなく、「失敗しても開発を壊さず復帰できるAI」**を重視している。

---

## 🔄 Project VXの開発Workflow

ここまで説明した仕組みを実際の作業順序として整理すると、現在のProject VXではおおむね次のような流れになる。

![Project VX 開発Workflow](/assets/img/posts/2026-08-18/2.jpg){: .w-75 .rounded-10 }
_Project VX 開発Workflow_

**Planning Document**

↓

**Development Plan / Current State**

↓

**現在のMilestone / Taskを判断**

↓

**ルミがCodexへ実装を委任**

↓

**CodexがProjectを変更**

↓

**Unity CLI / MCP / Editor上で実行**

↓

**機能検証**

↓

**Integration / Regression Test**

↓

**必要に応じてIndependent Review**

↓

**結果をルミが確認**

↓

**失敗 → Codexへ戻して再作業**

**成功 → Gitへ反映 / Planning Sync**

↓

**次のTask / Milestoneへ**

こうして並べると、一般的なゲーム開発とそこまで大きく違わないようにも見える。
しかし、それは意図した結果でもある。

Project VXで作りたいのは、AIのためだけに存在する特殊な開発方法ではない。
**人間がこれまで行ってきた実際のゲーム開発Workflowへ、AIを一つの開発主体として参加させること。**

そのため、最終的なWorkflowそのものは、むしろ一般的なゲーム開発に近い形である方が自然だと考えている。

---

## 👤 Human in the Loop

では、AIが多くの開発作業を担当するようになれば、人間は必要なくなるのだろうか。

少なくともProject VXでは、そのようには考えていない。

AIは、

* 大量の情報を読む
* Codeを書く
* 状態を比較する
* Testを繰り返す
* 決められた基準から問題を探す

といった作業を得意としている。

一方で、

「この操作は気持ちいいのか」

「このCameraは見やすいのか」

「この演出は格好いいのか」

「このゲームを遊びたいと思えるのか」

「そもそも、私は何を作りたいのか」

という問いには、唯一の正解が存在しない。

Project VXのTestでも、AIによる実装が技術的には正常であっても、私が実際にPlayした結果、

* Cameraの見え方
* 移動感覚
* 戦闘のTempo
* Stageの分かりやすさ

などを改めて判断する必要があった。

そのためProject VXでは、人間をWorkflowの外へ追い出すのではなく、**Human in the Loop**として重要な判断地点へ配置している。

人間が目的を決める。

AIが実装する。

人間が結果を体験し、判断する。

必要であれば方向を修正する。

AIが再びそれを実装する。

**HumanとVirtual Developerが、それぞれ異なる強みを持つ二つの開発主体として協働すること。**
これもVirtual Developer Transformationの重要なテーマである。

---

## 🧪 Test Gameによる段階的な検証

Project VXでは、最初から本格的なゲーム制作へ進むのではなく、複数の小規模な**Test Game**を制作しながら、段階的に開発環境を検証している。

確認するのは、単に

「ゲームを完成させられたか」

だけではない。

**そのゲームを作る過程のうち、どこまでをAIへ任せることができたのか。**

どこで人間の介入が必要だったのか。

どの失敗をHarnessingによって防げたのか。

どの問題が次のTestでも再発したのか。

ゲームそのものと同時に、Virtual DeveloperのWorkflowも評価していく。

---

### 🧪 Test Game 01 — 基本Pipelineの検証

最初のTest Gameでは、

**ルミ → Codex → Unity**

という基本Pipelineが成立するかを確認した。

この段階で重要だったのは、複雑なゲームを作ることではない。

AIが企画を受け取り、Coding Agentへ実装を依頼し、実際のUnity Projectへ変更を加え、それをGameとして動作させる。

まずは、この最小限の流れが成立するかを確認した。

Test Game 01によって、AIを利用して実際のUnity Gameを制作するPipelineそのものは成立することを確認できた。

一方で、複数日にわたり継続して開発するためには、

* Planning
* State Management
* Verification
* Recovery
* Git Workflow

をより明確に定義する必要があることも見えてきた。

そこでTest Game 02では、検証範囲を大きく広げることにした。

---

### 📡 Test Game 02 — LAST SIGNAL

**『LAST SIGNAL』**は、約10〜15分でPlayできる2.5D Action / Exploration / Puzzle Gameである。

Test Game 01が、

**「AIを利用してゲームを作るPipelineそのものが成立するか」**

を確認するTestだったのに対し、Test Game 02では、

**「複数のGame Systemを持つ一つのゲームを、Planningに基づいて最初から最後まで継続して開発できるのか」**

を検証している。

実装対象には、

* Player / Camera
* 3段通常攻撃
* Dodge
* Skill
* Damage System
* Enemy AI
* Generator
* Interaction
* Puzzle
* Checkpoint
* Transmission
* Boss
* UI
* Game State
* Game Flow

など、小規模なGameを一本成立させるために必要な複数のSystemが含まれている。

これらを一度に実装するのではなく、ルミ自身がM0〜M8までのMilestoneへ分割し、順番に開発している。

| Milestone                    | 内容                                                 |     状態     |
| :--------------------------- | :------------------------------------------------- | :--------: |
| **M0 — Project Bootstrap**   | Projectの基盤構築                                       |   ✅ Done   |
| **M1 — Player**              | Player移動・Cameraなどの基礎                               |   ✅ Done   |
| **M2 — Combat**              | 攻撃・Damage・Skillなどの戦闘System                         |   ✅ Done   |
| **M3 — Enemy**               | Enemy AI・攻撃・Projectileなど                           |   ✅ Done   |
| **M4 — Level / Interaction** | Stage・Generator・Interactionなど                      |   ✅ Done   |
| **M5 — Game State**          | Checkpointなどゲーム状態の管理                               |   ✅ Done   |
| **M6 — Boss**                | Boss戦および関連System                                   |   ✅ Done   |
| **M7 — Game Flow**           | Main Menu・Pause・Game Over・Game Clear・Transmission  |   🔄 In Progress  |
| **M8 — Polish / QA**         | VFX・SFX・Camera Feedback・Balance・Bug Fix・Regression | 📅 Planned |

M8まで完了した時点で、

**Critical Bugがなく、ゲームを最初から最後まで通してPlayできること**

をTest Game 02の最終的な完了条件としている。

---

## 🔍 「実装した」だけでは完了しない

Project VXでは、Codeを書き終えただけでMilestoneを完了したとは扱わない。

重要な機能については、Unity上で実際に動かしたうえで確認する。

例えばEnemyであれば、

「攻撃するCodeが存在する」

「PlayerがDamageを受ける」

だけでは不十分である。

実際のPlay中に、

* 攻撃範囲は正しいか
* 壁越しに攻撃していないか
* Projectileが環境を無視していないか
* 一回の攻撃が同じ対象へ重複Hitしていないか
* 今回の変更によって既存機能が壊れていないか

といった部分まで確認する。

そのためTest Game 02では、機能単体の確認だけでなく、**Integration Test**と**Regression Test**を重視している。
さらにRiskの高い変更やMilestoneの節目では、実装を行った系統とは別に**Independent Review**を行う。
実装側の判断ミスを、そのまま正しいものとして扱ってしまう可能性を減らすためである。

AIだから特別というよりも、このあたりは人間同士のCode Reviewとそれほど変わらないのかもしれない。

---

## 🌿 必要なものだけを作る

AIによる実装を見ていると、必要以上に一般化されたSystemや、将来使うかもしれない機能を先に作ろうとすることがある。

しかしProject VXは、AIがどれほど大量のCodeを書けるかを競うProjectではない。

そのため現在は、

* 現在のMilestoneを完成させるために必要な機能を優先する
* 次のMilestoneを先行実装しない
* 再利用性は確保するが、必要以上に抽象化しない

という考え方を基本としている。

Virtual Developerに必要なのは、頼めば何でも作ってくれる能力だけではない。

**今、本当に必要なものが何なのかを判断し、それだけを作る能力も必要である。**

---

## 🗺️ Project VXの今後

Project VXの最終的な目的は、Test Gameを大量に作ることではない。

Test Gameを通して、

* Planning
* Orchestration
* Harnessing
* Model Routing
* Implementation
* Testing
* Recovery
* Review
* Git Workflow

といった開発Pipelineを一つずつ実際に検証し、AIがより安定してゲーム開発へ参加できる環境を作ることが目的である。
今後は、複数のTest Gameを通して段階的に検証範囲を広げていく。

| Version | Main Target | Keywords | Status |
|:---:|:---:|:---:|:---:|
| **Test #1** | Basic Workflow | Connectivity |  ✅ Done |
| **Test #2** | Complex Development | Autonomy | 🔄 In Progress |
| **Test #3** | Multimodal Assets | Multimodality | 📅 Planned  |
| **Test #4** | Vertical Slice | Integration & Efficiency | 📅 Planned |
| **Special Test** | Lumi's Astral Days! Prototype | Generalization | 📅 Planned |
| **Project VX** | Full Production | Production | 📅 Planned |

各Testで発生した失敗や問題は、単に次のTestへ持ち越すのではなく、可能な限りHarnessingやWorkflowへ反映する。

そして次のTestで、同じ問題が再び発生するのかを確認する。

Testを重ねるたびに、完成するGameだけではなく、Virtual Developerそのものも少しずつ成長していく。

そのような構造を目指している。

---

## 📼 開発過程も成果物として残す

Project VXの開発中に記録した映像や検証結果についても、今後このページへ追加していく予定である。

完成した場面だけを残すつもりはない。

AIが間違った判断をした場面。

Harnessingがうまく機能しなかった場面。

私が途中で介入した場面。

以前は失敗していた問題を、新しく追加したRuleによって回避できた場面。

そうした失敗と改善の過程も、できる限り記録として残したい。

Project VXにおいて、完成したGameは確かに一つの結果である。

しかし、**そこへ到達するまでの開発過程もまた、このProjectの成果物である。**

そして十分な結果が得られれば、Project VXで構築したVirtual Developerを、VX専用の実験環境から、**より一般的なゲーム開発でも利用できるDevelopment System**へ発展させたいと考えている。

---

## ✨ 『Project VX』が試す可能性

AIは、ゲーム開発者になれるのだろうか。

現時点では、私にもまだ答えは分からない。
おそらく最後まで検証したとしても、「AIだけですべてできる」という単純な結論にはならないと思う。

人間にしか判断しにくいことがある。

一方で、AIの方が圧倒的に得意なこともある。

だから重要なのは、どちらか一方を選ぶことではない。

人間がアイデアを生み出す。

Virtual Developerが、それを実装へ変換する。

人間が実際に結果を体験し、判断する。

AIがその判断を次の実装へ反映する。

失敗すれば原因を調査する。

Harnessingを修正する。

そして、もう一度試す。

そのCycleを何度も繰り返した先で、

**一人では実現できなかったものを、どこまで形にすることができるのか。**

Project VXは、その可能性を実際のゲーム開発を通して確かめるためのProjectである。

このページもまた、Project VXの進行とともに少しずつ更新していくつもりだ。

> **Virtual Developer Transformation――その可能性を試す。**

:::

:::locale ko

> 한국어 본문은 준비 중입니다. 원문은 일본어로 읽을 수 있습니다.

:::
