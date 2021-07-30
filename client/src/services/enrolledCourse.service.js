import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/enrolled-course-controller';

class EnrolledCourseService {
    getAll() {
        return axios.get(API_URL + '/enrolled-courses')
    };
    getById(id) {
        return axios.get(API_URL + '/enrolled-courses/' + id);
    };
    postOne(data) {
        return axios
            .post(API_URL + '/enrolled-courses', data, { headers: authHeader() })
            .then(response => {
                console.log(response);
                return response
            })
    }
}

export default new EnrolledCourseService();