# Todo Application

## React JS 
Implemented using create-react-app command for project set-up

## Features

* Login using JWT tokens 
* Add notes as text, image or location 
* Notes stored in session storage locally for retaining the data
* Notes can be deleted
* Search for notes

## Axios
API calls are made using axios

## SASS

Used SASS for styling purpose.
* mixins for creating breakpoints for responsive behvaiour
```
@mixin breakpoint($value) {
    @media (min-width: $value) {
        @content;
    }
}
```
* variables for constants
```
$mobile: 320px;
$tablet: 701px;
$blueRibbon: #3846FF;
$activeGreen: #40a738;
```
