# 版式样式库

用于控制全案图、分镜图、场景图、角色卡的画面版式。视觉风格负责“像什么类型片”，版式样式负责“这张图如何排版”。生成 prompt 时先选视觉风格 VS，再选版式样式 LS；用户没有指定时按题材自动匹配。

## 快速调用

```text
版式样式：LS12 黑金武侠角色圣经版，黑底暗金细线，高密度导演标注，多模块角色一致性参考。
```

## 全案图样式

### LS1 影视工业全案板
- **适用**：默认全案、pitch deck、项目总览
- **结构**：顶部项目栏 + 左侧角色/道具 + 中央主场景 + 下方分镜序列 + 底部参数栏
- **视觉**：黑/冷灰背景，细线网格，信息密度高但层级清楚
- **强调**：角色 DNA、场景 DNA、镜头参数、色卡、声音、材质
- **避免**：海报式单图、无参数、装饰性文字过多

### LS2 科幻控制台全案板
- **适用**：科幻、太空歌剧、机甲、AI、神级文明
- **结构**：上方创作方向条；左侧角色转身/近景；右侧场景宽幅概念图；中部运动路线/区域图；底部 6-8 镜缩略分镜和参数仪表
- **视觉**：深空黑、蓝白冷光、银色金属、HUD 细线、全息数据层
- **强调**：宇宙尺度、环形建筑、星舰、全息界面、镜头路线、区域 A/B/C 标注
- **避免**：暖色古风、纸质质感、低科技手绘感

### LS3 神话巨物四镜序列
- **适用**：东方神话、巨龙、神宫、巨兽、神圣压迫感
- **结构**：顶部大标题与关键词；中部 4 个等宽大画幅镜头；每镜下方附时间、镜头语言、光线、色调；底部色卡和 camera parameters
- **视觉**：深青黑底、石灰/云灰主体、暗金文字线框、庄严留白
- **强调**：巨物尺度、建筑压迫、云海、远古神话、4 镜完整起承转合
- **避免**：小格过多、角色卡模块抢画面、杂乱 HUD

### LS4 九宫格情绪拼贴全案
- **适用**：快速提案、氛围探索、角色+场景混合灵感板
- **结构**：3x3 九宫格，每格一个关键视觉：场景远景、角色登场、面部特写、交互、危机、能力展示、对话、交通/道具、背影收束
- **视觉**：图像为主，细白线分隔，少文字或无文字
- **强调**：风格一致、色调统一、人物跨格一致、每格像一张电影 still
- **避免**：大段说明、文字水印、每格风格漂移

## 分镜图样式

### LS5 竖排技术分镜表
- **适用**：导演执行、广告片、短剧、15-30s 分镜
- **结构**：表格列为镜头编号 / 画面 / 时长 / 镜头语言 / 画面内容 / 声音 / 转场节奏；每行一镜
- **视觉**：黑底灰线，画面缩略图居左，文字参数居右，克制工业感
- **强调**：时长精确、景别焦段、运镜、声音、转场
- **避免**：图片过大挤掉参数、文字密到不可读

### LS6 横幅长镜头时间轴
- **适用**：15s 动作、武侠爆发、灾难、情绪递进
- **结构**：左侧竖向编号与箭头；中间 5-7 条超宽电影横幅；右侧每条对应帧名、时长、景别、运镜、焦段、色彩、灯光、转场
- **视觉**：黑金边框，宽银幕裁切，大片 still 优先，参数像分镜手册
- **强调**：镜头推进节奏、长画幅冲击力、字幕框、动作阶段
- **避免**：每帧变成方格、右侧参数缺失、角色跨帧漂移

### LS7 合并帧视频锚点
- **适用**：Seedance/Runway/可灵 视频参考图，3-4 张图覆盖全部镜头
- **结构**：每张图包含 2-3 个横幅帧，上下堆叠，几乎无文字；用于喂给视频模型
- **视觉**：纯画面优先，细分隔线，保持同一角色、同一场景、同一调色
- **强调**：首尾帧锚定、动作连贯、视线方向、运动方向
- **避免**：大量中文标注、logo、水印、表格线过重

## 场景图样式

### LS8 场景全能参考板
- **适用**：单场景锁定、快速视频、场景+角色+光照合一
- **结构**：主场景宽幅占 60% 以上；下方/侧边放材质、光源、道具、天气、声音氛围小格
- **视觉**：电影环境概念图 + 美术设定卡，细线标注可少量存在
- **强调**：空间纵深、主光方向、地面/天空/建筑材质、角色位置比例
- **避免**：只做纯风景不锁空间、无主光、无道具位置

