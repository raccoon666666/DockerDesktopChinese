import { buildWarning } from '../../utils/warning';
const deprecationWarning = buildWarning(['MUI: The hook useGridApi is deprecated and will be removed in the next major version.', 'Access the ref content with apiRef.current instead']);
/**
 * @deprecated Use `apiRef.current` instead.
 */

export const useGridApi = apiRef => {
  if (process.env.NODE_ENV !== 'production') {
    deprecationWarning();
  }

  return apiRef.current;
};