import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_ONE_COURSE, UPDATE_COURSE, GET_ALL_COURSE, CREATE_COURSE } from '../config/config';

const API_URL = 'http://localhost:8080/api/course-controller';

class CourseService {
    getAll() {
        return axios.get(API_URL + '/courses')
    };
    getById(id) {
        return axios.get(API_URL + '/courses/' + id);
    };
    postOne(course) {
        return axios
            .post(API_URL + '/courses', course, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
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
    updateOne(id, data) {
        return axios.put(API_URL + '/courses/' + id, data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    getCoursesOfInstructor() {
        return axios.get(API_URL + '/my-courses', { headers: authHeader() }).then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }

            return response.data.message;
        })
    }

    getOneCourseOfInstructor(id) {
        return axios.get(API_URL + '/my-courses/' + id, { headers: authHeader() }).then(response => {
            if (response.data.message.Code !== GET_ONE_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }

            return response.data.message;
        })
    }

}

export default new CourseService();