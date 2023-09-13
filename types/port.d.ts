import {DeviceInfo} from "./device";

export interface PortSource {
  /**
   * Fetch the port dictionary.
   */
  fetchPortDict(): PortDict

  /**
   * Sync the device info.
   * @param deviceInfo
   */
  updateDevice(deviceInfo: DeviceInfo): void

  /**
   * Fetch the device info.
   * @param biz
   */
  fetchDeviceList(biz: string): DeviceInfo[]

  /**
   * Fetch the device info.
   * @param serial
   */
  fetchDeviceInfo(serial: string): DeviceInfo

  /**
   * Fetch the serial by ip and port.
   * @param ip
   * @param port
   */
  fetchSerialByIpPort(ip: string, port: number): string
}

export interface PortDict {
  [serial: string]: number
}
