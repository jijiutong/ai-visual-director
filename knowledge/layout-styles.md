# 版式样式库

用于控制全案图、分镜图、场景图、角色卡的画面版式。视觉风格负责“像什么类型片”，版式样式负责“这张图如何排版”。生成 prompt 时先选视觉风格 VS，再选版式样式 LS；用户没有指定时按题材自动匹配。

## 快速调用

```text
版式样式：LS12 黑金武侠角色圣经版，黑底暗金细线，高密度导演标注，多模块角色一致性参考。
```

## 全案图样式

### LS1 影视工业全案板
- **适用**：默认全案、pitch deck、项目总览
- **结构**：顶部极简项目栏 + 左侧角色锚点 + 中央最大主视觉 + 右侧完整分镜序列 + 底部三栏信息（技术参数/色彩脚本/情绪曲线）
- **视觉**：黑/冷灰背景，细线网格，信息密度高但层级清楚
- **强调**：中央主视觉第一眼明确；角色 DNA、场景 DNA、完整镜头顺序、色彩脚本、声音方向
- **避免**：海报式单图、无参数、装饰性文字过多、右侧分镜跳号、底部技术表过大、作为视频参考图
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=production_notes`, `hud_allowed=false`, `best_for=["项目提案","导演沟通","投资pitch","完整视觉开发"]`, `avoid=["作为视频参考图","角色细节被排版淹没","信息过载"]`

### LS2 科幻控制台全案板
- **适用**：科幻、太空歌剧、机甲、AI、神级文明
- **结构**：上方创作方向条；左侧角色转身/近景；右侧场景宽幅概念图；中部运动路线/区域图；底部 6-8 镜缩略分镜和参数仪表
- **视觉**：深空黑、蓝白冷光、银色金属、HUD 细线、全息数据层
- **强调**：宇宙尺度、环形建筑、星舰、全息界面、镜头路线、区域 A/B/C 标注
- **避免**：暖色古风、纸质质感、低科技手绘感
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=moderate`, `best_for=["科幻项目全案","银甲神使","太空基地","HUD控制台风格"]`, `avoid=["古风项目","非科技类型","作为视频参考图"]`

### LS3 神话巨物四镜序列
- **适用**：东方神话、巨龙、神宫、巨兽、神圣压迫感
- **结构**：顶部大标题与关键词；中部 4 个等宽大画幅镜头；每镜下方附时间、镜头语言、光线、色调；底部色卡和 camera parameters
- **视觉**：深青黑底、石灰/云灰主体、暗金文字线框、庄严留白
- **强调**：巨物尺度、建筑压迫、云海、远古神话、4 镜完整起承转合
- **避免**：小格过多、角色卡模块抢画面、杂乱 HUD
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["东方神话","巨龙","神宫","巨物序列","云海史诗"]`, `avoid=["作为视频参考图","小格过多","角色卡模块抢占画面"]`

### LS4 九宫格情绪拼贴全案
- **适用**：快速提案、氛围探索、角色+场景混合灵感板
- **结构**：3x3 九宫格，每格一个关键视觉：场景远景、角色登场、面部特写、交互、危机、能力展示、对话、交通/道具、背影收束
- **视觉**：图像为主，细白线分隔，少文字或无文字
- **强调**：风格一致、色调统一、人物跨格一致、每格像一张电影 still
- **避免**：大段说明、文字水印、每格风格漂移
- **元数据**：`output_type=full_board`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["氛围拼贴","角色+场景混合参考","视觉灵感板"]`, `avoid=["作为场景一致性锚点","每格风格漂移","文字水印"]`

## 分镜图样式

### LS5 竖排技术分镜表
- **适用**：导演执行、广告片、短剧、15-30s 分镜
- **结构**：表格列为镜头编号 / 画面 / 时长 / 镜头语言 / 画面内容 / 声音 / 转场节奏；每行一镜
- **视觉**：黑底灰线，画面缩略图居左，文字参数居右，克制工业感
- **强调**：时长精确、景别焦段、运镜、声音、转场
- **避免**：图片过大挤掉参数、文字密到不可读
- **元数据**：`output_type=storyboard`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=production_notes`, `hud_allowed=false`, `best_for=["导演执行表","广告片分镜","技术分镜","拍摄执行"]`, `avoid=["作为视频参考图","海报式大标题","无表格结构"]`

### LS6 横幅长镜头时间轴
- **适用**：15s 动作、武侠爆发、灾难、情绪递进
- **结构**：左侧竖向编号与箭头；中间 5-7 条超宽电影横幅；右侧每条对应帧名、时长、景别、运镜、焦段、色彩、灯光、转场
- **视觉**：黑金边框，宽银幕裁切，大片 still 优先，参数像分镜手册
- **强调**：镜头推进节奏、长画幅冲击力、字幕框、动作阶段
- **避免**：每帧变成方格、右侧参数缺失、角色跨帧漂移
- **元数据**：`output_type=storyboard`, `density_default=3`, `density_max=3`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["15s动作分镜","武侠爆发","情绪递进","时间轴叙事"]`, `avoid=["作为视频参考图","方格拼贴","角色换脸","参数缺失"]`

