import { useState, useEffect } from 'react';
import { Container, CircularProgress } from "@material-ui/core";

import enrolledCourseService from '../../services/enrolledCourse.service';
import HomeSection from '../../components/HomeSection';

const MyLearning = () => {
    const [ownCourse, setOwnCourse] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true);
        enrolledCourseService.getEnrolledByUser().then(response => {
            setIsPending(false);
            setOwnCourse(response.listAllResponse);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            {isPending
                ? <div>
                    <CircularProgress style={{
                        margin: 20,
                    }}
                    />
                </div>
                : <HomeSection
                    title="Learning"
                    color="vibrant"
                    courses={ownCourse}
                    disableTitle
                    isEnrolled
                    hidePrice
                    showProgress
                />
            }
        </Container>
    )
};
export default MyLearning;
