# Quiz-Maker
Single-page application that allows users to craft their own web quiz without requiring prior programming knowledge.  First iteration of the app is complete.  Feel free to download the files and try it for yourself.  Make sure to save all files in the same folder and open index.html into your browser.  For FAQ purposes, please refer to the about.html file.

Please note that **Firefox and Microsoft Edge are the only browsers** I currently know that support local Ajax calls on files, so the app currently only works on those browsers if you're using the app locally.

## Commit on 8/23/2018
Renovated the UI of Quiz Maker to make it more user-friendly and sleeker overall.  I merged both styling pages into a single page, removed the RGB sliders in favor of a color input, and combined the hex and rgb inputs into a single function.  Condensed the about page for better readability.  Eliminated a lot of superfluous code that lingered between the transition from AngularJS to Angular.  Fairly pleased with the project in its current state, but incremental improvements will be made in the future.  **Need to design a proper landing page**.  No plans for a backend with this project currently, but may add one in the future.

## Commit on 8/7/2018
Improved the UI features on the MakeCSS/MakeCss2 html pages.  Instead of utilizing a interval function to influence the RGB values, I went with sliders and added the option to manually enter RGB or hex values for styling purposes.  Added Angular form validation to both the Questionairre and Review Questions html templates.  Provided the user the ability to take their quiz prior to finishing to ensure it functions properly once the template is saved.  Future changes will focus on cleaning up the overall appearance of the app since I first wrote this when I first started learning Angular.

## Commit on 6/13/2018
Fixed an issue where text would flash on router change on makeCSS router template.