### LS9 场景九宫格锁定
- **适用**：复杂宫殿、战场、城市、太空基地、多角度视频
- **结构**：3x3 九宫格：正面全景 / 左侧全景 / 右侧全景 / 入口 / 核心元素 / 道具 / 地面材质 / 光源 / 天空或天花板
- **视觉**：所有格同一时段、同一色温、同一材质体系
- **强调**：空间一致性、光照一致、关键元素位置关系
- **避免**：9 格像 9 个不同地点、天气跳变、比例漂移

### LS10 双联宽幅场景锚点
- **适用**：动作视频开场/爆发前后、同一场景两种状态
- **结构**：上下两张 21:9 超宽幅，第一张远景建立空间，第二张中近景建立动作/角色；可扩展为三联
- **视觉**：几乎无文字，电影剧照优先，细边框分隔
- **强调**：同一空间的尺度变化、前后状态变化、动作路线
- **避免**：上下两张构图无关、角色服装变化、光线不连续

## 角色卡样式

### LS11 干净角色一致性卡
- **适用**：AI 视频角色锚定、模型一致性优先
- **结构**：6 模块，三视图 / 面部多角度 / 表情 / 手部 / 道具 / 发型服装状态
- **视觉**：白色或浅灰棚拍背景，无文字、无箭头、无红框
- **强调**：跨格五官、发型、服装、体型完全一致
- **避免**：导演标注、复杂背景、文字、编号

### LS12 黑金武侠角色圣经
- **适用**：武侠、玄幻、黑金动作、角色设定展示
- **结构**：左侧大三视图；左边窄栏不可变特征特写；右上面部多角度；右中表情范围；右侧服装层次分解；底部武器、手部、发型动态
- **视觉**：纯黑/暗岩背景，暗金细线框，红色仅用于“不可变特征/箭头”，高密度中文导演标注
- **强调**：不可变疤痕、瞳孔、眉眼、头身比、服装层次、武器尺寸、握剑姿态
- **避免**：浅灰棚拍、可爱卡通、文字遮挡角色主体

### LS13 科幻神使角色系统卡
- **适用**：银甲、AI、太空、神级文明、机甲角色
- **结构**：角色正/背/侧 + 盔甲材质特写 + 面部核心特写 + 能力 HUD + 翅膀/机械结构展开 + 交互界面
- **视觉**：银蓝金属、深空背景、蓝白能量点、全息细线
- **强调**：盔甲片结构、发光核心、机械翼、全息交互、同一面孔一致
- **避免**：古风布料、手绘水墨、暖色宫廷

## 全能版样式

全能版用于“一张图尽量锁住项目核心”：角色、场景、镜头、道具、色彩、声音、材质都要出现。适合提案、导演沟通、第一轮定调。

### LS14 全能电影圣经板
- **适用**：任何完整短片/漫剧项目的第一张主参考图
- **结构**：顶部 logline 与风格条；左侧角色 DNA；中央超大主视觉；右侧世界观/场景/道具；底部 5-8 镜分镜 + 色卡 + 声音波形 + camera package
- **视觉**：电影工业 pitch board，暗底细线，模块多但主体图最大
- **强调**：一个项目的“唯一主锚点”，角色、场景、镜头必须互相引用
- **Prompt 句式**：`LS14 全能电影圣经板，one-page visual bible, central hero frame, character DNA strip, environment anchor, prop callouts, shot timeline, color/audio/camera specs`
- **避免**：所有模块同等大小导致主视觉失焦

### LS15 导演作战室全案
- **适用**：动作、战争、群像、复杂调度、多角色同场
- **结构**：中央场景俯视图/动线图；四周角色站位、冲突关系、镜头机位、关键帧；底部战术式分镜时间轴
- **视觉**：黑底白线/暗金线，像导演调度墙、战术地图、previs board
- **强调**：人物位置、运动方向、镜头路径、空间关系
- **Prompt 句式**：`director war-room board, overhead blocking map, camera route arrows, character position markers, action beats, tactical storyboard`
- **避免**：只做漂亮画面不交代空间调度

