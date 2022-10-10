import { createContext, useContext, useState, useCallback } from 'react';
import ApiClient from '../ApiClient';
import { craftErrorObj, craftLoadingObj, craftLoadedObj, isStale, isNotRequested } from './utils';

const DevicesContext = createContext(null);

const shouldAbandonFetch = (item, force) => {
  return !isStale(item) && !isNotRequested(item) && !force;
}

const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState({});
  const [deviceList, setDeviceList] = useState({});

  const fetchDevices = useCallback(async (force) => {
    if (!shouldAbandonFetch(deviceList, force)) {
      setDeviceList(craftLoadingObj(deviceList)); 
      const res = await ApiClient.fetchDevices();
      if (res.error) {
        setDeviceList(craftErrorObj(res.error));
      } else {
        const updatedDeviceList = Object.assign({}, res);
        updatedDeviceList.itemIds = updatedDeviceList.items.map(({ id }) => id);
        const updatedDevices = {};
        updatedDeviceList.items.forEach((item) => {
          updatedDevices[item.id] = craftLoadedObj(item);
        });
        delete updatedDeviceList.items;
        setDeviceList(craftLoadedObj(updatedDeviceList));
        setDevices(updatedDevices);
      }
    }
  }, [deviceList])

  const fetchDevice = useCallback(async ({ deviceId }, force) => {
    if (!shouldAbandonFetch(devices[deviceId], force)) {
      const res = await ApiClient.fetchDevice({ deviceId });
      if (res.error) {
        setDevices({
          ...devices,
          [deviceId]: craftErrorObj(res.error)
        });
        setDeviceList(null); // escape hatch for when fetchDevices succeeds, then fetchDevice fails, then user returns to a device list
      } else {
        setDevices({
          ...devices,
          [deviceId]: craftLoadedObj(res)
        });
      }
    }
  }, [devices]);

  const value = { deviceList, devices, fetchDevices, fetchDevice };

  return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>;
}

export default DevicesProvider;
export const useDevices = () => useContext(DevicesContext);