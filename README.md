
# Tic Tac Toe
> Fun Tic Tac Toe game to play against a friend or against an unbeatable bot 🤖. 
>
> Live demo [_here_](https://pieroguerrero.github.io/unbeatable-tic-tac-toe/).

## Table of Contents
* [General Info](#general-information)
* [Technologies and Techniques used](#technologies-and-techniques-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
- This Tic Tac Toe game can be played agains another human or against the Artifial Intelligence build with the [Minimax algorithm](https://www.educative.io/answers/the-minimax-algorithm).
- The game has funny UI and sound effects.

## Technologies and Techniques used
### Planning and Design:
- The cornestone of this game is the implementation of the **Minimax algorithm**, the one was used to give intelligence to the computer, making it unbeatable.
    > The minimax algorithm is used in Artificial Intelligence to determine an optimal move for a player in a two-player game. It assumes that the other player is playing optimally.
    >
    > There are two types of players: The **Maximizer** and the **Minimizer**.
    >
    > **You are the Maximizer, and your opponent is the Minimizer**. 
    >Your goal at the node representing your move (called the max node) is to maximize the value at that node. Your opponent’s goal at the node representing his/her move (called the min node) is to minimize the value at that node. The minimax algorithm does a depth-first search of the game tree.
    ><p align="end">Taken from <a target="_blank" href="https://www.educative.io/answers/the-minimax-algorithm">educative.io</a></p>

    Chek out the example in the video below, where the CIRCLE nodes are the MAX nodes which chooses the maximum valued children node, the SQUARE nodes are the MIN nodes which chooses the minimum valued children:
    
    [![Minimax execution](https://img.youtube.com/vi/zDskcx8FStA/0.jpg)](https://www.youtube.com/watch?v=zDskcx8FStA "VIDEO: A simple animation of the Minimax algorithm")


### Front-end:
- Vanilla Javascript.
- Internal application state managed 100% with [Clousures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
- CSS design with [Tailwind CSS](https://tailwindcss.com/). 
- The web app is 100% responsive.

### Back-end:
- This web app consumes APIs provided by [OpenWeather.com](https://openweathermap.org/).
- The APIs consumption was implemented with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- Since it provides online information, an owned back-end is not planned so far.

### Testing:
- Manual testing was done with 100% coverage.
- While testing, the project was run using the Chrome's Development Tools "Fast 3G" and "No Caching" options. So the app is ready for slow internet connections.

## Features

- View current average weather ✔
- View next 24 hours forecast weather ✔
- View next 7 days forecast weather ✔
- Search weather by location name ✔
- Get current GPS location weather ✔
- Transform temperature units From and TO C° and F° ✔
- Show Humidity(%), Changes of Rain(%), Wind Speed(Km/h) and Feels Like(C°) information ✔
- Location stored on Local Storage for future usages ✔

## Screenshots
Click an image to enlarge.

| Dashboard 1 | Dashboard 1 responsive | Dashboard 2 |
| ------------ | -------------- | ------------- |
| <img src="https://user-images.githubusercontent.com/26049605/189377040-22dac376-4787-4041-9152-b3735654cdcd.png" width="370px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">   | <img src="https://user-images.githubusercontent.com/26049605/189377750-3bc91486-81eb-45e0-a761-9b1faafd70d4.png" width="200px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">     | <img src="https://user-images.githubusercontent.com/26049605/189377466-66ba3ba7-5282-45bd-8711-9be33404981c.png" width="200px" height="auto" alt="Editing Task" title="Click to enlarge">    |

## Setup
Clone this project by doing:
```
$ git clone https://github.com/pieroguerrero/weatherapp.git
```
Then go to the folder you cloned the code and execure:
```
$ npm install
```
**WARNING:** If you are going to use other libraries to achieve other purposes be carefull and remove the caret (^) prefix that the dependency versions have.

## Project Status
Project is: _completed_
V1.0

## Room for Improvement
There are always room for improvement, in this project so far the thinkgs that can be improved are:
- Migrate to a Javascript framework in order to (1) increase the maintainability for future changes and (2) improve the internal state management.
- Implement automated Unit Testing.
