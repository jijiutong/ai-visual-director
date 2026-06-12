# 镜头状态表

每镜完整状态记录。**故事板变了，就更新这里；视频 prompt 引用也从这里拿。**

---

## 镜头列表

每个镜头的完整状态块：

```yaml
shots:
  - shot_id: SH01
    time: 0:00-0:03
    phase: 建立
    image_prompt_id: IMG_SH01
    frame_ref: "@图2"                  # 对应 asset-map 中的 @编号（本镜参考图）
    scene_id: S1                       # 引用 variable-registry 中的场景ID
    characters: [C1]                   # 引用 variable-registry 中的角色ID
    shot_size: LS                      # 远景（窗外→内）
    camera: slow push in through window  # 缓慢前推（3s）
    focal_length: 35mm                 # 焦段
    action: 雨夜街景，咖啡店二楼暖黄灯光透过雨痕玻璃
    lighting: 街灯冷蓝 + 室内暖黄透出
    color: 冷蓝#3a5a7c → 逐渐变暖
    transition: fade in from black
    end_state:
      character_position: 窗边第3桌，坐下
      action_ending: 凝视窗外，手放桌上
      gaze_direction: 面朝窗外（画面左）
      light_direction: 窗外冷蓝街灯从左侧射入 + 吧台暖黄从右侧后方
      visual_tone: 孤独剪影在暖光中，雨痕纹理模糊画面
      prop_state: 白色咖啡杯在桌面右侧，咖啡满杯
      emotion: 沉静如常
      spatial_relation: C1在靠窗位置，咖啡师在画面右侧后方背景虚化

  - shot_id: SH02
    time: 0:03-0:06
    phase: 引入
    image_prompt_id: IMG_SH02
    frame_ref: "@图2"
    scene_id: S1
    characters: [C1]
    shot_size: MS                      # 中景
    camera: fixed + slow dolly back    # 固定机位+缓慢后拉
    focal_length: 50mm
    action: 沈默独坐靠窗位，手边白色咖啡杯，凝视窗外
    lighting: 吧台暖光为主 + 窗上雨痕光斑在脸上流动
    color: 暖黄#d4a574 + 琥珀#8b6914
    transition: —
    end_state:
      character_position: 同上
      action_ending: 拇指开始轻触杯沿
      gaze_direction: 面朝窗外
      light_direction: 雨痕折射光斑在左侧脸颊流动
      visual_tone: 温暖包裹孤独，雨痕投下流动阴影
      prop_state: 咖啡杯被轻轻触碰
      emotion: 忧郁渐深
      spatial_relation: C1占画面中央偏左，窗外雨景在左侧1/3

  - shot_id: SH03
    time: 0:06-0:09
    phase: 细节
    image_prompt_id: IMG_SH03
    frame_ref: "@图2"
    scene_id: S1
    characters: [C1]
    shot_size: CU                      # 特写
    camera: fixed                      # 固定机位
    focal_length: 85mm
    action: 拇指轻抚杯沿，杯中咖啡微荡，热气袅袅升起
    lighting: 桌面反射暖光 + 热气柔化光线
    color: 琥珀#8b6914 + 暖黄#d4a574
    transition: —
    end_state:
      character_position: 同上
      action_ending: 拇指停在杯沿，咖啡波纹渐平
      gaze_direction: 低头看咖啡
      light_direction: 桌面暖光从下方反射
      visual_tone: 极致安静的亲密特写，热气如烟
      prop_state: 咖啡杯中荡止，热气持续上升
      emotion: 沉入回忆
      spatial_relation: CU只拍双手+咖啡杯+桌面局部

  - shot_id: SH04
    time: 0:09-0:11
    phase: 情绪
    image_prompt_id: IMG_SH04
    frame_ref: "@图3"                  # 关键帧（高潮镜）
    scene_id: S1
    characters: [C1]
    shot_size: ECU                     # 大特写
    camera: fixed                      # 固定机位
    focal_length: 135mm
    action: 窗外雨痕在瞳孔中流动，倒映模糊霓虹灯光
    lighting: 窗外冷光 + 霓虹折射在虹膜上
    color: 冷蓝#3a5a7c + 霓虹品红#c04060 微反射
    transition: —
    end_state:
      character_position: 同上
      action_ending: 瞳孔微动，跟随一滴雨痕下滑
      gaze_direction: 直望窗外
      light_direction: 窗外冷蓝光从左直射入眼 + 霓虹折射呈点状微光
      visual_tone: 极度私密——城市与孤独在瞳孔中交汇
      prop_state: —
      emotion: 孤独峰值
      spatial_relation: ECU只拍左眼+雨痕玻璃倒影

  - shot_id: SH05
    time: 0:11-0:13
    phase: 余韵
    image_prompt_id: IMG_SH05
    frame_ref: "@图2"
    scene_id: S1
    characters: [C1]
    shot_size: MS                      # 中景
    camera: slow dolly left to right   # 缓慢侧推（右→左）
    focal_length: 50mm
    action: 沈默微微抬头，窗外雨势稍缓，面部放松
    lighting: 暖黄逐渐增强，冷蓝减弱
    color: 暖黄#d4a574 逐渐主导
    transition: —
    end_state:
      character_position: 略抬头，背稍直
      action_ending: 微抬头，嘴角极轻微上扬
      gaze_direction: 仍望窗外，但视线稍抬
      light_direction: 暖黄从右侧增强
      visual_tone: 温暖逐渐战胜寒冷——不是快乐，是接受
      prop_state: 手离开杯沿，自然放桌面
      emotion: 忧郁→释然（情绪转折完成）
      spatial_relation: 同SH02

  - shot_id: SH06
    time: 0:13-0:15
    phase: 收束
    image_prompt_id: IMG_SH06
    frame_ref: "@图4"                  # 尾帧锚点
    scene_id: S1
    characters: [C1]
    shot_size: LS                      # 远景（内→外）
    camera: slow dolly back out through window  # 缓慢后拉（内→外）
    focal_length: 35mm
    action: 从窗外再看回室内——咖啡店暖光里沈默的孤独剪影，雨痕模糊
    lighting: 街灯冷蓝为主 + 窗户透出暖黄框（沈默剪影在框中）
    color: 冷蓝#3a5a7c 为主 + 暖黄#d4a574 作为框内焦点
    transition: fade to black
    end_state:
      character_position: 微抬头坐姿，剪影在暖黄窗框中
      action_ending: 静坐——一个接受了孤独的人
      gaze_direction: 面朝窗外（向外看，与观众目光交汇）
      light_direction: 暖黄从窗户透出形成逆光剪影 + 冷蓝街灯从镜头侧
      visual_tone: 爱德华·霍普式的城市孤独——暖光中的剪影，雨痕作画
      prop_state: 咖啡杯在桌面，余半杯
      emotion: 平和（孤独特质已从忧郁转化为宁静力量）
      spatial_relation: 从窗外看——C1在窗框中，暖黄长方形中的黑色剪影
```

