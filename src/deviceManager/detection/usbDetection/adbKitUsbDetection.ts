import {PortManager} from "../../port/port";
import {DeviceStatusEnum} from "../../constants/device";
import {DeviceInfo} from "../../../../types/device";
import {getDeviceAttributes} from "../../device/deviceInfo";
import {getLocalIPAddress} from "../../utils/localIp";
import {AdbInteraction} from "../../device/interaction/adbInteraction";
import {DeviceDbManager} from "../../api/device/deviceDbManager";

export class AdbKitUsbDetection {
  registerUsb(biz: string): void {
    let localPortDict = PortManager.getDevicePort()
    const client = AdbInteraction.getInstance().getClient()
    const timeoutGroup = {}
    const ip = getLocalIPAddress()
    const bridge = {}
    client.trackDevices()
      .then(function(tracker) {
        tracker.on("add", async (device) => {
          const serial = device.id
          if (isRemoteDevice(serial)) {
            console.log("remote device should not be added")
            return
          }
          // Delay the trigger, or it throws "still authorizing" exception
          timeoutGroup[serial] = setTimeout(async () => {
            try {
              const availablePort = PortManager.allocatePort(serial, localPortDict)
              bridge[serial] = client.createTcpUsbBridge(serial, { auth: () => Promise.resolve() })
              bridge[serial].listen(availablePort).on("error", (e) => {
                  console.log("err" + e)
              })
              console.log("port connected:" + availablePort)
              console.log("ip connected:" + ip)

              // update device info
              const deviceInfo: DeviceInfo = {} as DeviceInfo
              deviceInfo.serial = serial
              deviceInfo.ip = ip
              deviceInfo.port = availablePort
              deviceInfo.deviceAttributes = await getDeviceAttributes(client, serial)
              deviceInfo.connStatus = DeviceStatusEnum.ONLINE
              deviceInfo.biz = biz
              DeviceDbManager.getInstance().updateDevice(deviceInfo)

              // refresh port dict
              localPortDict = PortManager.getDevicePort()

              // clear timeout
              clearTimeout(timeoutGroup[serial])
            } catch (e) {
              console.log("err" + e)
            }
          }, 3000)

        })
        tracker.on("remove", function(device) {
          const serial = device.id
          if (isRemoteDevice(serial)) {
            client.disconnect(serial)
            return
          }

          // update device info
          console.log("Device %s was unplugged", serial)
          const deviceInfo: DeviceInfo = {} as DeviceInfo
          deviceInfo.serial = serial
          deviceInfo.connStatus = DeviceStatusEnum.OFFLINE
          DeviceDbManager.getInstance().updateDevice(deviceInfo)

          // close bridge
          bridge[serial].close()
        })
        tracker.on("end", function() {
          console.log("Tracking stopped")
        })
      })
    console.log("------------init success------------")
  }
}

const isRemoteDevice = (serial: string) => {
  if (serial.indexOf(".") !== -1) {
    return true
  }
  return false
}
