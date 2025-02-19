import React, { Fragment } from "react";

export default function AdminLayout({ children }: TypeAdminLayout) {
    return (
        <Fragment>
            <header>Header của Admin</header>
            <main>{children}</main>
            <footer>Footer của Admin</footer>
        </Fragment>
    );
}


type TypeAdminLayout = {
    children: React.ReactNode
}