---

## 高潮镜

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `climax_shot` | `SH04` | `video-director`（按总数 55%-70% 位置定位：6镜×67%=镜4） |

---

## 继承规则（跨镜连续性）

```
镜N end_state = 镜N+1 起始状态

除非：
  - 明确的场景切换（shot_id 对应不同 scene_id）
  - 明确的时间跳跃
  - 明确的转场（硬切到全新画面）
```

断裂检测由 `prompt-scorer` 调用 `rules/continuity-check.md` 执行。

> **与 continuity-state 的关系**：此文件的 `end_state` 8 字段与 `state/continuity-state.md` 的 8 字段状态定义完全对齐。continuity-state 定义了检查标准和修复规则，本文件是每镜的实例数据。

---

## 联动

- **写入**：`video-director` 初始化（镜号/阶段/景别/灯光/色彩/转场/end_state/高潮镜定位）
- **补充**：`motion-physics` 追加运动数据（每镜运动配对+兼容性检查）
- **更新**：`incremental-update`（单镜/批量修改时更新对应镜头字段）、`style-migration`（风格迁移后更新全镜 color/lighting）
- **读取**：`video-prompt-assembly`（组装时遍历所有镜头）、`project-graph`（构建 shot↔character + shot↔scene 映射）、`consistency-engine`（5 维度评估读取全量镜头数据）、`final-video-qc`（检查引用一致性）
- **跨段**：段1最后一镜的 end_state → `continuity-snapshot.md` → 段2第一镜继承
