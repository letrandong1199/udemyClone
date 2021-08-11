const validateCourse = (values) => {
    const errors = {};
    if ('title' in values) {
        if (!values.title.trim()) {
            errors.title = 'Title must be required';
        } else {
            errors.name = ''
        }
    }
    if ('subDescription' in values) {
        if (!values.subDescription.trim()) {
            errors.subDescription = 'Sub Description must be required';
        }
    }
    if ('categoryId' in values) {
        if (!values.categoryId) {
            errors.categoryId = 'Category must be required';
        }
    }
    if ('languageId' in values) {
        if (!values.languageId) {
            errors.languageId = 'Language must be required';
        }
    }

    return errors;
};

export default validateCourse;