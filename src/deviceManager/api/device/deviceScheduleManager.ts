import {DeviceInfo} from "../../../../types/device";
import {DeviceDbManager} from "./deviceDbManager";
import {RentStatusEnum} from "../../constants/device";

export class DeviceScheduleManager {

  static rentDevice(serial: string, rentDuration: number = 60): void {
    const device = DeviceDbManager.getInstance().fetchDeviceInfo(serial)
    this.checkRentTimeout(device)
    if (device.rentStatus === RentStatusEnum.OCCUPIED) {
      throw new Error("Device is occupied")
    }
    const deviceEntity: DeviceInfo = {} as DeviceInfo
    deviceEntity.serial = serial
    deviceEntity.rentStatus = RentStatusEnum.OCCUPIED
    deviceEntity.rentDuration = rentDuration
    DeviceDbManager.getInstance().updateDevice(deviceEntity)
  }

  static returnDevice(serial: string): void {
    const device = DeviceDbManager.getInstance().fetchDeviceInfo(serial)
    if (device.rentStatus === RentStatusEnum.AVAILABLE) {
      throw new Error("Device is available")
    }
    const deviceEntity: DeviceInfo = {} as DeviceInfo
    deviceEntity.serial = serial
    deviceEntity.rentStatus = RentStatusEnum.AVAILABLE
    deviceEntity.rentDuration = 0
    DeviceDbManager.getInstance().updateDevice(deviceEntity)
  }

  static checkRentTimeout(device: DeviceInfo): void {
    const now = new Date().getTime()
    if (device.rentStatus === RentStatusEnum.OCCUPIED) {
      const rentDuration = device.rentDuration
      const rentTime = new Date(device.updateTime).getTime()
      console.log(now - rentTime / (1000 * 60))
      if ((now - rentTime) / (1000 * 60) > rentDuration) {
        console.log(now - rentTime / (1000 * 60))
        const deviceEntity: DeviceInfo = {} as DeviceInfo
        deviceEntity.serial = device.serial
        deviceEntity.rentStatus = RentStatusEnum.AVAILABLE
        deviceEntity.rentDuration = 0
        DeviceDbManager.getInstance().updateDevice(deviceEntity)
      }
    }
  }

  /**
   * If your server cannot be accessed, synchronize the device information to the remote
   */
  static registerDevice(): void {
    // TODO
  }
}
