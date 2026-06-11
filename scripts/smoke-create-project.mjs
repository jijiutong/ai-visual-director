import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const outputDir = join(root, ".test-output", "smoke", "wuxia-temple");

const project = {
  id: "SMOKE-WUXIA-TEMPLE",
  title: "雨夜古寺",
  genre: "武侠",
  duration: "10s",
  shotCount: 5,
  platform: "Seedance",
  aspectRatio: "16:9",
  language: "中文",
  protagonist: {
    id: "C1",
    name: "墨渊",
    immutable: "冷峻脸型 / 黑色长发 / 深色剑客衣 / 旧铁长剑 / 左眉细疤",
  },
  antagonist: {
    id: "C2",
    name: "无名剑客",
    immutable: "斗笠遮眼 / 灰白短披风 / 瘦高体型 / 竹柄长剑",
  },
  scene: {
    id: "S1",
    name: "雨夜古寺",
    fixed: "破旧佛像 / 青石地面 / 檐下雨帘 / 两排残烛 / 木门半开",
    time: "夜晚",
    weather: "暴雨",
  },
};

const shots = [
  {
    id: "SH01",
    time: "0-2s",
    phase: "建立",
    size: "LS",
    camera: "缓慢推近",
    focal: "24mm",
    action: "雨中古寺显现",
    color: "冷青灰#2b3a3f",
    lighting: "烛火侧光",
    transition: "淡入",
    end: "两名剑客隔佛像对峙",
  },
  {
    id: "SH02",
    time: "2-4s",
    phase: "对峙",
    size: "MS",
    camera: "横移压近",
    focal: "35mm",
    action: "墨渊抬眼握剑",
    color: "暗金#b08a42",
    lighting: "闪电逆光",
    transition: "匹配剪辑",
    end: "墨渊拇指推开剑锷",
  },
  {
    id: "SH03",
    time: "4-6s",
    phase: "拔剑",
    size: "CU",
    camera: "快速近推",
    focal: "85mm",
    action: "剑锋出鞘烛灭",
    color: "冷白#d8dee9",
    lighting: "剑光自发光",
    transition: "快切",
    end: "寺内烛火全部熄灭",
  },
  {
    id: "SH04",
    time: "6-8s",
    phase: "爆发",
    size: "WS",
    camera: "环绕半圈",
    focal: "35mm",
    action: "两剑交错火星飞",
    color: "黑金#c9a84c",
    lighting: "火星点光",
    transition: "硬切",
    end: "无名剑客后退半步",
  },
  {
    id: "SH05",
    time: "8-10s",
    phase: "收束",
    size: "ECU",
    camera: "极慢推近",
    focal: "100mm",
    action: "墨渊低声开口",
    color: "暗蓝#1a2430",
    lighting: "正面柔光",
    transition: "淡出",
    end: "墨渊说出所有人感受",
  },
];

const assets = [
  ["@图0", "scene_reference", "雨夜古寺场景图", "/prompts/scene.md", "空间布局 / 主光方向 / 青石地面 / 佛像位置"],
  ["@图1", "character_sheet", "墨渊角色卡", "/prompts/character.md", "面部 / 发型 / 服装 / 武器 / 左眉细疤"],
  ["@图2", "storyboard_board", "五镜故事板", "/prompts/storyboard.md", "镜头顺序 / 构图 / 运镜 / 时间线"],
  ["@图3", "keyframe", "SH03 拔剑关键帧", "/shot/SH03", "拔剑动作 / 剑光 / 烛火熄灭"],
  ["@图4", "end_frame", "SH05 尾帧锚点", "/shot/SH05", "台词表情 / 结尾状态 / 字幕位置"],
];

