# Android-Device-Manager

一个管理Android设备连接的服务

在机器上部署该服务，当设备接入时自动分配一个ip+端口，可通过adb connect ip:port进行设备连接

支持调用接口去完成查询可用设备、借用设备、释放设备的操作

# 开始入门
- 安装依赖
```
git clone https://github.com/sonar-su/android-device-manager.git
cd <project_name>
npm install
```
- 本地运行
```
npm run watch-server
```

- 插入Android设备
- http://localhost:3000/devices?biz=test 调用接口查看设备信息
- 根据接口返回的ip和port信息，执行命令
```
adb connect ip:port
```

# 打包
- 打包成独立文件
```
npm run build
pkg dist/server.js
```
在项目根目录找到server-linux、server-macos、server-win.exe三个文件，根据系统选择对应的文件运行即可

# 设备信息存放
首次运行时会在项目根目录生成一个devices.json文件，记录设备的ip+端口信息(这意味着这是一个单机服务，无法通过多台机器部署来统一管理手机)

如果想要在多台机器上部署该服务并统一管理，需按以下步骤
```
1. 找到<project_name>/src/api/device/source/deviceInfoFromApi.ts
2. 实现deviceInfoFromApi.ts中的接口，将设备信息通过自定义接口存入数据库中（可参考<project_name>/src/api/device/source/deviceInfoFromLocalFile.ts中的实现）
3. 回到上一级目录
4. 在DeviceDbManager.ts中将继承对象改为DeviceInfoFromApi
```

# 设备调度
本项目内置了设备调度的功能，可通过调用接口去完成查询可用设备、借用设备、释放设备的操作
详见 http://localhost:3000/swagger-html

如果多台机器各自部署着设备管理服务，为了达到共享设备池的目的，可以另起一个统一服务去管理设备池

调度接口可参考src/controller/device.ts

## LICENSE
[MIT](LICENSE)


