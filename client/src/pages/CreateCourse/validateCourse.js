const validateCourse = (values) => {
    const errors = {};
    if ('title' in values) {
        if (!values.title.trim()) {
            errors.title = 'Title must be required';
        } else {
            errors.title = ''
        }
    }
    if ('subDescription' in values) {
        if (!values.subDescription.trim()) {
            errors.subDescription = 'Sub Description must be required';
        } else {
            errors.subDescription = ''
        }
    }
    if ('categoryId' in values) {
        if (!values.categoryId) {
            errors.categoryId = 'Category must be required';
        } else {
            errors.categoryId = ''
        }
    }
    if ('languageId' in values) {
        if (!values.languageId) {
            errors.languageId = 'Language must be required';
        } else {
            errors.languageId = ''
        }
    }

    return errors;
};

export default validateCourse;