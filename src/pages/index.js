import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Img from "gatsby-image"


// styled components
const Container = styled.div`
  width: 100%;
`

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 350px);
  margin-left: 4rem;
  height: 100vh;

  opacity: ${props => props.contactOpen ? "0" : "1"};
  transition: opacity 200ms ease-out;

  .image {
    width: 100%;
    height: auto;
  }

  .inner-image {

  }

  @media (max-width: 600px) {
    width: calc(100% - 4rem);
    margin: 2rem;
  }
`

const ContactLink = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0 3rem 2rem 0;
  line-height: 1;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    font-size: 2.4rem;
    padding-bottom: 2rem;
  }
`

const Header = styled.header`
  z-index: 2;
  position: fixed;
  right: 0;
  height: 100vh;
  text-align: right;
  padding-right: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
  margin: 0;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`

const Subtitle = styled.h3`
  height: 100px;
  line-height: ${props => props.contactOpen ? "1.4" : "auto"};

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`
const ButtonContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const Button = styled.button`
  outline: none;
  background: transparent;
  width: 50%;
  height: 100vh;
  border: none;
  cursor: ${props => {
    switch (props.direction) {
      case 'RIGHT':
        return 'e-resize';
      case 'LEFT':
        return 'w-resize';
    }
  }};
`


export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactOpen: false,
      currentImage: 0
    };

    this.imageNum = this.props.data.contentfulIndexGallery.images.length;
  }

  toggleContact = () => {
    this.setState(prevState => ({
      contactOpen: !prevState.contactOpen
    }))
  };

  incrementImage = () => {

    if (this.state.currentImage + 1 >= this.imageNum) {
      this.setState({
        currentImage: 0
      })
    } else {
      this.setState(prevState => ({
        currentImage: prevState.currentImage + 1
      }))
    }
    console.log(this.state.currentImage);
  };

  decrementImage = () => {

    if (this.state.currentImage - 1 < 0) {
      this.setState({
        currentImage: this.imageNum
      })
    } else {
      this.setState(prevState => ({
        currentImage: prevState.currentImage - 1
      }))
    }
    console.log(this.state.currentImage);
  };

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

        <ButtonContainer>
          <Button
            onClick={this.decrementImage}
            direction={'LEFT'}
          />
          <Button
            onClick={this.incrementImage}
            direction={'RIGHT'}
          />
        </ButtonContainer>

        <ContactLink onClick={this.toggleContact}>
          <h3>{ this.state.contactOpen ? "Close" : "Contact" }</h3>
        </ContactLink>

        <Gallery contactOpen={this.state.contactOpen}>
            <Img
              sizes={images[this.state.currentImage].sizes}
              outerWrapperClassName="image"
              className="inner-image"
            />
        </Gallery>

      </Container>
    )
  }
}

// data query
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
