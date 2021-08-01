import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_ONE_COURSE } from '../config/config';

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
    deleteOne(id) {
        return axios.delete(API_URL + '/courses/' + id, { headers: authHeader() })
    }
    getByQuery(query) {
        // [{cateory: asda}, {dasdas: dasd}]
        console.log('In service', query);
        /*const queryString = query?.map(item =>
            `${item.label}=${item.value}`
        ).join('&')*/
        //console.log('String', queryString);
        return axios.get(API_URL + '/courses?' + query)
    }
    getContentByCourseId(courseId) {
        return axios.get(API_URL + '/my-learning/' + courseId, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_ONE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code)
                }
                return response.data.message;
            })
    }

}

export default new CourseService();