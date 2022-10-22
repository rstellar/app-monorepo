import RootSiblingsManager from 'react-native-root-siblings';

import { Box, Modal, Spinner, Typography } from '@onekeyhq/components';
// import { formatMessage } from '@onekeyhq/components/src/Provider';

export default function showInstallPopup() {
  const modalPopup = (
    <Modal footer={null} closeable={false}>
      <Box h="100%" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
        <Typography.DisplayMedium mt={6}>
          Install and relaunch
        </Typography.DisplayMedium>
      </Box>
    </Modal>
  );

  return new RootSiblingsManager(modalPopup);
}
