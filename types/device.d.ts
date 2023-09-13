import {DeviceStatusEnum, RentStatus} from "../src/deviceManager/constants/device";

export interface DeviceInfo {
  serial: string
  deviceAttributes: any
  connStatus: DeviceStatusEnum
  rentStatus: RentStatus
  rentDuration: number
  ip: string
  port: number
  biz: string
  createTime: string
  updateTime: string
}

export interface Interaction {
  /**
   * init adb client
   */
  initClient(): any

  /**
   * get adb client
   */
  getClient(): any

  /**
   * alert device
   * @param deviceId
   */
  alertDevice(deviceId: string): void
}