### LS7 合并帧视频锚点
- **适用**：Seedance/Runway/可灵 视频参考图，3-4 张图覆盖全部镜头
- **结构**：每张图包含 2-3 个横幅帧，上下堆叠，几乎无文字；用于喂给视频模型
- **视觉**：纯画面优先，细分隔线，保持同一角色、同一场景、同一调色
- **强调**：首尾帧锚定、动作连贯、视线方向、运动方向
- **避免**：大量中文标注、logo、水印、表格线过重
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=2`, `video_safe=true`, `display_safe=true`, `text_level=none`, `hud_allowed=false`, `best_for=["视频生成锚点","Seedance/Runway/可灵画面参考","合并帧"]`, `avoid=["表格","大段文字","参数栏","logo","水印"]`

## 场景图样式

### LS8 场景全能参考板
- **适用**：单场景锁定、快速视频、场景+角色+光照合一
- **结构**：主场景宽幅占 60% 以上；下方/侧边放材质、光源、道具、天气、声音氛围小格
- **视觉**：电影环境概念图 + 美术设定卡，细线标注可少量存在
- **强调**：空间纵深、主光方向、地面/天空/建筑材质、角色位置比例
- **避免**：只做纯风景不锁空间、无主光、无道具位置
- **元数据**：`output_type=scene`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["场景全能参考","单场景锁定","材质+灯光+道具综合板"]`, `avoid=["作为视频参考图（需派生no-text scene anchor）","材质标注压住主场景"]`

### LS9 场景九宫格锁定
- **适用**：复杂宫殿、战场、城市、太空基地、多角度视频
- **结构**：3x3 九宫格：正面全景 / 左侧全景 / 右侧全景 / 入口 / 核心元素 / 道具 / 地面材质 / 光源 / 天空或天花板
- **视觉**：所有格同一时段、同一色温、同一材质体系
- **强调**：空间一致性、光照一致、关键元素位置关系
- **避免**：9 格像 9 个不同地点、天气跳变、比例漂移
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["场景空间锁定","多角度场景一致性","复杂场景锚定"]`, `avoid=["九格都是相似角度","风格漂移","变成氛围拼贴"]`

### LS10 双联宽幅场景锚点
- **适用**：动作视频开场/爆发前后、同一场景两种状态
- **结构**：上下两张 21:9 超宽幅，第一张远景建立空间，第二张中近景建立动作/角色；可扩展为三联
- **视觉**：几乎无文字，电影剧照优先，细边框分隔
- **强调**：同一空间的尺度变化、前后状态变化、动作路线
- **避免**：上下两张构图无关、角色服装变化、光线不连续
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=2`, `video_safe=true`, `display_safe=true`, `text_level=none`, `hud_allowed=false`, `best_for=["双状态场景对比","视频首尾帧锚点","同场景两阶段"]`, `avoid=["上下两张无关","角色换脸","色温无原因变化"]`

## 角色卡样式

### 模式A 标准角色设定卡（6模块全量版 · 默认）
- **适用**：所有角色卡默认版式，AI 视频角色锚定、一致性优先
- **结构**：6 模块——三视图（40%）/ 面部多角度（20%）/ 表情范围（15%）/ 手部特写（10%）/ 武器道具（8%）/ 发型服装动态（7%）
- **视觉**：白色或浅灰棚拍背景，无文字、无箭头、无红框
- **强调**：跨格五官、发型、服装、体型完全一致；不可变特征红色标注
- **避免**：复杂背景、文字遮挡、HUD 元素
- **元数据**：`output_type=character`, `density_default=1`, `density_max=2`, `video_safe=true`, `text_level=none`, `hud_allowed=false`, `best_for=["AI视频角色锚定","模型一致性优先","全量角色卡"]`, `avoid=["复杂背景","文字标注","HUD元素"]`
- **最低标准**：LS41 留白东方角色研究板

### LS12 黑金武侠角色圣经
- **适用**：武侠、玄幻、黑金动作、角色设定展示
- **结构**：左侧大三视图；左边窄栏不可变特征特写；右上面部多角度；右中表情范围；右侧服装层次分解；底部武器、手部、发型动态
- **视觉**：纯黑/暗岩背景，暗金细线框，红色仅用于“不可变特征/箭头”，高密度中文导演标注
- **强调**：不可变疤痕、瞳孔、眉眼、头身比、服装层次、武器尺寸、握剑姿态
- **避免**：浅灰棚拍、可爱卡通、文字遮挡角色主体
- **元数据**：`output_type=character`, `density_default=3`, `density_max=3`, `video_safe=false`, `text_level=readable`, `hud_allowed=false`, `best_for=["武侠","玄幻","黑金动作","角色设定展示"]`, `avoid=["浅灰棚拍","可爱卡通","文字遮挡主体"]`

