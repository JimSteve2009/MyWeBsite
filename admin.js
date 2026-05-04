/*
  管理员可见信息。
  ---------------------------------------------------------
  普通访问时隐藏访问统计，也不加载统计脚本。
  只有网址里带 ?admin=1 时才显示统计信息：
  index.html?admin=1
  teaching.html?admin=1
*/

const isAdminView = new URLSearchParams(window.location.search).get("admin") === "1";
const adminOnlyElements = document.querySelectorAll("[data-admin-only]");

adminOnlyElements.forEach((element) => {
  element.hidden = !isAdminView;
});

if (isAdminView) {
  const busuanziScript = document.createElement("script");
  busuanziScript.async = true;
  busuanziScript.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  document.body.appendChild(busuanziScript);
}