### LS16 世界观设定全能板
- **适用**：玄幻、科幻、异世界、史诗长篇、系列设定
- **结构**：世界地图/区域关系 + 核心建筑/场景 + 角色阵营 + 生物/道具 + 时代材质 + 色彩系统
- **视觉**：设定集 opening spread，像高端游戏/电影 art book
- **强调**：世界观秩序、阵营、地理、建筑体系、材质统一
- **Prompt 句式**：`worldbuilding bible spread, faction map, environment atlas, architecture style guide, creature/prop reference, color system`
- **避免**：无角色尺度、地图和场景互相矛盾

### LS17 情绪弧线全能板
- **适用**：爱情、悬疑、悲剧、治愈、人物内心变化
- **结构**：左到右按情绪曲线排列 5-7 个阶段；每阶段包含角色表情、场景色彩、镜头景别、声音关键词
- **视觉**：柔性时间轴，色彩渐变明显，电影 still 与参数并置
- **强调**：情绪推进、色彩叙事、表演变化
- **Prompt 句式**：`emotion arc board, 7-stage emotional progression, face close-ups, color transition strip, sound mood labels, cinematic stills`
- **避免**：阶段之间情绪跳变无过渡

### LS18 商业提案卖点板
- **适用**：给客户/团队快速展示“这个片子卖什么”
- **结构**：大主视觉 + 3 个卖点视觉锚（角色/世界/冲突）+ 4 镜爆点 + 目标平台与画幅说明
- **视觉**：高级 pitch deck，信息少而准，比 LS14 更干净
- **强调**：第一眼可懂、视觉卖点强、平台适配明确
- **Prompt 句式**：`premium pitch board, one hero image, three visual selling points, four key moments, platform aspect-ratio notes`
- **避免**：技术细节过多、像内部执行表

### LS19 多版本风格对比板
- **适用**：同一故事比较 3-4 种风格方向
- **结构**：横向或 2x2 分区，每区同一个镜头但不同视觉风格；底部列出色卡、镜头语言、优缺点
- **视觉**：A/B/C/D style exploration board，严格同构图对比
- **强调**：同一角色/场景在不同风格下的可比性
- **Prompt 句式**：`style exploration comparison board, same scene four visual treatments, consistent composition, palette and cinematography notes`
- **避免**：每格内容不同导致无法比较

## 角色板扩展样式

角色板分两类：给视频模型看的“干净一致性”，给人看的“导演标注/角色圣经”。如果后续要喂视频，优先 LS11/LS20；如果要做展示和团队沟通，优先 LS12/LS21/LS24。

### LS20 面部一致性九宫格
- **适用**：脸容易漂、真人感角色、偶像/演员型主角
- **结构**：3x3 面部矩阵：正面、左右 3/4、左右侧面、仰视、俯视、强光、弱光
- **视觉**：统一背景与光线，脸部占比大，少文字或无文字
- **强调**：骨相、眼距、鼻梁、嘴型、发际线、肤色不变
- **Prompt 句式**：`facial consistency 3x3 sheet, same character, nine camera angles and lighting states, identical facial structure`
- **避免**：表情过度、发型遮挡关键五官

### LS21 十二表情表演板
- **适用**：短剧表演、情绪戏、角色表情范围
- **结构**：3x4 表情格：平静/警惕/愤怒/决绝/悲伤/恐惧/冷笑/震惊/温柔/失控/释然/杀意
- **视觉**：同一头像比例，背景简单，可小字标表情名
- **强调**：仅表情变化，五官结构不变
- **Prompt 句式**：`12-expression acting sheet, 3x4 grid, same face identity, only expression changes, actor reference`
- **避免**：年龄变化、脸型变化、表情变成不同人

### LS22 服装层次爆炸图
- **适用**：古装、铠甲、机甲、复杂服饰、换装体系
- **结构**：左侧全身穿戴效果；右侧从底层到外层逐层拆解；下方材质/纹样/配饰/鞋履
- **视觉**：服装设计图 + 产品拆解图，标注清楚
- **强调**：穿戴顺序、材质、纹样位置、不可变配饰
- **Prompt 句式**：`costume layer exploded view, base layer to outer armor, fabric/material swatches, accessory position callouts`
- **避免**：层次逻辑不成立、配饰左右颠倒

### LS23 武器道具角色交互板
- **适用**：剑、枪、法器、科技设备、关键道具与角色绑定
- **结构**：角色持物全身 + 手部握持 + 道具正侧背 + 局部结构 + 使用姿态 3 连帧
- **视觉**：道具设计卡与角色动作参考融合
- **强调**：手与道具比例、握法、重心、道具纹路
- **Prompt 句式**：`prop interaction character sheet, full body holding prop, hand grip close-ups, prop turnaround, three usage poses`
- **避免**：道具尺寸每格变化、手指错误、握法不可能

