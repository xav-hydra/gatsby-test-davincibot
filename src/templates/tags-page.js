import React from 'react'
import { Badge, Button } from 'reactstrap'
import { slugify } from '../util/utilityFuncions'

import Layout from "../components/layout"
import SEO from "../components/seo"

const tagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext

  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keyword={["tags", "topics"]}/>
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{marginBottom: '10px'}}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default tagsPage