### LS13 科幻神使角色系统卡
- **适用**：银甲、AI、太空、神级文明、机甲角色
- **结构**：角色正/背/侧 + 盔甲材质特写 + 面部核心特写 + 能力 HUD + 翅膀/机械结构展开 + 交互界面
- **视觉**：银蓝金属、深空背景、蓝白能量点、全息细线
- **强调**：盔甲片结构、发光核心、机械翼、全息交互、同一面孔一致
- **避免**：古风布料、手绘水墨、暖色宫廷
- **元数据**：`output_type=character`, `density_default=3`, `density_max=3`, `video_safe=false`, `text_level=readable`, `hud_allowed=moderate`, `best_for=["银甲","AI","太空","神级文明","机甲角色"]`, `avoid=["古风布料","手绘水墨","暖色宫廷"]`

## 全能版样式

全能版用于“一张图尽量锁住项目核心”：角色、场景、镜头、道具、色彩、声音、材质都要出现。适合提案、导演沟通、第一轮定调。

### LS14 全能电影圣经板
- **适用**：任何完整短片/漫剧项目的第一张主参考图
- **结构**：顶部 logline 与风格条；左侧角色 DNA；中央超大主视觉；右侧世界观/场景/道具；底部 5-8 镜分镜 + 色卡 + 声音波形 + camera package
- **视觉**：电影工业 pitch board，暗底细线，模块多但主体图最大
- **强调**：一个项目的“唯一展示锚点”，角色、场景、镜头必须互相引用；若要给视频模型用，必须派生 no-text keyframes / no-text scene anchor
- **Prompt 句式**：`LS14 全能电影圣经板，one-page visual bible, central hero frame, character DNA strip, environment anchor, prop callouts, shot timeline, color/audio/camera specs`
- **避免**：所有模块同等大小导致主视觉失焦、直接作为视频参考图、音频/台词信息塞满底栏
- **元数据**：`output_type=full_board`, `density_default=5`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=production_notes`, `hud_allowed=false`, `best_for=["唯一主锚点","完整短片项目","第一轮定调","投资提案"]`, `avoid=["作为视频参考图","信息密度过低","角色/场景/镜头不互引"]`

### LS15 导演作战室全案
- **适用**：动作、战争、群像、复杂调度、多角色同场
- **结构**：中央场景俯视图/动线图；四周角色站位、冲突关系、镜头机位、关键帧；底部战术式分镜时间轴
- **视觉**：黑底白线/暗金线，像导演调度墙、战术地图、previs board
- **强调**：人物位置、运动方向、镜头路径、空间关系
- **Prompt 句式**：`director war-room board, overhead blocking map, camera route arrows, character position markers, action beats, tactical storyboard`
- **避免**：只做漂亮画面不交代空间调度
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=production_notes`, `hud_allowed=false`, `best_for=["多角色群像","导演作战室","复杂项目总控"]`, `avoid=["作为视频参考图","单人简单项目（降级到LS1）"]`

### LS16 世界观设定全能板
- **适用**：玄幻、科幻、异世界、史诗长篇、系列设定
- **结构**：世界地图/区域关系 + 核心建筑/场景 + 角色阵营 + 生物/道具 + 时代材质 + 色彩系统
- **视觉**：设定集 opening spread，像高端游戏/电影 art book
- **强调**：世界观秩序、阵营、地理、建筑体系、材质统一
- **Prompt 句式**：`worldbuilding bible spread, faction map, environment atlas, architecture style guide, creature/prop reference, color system`
- **避免**：无角色尺度、地图和场景互相矛盾
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=5`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["世界观设定","阵营展示","长篇系列","地图+势力"]`, `avoid=["作为视频参考图","短篇项目（信息过载）"]`

