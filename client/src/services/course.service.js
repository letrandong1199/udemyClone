import axios from 'axios';

const API_URL = 'http://localhost:8080/api/course-controller';
class CourseService {
    getAll() {
        return axios.get(API_URL + '/courses')
    };
    getById(id) {
        return axios.get(API_URL + '/course/' + id);
    };
    postOne(course) {
        return axios
            .post(API_URL + '/course', course)
            .then(response => {
                console.log(response);
                return response
            })
    }
}

export default new CourseService();