### LS24 角色关系双人板
- **适用**：师徒、宿敌、恋人、双主角、反派压迫
- **结构**：左右双人三视图/半身；中间关系张力主视觉；底部互动姿态、距离、视线、手势
- **视觉**：双角色对照设计卡，统一光线和比例
- **强调**：身高差、服装对比、眼神方向、亲密/敌对距离
- **Prompt 句式**：`dual character relationship sheet, two-character scale comparison, tension hero frame, interaction poses, gaze and distance notes`
- **避免**：两人比例不一致、关系张力不清

### LS25 角色状态演变板
- **适用**：战损、黑化、成长、变身、受伤恢复、前后对比
- **结构**：从左到右 4-6 阶段：初始/受压/爆发/战损/转化/最终状态；每阶段同姿态或同脸角度
- **视觉**：连续演化图，像游戏角色进阶或电影角色弧光板
- **强调**：哪些不变、哪些变化、变化原因
- **Prompt 句式**：`character evolution sheet, 6-stage transformation, consistent identity, costume damage progression, emotional arc`
- **避免**：每阶段像不同角色、变化无因果

### LS26 生物/怪物角色卡
- **适用**：龙、神兽、异形、坐骑、怪物、宠物
- **结构**：全身比例、头部特写、侧面剪影、材质鳞片/皮毛、动作姿态、与人类比例对照
- **视觉**：creature design sheet，生态与解剖感强
- **强调**：轮廓、比例、运动方式、材质、尺度
- **Prompt 句式**：`creature design sheet, full body turnaround, head close-up, scale comparison with human, skin/fur/scales material, movement poses`
- **避免**：怪物细节每格漂移、比例不清

## 场景版扩展样式

场景版用于锁空间、光线、材质、天气和拍摄角度。视频项目优先用 LS8 + LS29 或 LS10；复杂空间优先 LS9/LS27。

### LS27 场景蓝图俯视板
- **适用**：室内、院落、宫殿、战场、街区、需要机位调度的空间
- **结构**：主图为俯视平面/鸟瞰；周围放入口、核心道具、角色站位、机位点、运动路线
- **视觉**：电影美术蓝图 + 导演 blocking map
- **强调**：空间尺寸、入口出口、可拍方向、角色动线
- **Prompt 句式**：`environment blueprint board, top-down layout, entrances/exits, camera positions, character blocking, prop locations`
- **避免**：透视漂亮但空间不可用

### LS28 场景材质光照板
- **适用**：质感优先的场景，雨夜、金属、石雕、云海、废土、宫殿
- **结构**：主场景 + 材质 6 格 + 光源方向 + 天气粒子 + 反射/阴影样张
- **视觉**：environment material and lighting bible
- **强调**：地面、墙面、天空、水体、金属、布料/植物的质感
- **Prompt 句式**：`environment material lighting board, surface swatches, light direction diagram, weather particles, reflection and shadow references`
- **避免**：只写“电影感”但无材质锚点

### LS29 四时段/天气变化板
- **适用**：同一场景跨时间、天气、情绪变化
- **结构**：2x2 或 1x4：黎明/正午/黄昏/深夜，或晴/雨/雪/雾；同一机位同一构图
- **视觉**：lighting variation sheet
- **强调**：同一空间在不同光线下仍保持一致
- **Prompt 句式**：`same environment lighting variations, identical camera angle, dawn noon dusk night, weather variants, consistent architecture`
- **避免**：不同格变成不同地点

### LS30 场景动线漫游板
- **适用**：角色穿越空间、追逐、探索、长镜头
- **结构**：一张主俯视路线图 + 5-6 个沿途视角小帧，按 1→6 编号
- **视觉**：location scout board + camera walk-through
- **强调**：从入口到终点的空间连续性、镜头移动合理性
- **Prompt 句式**：`environment walkthrough board, route map, numbered viewpoints, continuous spatial progression, location scout style`
- **避免**：小帧之间空间断裂

### LS31 巨物尺度场景板
- **适用**：巨龙、神像、空间站、巨大神宫、末日裂缝、城市怪兽
- **结构**：超大主图 + 人/建筑/山体/飞船比例尺 + 局部特写 + 远中近三层尺度对比
- **视觉**：epic scale reference board
- **强调**：巨大感、压迫感、比例参照
- **Prompt 句式**：`epic scale environment sheet, colossal subject, human/building scale markers, wide/mid/close scale comparison`
- **避免**：巨物没有参照导致尺度不明

