
import { Box, Typography } from '@mui/material'
import type React from 'react';

interface FacilityCardProps{
  icon : string;
  number: number;
  title: string;
}
const FacilityCard: React.FC<FacilityCardProps> = ({icon, number,title}) => {
  return (
    <div>
       <Box>
              <img className="roomIcons" src={icon} alt="icon" />
              <Typography component={"p"} className='facilityCard-title'>
                <Typography  component={"span"} className='facilityCard-span'>{number}</Typography> {title}
              </Typography>
            </Box>
    </div>
  )
}

export default FacilityCard;
