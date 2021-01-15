# nc-udp-scanner
Dependency free, promise based UDP port scanner using linux nc

## Installation

## Usage
Enter the IP address of the device you want to port scan and the port range you want to scan as parameters to the function.

## Examples
```javascript
const { udpScan } = require("./lib/scanner");

function scan(ip, range) {
    const hrstart = process.hrtime();
    udpScan(ip, range)
        .then((report) => {
            printParsedUdpScanReport(report);
            const hrend = process.hrtime(hrstart);
            console.info('Executed in: %ds %dms', hrend[0], hrend[1] / 1000000)
            scan(ip, range);
        })
        .catch((error) => console.log(error));
}

const IP = "192.168.1.4";
const portRange = "5061-5074";
scan(IP, portRange);

const printParsedUdpScanReport = (report) => {
    console.log({
        Header: "PortScan",
        Status: report,
    });
};
```

Output:
```bash
{
  Header: 'PortScan',
  Status: [
    { Port: 5061, State: 'succeeded' },
    { Port: 5062, State: 'succeeded' },
    { Port: 5063, State: 'succeeded' },
    { Port: 5064, State: 'succeeded' },
    { Port: 5065, State: 'succeeded' },
    { Port: 5066, State: 'succeeded' },
    { Port: 5067, State: 'succeeded' },
    { Port: 5069, State: 'succeeded' },
    { Port: 5071, State: 'succeeded' },
    { Port: 5072, State: 'succeeded' },
    { Port: 5073, State: 'succeeded' },
    { Port: 5068, State: 'failed' },
    { Port: 5070, State: 'failed' },
    { Port: 5074, State: 'failed' }
  ]
}
Executed in: 36s 78.436788ms
```
