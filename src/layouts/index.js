import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import 'normalize.css'

// styled components
const Container = styled.div`
  margin: 0rem;
`


const TemplateWrapper = ({ children }) => (
  <Container>
    <Helmet
      title="Wanze Song"
      meta={[
        { name: 'description', content: 'Wanze Song' },
        { name: 'keywords', content: 'fashion' },
      ]}
    />

    <div>
      {children()}
    </div>

  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

/* Global Site Styles
 * used for importing fonts and setting up sizes
 * also for default values
 * avoid using for anything else
 */
injectGlobal`
  *, *:before, *:after {
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
      margin: 0;

      font-size: 1.6em;
      line-height: 1.6;
      font-weight: 400;
      font-family: 'Times', serif;
      color: #222;
      webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0rem;
    font-weight: 400;
  }

`
