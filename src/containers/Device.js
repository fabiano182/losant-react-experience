import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { useDevices } from '../context/DevicesContext';
import { isInitialLoading, isError } from '../context/utils';

import { useParams, Link } from '../router';

const Device = (props) => {
  const { devices, fetchDevice } = useDevices();
  const { deviceId } = useParams();
  const device = devices[deviceId];
  useEffect(() => {
    if (!device) {
      fetchDevice({ deviceId });
    }
  }, [deviceId, device, fetchDevice]);
  let body, crumbText;
  if (isInitialLoading(device)) {
    body = (<div className="text-center mt-5"><Spinner role="status" animation="border" /></div>);
    crumbText = 'Loading ...';
  } else if (isError(device)) {
    body = (<Alert className="mt-5" variant="danger">Failed to fetch device: {device.error.message}</Alert>);
    crumbText = 'Error!';
  } else { 
    body = (<pre>{JSON.stringify(device, null, 2)}</pre>);
    crumbText = device.item.name;
  }
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/devices'}}>Devices</Breadcrumb.Item>
        <Breadcrumb.Item active>{crumbText}</Breadcrumb.Item>
      </Breadcrumb>
      {body}
    </Container>
  );
};

export default Device;