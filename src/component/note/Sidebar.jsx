import React from 'react';

//material ui import
import IconButton from '@mui/material/IconButton';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Sidebar = () => {
  return (
    <>
      <ul className='side-bar' id='mySidenav'>
        <li className='sidebar-li mt-2'>
          <IconButton className='active'>
            <EmojiObjectsOutlinedIcon className='sidebar-icon' />
          </IconButton>
        </li>
        <li className='sidebar-li'>
          <IconButton>
            <NotificationsNoneOutlinedIcon className='sidebar-icon' />
          </IconButton>
        </li>

        <li className='sidebar-li'>
          <IconButton>
            <CreateOutlinedIcon className='sidebar-icon' />
          </IconButton>
        </li>
        <li className='sidebar-li'>
          <IconButton>
            <ArchiveOutlinedIcon className='sidebar-icon' />
          </IconButton>
        </li>
        <li className='sidebar-li'>
          <IconButton>
            <DeleteOutlineOutlinedIcon className='sidebar-icon' />
          </IconButton>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
