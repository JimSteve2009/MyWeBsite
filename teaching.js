/*
  教学资源页面数据。
  ---------------------------------------------------------
  后续新增课程时，复制 teachingCourses 数组里的一个对象，
  修改 title、audience、description 和 files 即可。

  文件建议放在 downloads 文件夹，例如：
  downloads/microwave/lecture-01.pdf
*/

const teachingCourses = [
  {
    title: "微波技术基础",
    audience: "本科生 / 研究生",
    description: "围绕传输线理论、微波网络、Smith圆图、阻抗匹配和典型微波器件展开。",
    files: [
      { label: "课件", url: "downloads/microwave/lecture-01.pdf" },
      { label: "作业", url: "downloads/microwave/homework-01.pdf" },
      { label: "参考资料", url: "downloads/microwave/reference.pdf" }
    ]
  },
  {
    title: "电磁场与电磁波",
    audience: "本科生",
    description: "涵盖Maxwell方程、电磁波传播、边界条件、波导与天线基础等内容。",
    files: [
      { label: "课件", url: "downloads/electromagnetics/lecture-01.pdf" },
      { label: "作业", url: "downloads/electromagnetics/homework-01.pdf" },
      { label: "参考资料", url: "downloads/electromagnetics/reference.pdf" }
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
      const fileLinks = course.files
        .map(
          (file) =>
            `<a class="resource-link" href="${file.url}" download>${file.label}</a>`
        )
        .join("");

      return `
        <article class="course-card">
          <div>
            <p class="course-audience">${course.audience}</p>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
          </div>
          <div class="resource-links">${fileLinks}</div>
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