### LS32 场景色彩脚本板
- **适用**：一场戏或一集的场景色彩规划
- **结构**：横向 6-10 个色彩缩略帧，从开场到结尾；下方色卡、光源、情绪说明
- **视觉**：Pixar/film color script 风格，简洁但情绪明确
- **强调**：色彩随剧情变化
- **Prompt 句式**：`environment color script, 8 small frames, emotional color progression, palette strip, lighting mood notes`
- **避免**：每帧色彩随机、不服务情绪

## 分镜板扩展样式

分镜板分为给人看的“技术执行”和给视频模型看的“画面锚点”。给视频模型时少文字，给导演/客户时可高密度标注。

### LS33 经典漫画分镜页
- **适用**：漫画、漫剧、剧情短片、对白戏
- **结构**：大小格混排，1 个大格承载高潮，3-6 个小格承载反应/动作/细节
- **视觉**：电影分镜和漫画页融合，白/黑 gutters 清楚
- **强调**：阅读顺序、视线引导、高潮格
- **Prompt 句式**：`cinematic comic storyboard page, varied panel sizes, clear reading order, one hero panel, reaction close-ups`
- **避免**：所有格一样大、阅读顺序混乱

### LS34 竖屏短视频分镜板
- **适用**：抖音/小红书/短剧竖屏，9:16
- **结构**：竖向 5-7 个手机屏画幅，每格保留字幕安全区和人物中心构图
- **视觉**：mobile-first storyboard sheet
- **强调**：上中下构图、字幕区、人物面部可读性
- **Prompt 句式**：`vertical mobile storyboard, 9:16 panels, subtitle safe area, center-framed character, short drama pacing`
- **避免**：横屏思维硬裁、字幕遮脸

### LS35 动作拆解连拍板
- **适用**：打斗、挥剑、奔跑、变身、爆炸、舞蹈
- **结构**：8-12 个连续小帧，像动作摄影连拍；下方标速度、重心、运动弧线
- **视觉**：motion study sheet
- **强调**：动作连贯、身体重心、前后帧衔接
- **Prompt 句式**：`action breakdown storyboard, 12 sequential frames, motion arcs, body weight shift, smear/motion blur notes`
- **避免**：关键动作缺帧、方向忽左忽右

### LS36 悬疑证据板分镜
- **适用**：悬疑、犯罪、推理、惊悚
- **结构**：证据照片/人物反应/空间线索/时间点交错，带线索连线和时间戳质感
- **视觉**：investigation board + storyboard
- **强调**：线索递进、遮挡、误导、揭示
- **Prompt 句式**：`investigation storyboard board, evidence photos, clue strings, timestamps, suspect reaction close-ups, reveal sequence`
- **避免**：线索太散、没有镜头顺序

### LS37 音乐 MV 节拍板
- **适用**：MV、舞蹈、节奏剪辑、广告节拍
- **结构**：按 beat 排列 8-16 小帧；底部音频波形、鼓点、转场标记
- **视觉**：music video beat board
- **强调**：节奏点、剪辑点、灯光变化、舞台调度
- **Prompt 句式**：`music video beat storyboard, audio waveform strip, beat markers, lighting hits, dance/camera rhythm frames`
- **避免**：节奏信息缺失、画面不随音乐变化

### LS38 一镜到底路线板
- **适用**：长镜头、跟拍、沉浸式场景、复杂调度
- **结构**：主图为路线地图；周围按时间点放关键视角帧，标注镜头高度、方向、速度、遮挡转场
- **视觉**：oner previs board
- **强调**：连续空间、遮挡点、焦点转移、演员走位
- **Prompt 句式**：`one-take camera route board, continuous shot map, timed key viewpoints, camera height/speed/focus shift, blocking`
- **避免**：像普通剪辑分镜，不体现连续镜头

### LS39 对话正反打分镜板
- **适用**：双人对话、审讯、暧昧、冲突谈判
- **结构**：建立镜头 + A 过肩 + B 过肩 + A close-up + B close-up + 反应细节 + 沉默空镜
- **视觉**：克制电影对话场面调度
- **强调**：轴线、眼线匹配、距离变化、情绪升降
- **Prompt 句式**：`shot reverse shot dialogue storyboard, over-shoulder pairs, eyeline match, axis continuity, reaction inserts`
- **避免**：轴线混乱、人物站位忽变

