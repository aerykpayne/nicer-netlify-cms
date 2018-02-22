import React from "react"
import Link from "gatsby-link"
import Script from "react-load-script"
import graphql from "graphql"
import nicer from "../img/nicer.png"
import rocket from "../img/rocket.png"
import { css } from "emotion"

const className = css`
  background-color: #10112f;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  h3 {
    margin-top: 40px;
    font-weight: bold;
    font-size: 22px;
    color: white;
  }
`
const anotherClassName = css`
  width: 800px;
`
const rocketClass = css`
  position: absolute;
  width: 2250px;
  left: -40%;
  bottom: -40%;
`

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/"
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className={className}>
        <img className={anotherClassName} src={nicer} />
        <h3>We build and launch brands, websites, and apps.</h3>
        <div className={rocketClass}>
          <img src={rocket} />
        </div>
      </div>

      // <section className="section">
      //   <Script
      //     url="https://identity.netlify.com/v1/netlify-identity-widget.js"
      //     onLoad={() => this.handleScriptLoad()}
      //   />
      //   <div className="container">
      //     <div className="content">
      //       <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
      //     </div>
      //     {posts
      //       .filter(post => post.node.frontmatter.templateKey === "blog-post")
      //       .map(({ node: post }) => (
      //         <div
      //           className="content"
      //           style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
      //           key={post.id}
      //         >
      //           <p>
      //             <Link className="has-text-primary" to={post.frontmatter.path}>
      //               {post.frontmatter.title}
      //             </Link>
      //             <span> &bull; </span>
      //             <small>{post.frontmatter.date}</small>
      //           </p>
      //           <p>
      //             {post.excerpt}
      //             <br />
      //             <br />
      //             <Link className="button is-small" to={post.frontmatter.path}>
      //               Keep Reading →
      //             </Link>
      //           </p>
      //         </div>
      //       ))}
      //   </div>
      // </section>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
