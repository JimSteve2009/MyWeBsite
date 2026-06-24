/*
  教学资源页面数据。
  ---------------------------------------------------------
  后续新增课程时，复制 teachingCourses 数组里的一个对象，
  修改 title、audience、description 和 groups 即可。

  文件建议放在 downloads 文件夹，例如：
  downloads/microwave/lectures/lecture-01.pdf
*/

const teachingCourses = [
  {
    title: "电磁场与电磁波",
    audience: "本科生",
    groups: [
      {
        title: "课件",
        files: [
          { label: "第01讲 矢量分析与场论", url: "downloads/electromagnetics/lectures/第一章-矢量分析与场论.pdf" },
          { label: "第02讲 静电场与恒定电场", url: "downloads/electromagnetics/lectures/第二章-静电场与恒定电场.pdf" },
          { label: "第03讲 边值问题的解法", url: "downloads/electromagnetics/lectures/第三章-边值问题的解法.pdf" },
          { label: "第04讲 恒定电流的磁场", url: "downloads/electromagnetics/lectures/第四章-恒定电流的磁场.pdf" },
          { label: "第05讲 时变电磁场", url: "downloads/electromagnetics/lectures/第五章-时变电磁场.pdf" },
          { label: "第06讲 平面电磁波", url: "downloads/electromagnetics/lectures/第六章-平面电磁波.pdf" },
          { label: "第07讲 无线信道、电磁干扰与电磁兼容", url: "downloads/electromagnetics/lectures/第十章-无线信道、电磁干扰与电磁兼容.pdf" }
        ]
      },
      {
        title: "参考资料",
        files: [
          { label: "坐标变换的推导", url: "downloads/electromagnetics/references/坐标变换的推导.pdf" },
          { label: "坐标系统与坐标变换", url: "downloads/electromagnetics/references/坐标系统与坐标变换.pdf" }
        ]
      }
    ]
  },
    {
    title: "微波电路原理与设计",
    audience: "本科生",
    groups: [
      {
        title: "课件",
        files: [
          { label: "第01讲 传输线与阻抗匹配", url: "downloads/RFandMWcircuit/lectures/第一章-传输线与阻抗匹配.pdf" },
          { label: "第02讲 滤波器设计", url: "downloads/RFandMWcircuit/lectures/第二章-滤波器设计.pdf" },
          { label: "第03讲 耦合器设计", url: "downloads/RFandMWcircuit/lectures/第三章-耦合器设计.pdf" },
          { label: "第04讲 有源电路设计", url: "downloads/RFandMWcircuit/lectures/第四章-有源电路设计.pdf" }
        ]
      },
      {
        title: "参考资料",
        files: [
          { label: "史密斯圆图", url: "downloads/RFandMWcircuit/references/史密斯圆图.pdf" }
        ]
      }
    ]
  }

];

/*
  课程通知。
  可以把最新通知放在数组最上面，网页会按这里的顺序显示。
*/
const teachingNotices = [
  "课程资料将根据教学进度持续更新。",
  "作业文件和提交要求请以课堂通知为准。"
];

const courseGrid = document.querySelector("#courseGrid");
const noticeList = document.querySelector("#noticeList");

function renderCourses() {
  courseGrid.innerHTML = teachingCourses
    .map((course) => {
      const resourceGroups = course.groups
        .map((group) => {
          const fileLinks = group.files
            .map((file) => {
              if (file.url) {
                return `<li><a class="resource-file is-download" href="${file.url}" download>${file.label}</a></li>`;
              }

              return `<li><span class="resource-file is-disabled">${file.label}</span></li>`;
            })
            .join("");

          return `
            <details class="resource-group">
              <summary>${group.title}<span>${group.files.length} 个文件</span></summary>
              <ul>${fileLinks}</ul>
            </details>
          `;
        })
        .join("");

      return `
        <article class="course-card">
          <div>
            <p class="course-audience">${course.audience}</p>
            <h3>${course.title}</h3>
          </div>
          <div class="resource-groups">${resourceGroups}</div>
        </article>
      `;
    })
    .join("");
}

function renderNotices() {
  noticeList.innerHTML = teachingNotices.map((notice) => `<li>${notice}</li>`).join("");
}

document.querySelector("#teachingYear").textContent = new Date().getFullYear();

renderCourses();
renderNotices();
