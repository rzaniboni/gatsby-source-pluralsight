# gatsby-source-pluralsight

[![Travis](https://img.shields.io/travis/com/ovhemert/gatsby-source-pluralsight.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/gatsby-source-pluralsight)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/gatsby-source-pluralsight.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/gatsby-source-pluralsight)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5d55562b469f4d1086ac348a9986d203)](https://www.codacy.com/app/ovhemert/gatsby-source-pluralsight?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/gatsby-source-pluralsight&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/gatsby-source-pluralsight/badge.svg)](https://snyk.io/test/npm/gatsby-source-pluralsight)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/gatsby-source-pluralsight.svg)](https://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

A Gatsby source plugin for pulling data from your Pluralsight profile page.

## Installation

With npm:

```bash
npm install --save gatsby-source-pluralsight
```

Or with Yarn:

```bash
yarn add gatsby-source-pluralsight
```

## Usage

In your `gatsby-config.js` file add:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-pluralsight',
      options: {
        username: 'your pluralsight username'
      }
    }
  ]
}
```

Then run `gatsby build && gatsby serve` or `gatsby develop` to create the source nodes.

If your project successfully created the nodes. You should be able to query them in the GraphiQL endpoint (`http://localhost:8000/___graphql`) of you site.

### Completed Courses

```
{
  allPluralsightCourse {
    edges {
      node {
        courseId,
        courseName,
        title,
        duration,
        level,
        timeCompleted,
        authors {
          firstName
          lastName
          handle
          displayName
        }
      }
    }
  }
}
```

### Skills

```
{
  allPluralsightSkill {
    edges {
      node {
        code
        type
        title
        score
        level
        percentile
        dateCompleted
        url
        thumbnailUrl
      }
    }
  }
}
```

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## License

Licensed under [MIT](./LICENSE).
