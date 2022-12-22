import React, { useContext, useState, useEffect } from "react";
import categoryService from "../services/category.service";
import subcategoryService from "../services/subcategory.service";
import PropTypes from "prop-types";

const CategoryContext = React.createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
};

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getCategoriesList();
    }, []);
    async function getCategoriesList() {
        try {
            const { content: categoriesContent } = await categoryService.get();
            const { content: subcategoriesContent } =
                await subcategoryService.get();
            setCategories(categoriesContent);
            setSubcategories(subcategoriesContent);
            setTimeout(() => {
                setLoading(false);
            }, 100);
        } catch (error) {
            console.log(error);
        }
    }
    const getCategoryById = (id) => {
        return categories.find((cat) => cat._id === id);
    };
    const getSubCategoryById = (id) => {
        return subcategories.find((sub) => sub._id === id);
    };
    const getSubcategoriesByCategory = (categoryId) => {
        return subcategories.filter((sub) => sub.category === categoryId);
    };
    return (
        <CategoryContext.Provider
            value={{
                categories,
                subcategories,
                isLoading,
                getCategoryById,
                getSubCategoryById,
                getSubcategoriesByCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

CategoryProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CategoryProvider;
