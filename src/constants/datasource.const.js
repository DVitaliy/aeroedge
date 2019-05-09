const DATASOURCE = {
  "5m": {
    roleList: ["5M", "5MMASTER"],
    displayName: "5M model",
    displayIcon: "filter_5",
    defaultRoute: "/item?serialNo=12345010&methodCode=T1",
    //defaultRoute: "/listing?filter.revisionCode=E4&sort.productCode=1&filter.methodCode=T1&filter.serialNo=10",
    listingDataPattern: {
      arrivalDate: { displayName: "Arrival date" },
      measurementResult: {
        displayName: "Measurement result",
        enumValues: {
          "0": { displayName: "OK" },
          "1": { displayName: "NG" },
        },
      },
      methodCode: { displayName: "Method code" },
      productCode: { displayName: "Product code" },
      revisionCode: { displayName: "Revision code" },
      serialNo: { displayName: "Serial No" },
      shipDate: { displayName: "Ship date" },
      status: {
        displayName: "Status",
        enumValues: {
          "0": { displayName: "Work in progress" },
          "1": { displayName: "Completed" },
          "-1": { displayName: "Scraped" },
        },
      },
      partStatus: {
        displayName: "Part status",
        enumValues: {
          "0": { displayName: "Work in progress" },
          "1": { displayName: "Completed" },
          "-1": { displayName: "Scraped" },
        },
      },
      workedDate: { displayName: "Worked date" },
    },
    listingSideBarPattern: {
      textInput: {
        name: "serialNo",
        displayName: "Serial No...",
      },
      dataStartInput: {
        name: "startData",
        displayName: "Start data...",
      },
      dataEndInput: {
        name: "endData",
        displayName: "End data...",
      },
      clickPreprocess: ({ serialNo, startData, endData }) => ({
        "filter.serialNo": serialNo,
        "filter.date": !startData && !endData ? "" : startData + "|" + endData,
      }),
    },
    /*listingPreprocessGetData: ({ datasource, parameters }) => {
      //if (!~parameters.indexOf(`filter.status=`))
      return { datasource, parameters };
    },*/
    listingPreprocessItemClick: ({ serialNo, methodCode }) => ({
      serialNo,
      methodCode,
    }),
    detailsDataPattern: {
      //pathname:"",
      Component: "DetailsFive",
    },
  },
  logi: {
    displayName: "Logistics",
    displayIcon: "local_shipping",
    roleList: ["ADMIN", "LOGI", "LOGIMASTER"],
  },
  users: {
    displayName: "Users",
    displayIcon: "account_box",
    defaultRoute: "/listing",
    roleList: ["ADMIN"],
  },
  company: {
    displayName: "Company",
    displayIcon: "business",
    defaultRoute: "/import",
    roleList: ["ADMIN"],
  },
};

export const getListDataSourceByRole = (access = []) =>
  Object.assign(
    ...Object.keys(DATASOURCE)
      .filter(key =>
        DATASOURCE[key].roleList.some(role => access.includes(role))
      )
      .map(key => ({
        [key]: {
          ...DATASOURCE[key],
          defaultRoute: key + (DATASOURCE[key].defaultRoute || ""),
        },
      }))
  );

export const getDataSourceByKey = key => {
  return { ...DATASOURCE[key] } || null;
};
