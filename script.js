/*
  =========================================================
  网页数据和交互脚本
  ---------------------------------------------------------
  这个文件主要做两件事：
  1. 存放网页中会经常修改的数据，比如研究方向、论文、项目、成果展示。
  2. 把这些数据自动生成 HTML，插入到 index.html 对应的位置。

  这样做的好处：
  - 添加论文时，只需要复制 publications 数组里的一项。
  - 修改研究方向时，只改 researchAreas 数组，不需要改 HTML 结构。
  - 论文筛选按钮的功能也集中写在这里。
  =========================================================
*/

/*
  =========================================================
  研究方向数据
  ---------------------------------------------------------
  每一个 { ... } 就是一张“研究方向”卡片。

  字段说明：
  - title: 研究方向标题
  - image: 预留字段，目前页面没有显示图片。如果以后想恢复图片，可重新在 renderResearch 里使用。
  - description: 研究方向说明文字

  添加新方向：
  复制一个对象，放到数组中，改 title 和 description 即可。
  =========================================================
*/
const researchAreas = [
  {
    title: "微波传感与测量",
    image: "assets/microwave-sensor.svg",
    description: "利用射频/微波介质穿透性对待测物进行无损或无创测量与传感，面向无损探测、液体参数测量与生物医学检测等应用。"
  },
  {
    title: "电磁超表面",
    image: "assets/metasurface.svg",
    description: "基于超表面及增益元件，对电磁波相位、极化和幅值进行高自由度调控，发展极化转换与散射调控新方法。"
  },
  {
    title: "RFID与天线设计",
    image: "assets/rfid-antenna.svg",
    description: "研究小型化、可穿戴、抗金属 UHF RFID 标签与阅读器天线，以及电小天线设计理论与技术。"
  }
];

