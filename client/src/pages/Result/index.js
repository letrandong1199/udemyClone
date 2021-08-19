import { useState } from 'react'
import { Typography, Chip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import useGetParameter from '../../utils/useGetParameter'
import AllCoursesSection from './AllCoursesSection';
import HighlightSection from './HighlightSection';
import { useStyles } from './styles';
import { ROUTES } from '../../config/config';
import { Link } from 'react-router-dom';

function Result() {
    const classes = useStyles();
    const category = useGetParameter('category');
    const keyword = useGetParameter('search');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('Not found');
    const [categories, setCategories] = useState([]);


    return (
        <div>
            <Typography
                variant="h3"
                className={classes.bigTitle}
            >
                {isPending ? <Skeleton /> : category
                    ? title
                    : `Search result for: ${keyword}`
                }
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                {isPending ? <Skeleton />
                    : categories.map((item) =>
                        <Chip
                            style={{ margin: 10 }}
                            label={item.Name}
                            component={Link}
                            clickable
                            to={`${ROUTES.course}?category=${item.Id}`}
                        />)
                }
            </div>
            {
                error ? <Typography>{error}</Typography>
                    : category && <HighlightSection
                        setLoading={setIsPending}
                        setTitle={setTitle}
                        setError={setError}
                        setCategories={setCategories}
                    />
            }
            {
                error ? <Typography setLoading={setIsPending}>{error}</Typography>
                    : <AllCoursesSection />
            }
        </div >
    )
}

export default Result;