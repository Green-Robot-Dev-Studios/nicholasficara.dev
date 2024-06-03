module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats([
    "md",
    "png",
    "jpg",
    "jpeg",
    "njk",
    "svg",
  ]);

  return {
    pathPrefix: "/blog/",
    dir: {
      output: "../blog",
      input: "./src",
    },
  };
};