### LS17 情绪弧线全能板
- **适用**：爱情、悬疑、悲剧、治愈、人物内心变化
- **结构**：左到右按情绪曲线排列 5-7 个阶段；每阶段包含角色表情、场景色彩、镜头景别、声音关键词
- **视觉**：柔性时间轴，色彩渐变明显，电影 still 与参数并置
- **强调**：情绪推进、色彩叙事、表演变化
- **Prompt 句式**：`emotion arc board, 7-stage emotional progression, face close-ups, color transition strip, sound mood labels, cinematic stills`
- **避免**：阶段之间情绪跳变无过渡
- **元数据**：`output_type=full_board`, `density_default=4`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["情绪弧线展示","多阶段情绪对比","色彩情绪关联"]`, `avoid=["作为视频参考图","情绪标注与画面情绪矛盾"]`

### LS18 商业提案卖点板
- **适用**：给客户/团队快速展示“这个片子卖什么”
- **结构**：大主视觉 + 3 个卖点视觉锚（角色/世界/冲突）+ 4 镜爆点 + 目标平台与画幅说明
- **视觉**：高级 pitch deck，信息少而准，比 LS14 更干净
- **强调**：第一眼可懂、视觉卖点强、平台适配明确
- **Prompt 句式**：`premium pitch board, one hero image, three visual selling points, four key moments, platform aspect-ratio notes`
- **避免**：技术细节过多、像内部执行表
- **元数据**：`output_type=full_board`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["商业提案","卖点展示","投资pitch","市场推广"]`, `avoid=["作为视频参考图","过度艺术化牺牲商业信息"]`

### LS19 多版本风格对比板
- **适用**：同一故事比较 3-4 种风格方向
- **结构**：横向或 2x2 分区，每区同一个镜头但不同视觉风格；底部列出色卡、镜头语言、优缺点
- **视觉**：A/B/C/D style exploration board，严格同构图对比
- **强调**：同一角色/场景在不同风格下的可比性
- **Prompt 句式**：`style exploration comparison board, same scene four visual treatments, consistent composition, palette and cinematography notes`
- **避免**：每格内容不同导致无法比较
- **元数据**：`output_type=full_board`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["多版本风格对比","A/B/C方案展示","风格决策"]`, `avoid=["作为视频参考图","版本间风格串味","标注不清"]`

## 角色板扩展样式

角色板分两类：给视频模型看的“干净一致性”，给人看的“导演标注/角色圣经”。如果后续要喂视频，优先 模式A/LS20；如果要做展示和团队沟通，优先 LS12/LS21/LS24。

### LS20 面部一致性九宫格
- **适用**：脸容易漂、真人感角色、偶像/演员型主角
- **结构**：3x3 面部矩阵：正面、左右 3/4、左右侧面、仰视、俯视、强光、弱光
- **视觉**：统一背景与光线，脸部占比大，少文字或无文字
- **强调**：骨相、眼距、鼻梁、嘴型、发际线、肤色不变
- **Prompt 句式**：`facial consistency 3x3 sheet, same character, nine camera angles and lighting states, identical facial structure`
- **避免**：表情过度、发型遮挡关键五官
- **元数据**：`output_type=character`, `density_default=1`, `density_max=2`, `video_safe=true`, `text_level=none`, `hud_allowed=false`, `best_for=["面部一致性","AI视频角色锚定","多角度锁定"]`, `avoid=["复杂背景","不均匀光线","角度不一致"]`

### LS21 十二表情表演板
- **适用**：短剧表演、情绪戏、角色表情范围
- **结构**：3x4 表情格：平静/警惕/愤怒/决绝/悲伤/恐惧/冷笑/震惊/温柔/失控/释然/杀意
- **视觉**：同一头像比例，背景简单，可小字标表情名
- **强调**：仅表情变化，五官结构不变
- **Prompt 句式**：`12-expression acting sheet, 3x4 grid, same face identity, only expression changes, actor reference`
- **避免**：年龄变化、脸型变化、表情变成不同人
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["角色表情范围","表演参考","情绪锚定"]`, `avoid=["表情不连贯","光线跳变","背景复杂"]`

### LS22 服装层次爆炸图
- **适用**：古装、铠甲、机甲、复杂服饰、换装体系
- **结构**：左侧全身穿戴效果；右侧从底层到外层逐层拆解；下方材质/纹样/配饰/鞋履
- **视觉**：服装设计图 + 产品拆解图，标注清楚
- **强调**：穿戴顺序、材质、纹样位置、不可变配饰
- **Prompt 句式**：`costume layer exploded view, base layer to outer armor, fabric/material swatches, accessory position callouts`
- **避免**：层次逻辑不成立、配饰左右颠倒
- **元数据**：`output_type=character`, `density_default=2`, `density_max=3`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["服装层次分解","铠甲结构","复杂服饰","道具锚定"]`, `avoid=["服装结构模糊","材质跳变","层次不清"]`

### LS23 武器道具角色交互板
- **适用**：剑、枪、法器、科技设备、关键道具与角色绑定
- **结构**：角色持物全身 + 手部握持 + 道具正侧背 + 局部结构 + 使用姿态 3 连帧
- **视觉**：道具设计卡与角色动作参考融合
- **强调**：手与道具比例、握法、重心、道具纹路
- **Prompt 句式**：`prop interaction character sheet, full body holding prop, hand grip close-ups, prop turnaround, three usage poses`
- **避免**：道具尺寸每格变化、手指错误、握法不可能
- **元数据**：`output_type=character`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["武器道具交互","手部握持研究","道具比例锚定"]`, `avoid=["道具尺寸每格变化","手指错误","握法不可能"]`

