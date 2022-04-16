/**
 * 设备类型
 */
export enum DeviceType {
  mobile = "mobile",
  desktop = "desktop",
  tablet = "tablet",
}

export interface TimeFormatOptions {
  week?: string[];
  time?: {
    dawn: {
      range: [number, number];
      text: string;
    };
    morning: {
      range: [number, number];
      text: string;
    };
    noon: {
      range: [number, number];
      text: string;
    };
    afternoon: {
      range: [number, number];
      text: string;
    };
    night: {
      range: [number, number];
      text: string;
    };
  };
}
