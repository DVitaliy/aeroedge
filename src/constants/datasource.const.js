const DATASOURCE = {
  "5m": {
    displayName: "5M model",
    displayIcon: "filter_5",
    defaultRoute: "/listing",
    roleList: ["ADMIN", "5M", "5MMASTER"],
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

export const getDataSource = (access = []) =>
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
