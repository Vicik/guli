// 格式化日期
export function formateDate(time) {
  if (!time) return "";
  let date = new Date(time),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    mm = date.getMinutes(),
    s = date.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  mm = mm < 10 ? "0" + mm : mm;
  s = s < 10 ? "0" + s : s;
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}