### LS24 角色关系双人板
- **适用**：师徒、宿敌、恋人、双主角、反派压迫
- **结构**：左右双人三视图/半身；中间关系张力主视觉；底部互动姿态、距离、视线、手势
- **视觉**：双角色对照设计卡，统一光线和比例
- **强调**：身高差、服装对比、眼神方向、亲密/敌对距离
- **Prompt 句式**：`dual character relationship sheet, two-character scale comparison, tension hero frame, interaction poses, gaze and distance notes`
- **避免**：两人比例不一致、关系张力不清
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["双人关系戏","双主角","对峙/对话场景"]`, `avoid=["角色站位混乱","空间关系不清","单人孤立法"]`

### LS25 角色状态演变板
- **适用**：战损、黑化、成长、变身、受伤恢复、前后对比
- **结构**：从左到右 4-6 阶段：初始/受压/爆发/战损/转化/最终状态；每阶段同姿态或同脸角度
- **视觉**：连续演化图，像游戏角色进阶或电影角色弧光板
- **强调**：哪些不变、哪些变化、变化原因
- **Prompt 句式**：`character evolution sheet, 6-stage transformation, consistent identity, costume damage progression, emotional arc`
- **避免**：每阶段像不同角色、变化无因果
- **元数据**：`output_type=character`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["角色状态演变","战损/黑化/变身","成长弧光展示"]`, `avoid=["每阶段像不同角色","变化无因果","过度变形"]`

### LS26 生物/怪物角色卡
- **适用**：龙、神兽、异形、坐骑、怪物、宠物
- **结构**：全身比例、头部特写、侧面剪影、材质鳞片/皮毛、动作姿态、与人类比例对照
- **视觉**：creature design sheet，生态与解剖感强
- **强调**：轮廓、比例、运动方式、材质、尺度
- **Prompt 句式**：`creature design sheet, full body turnaround, head close-up, scale comparison with human, skin/fur/scales material, movement poses`
- **避免**：怪物细节每格漂移、比例不清
- **元数据**：`output_type=character`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["生物/怪物设计","神兽/异星生物","生物角色卡"]`, `avoid=["比例尺缺失","生物与场景比例矛盾","解剖不合理"]`

### LS41 留白东方角色研究板
- **适用**：修行者、僧人、剑修、仙侠角色、克制气质人物；参考“静尘”式横向白底角色设定板
- **结构**：左侧大幅主立绘；中上正/背/侧三视图；右上坐姿、俯身、蹲姿、仰视等姿态研究；底部面部表情 5 格 + 发型/衣褶/鞋履细节；左下小剪影比例
- **视觉**：米白或浅灰留白，水墨灰、麻布白、淡铅笔手写质感，文字仅作小号设计注释纹理
- **强调**：寂静、克制、衣袍垂坠、身体姿态、面部骨相和同一头身比例
- **Prompt 句式**：`minimal eastern character study board, large hero full-body, turnaround views, posture studies, expression strip, costume detail swatches, quiet white space`
- **避免**：厚重黑金、强战斗姿势、艳丽高饱和、密集 HUD、文字遮挡角色
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["修行者","白底角色设定","东方角色研究","留白美学"]`, `avoid=["crowded background","heavy HUD","杂乱背景"]`

### LS42 仙灵长发角色设定板
- **适用**：女仙、灵体、狐妖、花神、白衣长发角色；参考“卯”式轻盈纯白设定板
- **结构**：左侧大幅全身主立绘；中部正视/侧视/背视三视图突出长发长度；右侧坐姿、倚坐、俯身、仰视角度；底部表情研究和发丝、领口、腰封、袖摆、花饰等细节
- **视觉**：柔白背景、半透明纱衣、浅金/淡粉点缀、轻雾边缘光，整体像高级角色设定集展开页
- **强调**：长发流向、衣料层次、轻盈透明感、五官一致、红色/花饰等极少量识别点
- **Prompt 句式**：`ethereal immortal character sheet, flowing white hair, translucent layered robes, front side back views, seated and leaning poses, delicate costume detail studies`
- **避免**：换脸、发长漂移、衣服变厚重盔甲、背景复杂、饱和色过多
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["长发角色","仙灵","白衣","发饰复杂角色"]`, `avoid=["发丝模糊","发饰跳变","背景抢主体"]`

### LS43 姿态表演研究板
- **适用**：需要锁定角色动作气质、坐卧蹲跪、礼仪动作、修行姿态、身体语言的角色
- **结构**：1 个主立绘 + 8-10 个姿态小图，覆盖站、坐、蹲、跪、俯身、回眸、低头、仰视、行礼、静修；底部放 3-5 个表情 close-up
- **视觉**：白底动作研究稿，轻阴影接地，少量铅笔注释感，图像之间留足呼吸空间
- **强调**：同一角色体态、重心、袖摆/发丝受动作影响的连续性
- **Prompt 句式**：`character pose performance study sheet, same character in ten body-language poses, robe and hair motion consistency, expression close-ups`
- **避免**：动作过少、同一姿态重复、比例变化、服装在不同姿态中重构
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["动作研究","身体语言","姿态锚定","表演参考"]`, `avoid=["姿态不连贯","比例不一致","背景杂乱"]`

