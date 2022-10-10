import React, { useEffect } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { useDevices } from '../context/DevicesContext';
import { isInitialLoading, isError, isLoaded, isStale, isNotRequested } from '../context/utils';

import { Link } from '../router';

const Devices = () => {
  const { deviceList, devices, fetchDevices } = useDevices();
  
  useEffect(() => {
    if (isNotRequested(deviceList) || isStale(deviceList)) {
      fetchDevices();
    }
  }, [deviceList, fetchDevices]);

  let body;

  if (isInitialLoading(deviceList)) {
    body = (<div className="text-center mt-5"><Spinner role="status" animation="border" /></div>);
  }
  if (isError(deviceList)) {
    body = (<Alert className="mt-5" variant="danger">Failed to fetch devices: {deviceList.error.message}</Alert>)
  }
  if (isLoaded(deviceList)) {
    if (!deviceList.item.itemIds.length) {
      body = (<Alert className="mt-5" variant="info">No devices found.</Alert>);
    } else {
      body = deviceList.item.itemIds.map((id) => {
        return (<li key={id}><Link to={`/devices/${id}`}>{devices[id].item.name}</Link></li>);
      });
      body = (<ul>{body}</ul>);
    }
  }
  return (<Container>{body}</Container>);
};

export default Devices;