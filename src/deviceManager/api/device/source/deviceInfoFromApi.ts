import {PortDict, PortSource} from "../../../../../types/port";
import {DeviceInfo} from "../../../../../types/device";

export class DeviceInfoFromApi implements PortSource{
  fetchDeviceInfo(serial: string): DeviceInfo {
    return undefined;
  }

  fetchDeviceList(biz: string): DeviceInfo[] {
    return [];
  }

  fetchPortDict(): PortDict {
    return undefined;
  }

  updateDevice(deviceInfo: DeviceInfo): void {
    return undefined
  }

  fetchSerialByIpPort(ip: string, port: number): string {
    return "";
  }
}