### LS44 服饰细节留白板
- **适用**：古装、仙衣、僧袍、长袍、纱衣、腰封、衣褶和材质需要单独锁定的角色
- **结构**：左侧全身主视图；右侧分区展示领口、袖口、腰带、衣摆、鞋履、布料纹理、头饰/花饰/念珠等配饰；底部小色卡与材质块
- **视觉**：产品设计板 + 古风服装研究稿，浅色背景，细腻材质特写，标注可作为图形纹理存在
- **强调**：层次穿戴顺序、布料透明度、褶皱方向、配饰位置、不可变识别点
- **Prompt 句式**：`costume detail white-space board, full-body costume anchor, collar sleeve sash hem shoes fabric swatches, accessory close-ups, layered robe construction`
- **避免**：只画漂亮全身没有细节、配饰左右颠倒、材质不清、文字压住细节
- **元数据**：`output_type=character`, `density_default=2`, `density_max=2`, `video_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["服饰细节","古风服装","长袍","仙衣","配饰位置"]`, `avoid=["服装结构模糊","材质不清","标注压住主体"]`

## 场景版扩展样式

场景版用于锁空间、光线、材质、天气和拍摄角度。视频项目优先用 LS8 + LS29 或 LS10；复杂空间优先 LS9/LS27。

### LS27 场景蓝图俯视板
- **适用**：室内、院落、宫殿、战场、街区、需要机位调度的空间
- **结构**：主图为俯视平面/鸟瞰；周围放入口、核心道具、角色站位、机位点、运动路线
- **视觉**：电影美术蓝图 + 导演 blocking map
- **强调**：空间尺寸、入口出口、可拍方向、角色动线
- **Prompt 句式**：`environment blueprint board, top-down layout, entrances/exits, camera positions, character blocking, prop locations`
- **避免**：透视漂亮但空间不可用
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["场景蓝图","俯视空间布局","机位规划","动线设计"]`, `avoid=["标注过多遮挡空间","比例失调","尺寸标注缺失"]`

### LS28 场景材质光照板
- **适用**：质感优先的场景，雨夜、金属、石雕、云海、废土、宫殿
- **结构**：主场景 + 材质 6 格 + 光源方向 + 天气粒子 + 反射/阴影样张
- **视觉**：environment material and lighting bible
- **强调**：地面、墙面、天空、水体、金属、布料/植物的质感
- **Prompt 句式**：`environment material lighting board, surface swatches, light direction diagram, weather particles, reflection and shadow references`
- **避免**：只写“电影感”但无材质锚点
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=3`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["场景材质参考","光照研究","材质光照综合板"]`, `avoid=["作为视频参考图","材质色板压住主场景"]`

### LS29 四时段/天气变化板
- **适用**：同一场景跨时间、天气、情绪变化
- **结构**：2x2 或 1x4：黎明/正午/黄昏/深夜，或晴/雨/雪/雾；同一机位同一构图
- **视觉**：lighting variation sheet
- **强调**：同一空间在不同光线下仍保持一致
- **Prompt 句式**：`same environment lighting variations, identical camera angle, dawn noon dusk night, weather variants, consistent architecture`
- **避免**：不同格变成不同地点
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=3`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["天气变化对比","四时段展示","时间推移效果"]`, `avoid=["作为视频参考图","各时段光源矛盾","天气效果不自然"]`

### LS30 场景动线漫游板
- **适用**：角色穿越空间、追逐、探索、长镜头
- **结构**：一张主俯视路线图 + 5-6 个沿途视角小帧，按 1→6 编号
- **视觉**：location scout board + camera walk-through
- **强调**：从入口到终点的空间连续性、镜头移动合理性
- **Prompt 句式**：`environment walkthrough board, route map, numbered viewpoints, continuous spatial progression, location scout style`
- **避免**：小帧之间空间断裂
- **元数据**：`output_type=scene`, `density_default=2`, `density_max=3`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["场景动线设计","角色移动路径","漫游路线规划"]`, `avoid=["作为视频参考图","动线标注遮挡空间","路线不连贯"]`

