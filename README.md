# Lean React 

This project is a basic React viewer for [Lean presentations](https://github.com/projectlean/lean-engine). 

Prerequisites (except for Docker compose): 
* build the Lean engine 
* have the Lean Rest api up and running. 

## Run locally

* run `yarn start`

## Build and run docker image 

* build: `docker build . -t lean-react`
* run: `docker run -p 3000:3000 lean-react`

## Run in docker compose

## View Lean Presentations

* visit http://localhost:3000 in your browser 
