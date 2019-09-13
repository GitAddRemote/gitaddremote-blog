/**
 * Navigation component that queries for data
 * with GraphQL
 *
 */

import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"

const Navigation = (props) => {

    console.log({props});

    const Container = styled.div`
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    `;

    const menuLinks = props.menuLinks;
    return (
        <div>
            <Container>
                {menuLinks.map((menuItem) => {
                    const name = menuItem.name;
                    const link = menuItem.link
                    return (
                        <Link style={{ boxShadow: `none` }} to={link}>
                        {name}
                        </Link>
                    );
                })}
            </Container>
        </div>
    );
}

export default Navigation