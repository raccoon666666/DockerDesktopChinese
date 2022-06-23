import _extends from "@babel/runtime/helpers/esm/extends";
export const getGridLocalization = (gridTranslations, coreTranslations) => {
  var _coreTranslations$com, _coreTranslations$com2;

  return {
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: _extends({}, gridTranslations, {
            MuiTablePagination: (coreTranslations == null ? void 0 : (_coreTranslations$com = coreTranslations.components) == null ? void 0 : (_coreTranslations$com2 = _coreTranslations$com.MuiTablePagination) == null ? void 0 : _coreTranslations$com2.defaultProps) || {}
          })
        }
      }
    }
  };
};