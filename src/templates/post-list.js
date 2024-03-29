import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const postList = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = props.pageContext

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      {posts.map(({node}) => (
        <Post key={node.id}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          slug={node.fields.slug}
          date={node.frontmatter.date}
          body={node.excerpt}
          tags={node.frontmatter.tags}
          fluid={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
      <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages}/>
    </Layout>
  )
}

export const postListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!){
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: $limit
            skip: $skip
        ){
            edges{
                node{
                    id
                    frontmatter{
                        title
                        date(formatString: "MMM Do YYYY" )
                        author
                        tags
                        image{
                            childImageSharp{
                                fluid(maxWidth: 500, maxHeight:500){
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields{
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`

export default postList