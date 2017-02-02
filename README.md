New Jekyll Site
===============

This is a blank project template for a new Jekyll site. Make sure you have [Jekyll](https://jekyllrb.com) installed first:

```
gem install jekyll
```

### What Do I Get?

This site is pretty bare-bones, but that's the point. It's meant to be boilerplate for you. It takes the tedious part out of getting a new build process up and running.

As far as Jekyll sites go, this template does some pretty unconventional things. Normally a Jekyll site uses the standard `jekyll serve` command and builds the site for you, compiling SCSS/Sass, which it comes with built-in.

Instead, this template uses Gulp to kick off tasks to compile your styles, using PostCSS. It utilizes a `dev_assets` folder for styles, scripts, and images, and compiled/minified assets get put into `assets` during the build process. It also includes BrowserSync, so your browser automatically opens during the build process. And it's got watch tasks baked in to recompile, and because we have BrowserSync, your browser automatically reloads. So overall, quite a few niceties over the vanilla Jekyll setup.

The config here is set up to be hosted on and deploy to GitHub Pages. There's an npm deploy script included in the `package.json` which will do this for you, as long as your repo is configured to deploy to GH Pages from the `docs` directory. You can [read more about that here](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)

### Running it locally

Again, this is an unconventional Jekyll setup, so you need a couple extras to get going. Make sure you have:

- Node and npm
- Ruby (I recommend installing via Homebrew if you are on a Mac, and using rvm to manage Ruby versions)
- Jekyll
- Gulp

Got it? Awesome. I recommend downloading this repo, NOT cloning it via git. Here's why: you don't want all the git info from this repo associated with your site. You want your own. So download the zip file, unpackage it, rename the folder or copy the contents into whatever directory you want, `cd` into it and run `git init`. All the goodies with none of the other baggage.

Once you've done that, head back to the terminal, `cd` into the project, then:

```
npm install && npm start
```

That will do a `bundle install`, build the assets, build Jekyll, and start BrowserSync at port 3000.

### More Setup

> "I thought this was supposed to be easy!"

Okay, there are just a few housekeeping things you need to do to.

> **TODO:** would be SICK to turn this into a Yeoman generator where we make people fill this out in a CLI as part of project generation.

1. First of all, you probably want to head over to `_config.yml` and update some settings there.
2. You will also want to go into `_data/` and update both the settings and social files.
3. In `_includes/disqus.html` - I typically use Disqus for comments because it's super easy. If you don't want it, remove the file and get rid of the import line at the bottom of `_layouts/post.html` and you're done. If you want to keep them, just update the `disqus_shortname` variable in the disqus include file.
4. This theme uses [Tachyons](https://tachyons.io) for layout. If you don't like it, remove the `_tachyons.pcss` partial and remove the `@import` from `main.pcss`, but be aware that you will lose almost all styling and layout.
5. Update `package.json` if you want - the name field is intentionally left blank for you. It won't break anything if you leave it out, unless you want to publish your site as an NPM package, which would be a little weird.
6. Since you copied this instead of cloning, you'll need to `git init` if you want to keep this in version control.

## Contribute

Have any awesome additions or recommendations? Pull requests welcome!

## License

MIT
