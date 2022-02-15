/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Spark AR Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

var gamePlay;
var gameOver;


Promise.all([
    Scene.root.findFirst('number',{recursive:true})
   ]).then(function(results){
    const textHolder = results[0];
    Patches.outputs.getScalar('score').then(scoreValue =>{
        textHolder.text = scoreValue.toString()
    });
   });

   Patches.outputs.getPulse('gameOver').then(event => {
    gameOver = event.subscribe(function () {
        Patches.inputs.setBoolean('start', false);
        Patches.inputs.setBoolean('reset', true);
     });
    });

Patches.outputs.getPulse('gamePlay').then(event => {
    gamePlay = event.subscribe(function () {
        Patches.inputs.setBoolean('start', true);
    Patches.inputs.setBoolean('reset', false);
     });
    });

Patches.inputs.setBoolean('start', true);
Patches.inputs.setBoolean('reset', false);

(async function () {  // Enables async/await in JS [part 1]

  // To access scene objects
  // const [directionalLight] = await Promise.all([
  //   Scene.root.findFirst('directionalLight0')
  // ]);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // Diagnostics.log('Console message logged from the script.');

})(); // Enables async/await in JS [part 2]
