import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { CloseButton } from './SwipableDrawlerStyled';
import { MdClose } from 'react-icons/md';



const TemporaryDrawer = ({
  open,  
  onClose,
  children
}) => {

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: '50vw' }} role="presentation">
          <Box sx={{ p: 2 }}>
            <CloseButton onClick={onClose}>
                      <MdClose style={{ color: 'red' }} />
            </CloseButton>            
           {children}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};
export default TemporaryDrawer;
