# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Setup
- Create database (with no tables)
	`bin/rails db:create`

- Migrate schema to populate tables in the database
	`bin/rails db:migrate`

## How to run 
`service postgresql start`
`cd frontend`
`npm run dev`