### LS31 巨物尺度场景板
- **适用**：巨龙、神像、空间站、巨大神宫、末日裂缝、城市怪兽
- **结构**：超大主图 + 人/建筑/山体/飞船比例尺 + 局部特写 + 远中近三层尺度对比
- **视觉**：epic scale reference board
- **强调**：巨大感、压迫感、比例参照
- **Prompt 句式**：`epic scale environment sheet, colossal subject, human/building scale markers, wide/mid/close scale comparison`
- **避免**：巨物没有参照导致尺度不明
- **元数据**：`output_type=scene`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["巨物尺度场景","巨大建筑/生物","尺度对比展示"]`, `avoid=["作为视频参考图","尺度参照物不明确","比例失真"]`

### LS32 场景色彩脚本板
- **适用**：一场戏或一集的场景色彩规划
- **结构**：横向 6-10 个色彩缩略帧，从开场到结尾；下方色卡、光源、情绪说明
- **视觉**：Pixar/film color script 风格，简洁但情绪明确
- **强调**：色彩随剧情变化
- **Prompt 句式**：`environment color script, 8 small frames, emotional color progression, palette strip, lighting mood notes`
- **避免**：每帧色彩随机、不服务情绪
- **元数据**：`output_type=scene`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["场景色彩脚本","情绪色彩映射","色彩方案对比"]`, `avoid=["作为视频参考图","色卡与场景不匹配","色彩标注错误"]`

## 分镜板扩展样式

分镜板分为给人看的“技术执行”和给视频模型看的“画面锚点”。给视频模型时少文字，给导演/客户时可高密度标注。

### LS33 经典漫画分镜页
- **适用**：漫画、漫剧、剧情短片、对白戏
- **结构**：大小格混排，1 个大格承载高潮，3-6 个小格承载反应/动作/细节
- **视觉**：电影分镜和漫画页融合，白/黑 gutters 清楚
- **强调**：阅读顺序、视线引导、高潮格
- **Prompt 句式**：`cinematic comic storyboard page, varied panel sizes, clear reading order, one hero panel, reaction close-ups`
- **避免**：所有格一样大、阅读顺序混乱
- **元数据**：`output_type=storyboard`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["漫画分镜页","叙事性漫画","多格布局"]`, `avoid=["作为视频参考图","面板格线不清晰","对话气泡遮挡画面"]`

### LS34 竖屏短视频分镜板
- **适用**：抖音/小红书/短剧竖屏，9:16
- **结构**：竖向 5-7 个手机屏画幅，每格保留字幕安全区和人物中心构图
- **视觉**：mobile-first storyboard sheet
- **强调**：上中下构图、字幕区、人物面部可读性
- **Prompt 句式**：`vertical mobile storyboard, 9:16 panels, subtitle safe area, center-framed character, short drama pacing`
- **避免**：横屏思维硬裁、字幕遮脸
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=3`, `video_safe=false`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["竖屏短视频","小红书/抖音短剧","9:16分镜"]`, `avoid=["作为视频参考图","横版元素残留","文字过多"]`

### LS35 动作拆解连拍板
- **适用**：打斗、挥剑、奔跑、变身、爆炸、舞蹈
- **结构**：8-12 个连续小帧，像动作摄影连拍；下方标速度、重心、运动弧线
- **视觉**：motion study sheet
- **强调**：动作连贯、身体重心、前后帧衔接
- **Prompt 句式**：`action breakdown storyboard, 12 sequential frames, motion arcs, body weight shift, smear/motion blur notes`
- **避免**：关键动作缺帧、方向忽左忽右
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["动作拆解","打斗连拍","挥剑/格斗序列"]`, `avoid=["动作不连贯","关键帧缺失","运动方向模糊"]`

### LS36 悬疑证据板分镜
- **适用**：悬疑、犯罪、推理、惊悚
- **结构**：证据照片/人物反应/空间线索/时间点交错，带线索连线和时间戳质感
- **视觉**：investigation board + storyboard
- **强调**：线索递进、遮挡、误导、揭示
- **Prompt 句式**：`investigation storyboard board, evidence photos, clue strings, timestamps, suspect reaction close-ups, reveal sequence`
- **避免**：线索太散、没有镜头顺序
- **元数据**：`output_type=storyboard`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["悬疑推理","证据板","线索展示"]`, `avoid=["作为视频参考图","信息过载","证据链不清"]`

### LS37 音乐 MV 节拍板
- **适用**：MV、舞蹈、节奏剪辑、广告节拍
- **结构**：按 beat 排列 8-16 小帧；底部音频波形、鼓点、转场标记
- **视觉**：music video beat board
- **强调**：节奏点、剪辑点、灯光变化、舞台调度
- **Prompt 句式**：`music video beat storyboard, audio waveform strip, beat markers, lighting hits, dance/camera rhythm frames`
- **避免**：节奏信息缺失、画面不随音乐变化
- **元数据**：`output_type=storyboard`, `density_default=3`, `density_max=4`, `video_safe=false`, `display_safe=true`, `text_level=readable`, `hud_allowed=false`, `best_for=["音乐MV","节拍同步","音乐驱动分镜"]`, `avoid=["作为视频参考图","节拍与画面不同步","过度静态"]`

### LS38 一镜到底路线板
- **适用**：长镜头、跟拍、沉浸式场景、复杂调度
- **结构**：主图为路线地图；周围按时间点放关键视角帧，标注镜头高度、方向、速度、遮挡转场
- **视觉**：oner previs board
- **强调**：连续空间、遮挡点、焦点转移、演员走位
- **Prompt 句式**：`one-take camera route board, continuous shot map, timed key viewpoints, camera height/speed/focus shift, blocking`
- **避免**：像普通剪辑分镜，不体现连续镜头
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["一镜到底","长镜头路线","连续运镜规划"]`, `avoid=["路线中断","机位跳变","空间不连贯"]`

