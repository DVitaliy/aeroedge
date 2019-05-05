const DATASOURCE = {
  "5m": {
    displayName: "5M model",
    displayIcon: "filter_5",
    defaultRoute: "/listing?filter.revisionCode=E4&sort.serialNo=-1",
    listingTableHead: {
      arrivalDate: { displayName: "Arrival date" },
      measurementResult: { displayName: "Measurement result" },
      methodCode: { displayName: "Method code" },
      //partStatus: { displayName: ""},
      productCode: { displayName: "Product code" },
      revisionCode: { displayName: "Revision code" },
      serialNo: { displayName: "Serial No" },
      shipDate: { displayName: "Ship date" },
      //status: { displayName: "" },
      workedDate: { displayName: "Worked date" },
    },
    roleList: ["5M", "5MMASTER"],
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

export const getDataSourceByKey = key => DATASOURCE[key] || null;
