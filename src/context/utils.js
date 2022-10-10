const STALE_MILLIS = 6;

export const craftLoadingObj = (current = {}) => ({
  isLoaded: false,
  ...current, // so isLoaded will overwrite if set
  isLoading: true,
  isError: false,
  tms: Date.now()
});

export const craftLoadedObj = (item = {}) => ({
  isLoaded: true,
  isLoading: false,
  isError: false,
  tms: Date.now(),
  item
});

export const craftErrorObj = (error = {}) => ({
  isLoaded: false,
  isLoading: false,
  isError: true,
  tms: Date.now(),
  error: typeof error === 'object' ? error : { message: error }
});

export const isNotRequested = (item) => !item || !Object.keys(item).length;
export const isLoading = (item) => item?.isLoading;
export const isInitialLoading = (item) => isNotRequested(item) || (item?.isLoading && !item?.isLoaded);
export const isReloading = (item) => item?.isLoading && item?.isLoaded;
export const isError = (item) => item?.isError;
export const isLoaded = (item) => item?.isLoaded;
export const isStale = (item) => item?.isLoaded && ((item?.tms + STALE_MILLIS) < Date.now());