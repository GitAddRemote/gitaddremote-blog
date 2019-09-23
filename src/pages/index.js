import React from "react"
import { Link, graphql } from "gatsby"


import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"

import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {

    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const navigationItems = data.site.siteMetadata.menuLinks
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Navigation menuLinks={navigationItems} />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const published = node.frontmatter.published;

          if(published === true){

            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      Read More...
                    </Link>
                  
                </section>
              </article>
            )
  
          }
          else{
            return undefined;
          }
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }        
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            published
          }
        }
      }
    }
  }
`
