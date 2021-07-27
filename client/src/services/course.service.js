import axios from 'axios';

const API_URL = 'http://localhost:8080/api/course-controller';
class CourseService {
    getAll() {
        return axios.get(API_URL + '/courses')
    };
    getById(id) {
        return axios.get(API_URL + '/courses/' + id);
    };
    postOne(course) {
        console.log('This:', course);
        return axios
            .post(API_URL + '/courses', course)
            .then(response => {
                console.log(response);
                return response
            })
    }

}

export default new CourseService();