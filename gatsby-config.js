module.exports = {
  siteMetadata: {
    title: 'Wanze Song',
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ofzvxadet67q`,
        accessToken: `c917095c8ecd31000ca644371d61bdc4e3d0b01f8456b5868214f9fdb59ac0e0`,
      },
    },
    `gatsby-plugin-netlify`
  ],
};
