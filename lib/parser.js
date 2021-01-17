function parseRawUdpScanReport(report = [], portRange = "5061-5074") {
    try {
        if (report.length > 0) {
            const parsedReport = [];

            //Parse existing info in nc result
            report.forEach((info) => {
                //Example info:
                //'Connection to 127.0.0.1 5072 port [udp/*] succeeded!\n'
                const data = {
                    Port: parseInt(info.split(" ")[3]),
                    State: trimStatus(info.split(" ")[6]),
                };
                parsedReport.push(data);
            });

            //Fill result with failed info based on port range
            const portHead = parseInt(portRange.split("-")[0]);
            const portTail = parseInt(portRange.split("-")[1]);
            if (parsedReport.length < portTail - portHead + 1) {
                for (let i = portHead; i <= portTail; i++) {
                    const data = parsedReport.find((reports) => reports.Port === i);

                    if (!data) {
                        const failedData = {
                            Port: i,
                            State: "failed",
                        };
                        parsedReport.push(failedData);
                    }
                }
            }
            return parsedReport;
        } else {
            return report;
        }
    } catch (error) {
        throw error;
    }
}

function trimStatus(str = "") {
    if (str !== "") {
        return str.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }

    return str;
}

module.exports = {
    parseRawUdpScanReport,
};
