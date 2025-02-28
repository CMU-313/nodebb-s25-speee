# Implemented Endorsements Feature 

## Installation  
We implemented endorsements using nodebbs plugin feature. To install our plugin, follow the following steps 
([source](https://docs.nodebb.org/development/plugins/#installing-the-plugin))
1) run <npm install> 
2) In the nodebb-plugin-endorsements directory, run <npm link>
3) Change directories into the overall nodebb repo, run <npm link nodebb-plugin-endorsements>
4) run <./nodebb activate endorsements>
5) run <./nodebb build>

Note, MacOS tends to throw permission errors with symlink from npm. If this happens, run
<sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules>
[source](https://stackoverflow.com/questions/75930769/i-am-trying-to-run-npm-link-in-my-terminal-and-i-keep-getting-an-error).

## Demo