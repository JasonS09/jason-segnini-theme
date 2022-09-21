const settings = {
  "name": "my-third-frontity-project",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Test Frontity Blog",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
      "name":"jason-segnini-theme"
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://jasonsegnini-86848e.ingress-erytho.ewp.live/",
          "homepage": "/home",
          "postsPage": "/blog",
          "customRestPage": "/rest-page",
          "params": {
            "per_page": 5
          }
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/wp-comments"
  ]
};

export default settings;
