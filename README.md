New Jekyll Site
===============

This is a blank project template for a new Jekyll site. Make sure you have [Jekyll](https://jekyllrb.com) installed first:

```
gem install jekyll
```

### What Do I Get?

This site is pretty bare-bones, but that's the point. It's meant to be boilerplate for you. It takes the tedious part out of getting a new build process up and running.

As far as Jekyll sites go, this template does some pretty unconventional things. Normally a Jekyll site uses the standard `jekyll serve` command and builds the site for you, compiling SCSS/Sass, which it comes with built-in.

Instead, this template uses Gulp to kick off tasks to compile your styles, using PostCSS. It utilizes a `dev_assets` folder for styles and images, and compiled/minified assets get put into `assets` during the build process. It also includes BrowserSync, so your browser automatically opens during the build process. And it's got watch tasks baked in to recompile, and because we have BrowserSync, your browser automatically reloads. So overall, quite a few niceties over the vanilla Jekyll setup.

> **TODO:** re-implement scripts task in Gulp to include JS by default. Way easier to delete the code than to write it.

I've also included a `Capfile` and a `deploy.rb` that you can modify (should only be a couple of lines you have to adjust for your server) to build and deploy your site to a Digital Ocean web server running Apache. You'll want to follow these steps to get your server set up. I haven't tested this for other hosting services, but feel free to cut a PR with enhancements!

### Running it locally

Again, this is an unconventional Jekyll setup, so you need a couple extras to get going. Make sure you have:

- Node and npm
- Ruby (I recommend installing via Homebrew if you are on a Mac, and using rvm to manage Ruby versions)
- Jekyll
- Gulp

Got it? Awesome. I recommend downloading this repo, NOT cloning it via git. Here's why: you don't want all the git info from this repo associated with your site. You want your own. So download the zip file, unpackage it, rename the folder or copy the contents into whatever directory you want, `cd` into it and run `git init`. All the goodies with none of the other baggage.

Once you've done that, head back to the terminal, `cd` into the project, then:

```
npm install && npm run serve
```

That will do a `bundle install`, build the assets, build Jekyll, and start BrowserSync at port 3000.

### More Setup

"I thought this was supposed to be easy!"

Okay, there are just a few housekeeping things you need to do to.

> **TODO:** would be SICK if we could turn this into a Yeoman generator where we make people fill this shit out in a CLI as part of project generation.

1. First of all, you probably want to head over to `_config.yml` and update some settings there.
2. You will also want to go into `_data/` and update both the settings and social files.
3. In `_includes/disqus.html` - I typically use Disqus for comments because it's super easy. If you don't want it, remove the file and get rid of the import line at the bottom of `_layouts/post.html` and you're done. If you want to keep them, just update the `disqus_shortname` variable in the disqus include file.
4. You'll likely notice that I don't include very much CSS here. That's because this uses [Tachyons](https://tachyons.io) for layout because it's awesome. If you don't like it, remove the link in `_includes/head.html`, but be aware that you will lose almost all styling and layout.
5. Update `package.json` if you want - the name field is intentionally left blank for you. Won't break anything if you leave it out, unless you want to publish your website to NPM, which would be bizarre.

## Contribute

Have any awesome additions or recommendations? Pull requests welcome!

## License

MIT