### LS40 首尾帧对照板
- **适用**：视频生成首尾帧、片段接力、转场验证
- **结构**：左侧首帧、右侧尾帧，中间 2-3 个过渡缩略帧；几乎无文字
- **视觉**：clean image-to-video reference board
- **强调**：起点/终点明确，动作方向和光线连续
- **Prompt 句式**：`first-frame last-frame comparison board, clean video reference, start frame, transition thumbnails, end frame, continuity constraints`
- **避免**：文字太多、首尾帧角色或场景不一致

## 自动匹配建议

| 用户关键词 | 首选版式 | 备选 |
|-----------|----------|------|
| 全案图 / 全案板 / 项目总览 | LS14 | 简洁提案→LS18，世界观→LS16，科幻→LS2 |
| 全能版 / 一张图锁全部 | LS14 | 调度复杂→LS15，情绪片→LS17 |
| 多版本 / 风格对比 | LS19 | 九宫格灵感→LS4 |
| 分镜图 / 故事板 / 镜头表 | LS6 | 执行表→LS5，漫画页→LS33，视频参考→LS7 |
| 竖屏短剧 / 小红书 / 抖音 | LS34 | 首尾帧→LS40 |
| 动作拆解 / 打斗 / 挥剑 | LS35 | 横幅时间轴→LS6 |
| 场景图 / 场景参考 / 环境锁定 | LS8 | 多角度→LS9，蓝图→LS27，材质光照→LS28 |
| 场景动线 / 漫游 / 长镜头 | LS30 | 一镜到底→LS38 |
| 巨物场景 / 神宫 / 巨龙尺度 | LS31 | 神话四镜→LS3 |
| 角色卡 / 人物设定 / 武侠角色 | LS12 | 视频一致性→LS11，表情→LS21，服装→LS22 |
| 真人脸一致 / 演员脸 | LS20 | 十二表情→LS21 |
| 双人关系 / 师徒 / 宿敌 / 情侣 | LS24 | 对话正反打→LS39 |
| 战损 / 黑化 / 成长 / 变身 | LS25 | 武器交互→LS23 |
| 科幻 / 太空 / 机甲 / 神使 | LS2 + LS13 | 科幻全能→LS14，九宫格探索→LS4 |
| 东方神话 / 巨龙 / 神宫 / 巨物 | LS3 | 场景全能→LS8，尺度板→LS31 |
| 一剑开天 / 武侠爆发 / 15s 动作 | LS6 | 动作拆解→LS35，合并帧→LS7 |

## 四大入口推荐

| 入口 | 首选组合 | 适合用途 |
|------|----------|----------|
| 全能版 | LS14 + LS15/LS16/LS17/LS18/LS19 | 一张图定项目方向、提案、风格探索 |
| 角色板 | LS11 + LS12/LS20/LS21/LS22/LS23/LS24/LS25/LS26 | 锁角色一致性、展示设定、解决脸和服装漂移 |
| 场景版 | LS8 + LS9/LS27/LS28/LS29/LS30/LS31/LS32 | 锁空间、光线、材质、天气、尺度 |
| 分镜板 | LS5/LS6/LS7 + LS33/LS34/LS35/LS36/LS37/LS38/LS39/LS40 | 导演执行、视频参考、动作拆解、竖屏短剧 |

## 组合规则

1. **VS 与 LS 分离**：VS 决定美术风格，LS 决定图面组织。例：VS7 东方玄幻 + LS6 横幅长镜头时间轴。
2. **视频锚点优先少文字**：给视频模型看的合并帧、首尾帧、场景锚点，优先 LS7/LS10，减少文字和表格。
3. **导演沟通优先高密度**：给人看的全案、角色圣经、技术分镜，优先 LS1/LS5/LS6/LS12。
4. **角色一致性优先干净版**：如果目标是后续视频稳定，先出 LS11，再额外出 LS12 做导演展示。
5. **文字渲染风险**：GPT Image 可接受少量标题和参数质感；MJ/SD 应把文字改成“small unreadable production notes as graphic texture”，避免要求精准中文。
6. **一套项目至少 4 张图**：正式视频项目建议输出 LS14 全能版、LS11/LS12 角色板、LS8/LS27 场景板、LS6/LS7 分镜板。
7. **同一项目保持版式连续**：同一项目的全能版/角色板/场景版/分镜板要使用同一边框、字体质感、色卡和线框颜色，形成系列感。
