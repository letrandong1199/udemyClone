import {
    useState,
    useEffect,
    Fragment,
} from 'react';
import {
    Grid,
    Typography,
    Container,
    List,
    ListItem,
    Divider,
} from '@material-ui/core';

import {
    Pagination,
    Skeleton,
} from '@material-ui/lab';

import Select from 'react-select';
import courseService from '../../services/course.service';
import languageService from '../../services/language.service';
import { ROUTES } from '../../config/config';

import ProductCardH from '../../components/ProductCardH';
import { useLocation, useHistory } from 'react-router-dom';
import useGetParameter from '../../utils/useGetParameter';
import { useStyles } from './styles';


const AllCoursesSection = () => {
    const classes = useStyles();
    const query = useGetParameter();
    const location = useLocation();
    const history = useHistory();

    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const sortOptions = [
        { label: 'Most rating', value: 'desc-rating' },
        { label: 'Less price', value: 'asc-rating' },
        { label: 'Most recent', value: 'most-recent' },
        { label: 'Most enrollment', value: 'most-register' },
    ];
    const [selectedSort, setSelectedSort] = useState([]);

    const limit = 5;

    const replaceParams = (key, value) => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete(key);
        searchParams.set(key, value);
        history.push({ pathname: location.pathname, search: searchParams.toString() });
    }

    const queryLanguage = query.getAll('language');
    const queryPage = query.get('page');
    const querySort = query.get('sort');

    useEffect(() => {

        setIsPending(true);
        languageService.getAll().then(response => {
            const languagesRes = response.listAllResponse;
            const langDic = []
            for (let i = 0; i < languagesRes.length; i += 1)
                langDic.push({ label: languagesRes[i].Name, value: languagesRes[i].Id })
            setLanguages(langDic);
            setSelectedLanguages(queryLanguage.map((item) => parseInt(item)));
            setIsPending(false);
        }).catch(error => {
            console.log(error);
            setError(error.message);
            setIsPending(false);
        })
        if (queryPage) {
            setPage(queryPage);
        }
        if (querySort) {
            setSelectedSort(querySort);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const querySearch = query.toString();
    useEffect(() => {
        setIsPending(true);
        let queryString = querySearch;
        if (queryString && queryString !== '') {
            //queryString = queryString + `&limit=${limit}`;
            if (queryPage) {
                queryString = queryString + `&limit=${limit}`;
            } else {
                queryString = queryString + `&limit=${limit}&page=${1}`;
            }

            courseService.getByQuery(queryString)
                .then(response => {
                    const listCourses = response.listAllResponse;
                    if (listCourses?.length === 0) {
                        throw Error('No courses');
                    }

                    setCount(response.Count)
                    setCourses(listCourses);
                    setError(null);
                    setIsPending(false);
                }).catch(error => {
                    console.log(error);
                    setCourses([]);
                    setCount(0);
                    setError(error.message);
                    setIsPending(false);
                })
        }
    }, [querySearch, queryPage]);



    const handleChangeLanguage = (event) => {
        setSelectedLanguages(Array.isArray(event) ? event.map(x => x.value) : []);
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete('language');
        let search = searchParams.toString();
        event.forEach(item => {
            search += `&language=${item.value}`
        })

        history.push({ pathname: location.pathname, search: search });
    };


    const handleChangePage = (event, value) => {
        setPage(value);
        replaceParams('page', value);
    }

    const handleChangeSort = (event) => {
        setSelectedSort(event.value);
        replaceParams('sort', event.value);
    }

    return (
        <Container className={classes.section}>
            <Typography variant="h4" className={classes.title}>All course</Typography>

            <Grid container className={classes.filterContainer}>
                <Grid item xs={2}>
                    <Select
                        className="basic-single"
                        placeholder="Sort"
                        options={sortOptions}
                        value={sortOptions.filter(obj => selectedSort === obj.value)}
                        onChange={handleChangeSort}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Select
                        isMulti
                        placeholder="Language"
                        value={languages.filter(obj => selectedLanguages.includes(obj.value))}
                        options={languages}
                        onChange={handleChangeLanguage}
                        className={classes.selectStyles}
                    />
                </Grid>


            </Grid>

            {error ? <Typography variant='h5'>{error}</Typography>
                : <List style={{ padding: 20 }}>
                    {isPending
                        ? <Skeleton height='100px' width='auto'><ListItem /></Skeleton>
                        : courses?.map((course, index) =>
                            <Fragment key={index}>
                                <ListItem key={index}>
                                    <ProductCardH
                                        course={course}
                                        loading={isPending}
                                        linkTo={`${ROUTES.courseDetail}/${course.Id}`} />
                                </ListItem>
                                <Divider variant="middle" />
                            </Fragment>)
                    }
                </List>}

            {count > 0 && <Grid container alignItems="center" style={{ justifyContent: 'center', marginLeft: 20 }}>
                {isPending
                    ? <Skeleton width='50%' height='50px' />
                    : <Pagination
                        page={page}
                        count={parseInt((parseInt(count) / limit).toFixed(0))}
                        color="primary"
                        onChange={handleChangePage}
                    />
                }
            </Grid>}

        </Container >
    )
};

export default AllCoursesSection;