/*
  =========================================================
  论文数据
  ---------------------------------------------------------
  每一个 { ... } 就是一篇论文。

  字段说明：
  - year: 左侧显示的年份
  - title: 论文标题
  - authors: 作者列表
  - journal: 期刊、卷期页码、年份等信息
  - note: 额外说明，比如 DOI、PDF 链接、图片说明等
  - image: 右侧论文缩略图路径
  - link: 论文链接。可以放 DOI、IEEE 页面、PDF 页面等

  添加论文：
  复制下面任意一整段 { ... }，粘贴到 publications 数组中，
  注意每一项之间用英文逗号分隔。
  =========================================================
*/
const publications = [
  {
    year: "2025",
    text: "Y. F. Zhou, J. L. Yong, P. Li, and Y. J. Zhang, “Machine Learning-Enabled Liquid Recognition Based on Multiple Microwave Complementary Split-Ring Resonators,” IEEE Transactions on Instrumentation and Measurement, vol. 74, pp. 1–11, 2025.",
    note: "通讯作者，SCI-2-TOP/JCR-Q1",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/10967013"
  },
  {
    year: "2025",
    text: "J. L. Yong, P. Li, X. L. He, M. S. Tong, L. T. Guo and Y. J. Zhang*, “Multi-Frequency Microwave Liquid Identification Sensor Based on Interdigital Split Ring Resonators,” IEEE Transactions on Instrumentation and Measurement, vol. 74, pp. 1-10, 2025, Art. no. 8001710.",
    note: "通讯作者，SCI-2-TOP/JCR-Q1",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/10900579"
  },
  {
    year: "2024",
    text: "H. Yang, Y. He, M. S. Tong, L. T. Guo, P. Li, and Y. J Zhang*, “A Reflection–Transmission Multifunctional Polarization Conversion Metasurface,” IEEE Transactions on Antennas and Propagation, vol. 72, no. 6, pp. 5099–5109, Jun. 2024.",
    note: "通讯作者，SCI-1-TOP，入选 Top Accessed 榜单",
    image: "assets/metasurface.svg",
    link: "https://ieeexplore.ieee.org/document/10535117"
  },
  {
    year: "2023",
    text: "H. Yang, S. C. Wang, P. Li, Y. He, and Y. J. Zhang*, “A broadband multifunctional reconfigurable polarization conversion metasurface,” IEEE Transactions on Antennas and Propagation, vol. 71, no. 7, pp. 5759–5767, 2023.",
    note: "通讯作者，SCI-1-TOP，入选 Top Accessed 榜单",
    image: "assets/metasurface.svg",
    link: "https://ieeexplore.ieee.org/document/10103830"
  },
  {
    year: "2023",
    text: "Y. J. Zhang, J. L. Yong, Y. Tian, and Y. He, “High sensitivity detection method for liquid concentrations based on coupled microwave resonators,” IEEE Transactions on Instrumentation and Measurement, vol. 72, pp. 1–11, 2023.",
    note: "通讯作者，SCI-2-TOP/JCR-Q1",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/10121336"
  },
  {
    year: "2024",
    text: "J. Yong, X. He, L. Li, P. Li, and Y. Zhang*, “Multi-resonant Non-intrusive Microwave Sensor for Liquid Identification with High Accuracy,” 2024 Photonics & Electromagnetics Research Symposium (PIERS), Chengdu, China: IEEE, Apr. 2024, pp. 1–6.",
    note: "通讯作者，入围学生论文奖评选",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/10618437"
  },
  {
    year: "2023",
    text: "Y. Tian, X. L. He, L. F. Li, P. Li, and Y. J. Zhang*, “Enhanced sensitivity of wired and wireless measurement for liquid concentration based on a modified cylindrical cavity,” IEEE Sensors Journal, vol. 23, no. 17, pp. 19 457–19 465, 2023.",
    note: "通讯作者，SCI-2",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/10194554"
  },
  {
    year: "2022",
    text: "Y. J. Zhang, Y. Tian, M. S. Tong, and Y. He, “Enhanced-sensitivity noncontact measurement of liquid concentration based on passive GPT-symmetry,” IEEE Sensors Journal, vol. 22, no. 11, pp. 11 184–11193, 2022.",
    note: "第一作者，SCI-2",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/9759426"
  },
  {
    year: "2022",
    text: "J.-Y. LU, Y.-J. ZHANG*, L.-F. LI, X.-L. HE, and P. LI*, “Advance in structures for lossless ion manipulations,” CHINESE JOURNAL OF ANALYTICAL CHEMISTRY, vol. 50, no. 12, pp. 1783–1795, 2022.",
    note: "共同通讯作者，中文核心，SCI-EI 收录",
    image: "assets/rfid-antenna.svg",
    link: "https://kns.cnki.net/kcms2/article/abstract?v=j0ZbOfXgIAg9xoQUMqwUGCJBOTp_bDswJSOXAhrqBfy-PG-me1uVA30Goo9XjHjn4zDgYs11Jx6oEPTsbq1ADqMcI3gCOafQqjD-6TNnC02ZizVya0Z1ZfsIlq9V5Stdm8HdgCA7dkxjf8vUvki4jjgUwoXEAodPNCNLCTy8Edw=&uniplatform=NZKPT&language=CHS"
  },
  {
    year: "2021",
    text: "Y. J. Mao, Y. J. Zhang*, Z. R. Chen, and M. S. Tong*, “A noncontact microwave sensor based on cylindrical resonator for detecting concentration of liquid solutions,” IEEE Sensors Journal, vol. 21, no. 2, pp. 1208–1214, 2021.",
    note: "共同通讯作者，SCI-2",
    image: "assets/microwave-sensor.svg",
    link: "https://ieeexplore.ieee.org/document/9166539"
  }
];

let showAllPublications = false;
let showAllPatents = false;

