import { buildWarning } from '../../utils/warning';
var deprecationWarning = buildWarning(['MUI: The hook useGridApi is deprecated and will be removed in the next major version.', 'Access the ref content with apiRef.current instead']);
/**
 * @deprecated Use `apiRef.current` instead.
 */

export var useGridApi = function useGridApi(apiRef) {
  if (process.env.NODE_ENV !== 'production') {
    deprecationWarning();
  }

  return apiRef.current;
};