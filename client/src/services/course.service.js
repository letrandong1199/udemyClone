import axios from 'axios';
import authHeader from './authHeader.service.js';

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

}

export default new CourseService();