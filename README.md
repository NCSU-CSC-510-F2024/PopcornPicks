# <i> PopcornPicks🍿: Your Destination for Movie Recommendations </i>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/graphs/commit-activity)
[![Contributors Activity](https://img.shields.io/github/commit-activity/m/NCSU-CSC-510-F2024/PopcornPicks)](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/pulse)
[![GitHub issues](https://img.shields.io/github/issues/NCSU-CSC-510-F2024/PopcornPicks.svg)](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/issues?q=is%3Aopen+is%3Aissue)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/NCSU-CSC-510-F2024/PopcornPicks.svg)](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/issues?q=is%3Aissue+is%3Aclosed)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/NCSU-CSC-510-F2024/PopcornPicks)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)

<!-- [![DOI](https://zenodo.org/badge/871659563.svg)](https://doi.org/10.5281/zenodo.14027582) -->

[![Unittest](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/actions/workflows/unittest.yml/badge.svg?branch=master&event=push)](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/actions/workflows/unittest.yml)
[![codecov](https://codecov.io/gh/NCSU-CSC-510-F2024/PopcornPicks/graph/badge.svg?token=HVLUNDP321)](https://codecov.io/gh/NCSU-CSC-510-F2024/PopcornPicks)
[![GitHub release](https://img.shields.io/github/release/NCSU-CSC-510-F2024/PopcornPicks.svg)](https://GitHub.com/NCSU-CSC-510-F2024/PopcornPicksreleases/)
[![StyleCheck: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/pylint-dev/pylint)
![GitHub contributors](https://img.shields.io/github/contributors/NCSU-CSC-510-F2024/PopcornPicks)
![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/NCSU-CSC-510-F2024/PopcornPicks)
![GitHub repo size](https://img.shields.io/github/repo-size/NCSU-CSC-510-F2024/PopcornPicks)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.14199398.svg)](https://doi.org/10.5281/zenodo.14199398)

<!-- [![HitCount](https://hits.dwyl.com/CSCI510testerhw1/PopcornPicks.svg)](https://hits.dwyl.com/CSCI510testerhw1/PopcornPicks)  -->

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/header_display.png" alt="drawing" style="width:1000px;"/>
<b>PopcornPicks is more than just a movie recommender system; it's a gateway to a world of cinematic adventures. With an ever-expanding library of films and a powerful recommendation algorithm, PopcornPicks is here to transform the way you discover, enjoy, and connect with movies. Now totally personalized with new user profiles!</b>

# Contents

-   [Why use PopcornPicks?](#why-use-popcornpicks)
-   [Project Documentation](#documentation)
-   [Project Presentation Video](#Features)
-   [Brief Overview of Project](#project-description)
-   [Core Applications of the Project](#how-to-use)<br/>
    -   [Start](#start-screen)<br/>
    -   [Sign Up](#sign-up)<br/>
    -   [Sign In](#sign-in)<br/>
    -   [Pick a Movie](#pick-a-movie)<br/>
    -   [Getting Recommendations](#movie-recommendation-mechanism)<br/>
    -   [Watchlist](#watchlist)<br/>
-   [TechStack Used for the Development of Project](#tech-stack-used)
-   [Steps for Execution](#getting-started)
-   [Future Scope](#future-scope)
-   [Contribute](#contribute-to-the-project)
-   [Team Members](#contributors)
-   [Contact](#contact)
-   [License](#license)

## Why use PopcornPicks?

Watch our video: https://youtu.be/rbT5nZ8c32o

PopcornPicks: Your movie recommender! Input movies, get tailored suggestions, and save them to your profile. Elevate your movie choices effortlessly!

-   **Efficient:** Lightning-fast recommendations for movie buffs! 🚀
-   **Adaptable:** Tailor the recommendations to your taste.
-   **Accessible:** Works across all platforms and shells.
-   **Insightful:** Get movie insights at a glance.
-   **Comprehensive:** Supports a wide array of user-preferred movies.
-   **Simple:** Easy installation and setup – start discovering great movies in no time!"
-   **Personal:** Save and curate your watchlist on your very own Popcorn Picks account!

## Documentation

Checkout for project documentation at our [wiki page](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/wiki)

## Features

For a detailed breakdown of our current features, see our video: - https://youtu.be/vaSMBwAT0yw

## Project Description

PopcornPicks is a user-friendly movie recommender that curates a tailored list of 10 movie predictions based on user-provided movie preferences. Users can input their favorite movies, and our algorithm refines recommendations based on feedback—Liked, Disliked, or Yet To Watch. Additionally, PopcornPicks offers the convenience of saving recommendations to your account watchlist, enhancing the movie-watching experience. For the system architecture and other details, please refer to our [wiki page](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/wiki)

## How to Use:

### Start Screen

**This is the first screen you see when the service launches. From here you can either sign into your existing PopcornPicks account or create a new one.**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Start_Screen.png" width="600" height="375">

### Sign Up Screen

**The user creates a custom username and password to create their PopcornPicks account.**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Sign_up.png" width="600" height="375">

### Sign In Screen

**The user enters their custom username and password to access their PopcornPicks account.**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Sign_in.png" width="600" height="375">

### Pick a Movie

**Upon a successful log-in, the user is taken to this screen. Here they can choose up to 5 of their favorite movies to generate recommendations based off.**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Select_Movies.png" width="600" height="375">

### Movie Recommendation Mechanism

**The user selects up to 5 movies to get a tailored recommendation list they can choose to add to their Watchlist.**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Generate_Watchlist.png" width="600" height="375">
<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Generate_Watchlist2.png" width="600" height="375">

### Watchlist

**If you click the "Watchlist" tab in the header, you are taken to this page and shown what movies you've saved to your watchlist**

<img src="https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/asset/Watchlist.png" width="600" height="375">

## Tech stack Used👨‍💻:

<code><a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-ar21.svg"></a></code>
<code><a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/w3_css/w3_css-ar21.svg"></a></code> <code><a href="https://www.javascript.com/" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg"></a></code>
<code><a href="https://www.jquery.com//" target="_blank"><img height="35" src="https://www.vectorlogo.zone/logos/jquery/jquery-horizontal.svg"></a></code>
<code><a href="https://getbootstrap.com/" target="_blank"><img height="35" src="https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-ar21.svg"></a></code>
<code><a href="https://flask.palletsprojects.com/en/1.1.x/" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/palletsprojects_flask/palletsprojects_flask-ar21.svg"></a></code>
<code><a href="https://www.docker.com/" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg"></a></code>
<code><a href="https://react.dev/" target="_blank"><img height="50" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"></a></code>

<p>
<img src="https://i.giphy.com/media/LMt9638dO8dftAjtco/200.webp" width="150"> 
<img src="https://i.giphy.com/media/KzJkzjggfGN5Py6nkT/200.webp" width="150">
<img src="https://i.giphy.com/media/IdyAQJVN2kVPNUrojM/200.webp" width="150"> 
<img src="https://media.giphy.com/media/UWt0rhp21JgLwoeFQP/giphy.gif" width ="150"/> 
<img src="https://media.giphy.com/media/kH6CqYiquZawmU1HI6/giphy.gif" width ="150"/> 
</p>

## Getting Started

Step 1:
Git Clone the Repository

    git clone https://github.com/NCSU-CSC-510-F2024/PopcornPicks.git

(OR) Download the .zip file on your local machine from the following link

    https://github.com/NCSU-CSC-510-F2024/PopcornPicks

Step 2:
Follow the setup instructions in the wiki documentation

    https://github.com/NCSU-CSC-510-F2024/PopcornPicks/wiki/Installation

Or visit [INSTALL.md](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/INSTALL.md)

<b>Finally, start enjoying personalized movie recommendations!</b>

## Future Scope

PopcornPicks is a dynamic project with endless possibilities for expansion and enhancement. Here are some exciting avenues for future development:

1. **Speed up recommendations**: Currently, the recommendation algorithm is extremely slow, especially the more movies you add to it. Look into alternative algorithms for recommendations.
   Sorting/searching reviews on the wall
2. **Add functionality to be able to sort the reviews of movies on the wall**: For example, be able to sort the reviews by the rating.
3. **Incorporate user review and rating into the recommendations**: Using reviews submitted by users of the system in the recommendations can enhance the results to tailor to movies enjoyed by others.
4. **Increase the size of the movie database**: The database has been consistent in size during this project, however to ensure the most accurate possible recommendations, increasing the number of movies would result in more rich recommendations.
5. **Add TV shows to the database**: Expanding the scope of the project to include tv shows could improve the user experience.

The future of PopcornPicks is full of potential, and we invite developers, movie lovers, and anyone passionate about cinema to join us in making this platform the ultimate movie companion.

## Contribute to the Project!

Please refer to the [CONTRIBUTING.md](https://github.com/NCSU-CSC-510-F2024/PopcornPicks/blob/master/CONTRIBUTING.md) if you want to contribute to the PopcornPicks source code. Follow all the guidelines mentioned in the same and raise a pull request, we would love to look at it ❤️❤️!

## Contributors

[Jonas Trepanier](https://www.linkedin.com/in/jonas-trepanier-b96a2a241/)<br/>
[Siddhi Mule](https://www.linkedin.com/in/siddhi-mule27/)<br/>
[Anirduh Kaluri](https://www.linkedin.com/in/anirudhkaluri/)<br/>

## Original Contributors:

[Aditya Pai Brahmavar](https://www.linkedin.com/in/adityapai16/)<br/>
[Ananya Mantravadi](https://www.linkedin.com/in/ananya-mantravadi/)<br/>
[Rishi Singhal](https://www.linkedin.com/in/rishi-singhal1101/)<br/>
[Samarth Shetty](https://www.linkedin.com/in/samarthshetty09/)<br/>

## Contact

In case of any issues, please e-mail your queries to popcornpicker35@gmail.com or raise an issue on this repository.

## Join the PopcornPicks Community:

Contribute to the project and help us improve recommendations.
Share your experience and film discoveries with us.
Together, let's make PopcornPicks the ultimate movie companion!
PopcornPicks is more than just code; it's a passion for cinema, and we invite you to be a part of this exciting journey. Start exploring, sharing, and discovering movies like never before with PopcornPicks!
Let's make movie nights extraordinary together!

## License

This project is under the MIT License.
