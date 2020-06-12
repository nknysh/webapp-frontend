# How to run Cypress tests
It is recommended to run the below commands from repo root.
Otherwise you may need to update paths in command arguments.

## To open Cypress runner (typically used for local development):
npx cypress open

## To run tests from CLI and get output to console (minimal command):
npx cypress run --browser chrome

Note that password should be set in environment variable (see below) prior to test run.

## To run tests from CLI and get output to console (parametrized):
npx cypress run --browser chrome --env environment='[environment]' --env password='[password]'

## To set environment variable prior to running tests:

### Powershell:

$Env:CYPRESS_environment='[environment]'
$Env:CYPRESS_password='[password]'

### Bash (not tested):

$ export CYPRESS_environment='[environment]'
$ export CYPRESS_password='[password]'
