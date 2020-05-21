import { IImportStatus, EGenericStatusValue, EImportReportItemKey } from 'services/BackendApi';

export const importStatus: IImportStatus = {
  "status": EGenericStatusValue.DONE,
  "data": {
    "success": false,
    "report": [
      {
        "key": EImportReportItemKey.REGIONS,
        "total": 15,
        "warnings": [],
        "errors": []
      },
      {
        "key": EImportReportItemKey.ACCOMMODATION_RATES,
        "total": 4127,
        "warnings": [],
        "errors": [
          {
            "ref": "Finolhu / FIN 92",
            "messages": [
              "points to a parent called 'Finolhu / Beach Pool Villa' but that does not match from the list of parents"
            ]
          },
          {
            "ref": "Finolhu / FIN 93",
            "messages": [
              "points to a parent called 'Finolhu / Beach Pool Villa' but that does not match from the list of parents"
            ]
          }
        ]
      }
    ]
  },
  "createdAt": "2020-03-16T07:33:50.816Z",
};
