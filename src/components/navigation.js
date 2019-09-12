/**
 * Navigation component that queries for data
 * with GraphQL
 *
 */

import React from "react"
import { Link } from "gatsby"

const Navigation = (props) => {

    console.log({props});

    const menuLinks = props.menuLinks;
    return (
        <div>
            {menuLinks.map((menuItem) => {
                const name = menuItem.name;
                const link = menuItem.link
                return (
                    <Link style={{ boxShadow: `none` }} to={link}>
                      {name}
                    </Link>
                );
            })}
        </div>
    );
}

export default Navigation