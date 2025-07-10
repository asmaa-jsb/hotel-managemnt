import { noDataImage } from "@/assets/Images"
import { Box, Typography } from "@mui/material"

const NoData = () => {
  return (
    <Box className="Container">
      <img className="notFoundImg" src={noDataImage} alt="no data image" />
      <Typography component={"h1"}  className="Notfound-title noData-title">No Data Available</Typography>
      <Typography component={"p"} className="Notfound-subtitle">Please check back later or try a different query.</Typography>
    </Box>
  )
}

export default NoData
