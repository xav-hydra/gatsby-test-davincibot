import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import Post from '../components/Post'
import authors from "../util/authors"

const AuthorPosts = ({ data, pageContext }) => {
  const { totalCount } = data.allMarkdownRemark
  const author = authors.find(x => x.name === pageContext.authorName)
  const pageHeader = `${totalCount} Posts by: ${pageContext.authorName}`

  return (
    <Layout pageTitle={pageHeader} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      {data.allMarkdownRemark.edges.map(({node})=> (
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
    </Layout>
  )
}

export const authorQuery = graphql`
    query authorQuery($authorName: String!, $imageUrl: String!){
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: { frontmatter: { author: { eq: $authorName}}}
        ){
            totalCount
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
        file(relativePath: { eq: $imageUrl }){
            childImageSharp{
                fluid(maxWidth: 300, maxHeight:500){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default AuthorPosts