/**
 *
 * 时间操作集合
 *
 */

import { TimeFormatOptions } from "../typings";

// 默认星期
export const WeekDefault: TimeFormatOptions["week"] = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

// 默认时间端
export const TimeRangeDefault: TimeFormatOptions["time"] = {
  dawn: {
    range: [0, 6],
    text: "凌晨",
  },
  morning: {
    range: [6, 11],
    text: "早上",
  },
  noon: {
    range: [11, 14],
    text: "中午",
  },
  afternoon: {
    range: [14, 18],
    text: "下午",
  },
  night: {
    range: [18, 24],
    text: "晚上",
  },
};

/**
 * 时间格式化
 * @param time 时间戳
 * @param format yyyy-MM-dd HH:mm:ss DD RR 格式：2020-12-01 12:21:11 星期一 中午
 *
 *
 */
export function TimeFormat(
  time: string | number | Date,
  format = "yyyy-MM-dd HH:mm:ss",
  options?: TimeFormatOptions
): string {
  const dates = time ? new Date(time) : new Date();
  const year = dates.getFullYear();
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const date = String(dates.getDate()).padStart(2, "0");
  const hour = String(dates.getHours()).padStart(2, "0");
  const min = String(dates.getMinutes()).padStart(2, "0");
  const ss = String(dates.getSeconds()).padStart(2, "0");
  // 获取星期
  const dow = dates.getDay();
  // 默认星期
  const weekDefault: TimeFormatOptions["week"] = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const week = options?.week || weekDefault;
  const day = week[dow] || weekDefault[dow];

  // 时间段
  const timeRange = Object.values(options?.time || TimeRangeDefault).find(
    (time) => {
      return (
        dates.getHours() >= time.range[0] && dates.getHours() < time.range[1]
      );
    }
  );
  // 返回结果
  format = format
    .replace("yyyy", year + "")
    .replace("MM", month + "")
    .replace("dd", date + "")
    .replace("HH", hour + "")
    .replace("mm", min + "")
    .replace("ss", ss + "")
    .replace("DD", day + "");
  if (timeRange) {
    format = format.replace("RR", timeRange.text);
  }
  return format;
}

/**
 * 时间格式化
 * @param dateTimeStamp 时间戳
 * @returns
 */
export function DateFormat(
  dateTimeStamp: Date | number,
  format = "yyyy/MM/dd"
): string {
  const date = new Date(dateTimeStamp);

  //把分，时，天，周，半个月，一个月用毫秒表示
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const nowDateTimeStamp = new Date().getTime(); //获取当前时间毫秒
  const diffDteTimeStamp = nowDateTimeStamp - date.getTime(); //时间差
  if (diffDteTimeStamp < 0) {
    return TimeFormat(date, format);
  }

  if (diffDteTimeStamp > month) {
    return TimeFormat(date, format);
  }

  if (diffDteTimeStamp > week) {
    return `${Math.round(diffDteTimeStamp / week)}周前`;
  }

  if (diffDteTimeStamp > day) {
    return `${Math.round(diffDteTimeStamp / day)}天前`;
  }

  if (diffDteTimeStamp > hour) {
    return `${Math.round(diffDteTimeStamp / hour)}小时前`;
  }

  if (diffDteTimeStamp > minute) {
    return `${Math.round(diffDteTimeStamp / minute)}分钟前`;
  }

  return "刚刚";
}

/**
 * 时间字符串校验
 * @param time 时间戳
 * @param format yyyy-MM-dd HH:mm:ss DD 格式
 */
export function TimeFormatValid(time: string, format: string): boolean {
  const regFormat = format
    .replace("yyyy", "\\d{4}")
    .replace("MM", "\\d{2}")
    .replace("dd", "\\d{2}")
    .replace("HH", "\\d{2}")
    .replace("mm", "\\d{2}")
    .replace("ss", "\\d{2}")
    .replace("DD", "星期[日|一|二|三|四|五|六]");
  const reg = `^${regFormat}$`;
  return !!time.match(new RegExp(reg));
}
