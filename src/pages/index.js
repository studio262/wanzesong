import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Img from "gatsby-image"

const Container = styled.div`
  width: 100%;
`

const Gallery = styled.div`
  width: calc(100% - 350px);
  padding-top: 4rem;
  margin-left: 4rem;

  opacity: ${props => props.contactOpen ? "0" : "1"};
  transition: opacity 250ms ease-out;

  .image {
    margin-bottom: 4rem;
  }

  @media (max-width: 600px) {
    width: calc(100% - 4rem);
    margin: 2rem;
  }
`



const ContactLink = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2rem;
  line-height: 1;
  cursor: pointer;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`

const Header = styled.header`
  z-index: 1;
  position: fixed;
  right: 0;
  height: 100vh;
  text-align: right;
  padding-right: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    top: 0;
    left: 0;
    padding: 1rem 2rem;
    justify-content: ${props => props.contactOpen ? "flex-start" : "space-between"};
    flex-direction: ${props => props.contactOpen ? "column" : "row"};
    text-align: left;
  }
`

const Title = styled.h1`
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`
const Subtitle = styled.h3`
  height: 100px;
  line-height: ${props => props.contactOpen ? "1.2" : "auto"};

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`



export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactOpen: false
    }
  }

  toggleContact = () => {
    this.setState({
      contactOpen: !this.state.contactOpen
    })
  }

  render() {
    const info = this.props.data.contentfulInfo;
    const images = this.props.data.contentfulIndexGallery.images;

    return(
      <Container>
        <Header contactOpen={this.state.contactOpen}>
          <Title>Wanze Song</Title>
          {this.state.contactOpen ? (
              <Subtitle contactOpen={this.state.contactOpen}>
                {info.email}
                <br/>
                @{info.instagram}
              </Subtitle>
          ) : (
            <Subtitle>{info.subtitle}</Subtitle>
          )}
        </Header>

        <ContactLink onClick={this.toggleContact}>
          <h3>{ this.state.contactOpen ? "Close" : "Contact" }</h3>
        </ContactLink>

        <Gallery contactOpen={this.state.contactOpen}>
          {images.map( image => (
            <Img sizes={image.sizes} outerWrapperClassName="image"/>
          ))}
        </Gallery>

      </Container>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    contentfulInfo {
      title
      subtitle
      email
      instagram
    }

    contentfulIndexGallery {
      images {
        sizes(maxWidth: 1500) {
          ...GatsbyContentfulSizes
        }
      }
    }

  }
`
