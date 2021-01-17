const { udpScan } = require("../lib/scanner");

function scan(ip, range) {
    const hrstart = process.hrtime();
    udpScan(ip, range)
        .then((report) => {
            printParsedUdpScanReport(report);
            const hrend = process.hrtime(hrstart);
            console.info("Executed in: %ds %dms", hrend[0], hrend[1] / 1000000);
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
