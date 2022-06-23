import { buildWarning } from '../../utils/warning';
var deprecationWarning = buildWarning(['MUI: The hook useGridState is deprecated and will be removed in the next major version.', 'The two lines below are equivalent', '', 'const [state, setState, forceUpdate] = useGridState(apiRef);', 'const { state, setState, forceUpdate } = apiRef.current']);
/**
 * @deprecated Use `apiRef.current.state`, `apiRef.current.setState` and `apiRef.current.forceUpdate` instead.
 */

export var useGridState = function useGridState(apiRef) {
  if (process.env.NODE_ENV !== 'production') {
    deprecationWarning();
  }

  return [apiRef.current.state, apiRef.current.setState, apiRef.current.forceUpdate];
};