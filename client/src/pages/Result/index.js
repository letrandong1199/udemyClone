import { useState } from 'react'
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import useGetParameter from '../../utils/useGetParameter'
import AllCoursesSection from './AllCoursesSection';
import HighlightSection from './HighlightSection';
import { useStyles } from './styles';

function Result() {
    const classes = useStyles();
    const category = useGetParameter('category');
    const keyword = useGetParameter('search');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('Not found');


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

            {error ? <Typography>{error}</Typography>
                : category && <HighlightSection
                    setLoading={setIsPending}
                    setTitle={setTitle}
                    setError={setError}
                />
            }
            {error ? <Typography setLoading={setIsPending}>{error}</Typography>
                : <AllCoursesSection />
            }
        </div>
    )
}

export default Result;