/*
  =========================================================
  专利数据
  ---------------------------------------------------------
  每一个 { ... } 就是一件专利。

  字段说明：
  - title: 专利名称
  - meta: 专利类型、授权号/申请号、状态、年份等信息
  - inventors: 发明人
  - link: 专利链接，可选；如果暂时没有链接，可以留空字符串 ""

  添加专利：
  复制下面任意一整段 { ... }，粘贴到 patents 数组中，
  注意每一项之间用英文逗号分隔。
  =========================================================
*/
const patents = [
  {
    title: "一种可调电场多极化转换的微波器件",
    meta: "发明专利 | 专利号：ZL 202311420494.4 | 已授权 | 2023",
    inventors: "张允晶 / 杨恒 / 李鹏 / 李怡雯 / 何兴理",
    link: ""
  },
  {
    title: "一种微波谐振器、微波传感器及溶液检测方法",
    meta: "发明专利 | 专利号：ZL 202510674160.2 | 已授权 | 2025",
    inventors: "张允晶 / 徐志超 / 何兴理 / 李灵锋 / 李鹏",
    link: ""
  },
  {
    title: "一种微波谐振传感器及其灵敏度调节方法",
    meta: "发明专利 | 专利号：ZL 202511488697.6 | 已授权 | 2025",
    inventors: "徐一茗 / 张允晶 / 何兴理 / 李鹏 / 李灵锋",
    link: ""
  },
  {
    title: "一种多层功率集成电感制造方法",
    meta: "发明专利 | 专利号：ZL202410448323.0 | 已授权 | 2024",
    inventors: "张允晶 / 倪锦根 / 朱占宇 / 张冬利",
    link: ""
  },
  {
    title: "一种微波谐振腔装置及溶液浓度变化的测量方法",
    meta: "发明专利 | 专利号：ZL202210717956.8 | 已授权 | 2022",
    inventors: "张允晶 / 李鹏 / 田颖",
    link: ""
  },
  {
    title: "一种电磁线圈和电磁发射器",
    meta: "发明专利 | 专利号：ZL202411196743.0 | 已授权 | 2024",
    inventors: "李怡雯 / 曾勇达 / 王兆丹 / 张允晶 / 李鹏",
    link: ""
  },
  {
    title: "一种非接触式溶液浓度无线测量装置及方法",
    meta: "发明专利 | 专利号：ZL202110963141.3 | 已授权 | 2021",
    inventors: "张允晶 / 李鹏 / 何兴理 / 窦玉江 / 李灵锋",
    link: ""
  },
  {
    title: "一种纳米球光场的前向零散射调控方法",
    meta: "发明专利 | 专利号：ZL202010113105.3 | 已授权 | 2020",
    inventors: "张允晶 / 李鹏 / 窦玉江 / 何兴理 / 李灵锋",
    link: ""
  }
];

/*
  =========================================================
  科研项目数据
  ---------------------------------------------------------
  每一个 { ... } 就是时间线中的一个项目。

  字段说明：
  - title: 项目名称
  - meta: 项目时间、来源、角色等简短信息
  - description: 项目说明，可写研究目标、应用场景或成果
  =========================================================
*/
const projects = [
  {
    title: "基于PT对称电路的无创高灵敏血液射频介电特性测量新方法研究",
    meta: "2021-2023，国家自然科学基金青年项目，已结题",
    description: "面向高灵敏、无创射频介电特性测量的新型传感方法。"
  },
  {
    title: "UHF频段高灵敏传感电路机理分析及其无损传感应用",
    meta: "2020-2023，江苏省自然科学基金青年项目，结题优秀",
    description: "研究高灵敏传感电路机理及其在无损传感中的应用。"
  },
  {
    title: "危险气体及化学战剂检测模块研发",
    meta: "2023-2024，企业横向，主持",
    description: "针对危险气体对其进行快速、高灵敏检测。"
  }
];

/*
  =========================================================
  成果展示数据
  ---------------------------------------------------------
  每一个 { ... } 就是一张成果展示卡片。

  字段说明：
  - image: 成果图片路径。图片建议放在 assets 文件夹中。
  - title: 成果标题
  - description: 成果说明文字

  后续新增成果：
  复制下面这一整段对象，粘贴到 achievements 数组中，
  然后修改 image、title、description 即可。
  =========================================================
*/
const achievements = [
  {
    image: "assets/Camou_meta.jpg",
    title: "基于时空调制超表面的X波段的伪装系统",
    description: "该系统通过时空调制超表面，将雷达入射波进行散射均匀化、频谱扩展以及迁移，从而有效衰减雷达入射波的频谱强度或改变频谱特征，以达到目标的隐身伪装效果。"
  },
  
  {
    image: "assets/Microwave_sensor.jpg",
    title: "微波式液体现场无损快速检测识别系统",
    description: "基于宽带天线耦合近场对液体的强穿透性以及高灵敏度特性，本项目开发了液体无损测量系统，非接触距离可达8-10 cm，且具有检测灵敏度高、响应速度快等优点。"
  },

{
    image: "assets/Microwave_high_accuracy_sensor.jpg",
    title: "多谐振高精度微波液体浓度传感器",
    description: "基于多个集成SRR结构，该传感器在宽带内实现了多谐振及小型化，该传感器结合深度学习算法，最终实现了对乙醇、甲醇、乙醚等十余种液体种类和浓度的高精度非接触测量。"

  },
  {
    image: "assets/SLIM.jpg",
    title: "基于行波电场的无损离子操纵结构设计",
    description: "行波无损离子传输结构（TW-SLIM）能够实现对离子的有效操纵和控制，具有高传输效率等优点，本项目所设计的系统包括射频高压电源、行波发生电路、离子操纵结构等。"

  }

];

