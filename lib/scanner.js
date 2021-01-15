const { spawn } = require("child_process");
const { parseRawUdpScanReport } = require("./parser");

/**
 *  Scan udp ports using nc, should be run with root privileges.
 * @param {String} ip IP address of host to perform udp scan
 * @param {String} portRange Range of ports, should be in this format : "5060-5074"
 * @returns {Array<{Port:Number, Status:String}>} If one or more of the ports are available, returns an
 * array which contains 'Port' and 'Status' info. Otherwise returns empty array
 */
function udpScan(ip = "127.0.0.1", portRange = "5061-5074") {
    return new Promise((resolve, reject) => {
        try {
            const scan = spawn("nc", ["-vuz", ip, portRange]);

            const rawReport = [];

            scan.stderr.on("data", (data) => {
                rawReport.push(data.toString("utf8"));
            });

            scan.on("close", (code) => {
                resolve(parseRawUdpScanReport(rawReport, portRange));
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    udpScan,
};
