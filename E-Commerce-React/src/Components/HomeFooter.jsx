import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

function HomeFooter(){
return(
    <div>
        <Grid container spacing={8}  >
            <Grid lg={10} container direction="column">
                <Typography className="pb-5" variant='h6'>Help</Typography>
                <Button className='pb-2' gutterBottom>
                FAQs
                </Button>
                <Button className='pb-2' gutterBottom>
                Customer review
                </Button>
                <Button className='pb-2' gutterBottom>
                Stores
                </Button>
                </Grid>
                <Grid lg={40} container direction="column">
                <Typography variant='h6'>Company</Typography>
                <Button className='pb-5' gutterBottom>
                Services
                </Button>
                <Button className='pb-5' gutterBottom>
                About
                </Button>
                <Button className='pb-5' gutterBottom>
                Jobs
                </Button>
            </Grid>
        </Grid>
      
    </div>
)
}

export default HomeFooter;