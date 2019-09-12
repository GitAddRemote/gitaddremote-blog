const ghpages = require('gh-pages');
var fs = require('fs');

fs.writeFile('public/CNAME', "gitaddremote.com", function(err) {});

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'git@github.com:GitAddRemote/gitaddremote.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)