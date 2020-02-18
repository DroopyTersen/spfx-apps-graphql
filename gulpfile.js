
"use strict";

// check if gulp dist was called
if (process.argv.indexOf("dist") !== -1) {
  // add ship options to command call
  process.argv.push("--ship");
}
const isFastMode = !process.argv.find((arg) => arg === "--ship");
const path = require("path");
const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
const gulpSequence = require("gulp-sequence");
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (isFastMode) {
      includeRuleForSourceMapLoader(generatedConfiguration.module.rules);
      disableMinimizeForCss(generatedConfiguration.module.rules);
    }
    generatedConfiguration.resolve.alias = {
      "styled-components": path.resolve("node_modules/styled-components"),
      react: path.resolve("node_modules/react"),
    };
    return generatedConfiguration;
  },
});
build.addSuppression(
  "Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe."
);

// Create clean distrubution package
gulp.task("dist", gulpSequence("clean", "bundle", "package-solution"));
// Create clean development package
gulp.task("dev", gulpSequence("clean", "bundle", "package-solution"));

/**
 * Custom Framework Specific gulp tasks
 */

// Try to decrease build times
const optimizePerformance = function() {
  // Why even bother? The build will break if its busted, and VSCode will highlight your errors.
  build.tslintCmd.enabled = false;
  // Assumes you are using styled components not SASS
  build.sass.enabled = false;
  // Assumes you are running tsc -w separately since
  //it is more performant
  // build.tscCmd.enabled = false;
};

if (isFastMode) {
  console.log("FAST MODE!!", process.argv);
  optimizePerformance();
}

function includeRuleForSourceMapLoader(rules) {
  for (const rule of rules) {
    if (rule.use && typeof rule.use === "string" && rule.use.indexOf("source-map-loader") !== -1) {
      rule.include = [path.resolve(__dirname, "lib")];
    }
  }
}

function disableMinimizeForCss(rules) {
  for (const rule of rules) {
    if (
      rule.use &&
      rule.use instanceof Array &&
      rule.use.length == 2 &&
      rule.use[1].loader &&
      rule.use[1].loader.indexOf("css-loader") !== -1
    ) {
      rule.use[1].options.minimize = false;
    }
  }
}

build.initialize(gulp);
