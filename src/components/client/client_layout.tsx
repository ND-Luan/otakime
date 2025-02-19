import React, { Fragment } from "react";

export default function ClientLayout({ children }: TypeClientLayout) {
    return (
        <Fragment>
            <header>Header của Client</header>
            <main>{children}</main>
            <footer>Footer của Client</footer>
        </Fragment>
    );
}


type TypeClientLayout = {
    children: React.ReactNode
}