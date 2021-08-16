import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlist(state, action) {
            return state.concat(action.payload);
        },
        addWishlist(state, action) {
            const course = action.payload;
            const courseRe = {
                Id: course.Id,
                Title: course.Title,
                Sub_Description: course.Sub_Description,
                Thumbnail_Small: course.Thumbnail_Small,
                Thumbnail_Medium: course.Thumbnail_Medium,
                Thumbnail_Large: course.Thumbnail_Large,
                Price: course.Price,
                Promote_Rate: course.Promote,
                Rating: course.Rating,
                Category: course.Categories_Tree[course.Categories_Tree.length - 1],
                Author: course.Author,
                Language_Id: course.Language_Name,
            }
            return state.concat(courseRe);
        },
        removeWishlist(state, action) {
            const id = action.payload;
            console.log('remove ', id);
            return state.filter((course) => course.Id !== id);
        },
    }
})

// Action creators are generated for each case reducer function
export const { setWishlist, addWishlist, removeWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;