/*
  =========================================================
  荣誉及奖励
  ---------------------------------------------------------
  每一行字符串就是一条荣誉。新增时在数组末尾增加一行即可。
  =========================================================
*/
const honors = [
  "光子与电磁学研究国际研讨大会 PIERS2023 青年科学家奖。",
  "领航杯教学大赛创新作品奖。",
  "江苏省科技副总选派对象。",
  "苏州市青年科技人才托举工程资助对象。",
  "苏州大学优秀毕业设计指导教师。",
  "PIERS2019 最佳学生论文奖。"
];

/*
  =========================================================
  指导学生
  ---------------------------------------------------------
  这里分成硕士生和本科生两个小组。
  title 是小组标题，items 是该组条目。
  =========================================================
*/
const studentGuidance = [
  {
    title: "目前指导硕士生10余名：",
    items: [
      "21级研究生杨恒获得苏州大学优秀学术学位硕士学位论文。",
      "22级研究生永敬磊获江苏省研究生科研创新计划1项。",
      "22级研究生永敬磊获苏州大学优秀毕业生称号。"
    ]
  },
  {
    title: "指导本科生十余名：",
    items: [
      "郑浩获2022年苏州大学优秀毕业设计论文。",
      "李苗等获2021年全国大学生嵌入式芯片与系统设计竞赛全国总决赛三等奖。",
      "应嘉浩等获2022年中国大学生计算机设计大赛全国二等奖。",
      "尹天雨等获2022年电子设计竞赛省二等奖。",
      "乔洪煜寒等获2023年电子设计竞赛二等奖。",
      "彭金阳参加国际会议 INGEP2024，并以一作发表 EI 会议论文1篇。",
      "周逸凡在国际会议 PIERS2024 做口头报告，成果已发表在 JCR-1 区期刊 TIM 上。",
      "徐一茗参加在日本千叶举办的国际会议PIERS2025并做口头报告。"
    ]
  }
];

/*
  =========================================================
  社会及学术任职
  =========================================================
*/
const services = [
  "IEEE 会员 / 中国电子学会会员。",
  "担任 IEEE TAP / IEEE TIM / IEEE SENS. J. 等期刊审稿人。",
  "2023 / 2024 / 2025 PIERS 大会微波传感测量分会场主席。",
  "国家自然科学基金项目评审人。",
  "教育部学位中心评审专家。"
];

/*
  =========================================================
  近期学术活动安排
  =========================================================
*/
const academicActivities = [
  `22-25, Sep. 2024 将参加亚太天线与传播会议 <a class="text-link" href="http://www.em-conf.com/apcap2023/index.php" target="_blank" rel="noopener"> 2024APCAP </a>。`,
  `13-18, July 2025 将参加 IEEE 天线与传播及无线电科学联盟国际学术会议 
  <a class="text-link" href="https://2025.apsursi.org/" target="_blank" rel="noopener"> IEEE AP-S/URSI 2025<\a>，并主持 Engineered Surfaces for Absorption and Shielding 分会场。`,
  `05-09, Nov. 2025 将参加（日本千叶）<a class="text-link" href="https://chiba2025.piers.org/session.html?sid=S035" target="_blank" rel="noopener"> PIERS 2025<\a>，并主持微波传感器分会场。`
];

