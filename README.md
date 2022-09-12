
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
- The internal application state is managed 100% with [Clousures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
- CSS design with [Tailwind CSS](https://tailwindcss.com/). 
- The web app is 100% responsive.

### Back-end:
- This web app has no backend for now.

### Testing:
- Manual testing was done with 100% coverage.

## Features

- Play against an AI ✔
- Play against a second human player in the same device ✔
- Visualize score ✔
- Enter a custom name ✔
- Receive feedback sound to anounce the winner or loser ✔
- Play welcome sound ✔
- Sign-up and Log-in 🔜
- Save score in the cloud 🔜
- Play in real time against a second human in a second device 🔜

## Screenshots
Click an image to enlarge.

| Game Selection | Name configuration | Game Board |
| ------------ | -------------- | ------------- |
| <img src="https://user-images.githubusercontent.com/26049605/189664448-829857c7-ef4b-40be-ae35-48fa5720e45e.png" width="200px" height="auto" alt="Welcome panel" title="Click to enlarge">   | <img src="https://user-images.githubusercontent.com/26049605/189664699-32a610c7-32b4-4646-a753-c10abdad626f.png" width="200px" height="auto" alt="Name selection" title="Click to enlarge">     | <img src="https://user-images.githubusercontent.com/26049605/189664832-baf96579-3a91-479c-803e-b575182db926.png" width="200px" height="auto" alt="Game board" title="Click to enlarge">    |

## Setup
1. Clone this project by doing:

    ```
    $ git clone https://github.com/pieroguerrero/unbeatable-tic-tac-toe.git
    ```
2. Via terminal, go to the folder you've just cloned the code and [follow these steps in the official TailwindCSS page](https://tailwindcss.com/docs/installation) to install the CLI.

## Project Status
Project is: _completed_
V1.0

## Room for Improvement
There are always room for improvement, in this project so far the thinkgs that can be improved are:
- Migrate to a Javascript framework in order to (1) increase the maintainability for future changes and (2) improve the internal state management.
- Implement automated Unit Testing.
