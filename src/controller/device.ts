import {path, request, summary, tagsAll, query, body} from "koa-swagger-decorator";
import {AdbInteraction} from "../deviceManager/device/interaction/adbInteraction";
import {DeviceInfo} from "../../types/device";
import {DeviceScheduleManager} from "../deviceManager/api/device/deviceScheduleManager";
import {RentStatusEnum} from "../deviceManager/constants/device";
import {DeviceDbManager} from "../deviceManager/api/device/deviceDbManager";

@tagsAll(["Device"])
export default class DeviceController {
  @request("get", "/devices")
  @summary("Find devices")
  @query({
    biz: { type: "string", required: true, description: "biz" }
  })
  public static async deviceList(ctx: any): Promise<void> {
    console.log(ctx.query.biz)
    ctx.status = 200;
    ctx.body = DeviceDbManager.getInstance().fetchDeviceList(ctx.query.biz);
  }

  @request("get", "/devices/available")
  @summary("Find available devices")
  @query({
    biz: { type: "string", required: true, description: "biz" }
  })
  public static async availableDeviceList(ctx: any): Promise<void> {
    const deviceList = DeviceDbManager.getInstance().fetchDeviceList(ctx.query.biz);
    const filteredList = deviceList.filter((item: DeviceInfo) => item.rentStatus === RentStatusEnum.AVAILABLE)
    ctx.status = 200;
    ctx.body = filteredList
  }

  @request("get", "/device/{serial}/alert")
  @summary("alert for finding which device is")
  @path({
    serial: { type: "string", required: true, description: "serial of device" }
  })
  public static async alertDevice(ctx: any): Promise<void> {
    AdbInteraction.getInstance().alertDevice(ctx.params.serial)
    ctx.status = 200;
    ctx.body = "alerted"
  }

  @request("post", "/device/{id}/rent")
  @summary("rent device")
  @body({
    serial: { type: "string", required: true, description: "serial of device" },
    duration: { type: "number", required: false, description: "rent duration" }
  })
  public static async rentDevice(ctx: any): Promise<void> {
    DeviceScheduleManager.rentDevice(ctx.request.body.serial)
    ctx.body = "rented"
  }

  @request("post", "/device/{id}/release")
  @summary("release devices")
  @body({
    serial: { type: "string", required: true, description: "serial of device" }
  })
  public static async returnDevice(ctx: any): Promise<void> {
    DeviceScheduleManager.returnDevice(ctx.request.body.serial)
    ctx.body = "returned"
  }
}
