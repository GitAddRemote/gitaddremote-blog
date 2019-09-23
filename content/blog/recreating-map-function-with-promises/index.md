---
published: true
title: Recreating Map Function With Promises
date: "2019-09-14T07:27:03.284Z"
description: ""
categories:
  - javascript
---
A common practice when hiring a new developer is to have them complete a practical coding test. This can be completed via a take home project. Often however, the developer is asked to complete a practical code test during the interview. While I understand why this happens, I don't believe setting up an adversarial situation during the interview process is ideal when hiring a new candidate. That said, it is a fact of life we as developers have to work through. As such it is a great idea to complete regular programmatic challenges as part of our interview preparation. Today, I decided to remake the Array.map function using promises for just a such a challenge.

<!-- end -->

## What Is The Map Function
The [map method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) was added to the Array global object with the release of ES6, along with the similar [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) methods. Per the documentation the intended purpose is: 

>"The map() method creates a new array with the results of calling a provided function on every element in the calling array."

This method is largely syntatic sugar, but wow does it make our code so much more readable, and easier to work with. Both of these things, along with standardizing a boilerplate code pattern make the map function another great addition to the JavaScript language as it continues to mature.

## Why Recreate The Array Map Function
As I said, running through coding challenges is a great way to sharpen your mental toolbox. The Map function has been around since ES6 which means while it may not be brand new, it certainly isn't that old either. A friend recently was asked to complete a similar challenge during an interview. I figure if the challenge is good enough for a real interview process, it is good enough to start off with our first coding challenge for the blog.

## Let's Setup The New Function
Let's setup the new function, even though there is not much to it. We start off by adding a new function to the Array prototype using the Object.define function. This function accepts one argument which is the callback we will call on every iteration through the array. Once we have the function shell created we can go ahead and setup our return variable. We also setup the promise we will return once our map function is completed with it's task.

```js
/**
 * Making an async array map function
 */
Object.defineProperty(Array.prototype, "maptronic", {
  enumerable: false,
  configurable: false,
  value: function(mapFunc) {
    let returnVal = [];
    return new Promise((resolve, reject) => {
      try {
        console.log('### In The New Function ###');
        resolve(returnVal);
      } catch (err) {
        reject(err);
      }
    });
  }
});
```

Now that we have the basic structure in place let's talk about what it currently does. When we call the "maptronic" function on an array, it currently spits out the text '### In The New Function ###' to the console and then resolves the promise with the empty array as the returned data. We have access to the data in the original array itself at this point so let's use that data to complete the function. (And, yes I realize I am adding a function property to a core object, but that is a totally different discussion.)

## Let's Iterate
Since we are currently in the array object itself, we have full access to the data of that array. Which means we can iterate over it and perform whatever action is needed. To access the data in the original array, we can call "this" to reference the array itself and then iterate using the forEach function. 

```js
  /**
   * Async map function
   */
  Object.defineProperty(Array.prototype, "maptronic", {
    enumerable: false,
    configurable: false,
    value: function(mapFunc) {
      let returnVal = [];
      return new Promise((resolve, reject) => {
        try {
          this.forEach(element => {
            const found = mapFunc(element);
            returnVal.push(found);
          });
          resolve(returnVal);
        } catch (err) {
          reject(err);
        }
      });
    }
  });
```
For each iteration through the array we take the current element and pass it into the callback function that was passed into the maptronic function. Once the callback function responds, we add the resulting value to the returnVal array. And finally, once the forEach loop is finished, we return the new promise passing the resulting new array as it's data.

# Code In Action
Let's finish off by seeing our code in action using sample code. We will start off in the same file, creating an array of project numbers as our use case. Once we have this array in place, we will use it with our new maptronic function and ultimately display the updated values. These updated values will be created using the adjustProjectedNumbers function that we pass into the maptronic function.

```js

  // Original Array List
  const baseProjectNumbers = [10, 30, 1, 3.2];

  // Use the new Array.maptronic function passing our custom function
  const newArray = baseProjectNumbers.maptronic((e, i, a) => {
    console.log(`INDEX: ${i}`);
    console.log(`ORIGINAL ARR: ${a}`);
    let val = e * 1.6;
    return Number.isInteger(val) ? val : val.toFixed(2);
  });

  // Display updated values from new array
  console.log({ newArray });
```

And there you have it. If all worked as expected you should have a "{ newArray: Promise { [ 16, 48, '1.60', '5.12' ] } }" displayed in the console. When you called the "baseProjectNumbers.maptronic" function, we iterate over each value in the original array, apply the function "baseProjectNumbers" to each value in the original array, and then store that modified value in a new array. Once we finish iterating over the original array we return the new array with the updated values.

#The End Result
As I said, the end result is really quite simple. There is no real reason to use this code. Not when we have a real, compiled map function with the release of ES6. This was simply an exercise that intrigued me when a friend mentioned it. And I think, this is a great way to hone your development skills. Small, projects like this make your mind think critically especially when you are adding to your polyglot catalog like me.