### LS39 对话正反打分镜板
- **适用**：双人对话、审讯、暧昧、冲突谈判
- **结构**：建立镜头 + A 过肩 + B 过肩 + A close-up + B close-up + 反应细节 + 沉默空镜
- **视觉**：克制电影对话场面调度
- **强调**：轴线、眼线匹配、距离变化、情绪升降
- **Prompt 句式**：`shot reverse shot dialogue storyboard, over-shoulder pairs, eyeline match, axis continuity, reaction inserts`
- **避免**：轴线混乱、人物站位忽变
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=3`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["对话场景","正反打","双人对话分镜"]`, `avoid=["对话节奏不清","角色视线不对应","景别无变化"]`

### LS40 首尾帧对照板
- **适用**：视频生成首尾帧、片段接力、转场验证
- **结构**：左侧首帧、右侧尾帧，中间 2-3 个过渡缩略帧；几乎无文字
- **视觉**：clean image-to-video reference board
- **强调**：起点/终点明确，动作方向和光线连续
- **Prompt 句式**：`first-frame last-frame comparison board, clean video reference, start frame, transition thumbnails, end frame, continuity constraints`
- **避免**：文字太多、首尾帧角色或场景不一致
- **元数据**：`output_type=storyboard`, `density_default=2`, `density_max=2`, `video_safe=true`, `display_safe=true`, `text_level=minimal`, `hud_allowed=false`, `best_for=["首尾帧对比","视频起终点锚定","转场验证"]`, `avoid=["首尾帧角色不一致","场景/光跳变","动作不衔接"]`

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
| 角色卡 / 人物设定 / 武侠角色 | LS12 | 视频一致性→模式A，表情→LS21，服装→LS22 |
| 白底角色设定 / 东方角色研究 / 僧人 / 修行者 | LS41 | 姿态研究→LS43，服饰细节→LS44 |
| 女仙 / 灵体 / 白衣长发 / 狐妖 / 花神 | LS42 | 表情→LS21，姿态研究→LS43，服饰细节→LS44 |
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
| 角色板 | 模式A + LS12/LS20/LS21/LS22/LS23/LS24/LS25/LS26/LS41/LS42/LS43/LS44 | 锁角色一致性、展示设定、解决脸、服装和姿态漂移 |
| 场景版 | LS8 + LS9/LS27/LS28/LS29/LS30/LS31/LS32 | 锁空间、光线、材质、天气、尺度 |
| 分镜板 | LS5/LS6/LS7 + LS33/LS34/LS35/LS36/LS37/LS38/LS39/LS40 | 导演执行、视频参考、动作拆解、竖屏短剧 |

## 组合规则

1. **VS 与 LS 分离**：VS 决定美术风格，LS 决定图面组织。例：VS7 东方玄幻 + LS6 横幅长镜头时间轴。
2. **视频锚点优先少文字**：给视频模型看的合并帧、首尾帧、场景锚点，优先 LS7/LS10，减少文字和表格。
3. **导演沟通优先高密度**：给人看的全案、角色圣经、技术分镜，优先 LS1/LS5/LS6/LS12。
4. **角色一致性优先干净版**：如果目标是后续视频稳定，先出 模式A 6模块全量版，再额外出 LS12 做导演展示。
5. **文字渲染风险**：GPT Image 可接受少量标题和参数质感；MJ/SD 应把文字改成“small unreadable production notes as graphic texture”，避免要求精准中文。
6. **一套项目至少 4 张图**：正式视频项目建议输出 LS14 全能版、模式A/LS12 角色板、LS8/LS27 场景板、LS6/LS7 分镜板。
7. **同一项目保持版式连续**：同一项目的全能版/角色板/场景版/分镜板要使用同一边框、字体质感、色卡和线框颜色，形成系列感。
