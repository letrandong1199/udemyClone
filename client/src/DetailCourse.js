import Container from '@material-ui/core/Container'
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';

const course = {
    title: 'Course 2',
    thumb: 'assets/2.jpg',
    author: 'Author 2',
    description: 'Here is a short description for this course. Blab blab blab blab.',
    price: 19,
    rating: 3
};

function DetailCourse(course) {
    return (
        <div>
            <Navbar />
            <Container fullWidth style={{ height: 500, backgroundColor: '#818181' }}>
                <Grid container>
                    <Grid>

                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}
export default DetailCourse;