function write(relativePath, content) {
  const filePath = join(outputDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${content.trim()}\n`, "utf8");
}

function shotTable() {
  return [
    "| 镜号 | 时间 | 阶段 | 景别 | 运镜 | 焦段 | 动作 | 转场 |",
    "|------|------|------|------|------|------|------|------|",
    ...shots.map((shot) =>
      `| ${shot.id} | ${shot.time} | ${shot.phase} | ${shot.size} | ${shot.camera} | ${shot.focal} | ${shot.action} | ${shot.transition} |`
    ),
  ].join("\n");
}

function assetTable() {
  return [
    "| @编号 | type | name | source | locks |",
    "|-------|------|------|--------|-------|",
    ...assets.map((asset) => `| ${asset.join(" | ")} |`),
  ].join("\n");
}

function shotYaml() {
  return [
    "shots:",
    ...shots.flatMap((shot, index) => [
      `  - shot_id: ${shot.id}`,
      `    time: ${shot.time}`,
      `    phase: ${shot.phase}`,
      `    frame_ref: "${index === 2 ? "@图3" : index === 4 ? "@图4" : "@图2"}"`,
      `    scene_id: ${project.scene.id}`,
      `    characters: [${index === 0 ? project.protagonist.id : `${project.protagonist.id}, ${project.antagonist.id}`}]`,
      `    shot_size: ${shot.size}`,
      `    camera: ${shot.camera}`,
      `    focal_length: ${shot.focal}`,
      `    action: ${shot.action}`,
      `    lighting: ${shot.lighting}`,
      `    color: ${shot.color}`,
      `    transition: ${shot.transition}`,
      "    end_state:",
      `      action_ending: ${shot.end}`,
      `      visual_tone: ${shot.color}`,
      `      prop_state: ${index >= 2 ? "剑已出鞘" : "剑未完全出鞘"}`,
      `      emotion: ${index === 4 ? "冷静压迫" : "紧张"}`,
    ]),
  ].join("\n");
}

function promptHeader(name) {
  return `# ${name}\n\n项目：${project.title} / ${project.genre} / ${project.duration} / ${project.aspectRatio}\n`;
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

write(
  "project.md",
  `
# 项目：${project.title}

- **ID**：${project.id}
- **标题**：${project.title}
- **类型**：${project.genre}
- **时长**：${project.duration}
- **平台**：${project.platform}
- **画幅**：${project.aspectRatio}
- **语言**：${project.language}
- **风格**：VS5 暴力美学

## 角色

| 角色 | 身份 | DNA ID | 不可变特征 |
|------|------|--------|-----------|
| ${project.protagonist.name} | 主角 | ${project.protagonist.id} | ${project.protagonist.immutable} |
| ${project.antagonist.name} | 对手 | ${project.antagonist.id} | ${project.antagonist.immutable} |

## 场景

- **主场景**：${project.scene.name}（${project.scene.id}）
- **固定元素**：${project.scene.fixed}
- **时间/天气**：${project.scene.time} / ${project.scene.weather}

## 镜头概览

${shotTable()}
`
);

write(
  "state/variable-registry.md",
  `
# 变量注册中心（Smoke）

| 变量 | 值 | 写入方 |
|------|-----|--------|
| project.id | ${project.id} | project-manager |
| project.title | ${project.title} | story-intake |
| project.genre | ${project.genre} | story-intake |
| project.duration | ${project.duration} | shot-budget |
| project.aspect_ratio | ${project.aspectRatio} | story-intake |
| project.target_platform | ${project.platform} | story-intake |
| project.language | ${project.language} | story-intake |
| style.visual_style | VS5 暴力美学 | video-director |
| style.emotion_curve | EC7 复仇五阶段 | video-director |
| style.color_narrative | CN-黑金冷雨 | video-director |
| style.pacing | P1 快切 | video-director |
| style.layout_full_board | LS6 横幅时间轴 | asset-plan |
| style.layout_storyboard | LS6 横幅时间轴 | asset-plan |
| style.layout_character | LS11 干净一致性卡 | asset-plan |
| style.layout_scene | LS8 场景全能参考板 | asset-plan |
| characters.protagonist.name | ${project.protagonist.name} | story-intake |
| characters.protagonist.dna_id | ${project.protagonist.id} | video-director |
| characters.protagonist.immutable_features | ${project.protagonist.immutable} | asset-plan |
| characters.antagonist.name | ${project.antagonist.name} | story-intake |
| characters.antagonist.dna_id | ${project.antagonist.id} | video-director |
| scene.primary.name | ${project.scene.name} | story-intake |
| scene.primary.scene_id | ${project.scene.id} | video-director |
| scene.primary.fixed_elements | ${project.scene.fixed} | asset-plan |
| scene.time_of_day | ${project.scene.time} | video-director |
| scene.weather | ${project.scene.weather} | video-director |
`
);

write("state/asset-map.md", `# 资产映射表（Smoke）\n\n${assetTable()}`);
write("state/shot-state.md", `# 镜头状态表（Smoke）\n\n\`\`\`yaml\n${shotYaml()}\n\`\`\`\n\nclimax_shot: SH03`);
write(
  "state/dialogue-map.md",
  `
# 台词映射（Smoke）

| dialogue_id | shot_id | speaker | text | delivery | subtitle | lip_sync |
|-------------|---------|---------|------|----------|----------|----------|
| D01 | SH05 | ${project.protagonist.name} | 所有人感受。 | 低声、冷静、压迫 | 底部中央，8-10s | true |
`
);
write(
  "state/project-graph.md",
  `
# 项目依赖图（Smoke）

- ${project.protagonist.id} -> SH02, SH03, SH04, SH05 -> @图1, @图3, @图4
- ${project.antagonist.id} -> SH01, SH04 -> @图2
- ${project.scene.id} -> SH01, SH02, SH03, SH04, SH05 -> @图0
`
);

write(
  "prompts/character.md",
  `
${promptHeader("角色卡 Prompt")}
生成角色卡：${project.protagonist.name}。固定特征：${project.protagonist.immutable}。
版式：LS11 干净一致性卡。包含正面、侧面、背面、表情、武器细节。
禁止：五官漂移、服装跨镜改变、武器变形。
`
);
write(
  "prompts/scene.md",
  `
${promptHeader("场景图 Prompt")}
生成场景图：${project.scene.name}。固定元素：${project.scene.fixed}。
夜晚暴雨，烛火侧光，佛像压迫感，青石地面反光。
禁止：空间布局变化、光源方向变化、现代物品、水印。
`
);
write(
  "prompts/storyboard.md",
  `
${promptHeader("分镜图 Prompt")}
五镜故事板，使用 @图0 场景参考与 @图1 角色参考。

${shotTable()}
`
);
write(
  "prompts/video.md",
  `
${promptHeader("视频 Prompt")}
生成 ${project.duration} 电影级视频，主题《${project.title}》。
参考图片：按 state/asset-map.md 动态映射，共 ${assets.length} 张参考图。

帧1 建立0-2s：雨中古寺显现。LS|缓慢推近|24mm|冷青灰|烛火侧光|淡入。
帧2 对峙2-4s：墨渊抬眼握剑。MS|横移压近|35mm|暗金|闪电逆光|匹配剪辑。
帧3 拔剑4-6s：剑锋出鞘烛灭。CU|快速近推|85mm|冷白|剑光自发光|快切。
帧4 爆发6-8s：两剑交错火星飞。WS|环绕半圈|35mm|黑金|火星点光|硬切。
帧5 收束8-10s：墨渊低声开口。ECU|极慢推近|100mm|暗蓝|正面柔光|淡出。

约束：@图(scene_reference) 锁死空间布局；@图(character_sheet) 锁死 ${project.protagonist.name} 面部/服装/武器；@图(storyboard_board) 控制镜头顺序；@图(keyframe) 锁定 SH03 拔剑；@图(end_frame) 锁定 SH05 台词尾帧。
台词：SH05 口型同步「所有人感受。」说话者：${project.protagonist.name}。字幕：SH05 底部中央「所有人感受。」
no flickering, no morphing, no broken faces, no watermark.
`
);

write(
  "qc/final-video-qc.md",
  `
# 最终质检（Smoke）

| 检查项 | 结果 |
|--------|------|
| 角色DNA已锁定 | PASS |
| 场景锚点已声明 | PASS |
| asset-map 引用一致 | PASS |
| shot-state 5镜完整 | PASS |
| dialogue-map 台词绑定 SH05 | PASS |
| 视频 prompt 读取动态 @图用途 | PASS |
| Prompt 字数在 Seedance 限制内 | PASS |
| 致命阻断项 | 0 |
`
);

write(
  "render-package.md",
  `
# 视频生成执行包（Smoke）

项目名称：${project.title}
目标平台：${project.platform}
时长/镜数/画幅：${project.duration}/${project.shotCount}镜/${project.aspectRatio}

## 资产清单

${assetTable()}

## 执行顺序

1. 生成 prompts/character.md
2. 生成 prompts/scene.md
3. 生成 prompts/storyboard.md
4. 使用 prompts/video.md 生成视频
5. 对照 qc/final-video-qc.md 检查
`
);

write(
  "metadata.json",
  JSON.stringify(
    {
      project_id: project.id,
      generated_by: "scripts/smoke-create-project.mjs",
      fixture: "wuxia-temple",
      expected_files: [
        "project.md",
        "state/variable-registry.md",
        "state/asset-map.md",
        "state/shot-state.md",
        "state/dialogue-map.md",
        "state/project-graph.md",
        "prompts/character.md",
        "prompts/scene.md",
        "prompts/storyboard.md",
        "prompts/video.md",
        "qc/final-video-qc.md",
        "render-package.md",
      ],
    },
    null,
    2
  )
);

console.log(`Smoke package created: ${outputDir}`);
