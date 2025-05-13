import Grid from '@mui/material/Grid2';

function HomeFeaturing(){
return(
    <div>
        <div className='p-9 text-5xl text-center font-bold'>Featured Products</div>
        <Grid
  container
  direction="row"
  spacing={10}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Grid  lg={3} >
  <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>
  </Grid>
  <Grid  lg={3} >
  <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>
  </Grid>
  <Grid  lg={3} >
  <img src="https://res.cloudinary.com/derc8yoxs/image/upload/v1736292024/craiyon_185332_a_brown_bag_with_white_background_mtf9gw.png"/>
  </Grid>
    </Grid>
    </div>
)
}

export default HomeFeaturing;