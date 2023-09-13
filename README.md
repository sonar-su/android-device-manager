# Android-Device-Manager

A service that manages connections to Android devices.

Deploy this service on a machine, and upon device connection, an IP address and port will be automatically assigned. Devices can be accessed using the command "adb connect ip:port".

The service supports invoking interfaces to perform operations like querying for available devices, borrowing devices, and releasing devices.

[中文文档](README_ZH.md)

# Getting Started
- Install
```
git clone https://github.com/sonar-su/android-device-manager.git
cd <project_name>
npm install
```

# Starting Development
```
npm run watch-server
```

# Usage
```
1.Connecting an Android Device
2.Use the following API endpoint to retrieve device information: http://localhost:3000/devices?biz=test
3.Execute commands based on the IP and port information returned by the interface
4.adb connect ip:port
```

# Packaging
- Packaging as a Standalone File
```
npm run build
pkg dist/server.js
```
In the project's root directory, you will find three files: server-linux, server-macos, and server-win.exe. Choose the corresponding file based on your system and execute it.

# Device Information Storage
Upon the initial execution, a devices.json file will be generated in the project's root directory to store IP and port information of devices. (This signifies that it is a standalone service and cannot be uniformly managed across multiple machines.)

If you wish to deploy this service on multiple machines and manage it uniformly, follow these steps:
```
1. Locate <project_name>/src/api/device/source/deviceInfoFromApi.ts
2. Implement the interfaces in deviceInfoFromApi.ts and store device information into a custom database interface (you can refer to the implementation in <project_name>/src/api/device/source/deviceInfoFromLocalFile.ts)
3. Go back to the previous directory
4. In DeviceDbManager.ts, change the inherited object to DeviceInfoFromApi
```

# Device Scheduling
This project features built-in device scheduling capabilities, enabling operations such as querying available devices, borrowing devices, and releasing devices through API calls. For more details, please refer to http://localhost:3000/swagger-html.

In scenarios where multiple machines individually deploy their own device management services, to achieve the goal of a shared device pool, it's possible to establish a separate centralized service to oversee the device pool.

For insights into the scheduling interface, you can consult src/controller/device.ts.

## LICENSE
[MIT](LICENSE)


