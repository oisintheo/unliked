import { useEffect, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledModal,
  StyledModalBackdrop,
  StyledModalContent,
} from './Modal.styles';

export interface DialogProps {
  allowClose?: boolean;
  contents: React.ReactNode;
  open: boolean;
  dialogStateChange?: (open: boolean) => void;
}

export default function Modal({
  allowClose = true,
  contents,
  open,
  dialogStateChange = () => {},
}: DialogProps) {
  const [showModal, setShowModal] = useState(open);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== showModal) {
      setShowModal(open);
    }
  }, [open]);

  function updateDialogState(open: boolean) {
    setShowModal(open);
    dialogStateChange(open);
  }

  return (
    <>
      <StyledModal
        style={{ visibility: 'hidden' }}
        isVisible={showModal}
        onClick={({ target }) => {
          if (!allowClose || dialog.current?.contains(target as any)) {
            return;
          }
          updateDialogState(false);
        }}
        onKeyDown={({ key }) => {
          if (!allowClose || key !== 'Escape') {
            return;
          }
          updateDialogState(false);
        }}
      >
        <StyledContainer>
          <StyledModalContent
            ref={dialog}
            className='relative p-6 bg-black rounded-lg grid place-content-center'
          >
            {contents}
          </StyledModalContent>
          <StyledModalBackdrop />
        </StyledContainer>
      </StyledModal>
    </>
  );
}
