import {PortDict, PortSource} from "../../../../../types/port";
import {DeviceInfo} from "../../../../../types/device";
import {readFileSync, writeFileSync} from "../../../utils/file";
import {DeviceStatusEnum, RentStatusEnum} from "../../../constants/device";
import {DeviceScheduleManager} from "../deviceScheduleManager";

export class DeviceInfoFromLocalFile implements PortSource {
  fetchPortDict(): PortDict {
    const deviceList: DeviceInfo[] = this.fetchDeviceList()
    // deviceInfo转成portDict
    const portDict: PortDict = {}
    deviceList.forEach((item: DeviceInfo) => {
      portDict[item.serial] = item.port
    })
    return portDict
  }

  updateDevice(deviceInfo: DeviceInfo): void {
    deviceInfo.updateTime = new Date().toISOString()
    const deviceList = JSON.parse(readFileSync("device.json"))
    const index = deviceList.findIndex((item: DeviceInfo) => item.serial === deviceInfo.serial)
    if (deviceInfo.connStatus === DeviceStatusEnum.ONLINE) {
      if (index === -1) {
        // to many attributes, the project is a demo, so just delete it
        delete deviceInfo.deviceAttributes
        deviceInfo.createTime = new Date().toISOString()
        deviceInfo.rentStatus = RentStatusEnum.AVAILABLE
        deviceList.push(deviceInfo)
      } else {
        deviceList[index] = deviceInfo
      }
    } else {
      Object.keys(deviceInfo).forEach((key: string) => {
        deviceList[index][key] = deviceInfo[key]
      })
    }
    writeFileSync("device.json", JSON.stringify(deviceList))
  }

  fetchDeviceList(biz?: string): DeviceInfo[] {
    let deviceList: DeviceInfo[]
    try {
      const data = JSON.parse(readFileSync("device.json"))
      if (!biz) {
        return data
      } else {
        deviceList = data.filter((item: DeviceInfo) => item.biz === biz)
      }
    } catch (e) {
      writeFileSync("device.json", JSON.stringify([]))
      return []
    }
    deviceList.forEach((device) => {
      DeviceScheduleManager.checkRentTimeout(device)
    })
    return deviceList
  }

  fetchDeviceInfo(serial: string): DeviceInfo {
    return this.fetchDeviceList().find((item: DeviceInfo) => item.serial === serial)
  }

  fetchSerialByIpPort(ip: string, port: number): string {
    const deviceList = this.fetchDeviceList()
    const deviceInfo = deviceList.find((item: DeviceInfo) => item.ip === ip && item.port === port)
    return deviceInfo.serial
  }
}