/*
  =========================================================
  获取 HTML 中的容器
  ---------------------------------------------------------
  querySelector 会找到 index.html 里对应 id 的元素。
  后面的渲染函数会把生成好的 HTML 放进这些容器。
  =========================================================
*/
const researchGrid = document.querySelector("#researchGrid");
const publicationList = document.querySelector("#publicationList");
const patentList = document.querySelector("#patentList");
const projectTimeline = document.querySelector("#projectTimeline");
const achievementGrid = document.querySelector("#achievementGrid");
const honorList = document.querySelector("#honorList");
const studentGuideList = document.querySelector("#studentGuideList");
const serviceList = document.querySelector("#serviceList");
const activityList = document.querySelector("#activityList");

/*
  =========================================================
  渲染研究方向
  ---------------------------------------------------------
  map 会遍历 researchAreas 数组，把每个研究方向变成一段 HTML。
  join("") 会把多段 HTML 拼成一个字符串。
  innerHTML 会把这段字符串插入网页。
  =========================================================
*/
function renderResearch() {
  researchGrid.innerHTML = researchAreas.map((item) => `
    <article class="research-card">
      <div class="research-card-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

/*
  =========================================================
  渲染论文列表
  ---------------------------------------------------------
  所有论文统一显示，不再按研究主题筛选。
  渲染前会按照 year 从新到旧排序。
  =========================================================
*/
function renderPublications() {
  const sortedItems = [...publications].sort((a, b) => Number(b.year) - Number(a.year));
  const visibleItems = showAllPublications ? sortedItems : sortedItems.slice(0, 5);

  publicationList.innerHTML = visibleItems.map((paper, index) => `
    <article class="publication">
      <div class="publication-main">
        <p class="paper-text"><span class="paper-index">[${index + 1}]</span> ${paper.text} <a class="paper-link" href="${paper.link}" target="_blank" rel="noopener">查看论文</a></p>
        <p class="paper-note">${paper.note}</p>
      </div>
    </article>
  `).join("") + (sortedItems.length > 5 ? `
    <button class="publication-toggle" id="publicationToggle" type="button">
      ${showAllPublications ? "收起" : `显示更多`}
    </button>
  ` : "");
  const publicationToggle = document.querySelector("#publicationToggle");
  if (publicationToggle) {
    publicationToggle.addEventListener("click", () => {
      showAllPublications = !showAllPublications;
      renderPublications();
    });
  }
}

/*
  =========================================================
  渲染专利列表
  ---------------------------------------------------------
  把 patents 数组变成代表性专利条目。
  如果某条专利有 link，就显示“查看专利”链接；没有 link 就不显示。
  =========================================================
*/
function renderPatents() {
  const sortedItems = [...patents].sort((a, b) => {
    const yearA = a.meta.match(/\d{4}$/)?.[0] || "0";
    const yearB = b.meta.match(/\d{4}$/)?.[0] || "0";
    return Number(yearB) - Number(yearA);
  });
  const visibleItems = showAllPatents ? sortedItems : sortedItems.slice(0, 5);

  patentList.innerHTML = visibleItems.map((patent, index) => {
    const patentLink = patent.link
      ? `<a class="paper-link" href="${patent.link}" target="_blank" rel="noopener">查看专利</a>`
      : "";

    return `
      <article class="patent-item">
        <p class="patent-title"><span class="paper-index">[${index + 1}]</span> ${patent.title}</p>
        <p class="patent-meta">${patent.meta} ${patentLink}</p>
        <p class="patent-inventors">发明人：${patent.inventors}</p>
      </article>
    `;
  }).join("") + (sortedItems.length > 5 ? `
    <button class="publication-toggle" id="patentToggle" type="button">
      ${showAllPatents ? "收起" : "显示更多"}
    </button>
  ` : "");

  const patentToggle = document.querySelector("#patentToggle");
  if (patentToggle) {
    patentToggle.addEventListener("click", () => {
      showAllPatents = !showAllPatents;
      renderPatents();
    });
  }
}

/*
  =========================================================
  渲染科研项目
  ---------------------------------------------------------
  把 projects 数组变成时间线条目。
  每个项目会显示标题、meta 信息和 description 说明。
  =========================================================
*/
function renderProjects() {
  projectTimeline.innerHTML = projects.map((item) => `
    <article class="project-card">
      <h3>${item.title}</h3>
      <p><strong>${item.meta}</strong></p>
      <p>${item.description}</p>
    </article>
  `).join("");
}

/*
  =========================================================
  渲染成果展示
  ---------------------------------------------------------
  把 achievements 数组变成网格卡片。
  每张卡片包含：
  - 一张图片
  - 一个标题
  - 一段文字说明
  =========================================================
*/
function renderAchievements() {
  /*
    把成果数量写到 HTML 上，CSS 会根据 data-count 自动调整布局：
    1 张：居中窄卡片
    2 张：两列居中
    3 张：三列
    4 张及以上：自动网格换行
  */
  achievementGrid.dataset.count = String(achievements.length);
  achievementGrid.innerHTML = achievements.map((item) => `
    <article class="achievement-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="achievement-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

/*
  =========================================================
  渲染个人简介扩展信息
  ---------------------------------------------------------
  包括荣誉及奖励、指导学生、社会及学术任职。
  =========================================================
*/
function renderProfileDetails() {
  honorList.innerHTML = honors.map((item) => `<li>${item}</li>`).join("");
  serviceList.innerHTML = services.map((item) => `<li>${item}</li>`).join("");
  studentGuideList.innerHTML = studentGuidance.map((group) => `
    <section class="student-group">
      <h4>${group.title}</h4>
      <ol class="student-list">
        ${group.items.map((item, index) => `<li class="${index >= 2 ? "is-extra" : ""}">${item}</li>`).join("")}
      </ol>
    </section>
  `).join("") + `<button class="expand-button" id="studentToggle" type="button">展开全部</button>`;

  const studentToggle = document.querySelector("#studentToggle");
  studentToggle.addEventListener("click", () => {
    const isExpanded = studentGuideList.classList.toggle("is-expanded");
    studentToggle.textContent = isExpanded ? "收起" : "展开全部";
  });
}

/*
  =========================================================
  渲染近期学术活动
  =========================================================
*/
function renderAcademicActivities() {
  activityList.innerHTML = academicActivities.map((item) => `<li>${item}</li>`).join("");
}

/*
  =========================================================
  网页自动翻译
  ---------------------------------------------------------
  这里不维护英文内容。
  页面仍然只写中文，点击右上角 English 时，调用 Google Translate
  对当前页面进行自动翻译。

  注意：
  - 需要联网才能使用。
  - 在学校服务器或普通网页环境中更稳定。
  - 如果直接用 file:// 打开，部分浏览器可能会限制第三方翻译脚本。
  =========================================================
*/
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "zh-CN",
      includedLanguages: "zh-CN,en",
      autoDisplay: false
    },
    "google_translate_element"
  );
};

