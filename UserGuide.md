Provide a detailed outline of how to use and user test the endorsement button
To use the endorsement button: 
1) Log in as admin
2) Go to a category (Announcements, Blogs, etc)
3) Select a topic thread (the posts in each of the category)
4) At the top post of the thread, select the settings button to access more tools
5) The endorsement button should be present to click on

If the endorsement button is not rendering:
1) Check that you are in the NodeBB Harmony default theme. You may want to switch between another theme and back. Follow the prompts you see in the notification in order to switch back to Harmony. 
2) Log out and back in as admin. Go to ACP, and at the bottom left corner restart and rebuild. 
3) Also in ACP, go to the cache and clear post cache.
4) try ./nodebb reset -a, then ./nodebb build to reset the nodebb instance

Added automated tests 
Automated tests can be found in the test/topics.js file, in which we build test into the existing testing framework. 
In addition to the tests being a part of exisiting functions, the tests include the mocha testing framework which helps with the automated tests. 
Tests can be run by doing npx mocha test/topics.js

Provide a description of what is being tested

Provide a reasoning for why the tests are sufficient for covering the changes that you have made