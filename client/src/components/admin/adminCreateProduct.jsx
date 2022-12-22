import React from "react";
import AdminEditProduct from "./adminEditProduct";
import classes from "../../modules/admin.module.css";

const AdminCreateProduct = () => {
    return (
        <div className={classes.adminAddWrapper}>
            <AdminEditProduct />
        </div>
    );
};

export default AdminCreateProduct;