function waitForTranslateSelect(maxAttempts = 30) {
  return new Promise((resolve) => {
    let attempts = 0;

    const timer = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      attempts += 1;

      if (select || attempts >= maxAttempts) {
        clearInterval(timer);
        resolve(select);
      }
    }, 200);
  });
}

async function switchPageLanguage(language) {
  const select = await waitForTranslateSelect();

  if (!select) {
    alert("翻译服务加载失败。请确认网络可访问 Google Translate，或上传到服务器后再测试。");
    return;
  }

  select.value = language;
  select.dispatchEvent(new Event("change"));
}

document.querySelectorAll("[data-translate-lang]").forEach((button) => {
  button.addEventListener("click", async () => {
    const oldText = button.textContent;
    button.textContent = "加载中...";
    button.disabled = true;

    await switchPageLanguage(button.dataset.translateLang);

    button.textContent = oldText;
    button.disabled = false;
  });
});

/*
  自动更新页脚年份。
  index.html 里有 <span id="year"></span>，
  这里会把它替换成当前年份，比如 2026。
*/
document.querySelector("#year").textContent = new Date().getFullYear();

/*
  =========================================================
  页面初始化
  ---------------------------------------------------------
  浏览器加载 script.js 后，会依次运行下面四个函数：
  - renderResearch()       显示研究方向
  - renderPublications()   显示论文
  - renderPatents()        显示专利
  - renderProjects()       显示科研项目
  - renderAchievements()   显示成果展示
  - renderProfileDetails() 显示个人简介扩展信息
  - renderAcademicActivities() 显示近期学术活动
  =========================================================
*/
renderResearch();
renderPublications();
renderPatents();
renderProjects();
renderAchievements();
renderProfileDetails();
renderAcademicActivities();
